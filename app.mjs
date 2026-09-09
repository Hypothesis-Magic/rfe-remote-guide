import {initLanguage,translate} from './i18n.mjs?v=5';
import {chips,outNames,keyName,createPlan,currentJob,observeMode,completeJob,phaseFor} from './model.mjs';
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let session=null,stage=0,retryMessage='',timerId=null,timerExpired=false,selectedTask='config';
const settings=$('settings');
const userLabel=value=>`<span translate="no">${esc(value)}</span>`;
initLanguage();
function stopTimer(){clearInterval(timerId);timerId=null;}
function refreshForm(chipChanged=false){
 const c=chips[$('chip').value],task=$('task').value,oldTarget=$('targetKey').value||'normal',oldCurrent=$('currentKey').value||'unknown';
 $('targetKey').innerHTML=`<option value="normal">${c.normal}</option><option value="arbitrary">任意鍵學習</option><option value="keep">不變更</option>`;
 $('currentKey').innerHTML=`<option value="unknown">不知道</option><option value="normal">${c.normal}</option><option value="arbitrary">任意鍵學習</option>`;
 $('targetKey').value=oldTarget;$('currentKey').value=chipChanged?'unknown':oldCurrent;if(chipChanged)$('currentOut').value='unknown';
 $('targetKeyWrap').hidden=task!=='config';$('targetOutWrap').hidden=task==='clear';$('known').hidden=task==='clear';$('mappingFields').hidden=task!=='mapping';
 if(task==='mapping')$('mappingFields').innerHTML=c.slots.map((slot,i)=>`<div class="mapping-row"><label class="mapping-label" for="map${i}">${slot}<small>第 ${i+1} 個學習位置</small></label><input id="map${i}" type="text" maxlength="24" value="${String.fromCharCode(65+i)}" aria-label="${slot} 的遙控器按鍵"><label class="check-row"><input type="checkbox" id="skip${i}">略過</label></div>`).join('');
 if(task!==selectedTask){$('targetOut').value=task==='config'?'momentary':'keep';selectedTask=task;}
 const notes={pair:'每次配對占一筆容量。',mapping:$('chip').value==='270'?'第三鍵為特殊功能，並非第三路輸出。':'依序學習 D0–D3，完成後返回單鍵模式。',clear:'刪除所有配對，模式設定保留。'};
 const note=notes[task]||(oldTarget==='arbitrary'?'需要重排按鍵時，請選「自訂按鍵對應」。':'');
 $('taskNote').textContent=note;$('taskNote').hidden=!note;renderIdle();renderState();
}
function options(){const chip=$('chip').value;return {chip,task:$('task').value,targetKey:$('targetKey').value,targetOut:$('targetOut').value,currentKey:$('currentKey').value,currentOut:$('currentOut').value,mapping:chips[chip].slots.map((_,i)=>({label:$('map'+i)?.value.trim()||String.fromCharCode(65+i),skip:$('skip'+i)?.checked||false}))};}
function log(text,label=null){session.logs.unshift({text,label,time:new Date().toLocaleTimeString('zh-TW',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false})});renderState();}
function goalKey(s){return s.task==='pair'||s.task==='mapping'?'normal':s.task==='clear'?'keep':s.targetKey;}
function renderState(){
 $('state').hidden=!session;$('record').hidden=!session;$('sessionbar').hidden=!session;
 if(!session)return;
 const s=session,k=goalKey(s),o=s.task==='clear'?'keep':s.targetOut;
 const track=(label,value,target,name)=>`<div><div class="state-name">${label}</div><div class="state-track"><span class="${value==='unknown'?'unknown':''}">${value==='unknown'?'未知':name(value)}</span>${target==='keep'?'<span class="muted">· 保留</span>':value===target?'<span class="matched" aria-label="符合目標">✓</span>':`<span class="arrow" aria-label="目標">→</span><span class="target">${name(target)}</span>`}</div></div>`;
 $('state').innerHTML=track('按鍵模式',s.key,k,v=>keyName(s.chip,v))+track('輸出模式',s.out,o,v=>outNames[v]);
 $('sessionName').textContent=chips[s.chip].name+' · '+({config:'設定模式',pair:'配對',mapping:'自訂按鍵',clear:'清除配對'}[s.task]);
 $('history').innerHTML=s.logs.map(x=>`<li><time>${x.time}</time>${x.label?esc(x.text.slice(0,x.text.indexOf('：')+1))+userLabel(x.label)+esc(x.text.slice(x.text.indexOf('：')+1+x.label.length)):esc(x.text)}</li>`).join('');$('recordCount').textContent=s.logs.length;
}
const svg=(content,cls='')=>`<svg viewBox="0 0 36 36" class="${cls}" aria-hidden="true">${content}</svg>`;
function hardware(power,set,led='—'){
 const powerIcon=svg('<path d="M18 3v14M10 8a13 13 0 1 0 16 0"/>');
 const setIcon=svg(`<rect x="6" y="${set==='按住'?13:8}" width="24" height="13" rx="4"/><path d="M5 29h26"/>`,set==='按住'?'set-down':'');
 const state=(p)=>p==='開啟'||p==='按住'?'active':'inactive';
 const ledIcon=led==='觀察'||led==='亮起'||led==='熄滅'?'<span class="led-light"></span>':led==='—'?'—':'?';
 return `<div class="hardware" aria-label="本步操作狀態"><div class="hardware-cell ${state(power)}"><small>電源</small>${powerIcon}<strong>${power}</strong></div><div class="hardware-cell ${state(set)}"><small>SET</small>${setIcon}<strong>${set}</strong></div><div class="hardware-cell ${led==='觀察'?'observe':led==='亮起'?'lit':led==='熄滅'?'off':'inactive'}"><small>LED</small><div class="led-face">${ledIcon}</div><strong>${led==='—'?'不需判讀':led}</strong></div></div>`;
}
function renderIdle(){if(session)return;$('guide').hidden=true;$('step').innerHTML='';}
function resetSession(){stopTimer();session=null;stage=0;retryMessage='';$('controls').disabled=false;document.body.classList.remove('running');$('currentKey').value='unknown';$('currentOut').value='unknown';$('record').open=false;renderIdle();renderState();}
settings.addEventListener('submit',e=>{e.preventDefault();if(session)return;const o=options();if(o.task==='mapping'&&o.mapping.every(x=>x.skip)){$('taskNote').hidden=false;$('taskNote').textContent='請至少指定一個按鍵。';return;}session=createPlan(o);stage=0;retryMessage='';$('controls').disabled=true;document.body.classList.add('running');log('開始 '+chips[o.chip].name+' 操作。');render();$('guideHeading').scrollIntoView({block:'start'});});
$('chip').addEventListener('change',()=>refreshForm(true));$('task').addEventListener('change',()=>refreshForm());$('targetKey').addEventListener('change',()=>refreshForm());for(const id of ['targetOut','currentKey','currentOut'])$(id).addEventListener('change',()=>{renderIdle();renderState();});$('mappingFields').addEventListener('input',renderIdle);
$('reset').addEventListener('click',()=>{if(confirm(translate('結束本次引導？晶片設定不會被重設。')))resetSession();});
$('helpButton').addEventListener('click',()=>{$('reference').open=!$('reference').open;if($('reference').open)$('reference').scrollIntoView({behavior:'smooth',block:'start'});});
function button(label,action,style='primary'){return `<button class="${style}" data-action="${action}">${label}</button>`;}
function source(){const c=chips[session.chip];return `<p class="source-line"><a href="${c.source}" target="_blank" rel="noopener">規格書 ${c.pages}</a></p>`;}
function title(t,d=''){return `<h2 class="step-title">${t}</h2>${d?`<p class="step-desc">${d}</p>`:''}`;}
function notice(t,kind=''){return `<div class="notice ${kind}">${t}</div>`;}
function actions(main,secondary=''){return `<div class="actions">${main}${secondary}</div>`;}
const decodeKey=n=>n===1?'normal':'arbitrary',decodeOut=n=>({1:'interlock',2:'momentary',3:'toggle'}[n]);
function flashOptions(axis){const nums=axis==='key'?[1,2]:[1,2,3];return `<div class="led-choices ${nums.length===2?'two':''}">${nums.map(n=>`<button class="led-choice" data-action="flash${n}"><span class="led-pips" aria-hidden="true">${'<i class="pip"></i>'.repeat(n)}</span>閃 ${n} 次<small>${axis==='key'?keyName(session.chip,decodeKey(n)):outNames[decodeOut(n)]}</small></button>`).join('')}</div>${actions(button('沒看清楚／其他燈號','unclear','quiet'))}`;}
function render(){if(!session)return;$('guide').hidden=false;const j=currentJob(session),phase=phaseFor(j);$('guideHeading').textContent=phase;$('guideLabel').textContent=j.type==='mode'?(j.axis==='key'?keyName(session.chip,j.target):outNames[j.target]):'';renderState();
 const views={mode:()=>renderMode(j),learn:()=>renderLearn(j),reboot:renderReboot,clear:renderClear,verify:renderVerify,done:renderDone};
 $('step').innerHTML=(retryMessage?notice(esc(retryMessage),'warn'):'')+views[j.type]()+source();
}
function renderMode(j){
 if(stage===0||stage===1)return title('斷電後，按住 SET','先讓接收晶片完全斷電。')+hardware('關閉','按住')+actions(button('已斷電，SET 已按住','prepareMode'));
 if(stage===2)return title('保持按住，重新上電',`上電後維持 ${j.seconds} 秒，再放開 SET。`)+hardware('開啟','按住')+actions(button('已上電，開始計時','startModeTimer'),button(`已自行計時 ${j.seconds} 秒並放開`,'manualMode','quiet'));
 if(stage===3)return title('持續按住 SET')+hardware('開啟','按住')+timerMarkup(j.seconds)+actions(button('計時不同步，重做','restartMode','quiet'));
 return title(stage===4?'放開 SET，回報燈號':'LED 閃了幾次？')+hardware('開啟','放開','觀察')+flashOptions(j.axis);
}
function timerMarkup(n){return `<div class="timer-box"><div class="timer" id="countdown" role="timer">${n.toFixed(1)}<small>秒</small></div><div class="bar"><i id="timebar"></i></div><div id="timerCaption" class="timer-caption">依實際按鍵與上電時刻計時</div></div>`;}
function startCountdown(n,onEnd){stopTimer();timerExpired=false;const end=Date.now()+n*1000;const tick=()=>{const remaining=Math.max(0,(end-Date.now())/1000);if($('countdown'))$('countdown').innerHTML=`${remaining.toFixed(1)}<small>秒</small>`;if($('timebar'))$('timebar').style.width=(100-remaining/n*100)+'%';if(remaining<=0){stopTimer();timerExpired=true;onEnd();}};tick();if(!timerExpired)timerId=setInterval(tick,100);}
function renderReboot(){
 if(stage===0)return title('先斷電，重設學習順序','配對資料與模式保留，下一次從第一格開始。')+hardware('關閉','放開')+actions(button('已斷電','next'));
 return title('正常上電，不按 SET','接下來所有位置學完前，保持供電。')+hardware('開啟','放開')+actions(button('已上電，開始學習','finishReboot'));
}
function renderLearn(j){const position=j.mapping?`${j.slot} · ${j.index+1}/${chips[session.chip].slots.length}`:'遙控器配對';
 if(stage===0)return title(position,j.skip?'本格略過，進入學習後等待逾時。':j.mapping?`學習「${userLabel(j.label)}」鍵。`:'確認接收端已正常開機。')+hardware('開啟','放開')+(j.mapping&&session.chip==='270'&&j.index===2?notice('互鎖：全關；點動／自鎖：控制 D0＋D1。'):'')+actions(button('已正常上電','next'));
 if(stage===1)return title('按住 SET 1 秒，再放開')+hardware('開啟','按住')+actions(button('已按住，開始計時','startLearnTimer'),button('已按 1 秒並放開','learnReleased','quiet'))+'<p class="note warn">勿按超過 10 秒，以免清除全部配對。</p>';
 if(stage===2)return title('持續按住 SET')+hardware('開啟','按住')+timerMarkup(1);
 if(stage===3)return title('放開 SET，LED 有亮起嗎？')+hardware('開啟','放開','亮起')+actions(button('LED 亮起','learningOpen'),button('沒亮／沒看清楚','learnUnclear','quiet'));
 if(stage===4)return title(j.skip?'等待逾時':j.mapping?`按「${userLabel(j.label)}」鍵`:'按遙控器的一個單鍵',j.skip?'不要按遙控器；閃 3 次後退出。':'LED 熄滅即成功，請放開遙控器。')+timerMarkup(10)+actions(j.skip?'':button('LED 已熄滅','learnSuccess'),button('閃 3 次，逾時退出',j.skip?'skipSuccess':'learnTimeout',j.skip?'primary':'quiet')+button('其他情況／中途斷電','learnUnclear','quiet'))+'<p class="note">晶片從 LED 亮起起算 10 秒，可能比網頁更早逾時。</p>';
 return title('本輪未確認成功',j.mapping?'逾時會推進學習位置，請從第一格重新對齊。':'請等學習退出後再試。')+notice(j.mapping?'先前已學資料保留；重做仍占容量。':'確認遙控器電池、頻率與編碼。','warn')+actions(button(j.mapping?'已退出，從第一格重做':'已退出，重新配對',j.mapping?'restartMapping':'retryLearn'),button('無法確認是否退出','learningHelp','quiet'));
}
function renderClear(){
 if(stage===0)return title('清除所有遙控器配對？','所有遙控器需重新配對。模式設定保留。')+actions(button('確定清除全部配對','next','danger'));
 if(stage===1)return title('正常上電，不按 SET')+hardware('開啟','放開')+actions(button('已正常上電','next'));
 if(stage===2)return title('按住 SET 超過 10 秒','使用 11 秒倒數。')+hardware('開啟','按住')+actions(button('已按住，開始計時','startClearTimer','danger'),button('已按超過 10 秒並放開','clearReleased','quiet'));
 if(stage===3)return title('持續按住 SET')+hardware('開啟','按住')+timerMarkup(11);
 return title('放開 SET，有快閃 5 次嗎？')+hardware('開啟','放開','觀察')+actions(button('快閃 5 次，已清除','clearSuccess'),button('其他燈號／沒看清楚','clearUnclear','quiet'));
}
function renderVerify(){const checks=session.key==='arbitrary'?['任意鍵模式供學習使用。','學完需返回一般工作模式。']:['逐鍵確認輸出或產品動作。','正常斷電重開，再確認配對保留。'];if(session.key!=='arbitrary'){const behavior={momentary:'按住有輸出，放開停止。',toggle:'同鍵按一次開，再按一次關。',interlock:'按另一鍵，切換保持的輸出。'}[session.out];if(behavior)checks.unshift(behavior);}return title(session.key==='arbitrary'?'已進入學習模式':'確認實際動作')+`<ul class="checklist">${checks.map(t=>`<li>${t}</li>`).join('')}</ul>`+actions(button(session.key==='arbitrary'?'已確認':'已實測，符合需求','verifySuccess'),button('稍後測試','verifyLater','quiet')+button('動作不符合','verifyHelp','quiet'));
}
function renderDone(){const text=session.task==='clear'?'配對已清除':session.verified?'已完成':'設定完成，待實測';return '<div class="confirmed" aria-hidden="true">✓</div>'+title(text)+`<div class="result-list">${keyName(session.chip,session.key)} · ${outNames[session.out]}${session.learned.length?`<p>${session.learned.map(x=>x.label?`${userLabel(x.label)} → ${esc(x.slot)}`:esc(x)).join('、')}</p>`:''}</div>`+(session.key==='arbitrary'?'<p class="note">學完後，需返回一般工作模式。</p>':'')+actions(button('新的操作','newSession'),session.task!=='clear'&&session.key!=='arbitrary'?button('再配對一支遙控器','nextPair','quiet'):'');}
function next(){stopTimer();stage++;retryMessage='';render();}
function finish(){stopTimer();completeJob(session);stage=0;retryMessage='';render();}
function restartMapping(){stopTimer();const o={...session,task:'mapping',currentKey:session.key,currentOut:session.out};const logs=session.logs;const learned=session.learned;session=createPlan(o);session.logs=logs;session.learned=learned;log('重新從第一格學習；先前已學資料未撤銷。');stage=0;retryMessage='';render();}
$('step').addEventListener('click',e=>{const b=e.target.closest('button[data-action]');if(!b||!session)return;const a=b.dataset.action,j=currentJob(session);
 if(a==='next')return next();
 if(a==='prepareMode'){stage=2;retryMessage='';render();return;}
 if(a==='startModeTimer'){stage=3;render();return startCountdown(j.seconds,()=>{stage=4;render();});}
 if(a==='manualMode'){stage=5;render();return;}
 if(a==='restartMode'){stopTimer();stage=0;session[j.axis]='unknown';retryMessage='結果未確認，從斷電重做。';log('計時不同步，該模式重新標為未知。');render();return;}
 if(a.startsWith('flash')){const n=Number(a.slice(5));const r=observeMode(session,n);log(`${j.axis==='key'?'按鍵':'輸出'}切換後閃 ${n} 次 → ${j.axis==='key'?keyName(session.chip,r.value):outNames[r.value]}${r.matched?'，符合目標。':'，繼續切換。'}`);stage=0;retryMessage=r.matched?'':`目前為${j.axis==='key'?keyName(session.chip,r.value):outNames[r.value]}，需再切換一次。`;render();return;}
 if(a==='unclear'){session[j.axis]='unknown';stage=0;retryMessage='燈號不明，重新切換一次。';log('燈號不明；該模式標為未知。');render();return;}
 if(a==='finishReboot'){log('正常斷電重開，任意鍵學習順序回到第一格。');return finish();}
 if(a==='startLearnTimer'){stage=2;render();return startCountdown(1,()=>{stage=3;render();});}
 if(a==='learnReleased'){stage=3;render();return;}
 if(a==='learningOpen'){stage=4;render();return startCountdown(10,()=>{if($('timerCaption'))$('timerCaption').textContent='計時到，請回報實際 LED。';});}
 if(a==='learnSuccess'){stopTimer();session.learned.push(j.mapping?{label:j.label,slot:j.slot}:'一支遙控器');log(j.mapping?`${j.slot}：${j.label} 鍵學習成功（回報 LED 熄滅）。`:'回報 LED 熄滅，一次配對成功。',j.mapping?j.label:null);return finish();}
 if(a==='skipSuccess'){log(`${j.slot}：回報閃 3 次，逾時略過。`);return finish();}
 if(a==='learnTimeout'||a==='learnUnclear'){stopTimer();stage=5;retryMessage=a==='learnTimeout'?'本次未完成目標按鍵學習。':'沒有確認學習結果，請勿直接假設成功。';if(j.mapping&&a==='learnUnclear')session.key='unknown';log(a==='learnTimeout'?'學習逾時，未建立本輪配對。':'學習狀態不明，需重新確認。');render();return;}
 if(a==='retryLearn'){stage=0;retryMessage='';render();return;}
 if(a==='restartMapping')return restartMapping();
 if(a==='learningHelp'){retryMessage=j.mapping?'可先放開所有按鍵，不發射訊號，等待學習窗口結束；如仍不確定，正常斷電重開，再從第一格開始。若曾在已上電時長按 SET 超過 10 秒，請先確認是否快閃 5 次、資料是否已清除。':'放開所有按鍵、不發射訊號，等約 10 秒後再試。也可在不按 SET 的狀態正常斷電重開，再做配對。';render();return;}
 if(a==='startClearTimer'){stage=3;render();return startCountdown(11,()=>{stage=4;render();});}
 if(a==='clearReleased'){stage=4;render();return;}
 if(a==='clearSuccess'){log('回報快速閃 5 次，已清除全部遙控器配對；模式保留。');return finish();}
 if(a==='clearUnclear'){stage=1;retryMessage='清除尚未確認，重新操作。';log('清除結果不明，尚未判定清除完成。');render();return;}
 if(a==='verifySuccess'||a==='verifyLater'){session.verified=a==='verifySuccess';log(session.verified?'使用者已確認實際行為／學習準備狀態。':'使用者完成設定步驟，尚未實測。');return finish();}
 if(a==='verifyHelp'){retryMessage='確認按鍵對應與有效接收。LED-VT 不代表輸出保持；仍有差異時，重新設定並選擇目前模式未知。'.replace('确认','確認');render();return;}
 if(a==='nextPair'){const old=session;session=createPlan({...old,task:'pair',currentKey:old.key,currentOut:old.out,targetOut:'keep'});session.logs=old.logs;stage=0;retryMessage='';log('沿用同一塊板子已確認的模式，配對另一支遙控器。');render();return;}
 if(a==='newSession'){resetSession();$('chip').focus();return;}
});
refreshForm();
