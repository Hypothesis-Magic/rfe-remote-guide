import test from 'node:test';
import assert from 'node:assert/strict';
import {chips,createPlan,currentJob,observeMode,completeJob,nextPairPlan} from '../model.mjs';

const options=(chip,task)=>({chip,task,targetKey:'normal',targetOut:'momentary',currentKey:'unknown',currentOut:'unknown',mapping:chips[chip].slots.map((slot,i)=>({label:['B','A','C','D'][i],skip:i===1}))});
function completePlan(state){
 let steps=0;
 while(currentJob(state).type!=='done'){
  assert.ok(++steps<20,'plan must finish');
  const job=currentJob(state);
  if(job.type==='mode')observeMode(state,job.axis==='key'?(job.target==='normal'?1:2):({interlock:1,momentary:2,toggle:3}[job.target]));
  else{
   if(job.type==='learn'&&!job.skip)state.learned.push(job.mapping?{label:job.label,slot:job.slot}:'One remote');
   completeJob(state);
  }
 }
 return state;
}
for(const chip of ['270','272']){
 test(`${chip}: custom pairing learns slots before returning to normal mode`,()=>{
  const state=createPlan(options(chip,'mapping'));
  assert.deepEqual(state.queue.map(j=>j.type),['mode','reboot',...chips[chip].slots.map(()=>'learn'),'mode','mode','verify']);
  assert.equal(state.queue[0].target,'arbitrary');
  assert.equal(state.queue[0].seconds,chip==='270'?12:10);
  assert.deepEqual(state.queue.filter(j=>j.type==='learn').map(j=>j.slot),chips[chip].slots);
  assert.equal(state.queue.find(j=>j.type==='learn'&&j.index===1).skip,true);
  const returning=state.queue.find(j=>j.returning);
  assert.equal(returning.target,'normal');assert.equal(returning.seconds,12);
  completePlan(state);
  assert.equal(state.key,'normal');assert.equal(state.out,'momentary');
  assert.deepEqual(state.learned, chips[chip].slots.flatMap((slot,i)=>i===1?[]:[{label:['B','A','C','D'][i],slot}]));
 });
 test(`${chip}: another custom remote retains mapping and restarts at slot 1`,()=>{
  const first=completePlan(createPlan(options(chip,'mapping')));
  first.logs.push({text:'First remote complete'});first.verified=true;
  const next=nextPairPlan(first);
  assert.equal(next.task,'mapping');assert.deepEqual(next.mapping,first.mapping);
  assert.equal(next.out,'momentary');assert.equal(next.targetOut,'keep');
  assert.equal(next.verified,false);assert.deepEqual(next.learned,[]);assert.deepEqual(next.logs,first.logs);
  assert.equal(currentJob(next).target,'arbitrary');
  observeMode(next,2);assert.equal(currentJob(next).type,'reboot');
  completeJob(next);assert.equal(currentJob(next).index,0);assert.equal(currentJob(next).label,'B');
  assert.equal(next.queue.some(j=>j.type==='mode'&&j.axis==='out'),false);
  completePlan(next);assert.equal(next.key,'normal');
 });
 test(`${chip}: original pairing stays original on the next remote`,()=>{
  const first=createPlan(options(chip,'pair'));
  assert.equal(currentJob(first).target,'normal');
  assert.equal(first.queue.filter(j=>j.type==='learn').length,1);
  completePlan(first);
  const next=nextPairPlan(first);
  assert.equal(next.task,'pair');assert.equal(currentJob(next).type,'learn');
  assert.equal(currentJob(next).mapping,false);
 });
 test(`${chip}: unclear or mismatched LED feedback cannot finish a mode switch`,()=>{
  const state=createPlan(options(chip,'mapping'));
  assert.equal(observeMode(state,0).matched,false);assert.equal(state.key,'unknown');
  assert.equal(currentJob(state).type,'mode');
  assert.equal(observeMode(state,1).matched,false);assert.equal(currentJob(state).target,'arbitrary');
  assert.equal(observeMode(state,2).matched,true);assert.equal(currentJob(state).type,'reboot');
 });
}
