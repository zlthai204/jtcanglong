/* ShipArea Pro v17 - clean frontend logic
   Rules:
   1) Never create a commune or route from pasted text.
   2) Paste is always analyzed inside the selected commune.
   3) Route matching only uses existing AREAS/sa_routes data.
   4) Shipper candidates come only from the selected commune.
   5) If setup runner is OFF, a pasted active shipper from the same commune can replace it.
   6) If no safe replacement exists, mark NEEDS_SELECTION; never guess.
*/

const DEFAULT_AREAS = {
  "Thị trấn Càng Long":["Khóm 1","Khóm 2","Khóm 3","Khóm 4","Khóm 5","Khóm 6","Khóm 7","Khóm 8","Khóm 9","Khóm 10"],
  "Tân An":["Ấp Tân An Chợ","Ấp Tân Tiến","Ấp Tân Trung","Ấp Trà Ốp","Ấp Đại An","Ấp Cả Chương","Ấp Nhà Thờ","Ấp Long Hội"],
  "An Trường":["Ấp 3","Ấp 3A","Ấp 4","Ấp 4A","Ấp 5","Ấp 5A","Ấp 6","Ấp 6A","Ấp 7","Ấp 7A","Ấp 8","Ấp 8A"],
  "An Trường A":["Ấp Lo Co A","Ấp Lo Co B","Ấp Trung Thiên","Ấp 9","Ấp 9A","Ấp 9B","Ấp 9C"],
  "Đức Mỹ":["Ấp Mỹ Hiệp","Ấp Đức Mỹ","Ấp Đức Mỹ A","Ấp Long Sơn","Ấp Đức Hiệp","Ấp Nhuận Thành","Ấp Đại Đức","Ấp Thạnh Hiệp"],
  "Bình Phú":["Ấp Nguyệt Lãng A","Ấp Nguyệt Lãng B","Ấp Nguyệt Lãng C","Ấp Cây Cách","Ấp Phú Đức","Ấp Long Trị","Ấp Phú Hưng 1","Ấp Phú Hưng 2","Ấp Phú Phong","Ấp Phú Phong 3"],
  "Tân Bình":["Ấp An Định Giồng","Ấp An Định Cầu","Ấp Trà Ốp","Ấp Ninh Bình","Ấp Thanh Bình","Ấp Ngã Hậu","Ấp Tân Định","Ấp An Chánh","Ấp An Bình","Ấp An Thạnh"],
  "Phương Thạnh":["Ấp Phú Thạnh","Ấp Phú Hòa","Ấp Nguyệt Trường","Ấp Hưng Nhượng A","Ấp Hưng Nhượng B","Ấp Chợ","Ấp Sóc Vinh","Ấp Giồng Chùa","Ấp Đầu Giồng","Ấp Thiện Chánh"],
  "Mỹ Cẩm":["Ấp Số 1","Ấp Số 7","Ấp Số 2","Ấp Số 3","Ấp Số 4","Ấp Số 5","Ấp Số 6","Ấp Số 8"],
  "Huyền Hội":["Ấp Giồng Mới","Ấp Sóc","Ấp Giồng Bèn","Ấp Lưu Tư","Ấp Trà On","Ấp Kinh B","Ấp Cầu Xây","Ấp Kinh A","Ấp Bình Hội"],
  "Nhị Long":["Ấp Long An","Ấp Rạch Rô 1","Ấp Rạch Rô 2","Ấp Rạch Mát","Ấp Rạch Đập","Ấp Dừa Đỏ 1","Ấp Đon","Ấp Cầu Đúc"],
  "Nhị Long Phú":["Ấp Gò Cà","Ấp Hiệp Phú","Ấp Thạnh Hiệp","Ấp Sơn Trắng","Ấp Dừa Đỏ 2","Ấp Dừa Đỏ 3"],
  "Đại Phước":["Ấp Nhị Hòa","Ấp Rạch Dừa","Ấp Rạch Sen","Ấp Thượng","Ấp Tân Trung","Ấp Trung","Ấp Hạ","Ấp Trại Luận","Ấp Trà Gật","Ấp Trà Gút","Ấp Long Hòa"],
  "Đại Phúc":["Ấp Tân Định","Ấp Đại An","Ấp Đại Đức","Ấp Phú Bình"]
};

let AREAS = JSON.parse(localStorage.getItem('SA_AREAS') || 'null') || structuredClone(DEFAULT_AREAS);
let shippers = JSON.parse(localStorage.getItem('SA_SHIPPERS') || 'null') || [];
let schedules = JSON.parse(localStorage.getItem('SA_SCHEDULES') || '{}');
let pasteLog = JSON.parse(localStorage.getItem('SA_PASTE_LOG') || '{}');
let setupRecords = JSON.parse(localStorage.getItem('SA_SETUP_RECORDS') || '{}');
let selected = new Date();
let parsedSchedule = null;
let openCommunes = new Set();
let detailCommune = '';

