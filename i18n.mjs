// Chinese source copy stays canonical; localization changes presentation only.
export const english = {
'先斷電，準備操作':'Power off and get ready',
'點開始後有 5 秒準備時間。先按住 SET，看到「現在上電」時再開啟電源。':'After starting, you have 5 seconds to prepare. Hold SET, then switch the power on when “Power on now” appears.',
'開始：5 秒後上電':'Start — power on in 5 seconds',
'已自行完成操作，直接回報燈號':'Already completed manually — report LED flashes',
'按住 SET，等待上電提示':'Hold SET and wait for the power-on cue',
'倒數結束時上電；不需要再點畫面。':'Power on when the countdown ends. No further screen tap is needed.',
'準備倒數，尚未開始計算按住時間':'Preparation countdown; the hold timer has not started',
'取消，重新準備':'Cancel and prepare again',
'現在上電，持續按住 SET':'Power on now and keep holding SET',
'保持按住，直到畫面提示放開。若未同步上電，請重新準備。':'Keep holding until prompted to release. If power-on did not match the cue, start again.',

'配對方式':'Pairing method',
'原始按鍵對應':'Original button mapping',
'自訂按鍵對應（任意鍵學習）':'Custom mapping (arbitrary-button learning)',
'任意鍵學習用於建立按鍵對應；學完後返回一般工作模式，已學對應保留。':'Arbitrary-button learning defines button mappings. Return to normal operation after learning; the learned mappings are retained.',
'逐鍵指定 D0、D1 與特殊功能。學完返回工作模式，對應保留。':'Assign buttons to D0, D1, and the special function. Return to normal operation after learning; mappings are retained.',
'逐鍵指定 D0–D3。學完返回工作模式，對應保留。':'Assign buttons to D0–D3. Return to normal operation after learning; mappings are retained.',
'學習一個單鍵，使用遙控器原始的按鍵對應。每次配對占一筆容量。':'Learn one button to use the remote’s original button mapping. Each pairing uses one memory entry.',
'需要重排按鍵時，請選「配對遙控器 → 自訂按鍵對應」。':'To remap buttons, select “Pair a remote → Custom mapping”.',
'接收端模式':'Receiver mode',
'返回工作模式':'Return to normal operation',
'按鍵對應保留，返回工作模式。':'Button mappings are retained. Return to normal operation.',
'本次按鍵對應':'Button mappings for this pairing',
'遙控按鍵':'Remote button',
'接收端功能':'Receiver function',
'略過（未新增）':'Skipped (no entry added)',
'已返回工作模式，自訂按鍵對應保留。':'Returned to normal operation. Custom button mappings are retained.',
'配對方式：原始按鍵對應':'Pairing method: Original button mapping',
'以相同對應再配對一支':'Pair another remote with the same mapping',
'沿用自訂按鍵對應，從第一格配對另一支遙控器。':'Pairing another remote with the same custom mapping, starting at the first slot.',

'RFE 遙控設定':'RFE Remote Setup',
'RFE270、RFE272A 配對與模式設定工具。':'Pairing and mode setup for RFE270 and RFE272A.',
'操作速查':'Quick reference','操作設定':'Setup options','晶片':'Chip','RFE272A · 4 路':'RFE272A · 4 channels','RFE270 · 2 路':'RFE270 · 2 channels',
'操作':'Operation','設定模式':'Set modes','配對遙控器':'Pair a remote','自訂按鍵對應':'Customize button mapping','清除全部配對':'Clear all pairings',
'目標按鍵模式':'Target button mode','目標輸出模式':'Target output mode','點動':'Momentary','自鎖':'Toggle','互鎖':'Interlock','不變更':'Keep unchanged',
'目前模式':'Current modes','預設未知':'Unknown by default','按鍵模式':'Button mode','輸出模式':'Output mode','不知道':'Unknown','開始':'Start','重新設定':'Start over',
'操作引導':'Setup guide','操作流程':'Setup steps','操作紀錄':'Activity log','燈號與操作速查':'LED and operation reference',
'按住 SET 再上電':'Hold SET before powering on','維持時間':'Hold time','閃 1 次':'1 flash','閃 2 次':'2 flashes','閃 3 次':'3 flashes',
'1 秒':'1 second','RFE270：12 秒':'RFE270: 12 seconds','RFE272A：10 秒*':'RFE272A: 10 seconds*','一般模式':'Normal mode','任意鍵學習':'Arbitrary-button learning',
'正常開機後才按 SET':'Press SET after normal startup','動作':'Action','按 1 秒後放開':'Hold for 1 second, then release','亮起：等待配對':'On: waiting for pairing',
'按遙控器':'Press a remote button','熄滅：學習成功':'Off: learning succeeded','學習中等候 10 秒':'Wait 10 seconds during learning','閃 3 次：逾時退出':'3 flashes: learning timed out',
'按超過 10 秒後放開':'Hold for over 10 seconds, then release','快閃 5 次：清除全部配對':'5 quick flashes: all pairings cleared',
'一般模式：RFE270 為組合鍵輸出；RFE272A 為單鍵輸出。清除配對不會重設模式。LED-VT 不代表各路輸出的保持狀態。':'Normal mode uses combination-button output on RFE270 and single-button output on RFE272A. Clearing pairings does not reset modes. LED-VT does not show whether individual outputs remain on.',
'規格書與差異':'Datasheets and differences',
'* RFE272A 一般按鍵切換寫 10 秒，學習後返回流程寫 12 秒；本工具依相應段落設定，結果以實際燈號確認。':'* RFE272A specifies 10 seconds for button-mode switching and 12 seconds for returning after learning. This guide follows the relevant section; confirm the result using the actual LED flashes.',
'兩份規格書的輸出循環文字有不一致處，因此不預測下一模式。RFE270 只有 D0、D1，第三個自訂學習鍵為特殊功能：互鎖時全關，點動／自鎖時控制 D0＋D1；一般配對的 D2 資料鍵只在互鎖時全關。':'Both datasheets contain inconsistent descriptions of the output-mode cycle, so this guide does not predict the next mode. RFE270 has only D0 and D1 outputs. Its third custom learning slot is a special function: all off in interlock mode, or D0 + D1 in momentary/toggle mode. With normal pairing, the D2 data button turns all outputs off only in interlock mode.',
'RFE270 專屬頁容量為 25 筆、系列表為 30 筆，依 25 筆理解；RFE272A 為 40 筆。重複學習也占容量。原文未提供唯讀查詢、單筆刪除或滿載行為。':'The RFE270-specific pages specify 25 entries, while the series table lists 30; this guide uses 25. RFE272A stores 40 entries. Repeated learning also uses capacity. The datasheets do not describe a read-only query, individual deletion, or behavior when full.',
'本工具為手動引導，未連線晶片；網頁計時不代表設定成功。重新整理頁面會清除本次紀錄，晶片資料不受影響。操作與模式仍需實機確認。':'This is a manual guide with no connection to the chip. A completed timer does not confirm success. Reloading clears this session’s log without affecting the chip. Verify operations and modes on the hardware.',
'組合鍵輸出':'Combination-button output','單鍵輸出':'Single-button output','特殊功能鍵':'Special-function button','略過':'Skip',
'每次配對占一筆容量。':'Each pairing uses one memory entry.',
'第三鍵為特殊功能，並非第三路輸出。':'The third button is a special function, not a third output.',
'依序學習 D0–D3，完成後返回單鍵模式。':'Learn D0–D3 in order, then return to single-button mode.',
'刪除所有配對，模式設定保留。':'Remove all pairings. Mode settings are retained.',
'需要重排按鍵時，請選「自訂按鍵對應」。':'To remap buttons, select “Customize button mapping”.',
'未知':'Unknown','尚未確認':'Unconfirmed','維持目前模式':'Keep current mode','· 保留':'· Keep','符合目標':'Matches target','目標':'Target',
'配對':'Pair a remote','自訂按鍵':'Button mapping','清除配對':'Clear pairings','本步操作狀態':'Hardware state for this step','電源':'Power','開啟':'On','關閉':'Off','按住':'Hold','放開':'Release','觀察':'Observe','亮起':'On','熄滅':'Off','不需判讀':'Not required',
'請至少指定一個按鍵。':'Specify at least one button.',
'結束本次引導？晶片設定不會被重設。':'End this guide? The chip settings will not be reset.',
'沒看清楚／其他燈號':'Unclear / other LED pattern','遙控器學習':'Remote learning','實際確認':'Hardware check','完成':'Done',
'斷電後，按住 SET':'Power off, then hold SET','先讓接收晶片完全斷電。':'Fully power off the receiver chip first.','已斷電，SET 已按住':'Power is off; SET is held',
'保持按住，重新上電':'Keep holding SET and power on','已上電，開始計時':'Powered on — start timer','持續按住 SET':'Keep holding SET','計時不同步，重做':'Timer out of sync — retry',
'放開 SET，回報燈號':'Release SET and report the LED','LED 閃了幾次？':'How many times did the LED flash?','秒':'s','依實際按鍵與上電時刻計時':'Time from the actual button press or power-on',
'先斷電，重設學習順序':'Power off to reset the learning position','配對資料與模式保留，下一次從第一格開始。':'Pairings and modes are retained. Learning restarts at the first slot.',
'已斷電':'Powered off','正常上電，不按 SET':'Power on without pressing SET','接下來所有位置學完前，保持供電。':'Keep power on until all learning slots are completed.','已上電，開始學習':'Powered on — begin learning',
'遙控器配對':'Remote pairing','本格略過，進入學習後等待逾時。':'Skip this slot by entering learning and waiting for timeout.','確認接收端已正常開機。':'Confirm the receiver has started normally.',
'互鎖：全關；點動／自鎖：控制 D0＋D1。':'Interlock: all off. Momentary/toggle: control D0 + D1.','已正常上電':'Powered on normally','按住 SET 1 秒，再放開':'Hold SET for 1 second, then release',
'已按住，開始計時':'SET is held — start timer','已按 1 秒並放開':'Held for 1 second and released','勿按超過 10 秒，以免清除全部配對。':'Do not hold for over 10 seconds: this clears all pairings.',
'放開 SET，LED 有亮起嗎？':'Release SET. Is the LED on?','LED 亮起':'LED is on','沒亮／沒看清楚':'Not on / unclear','等待逾時':'Wait for timeout','按遙控器的一個單鍵':'Press one button on the remote',
'不要按遙控器；閃 3 次後退出。':'Do not press the remote. Learning exits after 3 flashes.','LED 熄滅即成功，請放開遙控器。':'When the LED goes off, learning succeeded. Release the remote button.',
'LED 已熄滅':'LED went off','閃 3 次，逾時退出':'3 flashes — timed out','其他情況／中途斷電':'Other result / power interrupted',
'晶片從 LED 亮起起算 10 秒，可能比網頁更早逾時。':'The chip’s 10-second window starts when its LED turns on and may expire before this timer.',
'本輪未確認成功':'Success not confirmed','逾時會推進學習位置，請從第一格重新對齊。':'Timeout advances the learning position. Restart from the first slot.','請等學習退出後再試。':'Wait for learning to exit, then try again.',
'先前已學資料保留；重做仍占容量。':'Previously learned entries are retained. Retrying uses more capacity.','確認遙控器電池、頻率與編碼。':'Check the remote’s battery, frequency, and encoding.',
'已退出，從第一格重做':'Learning exited — restart at slot 1','已退出，重新配對':'Learning exited — retry pairing','無法確認是否退出':'Unsure whether learning has exited',
'清除所有遙控器配對？':'Clear all remote pairings?','所有遙控器需重新配對。模式設定保留。':'All remotes will need pairing again. Mode settings are retained.','確定清除全部配對':'Confirm: clear all pairings',
'按住 SET 超過 10 秒':'Hold SET for over 10 seconds','使用 11 秒倒數。':'An 11-second timer is used.','已按超過 10 秒並放開':'Held for over 10 seconds and released',
'放開 SET，有快閃 5 次嗎？':'Release SET. Did the LED flash quickly 5 times?','快閃 5 次，已清除':'5 quick flashes — cleared','其他燈號／沒看清楚':'Other LED pattern / unclear',
'任意鍵模式供學習使用。':'Arbitrary-button mode is for learning.','學完需返回一般工作模式。':'Return to normal mode after learning.','逐鍵確認輸出或產品動作。':'Check the output or product action for each button.',
'正常斷電重開，再確認配對保留。':'Power off and restart normally, then check that pairings are retained.','按住有輸出，放開停止。':'The output is on while held and off when released.',
'同鍵按一次開，再按一次關。':'Press the same button once for on, again for off.','按另一鍵，切換保持的輸出。':'Press another button to switch which output stays on.',
'已進入學習模式':'Learning mode is ready','確認實際動作':'Check the hardware behavior','已確認':'Confirmed','已實測，符合需求':'Tested — works as expected','稍後測試':'Test later','動作不符合':'Behavior does not match',
'配對已清除':'Pairings cleared','已完成':'Completed','設定完成，待實測':'Setup complete — hardware test pending','學完後，需返回一般工作模式。':'Return to normal mode after learning.',
'新的操作':'New operation','再配對一支遙控器':'Pair another remote','一支遙控器':'One remote',
'重新從第一格學習；先前已學資料未撤銷。':'Restarting at the first slot. Previously learned entries are retained.',
'結果未確認，從斷電重做。':'Result unconfirmed. Power off and try again.','計時不同步，該模式重新標為未知。':'Timer out of sync. This mode is marked unknown again.',
'燈號不明，重新切換一次。':'LED pattern unclear. Repeat the mode switch.','燈號不明；該模式標為未知。':'LED pattern unclear. This mode is marked unknown.',
'正常斷電重開，任意鍵學習順序回到第一格。':'Normal power cycle completed. Arbitrary-button learning starts at the first slot.',
'計時到，請回報實際 LED。':'Timer finished. Report the actual LED result.','回報 LED 熄滅，一次配對成功。':'LED off reported. One pairing succeeded.',
'本次未完成目標按鍵學習。':'The target button was not learned this time.','沒有確認學習結果，請勿直接假設成功。':'Learning has not been confirmed. Do not assume success.',
'學習逾時，未建立本輪配對。':'Learning timed out. No pairing was added this time.','學習狀態不明，需重新確認。':'Learning state unclear. Check again.',
'可先放開所有按鍵，不發射訊號，等待學習窗口結束；如仍不確定，正常斷電重開，再從第一格開始。若曾在已上電時長按 SET 超過 10 秒，請先確認是否快閃 5 次、資料是否已清除。':'Release all buttons and stop transmitting. Wait for the learning window to close. If still unsure, power off and restart normally, then begin at the first slot. If SET was held for over 10 seconds after power-on, check for 5 quick flashes and whether pairings were cleared.',
'放開所有按鍵、不發射訊號，等約 10 秒後再試。也可在不按 SET 的狀態正常斷電重開，再做配對。':'Release all buttons and stop transmitting. Wait about 10 seconds before retrying. You can also power off and restart without pressing SET, then pair again.',
'回報快速閃 5 次，已清除全部遙控器配對；模式保留。':'5 quick flashes reported. All remote pairings cleared; modes retained.',
'清除尚未確認，重新操作。':'Clearing is unconfirmed. Try again.','清除結果不明，尚未判定清除完成。':'Clearing result unclear. Completion has not been confirmed.',
'使用者已確認實際行為／學習準備狀態。':'Hardware behavior / learning readiness confirmed by the user.','使用者完成設定步驟，尚未實測。':'Setup steps completed by the user. Hardware test pending.',
'確認按鍵對應與有效接收。LED-VT 不代表輸出保持；仍有差異時，重新設定並選擇目前模式未知。':'Check button mapping and reception. LED-VT does not show whether an output stays on. If behavior still differs, start over with current modes set to unknown.',
'沿用同一塊板子已確認的模式，配對另一支遙控器。':'Pairing another remote using the confirmed modes of the same board.',
// Fragments separated by protected user-entered labels.
'學習「':'Learn button “','」鍵。':'”.','按「':'Press button “','」鍵':'”',
'：回報閃 3 次，逾時略過。':': 3 flashes reported; slot skipped after timeout.',
' 鍵學習成功（回報 LED 熄滅）。':' learned successfully (LED off reported).',
'：':': ', '、':', '
};
const fragments = Object.keys(english).sort((a,b)=>b.length-a.length);
const fragmentPattern = new RegExp(fragments.map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
export function toEnglish(text) {
 const trimmed=text.trim();
 if(Object.hasOwn(english,trimmed))return text.replace(trimmed,english[trimmed]);
 const patterns = [
  [/^第 (\d+) 個學習位置$/,(_,n)=>`Learning slot ${n}`],
  [/^(.*) 的遙控器按鍵$/,(_,slot)=>`Remote button for ${toEnglish(slot)}`],
  [/^上電後維持 (\d+) 秒，再放開 SET。$/,(_,n)=>`Hold for ${n} seconds after power-on, then release SET.`],
  [/^已自行計時 (\d+) 秒並放開$/,(_,n)=>`Timed ${n} seconds myself and released`],
  [/^開始 (RFE\w+) 操作。$/,(_,chip)=>`Started ${chip} setup.`],
  [/^(按鍵|輸出)切換後閃 (\d) 次 → (.+)，(符合目標|繼續切換)。$/,(_,axis,n,mode,result)=>`${axis==='按鍵'?'Button':'Output'} mode: ${n} flash${n==='1'?'':'es'} → ${toEnglish(mode)}. ${result==='符合目標'?'Matches target.':'Switch again.'}`],
  [/^目前為(.+)，需再切換一次。$/,(_,mode)=>`Current mode: ${toEnglish(mode)}. Switch again.`],
  [/^閃 (\d+) 次$/,(_,n)=>`${n} flash${n==='1'?'':'es'}`]
 ];
 for(const [pattern,replace] of patterns)if(pattern.test(trimmed))return text.replace(trimmed,trimmed.replace(pattern,replace));
 return text.replace(/第 (\d+)–(\d+) 頁/g,'pp. $1–$2').replace(/規格書/g,'Datasheet').replace(fragmentPattern,s=>english[s]);
}
const languageStorageKey='rfe-remote-guide.language';
// A manual choice wins. Otherwise follow the browser's primary language.
export function resolveLanguage(saved,preferred=[]) {
 if(saved==='zh-Hant'||saved==='en')return saved;
 const primary=preferred.find(value=>typeof value==='string'&&value.trim());
 if(!primary)return 'zh-Hant';
 return /^zh(?:[-_]|$)/i.test(primary.trim())?'zh-Hant':'en';
}
let language='zh-Hant';
// Omit trailing full stops in Chinese UI copy; retain sentence breaks in longer notes.
export const translate=text=>language==='en'?toEnglish(text):text.replace(/。(?=\s*$)/u,'');
export function initLanguage(root=document.documentElement) {
 let saved=null;
 try{saved=globalThis.localStorage?.getItem(languageStorageKey);}catch{/* Storage may be blocked. */}
 const browser=globalThis.navigator;
 const preferred=browser?.languages?.length?Array.from(browser.languages):[browser?.language];
 language=resolveLanguage(saved,preferred);
 root.lang=language;
 const originals=new WeakMap();
 const blocked=element=>element?.closest('script,style,[translate="no"]');
 function localize(node,key,read,write){
  let fields=originals.get(node);if(!fields){fields={};originals.set(node,fields);}
  const current=read(),previous=fields[key];
  const source=previous&&current===previous.output?previous.source:current;
  const output=translate(source);fields[key]={source,output};
  if(current!==output)write(output);
 }
 function visit(node){
  if(node.nodeType===3){if(!blocked(node.parentElement))localize(node,'text',()=>node.data,v=>{node.data=v;});return;}
  if(node.nodeType!==1||blocked(node))return;
  for(const key of ['aria-label','title','placeholder'])if(node.hasAttribute(key))localize(node,key,()=>node.getAttribute(key),v=>node.setAttribute(key,v));
  if(node.matches('meta[name="description"]'))localize(node,'content',()=>node.content,v=>{node.content=v;});
  for(const child of node.childNodes)visit(child);
 }
 const observer=new MutationObserver(records=>{
  observer.disconnect();
  for(const record of records){
   if(record.type==='childList')for(const node of record.addedNodes)visit(node);
   else visit(record.target);
  }
  observe();
 });
 function observe(){observer.observe(root,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','content']});}
 const selector=document.getElementById('language');
 selector.value=language;
 selector.addEventListener('change',()=>{
  observer.disconnect();language=selector.value==='en'?'en':'zh-Hant';
  try{globalThis.localStorage?.setItem(languageStorageKey,language);}catch{/* Switching still works without storage. */}
  root.lang=language;visit(root);observe();
 });
 visit(root);observe();
}
