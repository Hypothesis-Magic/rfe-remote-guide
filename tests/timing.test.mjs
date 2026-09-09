import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as model from '../model.mjs';

function harness(seconds){
 let now=0,id=0;
 const timers=new Map(),nodes=new Map();
 const get=name=>{
  if(!nodes.has(name))nodes.set(name,{value:({chip:'272',task:'config',pairMethod:'normal',targetKey:'normal',currentKey:'unknown'})[name]||'',style:{},listeners:{},addEventListener(event,handler){this.listeners[event]=handler;},scrollIntoView(){}});
  return nodes.get(name);
 };
 const context=vm.createContext({...model,Date:class extends Date{static now(){return now;}},document:{getElementById:get,body:{classList:{remove(){},add(){}}}},initLanguage(){},translate:x=>x,setInterval:fn=>{timers.set(++id,fn);return id;},clearInterval:key=>timers.delete(key)});
 const source=fs.readFileSync(new URL('../app.mjs',import.meta.url),'utf8').replace(/^import .*;$/gm,'');
 vm.runInContext(source+`\nglobalThis.api={get stage(){return stage;},get session(){return session;},setSession(s){session=s;},render};`,context);
 const state=model.createPlan({chip:seconds===12?'270':'272',task:'config',targetKey:seconds===1?'keep':'normal',targetOut:seconds===1?'momentary':'keep',currentKey:'unknown',currentOut:'unknown'});
 context.api.setSession(state);context.api.render();
 return {api:context.api,get,timers,click(action){get('step').listeners.click({target:{closest:()=>({dataset:{action}})}});},advance(ms){now+=ms;for(const [key,fn] of [...timers])if(timers.has(key))fn();}};
}
for(const seconds of [1,10,12])test(`${seconds}s mode hold starts after preparation without another click`,()=>{
 const h=harness(seconds);
 h.click('prepareMode');assert.equal(h.api.stage,1);assert.equal(h.timers.size,1);
 h.advance(4900);assert.equal(h.api.stage,1);
 h.advance(100);assert.equal(h.api.stage,3);assert.equal(h.timers.size,1);
 assert.match(h.get('step').innerHTML,/現在上電，持續按住 SET/);
 h.advance(seconds*1000-100);assert.equal(h.api.stage,3);
 h.advance(100);assert.equal(h.api.stage,4);assert.equal(h.timers.size,0);
 assert.match(h.get('step').innerHTML,/放開 SET，回報燈號/);
 assert.equal(model.currentJob(h.api.session).type,'mode','LED feedback is still required');
});
test('cancel during preparation stops the automatic power-on prompt',()=>{
 const h=harness(10);h.click('prepareMode');h.advance(1000);h.click('restartMode');
 assert.equal(h.api.stage,0);assert.equal(h.timers.size,0);h.advance(20000);assert.equal(h.api.stage,0);
});
test('manual operation goes directly to LED feedback',()=>{
 const h=harness(12);h.click('manualMode');assert.equal(h.api.stage,5);assert.equal(h.timers.size,0);
 assert.match(h.get('step').innerHTML,/LED 閃了幾次/);
});