const norm = s => String(s ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const key = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const fmt = d => d.toLocaleDateString('vi-VN',{weekday:'long',day:'2-digit',month:'2-digit',year:'numeric'});
const person = id => shippers.find(s => String(s.id) === String(id));
const activeShippers = area => shippers.filter(s => s.area === area && s.status !== 'inactive');
const todayOff = () => schedules[key(selected)] || [];

function persist(){
  const payload={shippers,schedules,areas:AREAS,pasteLog,setupRecords};
  localStorage.setItem('SA_SHIPPERS',JSON.stringify(shippers));
  localStorage.setItem('SA_SCHEDULES',JSON.stringify(schedules));
  localStorage.setItem('SA_AREAS',JSON.stringify(AREAS));
  localStorage.setItem('SA_PASTE_LOG',JSON.stringify(pasteLog));
  localStorage.setItem('SA_SETUP_RECORDS',JSON.stringify(setupRecords));
  window.shipAreaCloudSave?.(payload);
}
window.shipAreaGetPayload=()=>({shippers,schedules,areas:AREAS,pasteLog,setupRecords});
window.shipAreaApplyCloud=p=>{if(p?.shippers)shippers=p.shippers;if(p?.schedules)schedules=p.schedules;if(p?.areas)AREAS=p.areas;if(p?.pasteLog)pasteLog=p.pasteLog;if(p?.setupRecords)setupRecords=p.setupRecords;localStorage.setItem('SA_SHIPPERS',JSON.stringify(shippers));localStorage.setItem('SA_SCHEDULES',JSON.stringify(schedules));localStorage.setItem('SA_AREAS',JSON.stringify(AREAS));localStorage.setItem('SA_PASTE_LOG',JSON.stringify(pasteLog));localStorage.setItem('SA_SETUP_RECORDS',JSON.stringify(setupRecords));renderAll();};

function setupDate(){
  const y=new Date().getFullYear();
  day.innerHTML=Array.from({length:31},(_,i)=>`<option value="${i+1}">Ngày ${i+1}</option>`).join('');
  month.innerHTML=Array.from({length:12},(_,i)=>`<option value="${i}">Tháng ${i+1}</option>`).join('');
  year.innerHTML=Array.from({length:7},(_,i)=>`<option value="${y-2+i}">${y-2+i}</option>`).join('');
  syncDate();
}
function syncDate(){day.value=selected.getDate();month.value=selected.getMonth();year.value=selected.getFullYear();document.getElementById('offDate').textContent=fmt(selected);document.getElementById('dateInfo').textContent=fmt(selected);}
function dateChanged(){const y=+year.value,m=+month.value,d=Math.min(+day.value,new Date(y,m+1,0).getDate());selected=new Date(y,m,d);syncDate();renderAll();}
function today(){selected=new Date();syncDate();renderAll();}

function getConsecutiveOffDays(id){
  let d=new Date(),count=0;
  for(let i=0;i<1000;i++){
    const list=schedules[key(d)]||[];
    if(!list.some(x=>String(x.offId)===String(id))) break;
    count++;d.setDate(d.getDate()-1);
  }
  return count;
}
function autoRetire(){
  let changed=false;
  shippers.forEach(s=>{
    if(s.status==='inactive')return;
    const n=getConsecutiveOffDays(s.id);
    if(n>14){s.status='inactive';s.inactiveReason=`OFF liên tục ${n} ngày`;s.inactiveAt=key(new Date());changed=true;}
  });
  if(changed)persist();
}

function routeList(area){return Array.isArray(AREAS[area])?AREAS[area]:[];}
function fixedRunners(area,route){
  const n=norm(route);
  return shippers.filter(s=>s.area===area && s.status!=='inactive' && (s.routes||[]).some(r=>norm(r)===n));
}
function findExactRoute(area,text){
  const n=norm(text); if(!n)return null;
  const rs=routeList(area);
  return rs.find(r=>norm(r)===n)||rs.find(r=>n.includes(norm(r)))||rs.find(r=>norm(r).includes(n))||null;
}
function findRoutesFromText(area,text){
  const n=norm(text); if(!n)return [];
  const rs=routeList(area).slice().sort((a,b)=>norm(b).length-norm(a).length);
  return rs.filter(r=>n.includes(norm(r)));
}
function findShipperByName(text,area){
  const n=norm(text); if(!n)return null;
  const list=activeShippers(area).slice().sort((a,b)=>b.name.length-a.name.length);
  return list.find(s=>n.includes(norm(s.name))) || list.find(s=>norm(s.name)===n) || null;
}
function namesFromLine(line,area){
  const list=activeShippers(area).slice().sort((a,b)=>b.name.length-a.name.length);
  return list.filter(s=>norm(line).includes(norm(s.name)));
}

function effectiveRunner(area,route,date=selected){
  const off=(schedules[key(date)]||[]);
  const offIds=new Set(off.map(x=>String(x.offId)));
  const setup=setupRecords[key(date)]?.[area]?.entries||[];
  const se=setup.find(e=>(e.routes||[]).some(r=>norm(r)===norm(route)));
  if(se){
    const s=person(se.shipperId);
    if(s && s.status!=='inactive' && !offIds.has(String(s.id))) return {shipper:s,source:'setup'};
    const replacement=findPastedReplacement(area,route,date,se.shipperId);
    if(replacement) return {shipper:replacement,source:'paste-replacement'};
    return null;
  }
  const fixed=fixedRunners(area,route).filter(s=>!offIds.has(String(s.id)));
  if(fixed.length===1)return {shipper:fixed[0],source:'shipper-list'};
  if(fixed.length>1)return {shipper:fixed[0],source:'shipper-list'};
  return null;
}
function findPastedReplacement(area,route,date,offId){
  const rec=setupRecords[key(date)]?.[area];
  if(!rec)return null;
  const offSet=new Set((schedules[key(date)]||[]).map(x=>String(x.offId)));
  const entries=rec.entries||[];
  const direct=entries.find(e=>e.shipperId && String(e.shipperId)!==String(offId) && e.routes?.some(r=>norm(r)===norm(route)));
  if(direct){const s=person(direct.shipperId);if(s&&s.status!=='inactive'&&!offSet.has(String(s.id)))return s;}
  return null;
}

// Tìm người thay theo TOÀN BỘ nội dung lịch đã dán.
// Nếu người A OFF tuyến X, nhưng trong lịch dán người B xuất hiện và B có setup/đang phụ trách X,
// hệ thống ưu tiên B cho X. Không tự chọn người ngoài xã.
function findGlobalPastedReplacement(area,route,date,offId,text){
  const offSet=new Set((schedules[key(date)]||[]).map(x=>String(x.offId)));
  const candidates=namesFromLine(text,area).filter(s=>String(s.id)!==String(offId)&&!offSet.has(String(s.id))&&s.status!=='inactive');
  const routeN=norm(route);
  const direct=candidates.find(s=>(s.routes||[]).some(r=>norm(r)===routeN));
  return direct||null;
}

function renderAll(){autoRetire();renderHome();renderOffPage();renderShippers();renderStats();renderRouteChecks();renderAreas();populatePasteAreas();renderPasteStatus();}

function renderHome(){
  const q=norm(document.getElementById('globalSearch')?.value||'');
  const off=todayOff();
  s1.textContent=shippers.filter(s=>s.status==='work').length;
  s2.textContent=Object.keys(AREAS).length;
  s3.textContent=Object.values(AREAS).reduce((a,b)=>a+b.length,0);
  s4.textContent=off.length;
  s5.textContent=off.filter(x=>x.replaceId).length;
  const warning=[];
  Object.entries(AREAS).forEach(([area,routes])=>routes.forEach(route=>{const r=effectiveRunner(area,route);if(!r)warning.push({area,route});}));
  const wb=document.getElementById('coverageWarnings');
  wb.innerHTML=warning.length?`<div class="warningBanner"><div class="warningIcon">⚠️</div><div><b>${warning.length} ấp chưa xác định người chạy</b><small>Chỉ cảnh báo những ấp đã có dữ liệu shipper/setup hoặc đã xuất hiện trong lịch.</small><div class="warningList">${warning.slice(0,30).map(x=>`<span class="warningChip">${esc(x.area)} · ${esc(x.route)}</span>`).join('')}</div></div></div>`:'';
  const wrap=document.getElementById('communes');
  const entries=Object.entries(AREAS).filter(([area,routes])=>{
    if(!q)return true;
    return norm(area).includes(q)||routes.some(r=>norm(r).includes(q)||fixedRunners(area,r).some(s=>norm(s.name).includes(q)));
  });
  wrap.innerHTML=entries.map(([area,routes])=>communeCard(area,routes,q)).join('')||`<div class="empty">Không tìm thấy xã / ấp / shipper.</div>`;
  renderSearchResult(q);
}
function communeCard(area,routes,q){
  const offIds=new Set(todayOff().map(x=>String(x.offId)));
  const total=routes.length;
  const covered=routes.filter(r=>effectiveRunner(area,r)).length;
  const missing=total-covered;
  const running=new Set(routes.map(r=>effectiveRunner(area,r)?.shipper?.id).filter(Boolean));
  const open=openCommunes.has(area);
  const filtered=q?routes.filter(r=>norm(r).includes(q)||fixedRunners(area,r).some(s=>norm(s.name).includes(q))):routes;
  const shown=open?filtered:filtered.slice(0,4);
  return `<article class="communeCard ${missing?'hasMissing':''}" data-commune="${esc(area)}">
    <button class="communeHeader" type="button" onclick="toggleCommune(${JSON.stringify(area)})">
      <div class="communeTitle"><span class="communeIcon">🏘️</span><span><b>${esc(area)}</b><small>${total} ấp · ${running.size} shipper đang phụ trách</small></span></div>
      <div class="communeMeta"><span class="coverage ${missing?'warn':'ok'}">${missing?`⚠️ ${missing} thiếu`:`✓ ${covered}/${total}`}</span><span class="chevron ${open?'open':''}">⌄</span></div>
    </button>
    <div class="communeBody">
      ${shown.map(route=>routeRow(area,route,offIds)).join('')}
      ${filtered.length>shown.length?`<button class="showMore" onclick="toggleCommune(${JSON.stringify(area)})">Xem ${filtered.length-shown.length} ấp còn lại ↓</button>`:''}
      ${open?`<div class="communeActions"><button class="btn light" onclick="openAreaDetail(${JSON.stringify(area)})">⚙️ Xem & sửa xã này</button><button class="btn light" onclick="openAreaShippers(${JSON.stringify(area)})">👤 ${activeShippers(area).length} shipper</button></div>`:''}
    </div>
  </article>`;
}
function routeRow(area,route,offIds){
  const eff=effectiveRunner(area,route);
  const fixed=shippers.filter(s=>s.area===area&&(s.routes||[]).some(r=>norm(r)===norm(route)));
  const offFixed=fixed.find(s=>offIds.has(String(s.id)));
  if(eff)return `<div class="routeItem"><span class="routeDot">📍</span><div class="routeMain"><b>${esc(route)}</b><small>🚚 <strong>${esc(eff.shipper.name)}</strong> <em>${eff.source==='paste-replacement'?'· thay từ lịch dán':''}</em></small></div><span class="statusPill good">Đang chạy</span></div>`;
  if(offFixed)return `<div class="routeItem missing"><span class="routeDot">📍</span><div class="routeMain"><b>${esc(route)}</b><small>🔴 <strong>${esc(offFixed.name)}</strong> đang OFF</small></div><span class="statusPill danger">Cần thay</span></div>`;
  return `<div class="routeItem missing"><span class="routeDot">📍</span><div class="routeMain"><b>${esc(route)}</b><small>⚠️ Chưa xác định người chạy</small></div><span class="statusPill warn">Chọn người</span></div>`;
}
function renderSearchResult(q){const box=document.getElementById('searchResult');if(!q){box.innerHTML='<div class="searchHint">💡 Tìm nhanh tên xã, ấp hoặc shipper.</div>';return;}const hits=[];Object.entries(AREAS).forEach(([a,rs])=>rs.forEach(r=>{const p=fixedRunners(a,r).filter(s=>norm(s.name).includes(q));if(norm(a).includes(q)||norm(r).includes(q)||p.length)hits.push({a,r,p});}));box.innerHTML=hits.slice(0,12).map(h=>`<div class="searchHit"><b>${esc(h.a)}</b><span>📍 ${esc(h.r)}</span>${h.p.map(s=>`<span>🚚 ${esc(s.name)}</span>`).join('')}</div>`).join('')||'<div class="searchHint">Không tìm thấy.</div>';}
function toggleCommune(area){if(openCommunes.has(area))openCommunes.delete(area);else openCommunes.add(area);renderHome();}
function toggleAll(){if(openCommunes.size===Object.keys(AREAS).length)openCommunes.clear();else openCommunes=new Set(Object.keys(AREAS));renderHome();}
function clearSearch(){globalSearch.value='';renderHome();}

function renderShippers(){
  const q=norm(document.getElementById('shipperSearch')?.value||'');
  const groups={};Object.keys(AREAS).forEach(a=>groups[a]=[]);
  shippers.filter(s=>s.status!=='inactive').forEach(s=>{if(groups[s.area])groups[s.area].push(s);});
  const html=Object.entries(groups).filter(([a,list])=>!q||norm(a).includes(q)||list.some(s=>norm(s.name).includes(q)||norm(s.phone).includes(q)||s.routes.some(r=>norm(r).includes(q)))).map(([area,list])=>`<div class="shipperGroup"><button class="shipperGroupHead" onclick="openAreaShippers(${JSON.stringify(area)})"><div><span>🏘️</span><b>${esc(area)}</b><small>${list.length} shipper</small></div><span>›</span></button><div class="shipperMini">${list.slice(0,4).map(s=>`<span class="miniPerson"><i>${esc((s.name||'?').trim().charAt(0))}</i>${esc(s.name)}</span>`).join('')}${list.length>4?`<span class="moreMini">+${list.length-4}</span>`:''}</div></div>`).join('');
  document.getElementById('shipperList').innerHTML=html||'<div class="empty">Chưa có shipper phù hợp.</div>';
}
function openAreaShippers(area){
  detailCommune=area;
  document.getElementById('areaDetailTitle').textContent=`Shipper · ${area}`;
  document.getElementById('areaDetailSub').textContent=`${activeShippers(area).length} shipper đang hoạt động · ${routeList(area).length} ấp`;
  renderAreaShippersDetail();
  document.getElementById('areaDetailModal').classList.add('show');
}
function renderAreaShippersDetail(){
  const area=detailCommune,q=norm(document.getElementById('areaDetailSearch')?.value||'');
  const list=shippers.filter(s=>s.area===area&&s.status!=='inactive'&&(!q||norm(s.name).includes(q)||s.routes.some(r=>norm(r).includes(q))));
  document.getElementById('areaDetailRows').innerHTML=list.map(s=>`<div class="personRow"><div class="avatar">${esc(s.name.charAt(0))}</div><div class="grow"><b>${esc(s.name)}</b><small>${s.routes.length? s.routes.map(esc).join(' · '):'Chưa gán ấp'}</small></div><span class="statusPill good">Đang chạy</span><button class="iconBtn" onclick="openShipper(${JSON.stringify(s.id)})">✏️</button></div>`).join('')||'<div class="empty">Không có shipper.</div>';
}

function openShipper(id=''){
  sid.value=id||'';shipperModalTitle.textContent=id?'Sửa shipper':'Thêm shipper';
  const s=id?person(id):null;
  sname.value=s?.name||'';sphone.value=s?.phone||'';sstatus.value=s?.status==='inactive'?'inactive':'work';
  sarea.innerHTML=Object.keys(AREAS).map(a=>`<option value="${esc(a)}">${esc(a)}</option>`).join('');sarea.value=s?.area||Object.keys(AREAS)[0]||'';renderRouteChecks();shipperModal.classList.add('show');
}
function renderRouteChecks(){const area=sarea.value||'';const s=person(sid.value);const selectedRoutes=new Set(s?.routes||[]);routeChecks.innerHTML=routeList(area).map(r=>`<label class="check"><input type="checkbox" value="${esc(r)}" ${selectedRoutes.has(r)?'checked':''}> ${esc(r)}</label>`).join('')||'<div class="empty">Xã này chưa có ấp.</div>';}
function saveShipper(){
  const name=sname.value.trim(),area=sarea.value;if(!name||!area)return alert('Vui lòng nhập tên và chọn xã.');
  const routes=[...document.querySelectorAll('#routeChecks input:checked')].map(x=>x.value);
  let s=person(sid.value);if(s){s.name=name;s.phone=sphone.value.trim();s.status=sstatus.value;s.area=area;s.routes=routes;s.inactiveAt=s.status==='work'?'':s.inactiveAt;s.inactiveReason=s.status==='work'?'':s.inactiveReason;}else{shippers.push({id:crypto.randomUUID?crypto.randomUUID():'S'+Date.now(),name,phone:sphone.value.trim(),status:sstatus.value,area,routes,inactiveReason:'',inactiveAt:''});}
  persist();closeM('shipperModal');renderAll();
}
function deleteShipper(id){if(!confirm('Xóa shipper này khỏi danh sách?'))return;shippers=shippers.filter(s=>String(s.id)!==String(id));persist();renderAll();}

function populatePasteAreas(){const el=document.getElementById('pasteArea');if(!el)return;const cur=el.value;el.innerHTML='<option value="">— Chọn xã để dán lịch —</option>'+Object.keys(AREAS).sort((a,b)=>a.localeCompare(b,'vi')).map(a=>`<option value="${esc(a)}">${esc(a)}</option>`).join('');if(cur&&AREAS[cur])el.value=cur;}
function getPasteDate(){const d=+(pasteDay.value||selected.getDate());const [m,y]=String(pasteMonthYear.value||'').split('/').map(Number);return new Date(y||selected.getFullYear(),(m||selected.getMonth()+1)-1,d);}
function setPasteTomorrow(){const d=new Date(selected);d.setDate(d.getDate()+1);pasteDay.value=d.getDate();pasteMonthYear.value=`${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;renderPasteStatus();}
function setupPasteDate(){setPasteTomorrow();populatePasteAreas();renderPasteStatus();}
function onPasteAreaChange(){parsedSchedule=null;pastePreview.innerHTML='<div class="empty">Đã chọn xã. Dán lịch rồi bấm Phân tích.</div>';parseMessage.textContent='';renderPasteStatus();}
function pasteKey(d){return key(d);}
function renderPasteStatus(){
  const d=getPasteDate(),k=key(d),done=new Set(pasteLog[k]||[]),areas=Object.keys(AREAS),yes=areas.filter(a=>done.has(a)),no=areas.filter(a=>!done.has(a));
  pasteStatusDate.textContent=`Lịch ngày ${fmt(d)}`;pasteCountBadge.textContent=`${yes.length} / ${areas.length} xã đã dán`;
  pasteProgress.innerHTML=`<div class="progressLine"><b>📅 ${fmt(d)}</b><span>${yes.length} đã dán · ${no.length} chưa dán</span></div><div class="progress"><i style="width:${areas.length?yes.length/areas.length*100:0}%"></i></div>`;
  const doneHtml=yes.map(a=>`<button class="pasteAreaItem done" onclick="openSetupDetail(${JSON.stringify(a)},${JSON.stringify(k)})"><span><b>${esc(a)}</b><small>${setupRecords[k]?.[a]?.entries?.length||0} dòng · xem/sửa</small></span><em>✓</em></button>`).join('');
  const noHtml=no.map(a=>`<div class="pasteAreaItem"><span><b>${esc(a)}</b><small>Chưa dán ngày này</small></span><em>○</em></div>`).join('');
  pasteAreaStatus.innerHTML=`<div class="pasteColumns"><div><div class="pasteColHead done">✓ Đã dán <b>${yes.length}</b></div>${doneHtml||'<div class="empty">Chưa có xã nào.</div>'}</div><div><div class="pasteColHead todo">○ Chưa dán <b>${no.length}</b></div>${noHtml||'<div class="empty">Đã đủ tất cả xã.</div>'}</div></div>`;
}

function parsePaste(){
  const text=pasteText.value.trim(),area=pasteArea.value,d=getPasteDate();
  if(!area){alert('Hãy chọn xã trước khi phân tích.');return;}
  if(!text){alert('Hãy dán lịch cần phân tích.');return;}
  const routes=routeList(area),lines=text.split(/\r?\n/).map(x=>x.trim()).filter(Boolean),offIds=new Set((schedules[key(d)]||[]).map(x=>String(x.offId)));
  const rows=[];const unresolved=[];const seen=new Set();
  lines.forEach(line=>{
    const matched=findRoutesFromText(area,line);
    const linePeople=namesFromLine(line,area);
    if(matched.length){
      matched.forEach(route=>{
        if(seen.has(norm(route)))return;seen.add(norm(route));
        let ship=linePeople.find(s=>!offIds.has(String(s.id)))||null;
        let source=ship?'pasted-shipper':'';
        if(!ship){
          const fixed=fixedRunners(area,route).find(s=>!offIds.has(String(s.id)));ship=fixed||null;source=ship?'shipper-list':'';
        }
        const offFixed=fixedRunners(area,route).find(s=>offIds.has(String(s.id)));
        if(!ship && offFixed){
          const replacement=findGlobalPastedReplacement(area,route,d,offFixed.id,text);
          if(replacement){ ship=replacement; source='off-replacement-from-paste'; }
          else { unresolved.push({route,reason:`${offFixed.name} đang OFF`}); rows.push({route,shipper:null,offFixed,source:'off'}); return; }
        }
        if(ship) rows.push({route,shipper:ship,source});
        else { unresolved.push({route,reason:'Chưa có shipper phù hợp'}); rows.push({route,shipper:null,source:'missing'}); }
      });
    }
  });
  parsedSchedule={date:key(d),area,raw:text,rows,unresolved};
  pastePreview.innerHTML=rows.length?rows.map(r=>`<div class="previewRow ${r.shipper?'ok':'need'}"><div><b>📍 ${esc(r.route)}</b><small>${r.shipper?`🚚 <strong>${esc(r.shipper.name)}</strong> · ${r.source==='pasted-shipper'?'lấy trực tiếp từ lịch dán':'đối chiếu danh sách shipper'}`:r.offFixed?`🔴 ${esc(r.offFixed.name)} OFF · cần người thay`:'⚠️ Chưa tìm thấy người chạy'}</small></div><span class="statusPill ${r.shipper?'good':'warn'}">${r.shipper?'Đã khớp':'Chọn người'}</span></div>`).join(''): '<div class="empty">Không tìm thấy ấp nào trong xã đã chọn. Không tạo dữ liệu mới.</div>';
  parseMessage.textContent=`Đã nhận ${rows.length} ấp. ${unresolved.length?`Còn ${unresolved.length} ấp cần chọn người.`:'Tất cả đã khớp.'}`;
}
function applyPaste(){
  if(!parsedSchedule){parsePaste();if(!parsedSchedule)return;}
  const p=parsedSchedule;if(p.unresolved.length){if(!confirm(`Còn ${p.unresolved.length} ấp chưa có người. Vẫn lưu các dòng đã khớp?`))return;}
  const k=p.date;setupRecords[k]??={};setupRecords[k][p.area]={area:p.area,date:k,raw:p.raw,updatedAt:new Date().toISOString(),entries:p.rows.filter(r=>r.shipper).map(r=>({name:r.shipper.name,shipperId:r.shipper.id,routes:[r.route],off:false,note:r.source}))};
  pasteLog[k]=[...new Set([...(pasteLog[k]||[]),p.area])];
  persist();renderAll();
  alert(`Đã lưu ${setupRecords[k][p.area].entries.length} ấp cho ${p.area} ngày ${k}.`);
}

function openSetupDetail(area,dateKey){detailCommune=area;const sub=document.getElementById('setupDetailSub');document.getElementById('setupDetailTitle').textContent=`${area} · Dữ liệu ngày ${dateKey}`;sub.textContent='Sửa/xóa tại đây chỉ thay đổi dữ liệu của đúng ngày này.';sub.dataset.date=dateKey;renderSetupDetail(dateKey);document.getElementById('setupDetailModal').classList.add('show');}
function renderSetupDetail(dateKey){
  const k=dateKey||key(selected),area=detailCommune,rec=setupRecords[k]?.[area],q=norm(document.getElementById('setupDetailSearch')?.value||'');
  const rows=rec?.entries||[];setupDetailSummary.innerHTML=`<span class="badge blue">${rows.length} dòng</span><span class="badge green">${rows.filter(x=>x.shipperId).length} đã gán</span>`;
  setupDetailRows.innerHTML=rows.filter(e=>!q||norm(e.name).includes(q)||e.routes.some(r=>norm(r).includes(q))).map((e,i)=>`<div class="setupEditRow"><div class="grow"><b>${esc(e.name)}</b><small>${e.routes.map(esc).join(' · ')}</small></div><select class="select compact" onchange="changeSetupRunner(${JSON.stringify(k)},${JSON.stringify(area)},${i},this.value)"><option value="">— chọn shipper —</option>${activeShippers(area).map(s=>`<option value="${esc(s.id)}" ${String(s.id)===String(e.shipperId)?'selected':''}>${esc(s.name)}</option>`).join('')}</select><button class="iconBtn danger" onclick="deleteSetupEntry(${JSON.stringify(k)},${JSON.stringify(area)},${i})">🗑️</button></div>`).join('')||'<div class="empty">Chưa có dữ liệu setup cho ngày này.</div>';
}

function deleteSetupForArea(){
  const k=document.getElementById('setupDetailSub')?.dataset?.date || Object.keys(setupRecords).find(x=>setupRecords[x]?.[detailCommune] && setupRecords[x][detailCommune]===setupRecords[key(selected)]?.[detailCommune]) || key(selected);
  if(!setupRecords[k]?.[detailCommune]) return;
  if(!confirm(`Xóa toàn bộ dữ liệu dán của ${detailCommune} ngày ${k}?`)) return;
  delete setupRecords[k][detailCommune];
  if(!Object.keys(setupRecords[k]).length) delete setupRecords[k];
  pasteLog[k]=(pasteLog[k]||[]).filter(a=>a!==detailCommune);
  if(!pasteLog[k]?.length) delete pasteLog[k];
  persist(); closeM('setupDetailModal'); renderAll();
}

function changeSetupRunner(k,area,index,id){const e=setupRecords[k]?.[area]?.entries?.[index];if(!e)return;e.shipperId=id;e.name=person(id)?.name||'';e.note='manual';persist();renderSetupDetail(k);renderAll();}
function deleteSetupEntry(k,area,index){if(!confirm('Xóa dòng ấp này khỏi setup của ngày đang chọn?'))return;setupRecords[k][area].entries.splice(index,1);persist();renderSetupDetail(k);renderAll();}
function openAreaDetail(area){openAreaShippers(area);}

function renderOffPage(){
  const q=norm(document.getElementById('offSearch')?.value||'');const list=todayOff();
  offPageBody.innerHTML=list.map(o=>{const s=person(o.offId),r=o.route||'';if(!s)return '';if(q&&!norm(s.name).includes(q)&&!norm(s.area).includes(q)&&!norm(r).includes(q))return '';const repl=person(o.replaceId);return `<tr><td><b>${esc(s.name)}</b></td><td>${esc(s.area||'')}</td><td>${esc(r)}</td><td>${repl?esc(repl.name):'—'}</td><td>${esc(o.note||'')}</td><td><button class="btn light" onclick="removeOff(${JSON.stringify(s.id)})">Xóa OFF</button></td></tr>`;}).join('')||'<tr><td colspan="6" style="text-align:center;color:#94a3b8">Không có OFF.</td></tr>';
  offBody.innerHTML=offPageBody.innerHTML;
}
function removeOff(id){schedules[key(selected)]=(schedules[key(selected)]||[]).filter(o=>String(o.offId)!==String(id));const s=person(id);if(s){s.status='work';s.inactiveAt='';s.inactiveReason='';}persist();renderAll();}

function renderStats(){
  const total=Object.values(AREAS).reduce((a,b)=>a+b.length,0),rows=[];let covered=0,missing=0;
  Object.entries(AREAS).forEach(([a,rs])=>{const c=rs.filter(r=>effectiveRunner(a,r)).length;covered+=c;missing+=rs.length-c;rows.push(`<div class="statsArea"><div><b>${esc(a)}</b><small>${c}/${rs.length} ấp có người</small></div><strong class="${c===rs.length?'okText':'warnText'}">${c===rs.length?'✓ Đủ':`⚠ ${rs.length-c}`}</strong></div>`);});
  statsDetail.innerHTML=`<div class="statSummary"><div><b>${total}</b><span>Tổng ấp</span></div><div><b>${covered}</b><span>Đã có người</span></div><div><b>${missing}</b><span>Chưa xác định</span></div><div><b>${todayOff().length}</b><span>OFF hôm nay</span></div></div>${rows.join('')}`;
}
function renderAreas(){areaSource.textContent='Danh mục hiện có — chỉnh sửa trực tiếp, không tự tạo từ dữ liệu dán.';areaEditor.innerHTML=Object.entries(AREAS).map(([area,rs])=>`<div class="areaEditorCard"><div class="areaEditorHead"><div><b>🏘️ ${esc(area)}</b><small>${rs.length} ấp</small></div><button class="btn danger" onclick="deleteArea(${JSON.stringify(area)})">Xóa xã</button></div><div class="routeEditor">${rs.map((r,i)=>`<div class="routeEdit"><span>📍</span><input class="input" value="${esc(r)}" onchange="renameRoute(${JSON.stringify(area)},${i},this.value)"><button class="iconBtn danger" onclick="deleteRoute(${JSON.stringify(area)},${i})">🗑️</button></div>`).join('')}</div></div>`).join('');}
function renameRoute(area,i,v){v=v.trim();if(!v||!AREAS[area]?.[i])return;const old=AREAS[area][i];AREAS[area][i]=v;shippers.forEach(s=>{if(s.area===area)s.routes=(s.routes||[]).map(r=>r===old?v:r);});persist();renderAll();}
function deleteRoute(area,i){if(!confirm('Xóa ấp này khỏi danh mục? Lịch cũ vẫn giữ snapshot.'))return;const old=AREAS[area].splice(i,1)[0];shippers.forEach(s=>{if(s.area===area)s.routes=(s.routes||[]).filter(r=>r!==old);});persist();renderAll();}
function addArea(){const name=prompt('Tên xã / đơn vị cũ:');if(!name||AREAS[name.trim()])return;AREAS[name.trim()]=[];persist();renderAll();}
function deleteArea(area){if(!confirm(`Xóa xã ${area} khỏi danh mục?`))return;delete AREAS[area];shippers.forEach(s=>{if(s.area===area){s.area='';s.routes=[];}});persist();renderAll();}
function renderRouteChecks(){if(document.getElementById('routeChecks')){const area=document.getElementById('sarea')?.value||'';const s=person(document.getElementById('sid')?.value);const set=new Set(s?.routes||[]);routeChecks.innerHTML=routeList(area).map(r=>`<label class="check"><input type="checkbox" value="${esc(r)}" ${set.has(r)?'checked':''}> ${esc(r)}</label>`).join('');}}

function page(p,btn){['homePage','shippersPage','offPage','pastePage','statsPage','areasPage'].forEach(id=>document.getElementById(id).style.display='none');const map={home:'homePage',shippers:'shippersPage',off:'offPage',paste:'pastePage',stats:'statsPage',areas:'areasPage'};document.getElementById(map[p]).style.display='block';document.querySelectorAll('.nav button,.mobileNav button').forEach(x=>x.classList.remove('active'));document.querySelectorAll(`[onclick^="page('${p}'"]`).forEach(x=>x.classList.add('active'));pageTitle.textContent={home:'Lịch chạy khu vực',shippers:'Shipper theo xã',off:'Danh sách OFF',paste:'Dán lịch tự động',stats:'Thống kê',areas:'Danh mục địa chỉ'}[p];if(p==='paste')setupPasteDate();}
function closeM(id){document.getElementById(id)?.classList.remove('show');}

window.toggleCommune=toggleCommune;window.toggleAll=toggleAll;window.clearSearch=clearSearch;window.openAreaShippers=openAreaShippers;window.openAreaDetail=openAreaDetail;window.openShipper=openShipper;window.saveShipper=saveShipper;window.deleteShipper=deleteShipper;window.renderShippers=renderShippers;window.renderOffPage=renderOffPage;window.removeOff=removeOff;window.parsePaste=parsePaste;window.applyPaste=applyPaste;window.setPasteTomorrow=setPasteTomorrow;window.onPasteAreaChange=onPasteAreaChange;window.openSetupDetail=openSetupDetail;window.renderSetupDetail=renderSetupDetail;window.changeSetupRunner=changeSetupRunner;window.deleteSetupEntry=deleteSetupEntry;window.deleteSetupForArea=deleteSetupForArea;window.renameRoute=renameRoute;window.deleteRoute=deleteRoute;window.addArea=addArea;window.deleteArea=deleteArea;window.page=page;window.today=today;window.dateChanged=dateChanged;window.setupDate=setupDate;window.closeM=closeM;window.renderRouteChecks=renderRouteChecks;

day.onchange=month.onchange=year.onchange=dateChanged;
document.addEventListener('DOMContentLoaded',()=>{setupDate();populatePasteAreas();page('home');renderAll();window.shipAreaCloudRefreshStatus?.();});
