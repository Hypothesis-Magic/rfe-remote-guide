export const chips={
 '270':{name:'RFE270',channels:2,normal:'組合鍵輸出',longSeconds:12,source:'https://www.rfe.cn/pdf/RFE270-254163.pdf',pages:'第 3–6 頁',slots:['D0','D1','特殊功能鍵'],note:'一般模式為組合鍵輸出；任意鍵學習有 3 個功能位置。'},
 '272':{name:'RFE272A',channels:4,normal:'單鍵輸出',longSeconds:10,source:'https://www.rfe.cn/pdf/RFE272A-632152.pdf',pages:'第 4–7 頁',slots:['D0','D1','D2','D3'],note:'一般模式為單鍵輸出；任意鍵學習依序對應 D0–D3。'}
};
export const outNames={unknown:'尚未確認',keep:'維持目前模式',interlock:'互鎖',momentary:'點動',toggle:'自鎖'};
export const keyName=(chip,v)=>v==='normal'?chips[chip].normal:v==='arbitrary'?'任意鍵學習':v==='keep'?'維持目前模式':'尚未確認';
export const decode=(axis,count)=>axis==='key'?({1:'normal',2:'arbitrary'}[count]??'unknown'):({1:'interlock',2:'momentary',3:'toggle'}[count]??'unknown');
export function createPlan(options){
 const c=chips[options.chip];if(!c)throw Error('Unsupported chip');
 const state={...options,key:options.currentKey||'unknown',out:options.currentOut||'unknown',queue:[],learned:[],logs:[],verified:false};
 const mode=(axis,target,returning=false)=>{if(target!=='keep')state.queue.push({type:'mode',axis,target,seconds:axis==='out'?1:returning?12:c.longSeconds,returning});};
 if(options.task==='config'){mode('key',options.targetKey);mode('out',options.targetOut);}
 else if(options.task==='pair'){mode('key','normal');mode('out',options.targetOut);state.queue.push({type:'learn',index:0,slot:'一般配對',label:'任一單鍵',skip:false,mapping:false});}
 else if(options.task==='mapping'){
  mode('key','arbitrary');state.queue.push({type:'reboot'});
  c.slots.forEach((slot,i)=>state.queue.push({type:'learn',index:i,slot,label:options.mapping?.[i]?.label||String.fromCharCode(65+i),skip:!!options.mapping?.[i]?.skip,mapping:true}));
  mode('key','normal',true);mode('out',options.targetOut);
 }else if(options.task==='clear')state.queue.push({type:'clear'});
 if(options.task!=='clear')state.queue.push({type:'verify'});
 return state;
}
export function currentJob(s){while(s.queue[0]?.type==='mode'&&s[s.queue[0].axis]===s.queue[0].target)s.queue.shift();return s.queue[0]||{type:'done'};}
export function observeMode(s,count){const j=currentJob(s);if(j.type!=='mode')throw Error('Not mode observation');const v=decode(j.axis,count);s[j.axis]=v;const matched=v===j.target;if(matched)s.queue.shift();return {value:v,matched};}
export function completeJob(s){return s.queue.shift();}
export function phaseFor(j){return j.type==='mode'?(j.returning?'返回工作模式':j.axis==='key'?'按鍵模式':'輸出模式'):j.type==='learn'||j.type==='reboot'?'遙控器學習':j.type==='verify'?'實際確認':j.type==='clear'?'清除配對':'完成';}

// Repeat the learning method, while keeping the confirmed output mode.
export function nextPairPlan(previous){
 const next=createPlan({...previous,task:previous.task==='mapping'?'mapping':'pair',currentKey:previous.key,currentOut:previous.out,targetOut:'keep'});
 next.logs=previous.logs;
 return next;
}
