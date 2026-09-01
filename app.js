
/* Dữ liệu khu vực. Có thể bổ sung/sửa trực tiếp trong AREAS. */
const DEFAULT_AREAS={
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
const AREA_SOURCE='Địa bàn huyện Càng Long (Trà Vinh cũ) — đối chiếu QĐ 13/2024/QĐ-UBND và hồ sơ quy hoạch địa phương; dữ liệu có thể chỉnh sửa theo thực tế giao nhận.';
let AREAS=JSON.parse(localStorage.getItem('SA_AREAS')||'null')||structuredClone(DEFAULT_AREAS);
const NEW_COMMUNES={"Xã Càng Long":["Thị trấn Càng Long","Mỹ Cẩm","Nhị Long Phú"],"Xã An Trường":["Tân Bình","An Trường A","An Trường"],"Xã Tân An":["Huyền Hội","Tân An"],"Xã Nhị Long":["Đại Phước","Đức Mỹ","Nhị Long"],"Xã Bình Phú":["Bình Phú","Đại Phúc","Phương Thạnh"]};

let shippers=JSON.parse(localStorage.getItem("SA_SHIPPERS")||"null")||[
{id:"S1",name:"Nguyễn A",phone:"",status:"work",area:"Đại Phước",routes:["Ấp Rạch Dừa"]},
{id:"S2",name:"Nguyễn B",phone:"",status:"work",area:"Đại Phước",routes:["Ấp Rạch Sen"]},
{id:"S3",name:"Nguyễn C",phone:"",status:"work",area:"Đại Phước",routes:["Ấp Long Hòa"]}
];
let schedules=JSON.parse(localStorage.getItem("SA_SCHEDULES")||"{}");
let pasteLog=JSON.parse(localStorage.getItem("SA_PASTE_LOG")||"{}");
let setupRecords=JSON.parse(localStorage.getItem("SA_SETUP_RECORDS")||"{}");
let selected=new Date(), parsedSchedule=null, allOpen=true;
window.shipAreaGetPayload=()=>({shippers,schedules,areas:AREAS,pasteLog,setupRecords});
window.shipAreaApplyCloud=(p)=>{if(p.shippers)shippers=p.shippers;if(p.schedules)schedules=p.schedules;if(p.areas)AREAS=p.areas;if(p.pasteLog)pasteLog=p.pasteLog;if(p.setupRecords)setupRecords=p.setupRecords;localStorage.setItem("SA_SHIPPERS",JSON.stringify(shippers));localStorage.setItem("SA_SCHEDULES",JSON.stringify(schedules));localStorage.setItem("SA_AREAS",JSON.stringify(AREAS));localStorage.setItem("SA_PASTE_LOG",JSON.stringify(pasteLog));localStorage.setItem("SA_SETUP_RECORDS",JSON.stringify(setupRecords));window.shipAreaAfterCloudLoad?.();};

const norm=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/'/g,'&#39;');
const key=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const fmt=d=>d.toLocaleDateString("vi-VN",{weekday:"long",day:"2-digit",month:"2-digit",year:"numeric"});
const getOff=()=>schedules[key(selected)]||[];
const person=id=>shippers.find(x=>x.id===id);
const save=()=>{
  const payload={shippers,schedules,areas:AREAS,pasteLog,setupRecords};
  localStorage.setItem("SA_SHIPPERS",JSON.stringify(shippers));
  localStorage.setItem("SA_SCHEDULES",JSON.stringify(schedules));
  localStorage.setItem("SA_AREAS",JSON.stringify(AREAS));
  localStorage.setItem("SA_PASTE_LOG",JSON.stringify(pasteLog));
  localStorage.setItem("SA_SETUP_RECORDS",JSON.stringify(setupRecords));
  window.shipAreaCloudSave?.(payload);
};


function setupDate(){
  day.innerHTML=Array.from({length:31},(_,i)=>`<option value="${i+1}">Ngày ${i+1}</option>`).join("");
  month.innerHTML=Array.from({length:12},(_,i)=>`<option value="${i}">Tháng ${i+1}</option>`).join("");
  const y=new Date().getFullYear();year.innerHTML=Array.from({length:8},(_,i)=>`<option>${y-2+i}</option>`).join("");
  syncDate();
}
function syncDate(){day.value=selected.getDate();month.value=selected.getMonth();year.value=selected.getFullYear();document.getElementById("offDate").textContent=fmt(selected);document.getElementById("dateInfo").textContent=fmt(selected)}
function dateChanged(){let y=+year.value,m=+month.value,d=Math.min(+day.value,new Date(y,m+1,0).getDate());selected=new Date(y,m,d);syncDate();renderAll()}
function today(){selected=new Date();syncDate();renderAll()}

function getConsecutiveOffDays(shipperId,fromDate=new Date()){
  let d=new Date(fromDate.getFullYear(),fromDate.getMonth(),fromDate.getDate()), count=0;
  while(true){
    const list=schedules[key(d)]||[];
    if(!list.some(x=>String(x.offId)===String(shipperId)))break;
    count++; d.setDate(d.getDate()-1);
    if(count>3660)break;
  }
  return count;
}
function autoRetireLongOffShippers(doSave=true){
  const todayKey=key(new Date()); let changed=false;
  shippers.forEach(s=>{
    if(s.status==='inactive')return;
    const count=getConsecutiveOffDays(s.id,new Date());
    if(count>14){s.status='inactive';s.inactiveReason=`OFF liên tục ${count} ngày`;s.inactiveAt=todayKey;changed=true;}
  });
  if(changed&&doSave)save();
  return changed;
}

function renderAll(){renderHome();renderOffPage();renderShippers();renderStats();renderRouteChecks();renderAreas()}

function renderHome(){
  const q=norm(document.getElementById("globalSearch").value), off=getOff();
  document.getElementById("s1").textContent=shippers.filter(s=>s.status==="work").length;
  document.getElementById("s2").textContent=Object.keys(AREAS).length;
  document.getElementById("s3").textContent=Object.values(AREAS).reduce((a,b)=>a+b.length,0);
  document.getElementById("s4").textContent=off.length;
  document.getElementById("s5").textContent=off.filter(x=>x.replaceId).length;

  const warnings=[];
  Object.entries(AREAS).forEach(([area,routes])=>{
    routes.forEach(route=>{
      const result=findEffectiveRunner(area,route,selected);
      if(result?.shipper)return;
      const fixed=shippers.filter(s=>s.area===area&&s.routes.some(r=>norm(r)===norm(route)));
      const offFixed=fixed.filter(s=>off.some(o=>String(o.offId)===String(s.id)));
      const rec=setupRecords[key(selected)]?.[area];
      const hasSetup=!!rec;
      // Chỉ cảnh báo nếu đã có setup hoặc người cố định đang OFF. Nếu chưa dán thì không coi là thiếu.
      if((hasSetup||offFixed.length) && (result?.source==='Lịch đã dán có nhiều người'||offFixed.length||hasSetup)){
        warnings.push({area,route,people:offFixed.map(s=>s.name),source:result?.source||'Chưa có dữ liệu'});
      }
    });
  });
  const warningBox=document.getElementById("coverageWarnings");
  if(warningBox){
    warningBox.innerHTML=warnings.length?`<div class="warningBanner"><div style="font-size:22px">⚠️</div><div><b>CẢNH BÁO KHU VỰC CHƯA CÓ NGƯỜI CHẠY THẾ</b><div style="font-size:11px;margin-top:3px">Có ${warnings.length} ấp/xã cần kiểm tra vì shipper đang OFF nhưng chưa có người thay.</div><div class="warningList">${warnings.map(w=>`<span class="warningChip">${w.area} • ${w.route}</span>`).join("")}</div></div></div>`:"";
  }

  let out="";
  Object.entries(AREAS).forEach(([area,routes])=>{
    let filtered=routes.filter(r=>{
      if(!q)return true;
      const people=shippers.filter(s=>s.area===area&&s.routes.includes(r));
      return norm(area).includes(q)||norm(r).includes(q)||people.some(p=>norm(p.name).includes(q));
    });
    if(q&&!norm(area).includes(q)&&!filtered.length)return;
    const running=shippers.filter(s=>s.area===area&&s.status==="work"&&!off.some(o=>o.offId===s.id)).length;
    const hasWarning=warnings.some(w=>w.area===area);
    out+=`<div class="card commune ${hasWarning?'warningRoute':''}"><div class="communeHead" role="button" tabindex="0" onclick="openCommuneDetail(${JSON.stringify(area)})" onkeydown="if(event.key==='Enter'||event.key===' ')openCommuneDetail(${JSON.stringify(area)})"><div><div class="communeName">🏘️ ${area}</div><small>${routes.length} ấp / khu vực • nhấn để xem riêng xã này</small></div><div style="display:flex;align-items:center;gap:7px"><span class="badge ${hasWarning?'off':'work'}">${hasWarning?'⚠️ Cần kiểm tra':running+' đang chạy'}</span><span class="communeArrow">›</span></div></div><div class="communeBody">`;
    const homeRoutes=filtered.slice(0,3);
    homeRoutes.forEach(route=>{
      const resolved=findEffectiveRunner(area,route,selected);
      const runner=resolved?.shipper;
      const fixed=shippers.filter(s=>s.area===area&&s.routes.some(r=>norm(r)===norm(route)));
      const offFixed=fixed.find(s=>off.some(o=>String(o.offId)===String(s.id)));
      if(runner){
        const sourceLabel=resolved.source==='Lịch đã dán'?' • từ lịch đã dán':'';
        out+=`<div class="route covered"><div class="routeRow"><div class="pin">📍</div><div class="routeInfo"><div class="routeName">${route}</div><div class="routePerson">👤 <span class="shipperHighlight">🚚 ${runner.name}</span>${sourceLabel?` <span style="color:#2563eb;font-weight:800">${sourceLabel}</span>`:''}</div></div><span class="badge work">🟢 Đang chạy</span></div></div>`;
      }else if(offFixed){
        const repl=off.find(o=>String(o.offId)===String(offFixed.id))?.replaceId?person(off.find(o=>String(o.offId)===String(offFixed.id)).replaceId):null;
        out+=`<div class="route warningRoute"><div class="routeRow"><div class="pin">📍</div><div class="routeInfo"><div class="routeName">${route}</div><div class="routePerson">👤 <span class="shipperHighlight">🚚 ${offFixed.name}</span> <span style="color:#b91c1c;font-weight:900">• OFF</span></div></div><span class="badge off">🔴 OFF</span></div>${repl?`<div class="replace">🔄 Người chạy thay: <b>${repl.name}</b></div>`:`<div class="replace missing">⚠️ <b>CHƯA CÓ NGƯỜI CHẠY THAY</b></div>`}</div>`;
      }else{
        out+=`<div class="route warningRoute"><div class="routeRow"><div class="pin">📍</div><div class="routeInfo"><div class="routeName">${route}</div><div class="routePerson">⚠️ Chưa có người chạy — chưa có dữ liệu dán phù hợp</div></div><span class="badge off">⚠️ Chưa có người</span></div></div>`;
      }
    });
    if(filtered.length>3) out+=`<button class="communeMore" onclick="event.stopPropagation();openCommuneDetail(${JSON.stringify(area)})">Xem toàn bộ ${filtered.length} ấp →</button>`;
    out+="</div></div>";
  });
  document.getElementById("communes").innerHTML=out||`<div class="card empty">🔎 Không tìm thấy kết quả.</div>`;
  renderSearchResult(q);renderOffBody();
}
function renderSearchResult(q){
  const box=document.getElementById("searchResult");
  if(!q){box.className="resultBox";box.innerHTML="";return}
  let hits=[];
  shippers.forEach(s=>{
    if(norm(s.name).includes(q)||norm(s.area).includes(q)||s.routes.some(r=>norm(r).includes(q)))hits.push(s);
  });
  box.className="resultBox show";
  box.innerHTML=hits.length?`<div style="padding:11px;background:#f8fafc;border-radius:11px"><b>🔎 Tìm thấy ${hits.length} shipper</b><div class="quick" style="margin-top:8px">${hits.map(s=>`<button onclick="showShipperResult('${s.id}')">👤 ${s.name} — ${s.area} — ${s.routes.join(", ")}</button>`).join("")}</div></div>`:`<div style="padding:11px;background:#fff7ed;border-radius:11px">Không có shipper phù hợp.</div>`;
}
function showShipperResult(id){const s=person(id);document.getElementById("globalSearch").value=s.name;renderHome()}

function renderOffBody(){
  const body=document.getElementById("offBody"), data=getOff();
  body.innerHTML=data.length?data.map(o=>{
    const s=person(o.offId),r=person(o.replaceId);
    return `<tr><td><b>🔴 ${s?.name||"?"}</b></td><td>${s?.area||""}</td><td>${s?.routes.join(", ")||""}</td><td>${r?`<span class="green" style="padding:5px 7px;border-radius:7px">🔄 ${r.name}</span>`:`<span style="color:#b91c1c;font-weight:900">⚠️ Chưa có</span>`}</td><td>${o.note||"—"}</td></tr>`;
  }).join(""):`<tr><td colspan="5"><div class="empty">🎉 Không có shipper OFF trong ngày này.</div></td></tr>`;
}

function clearSearch(){document.getElementById("globalSearch").value="";renderHome()}
function toggleAll(){allOpen=!allOpen;document.querySelectorAll(".communeBody").forEach(x=>x.style.display=allOpen?"":"none")}

function openShipper(id=null){
  document.getElementById("sid").value=id||"";
  document.getElementById("shipperModalTitle").textContent=id?"Sửa shipper":"Thêm shipper";
  document.getElementById("sarea").innerHTML=Object.keys(AREAS).map(a=>`<option>${a}</option>`).join("");
  if(id){let s=person(id);sname.value=s.name;sphone.value=s.phone||"";sstatus.value=s.status;sarea.value=s.area}else{sname.value="";sphone.value="";sstatus.value="work"}
  renderRouteChecks(id?person(id).routes:[]);
  document.getElementById("shipperModal").classList.add("show");
}
function renderRouteChecks(selectedRoutes=[]){
  if(!document.getElementById("sarea"))return;
  let a=document.getElementById("sarea").value;
  routeChecks.innerHTML=(AREAS[a]||[]).map(r=>`<label class="check"><input type="checkbox" value="${r}" ${selectedRoutes.includes(r)?"checked":""}> ${r}</label>`).join("");
}
function saveShipper(){
  let id=sid.value,name=sname.value.trim(),area=sarea.value,routes=[...document.querySelectorAll("#routeChecks input:checked")].map(x=>x.value);
  if(!name||!routes.length){alert("Nhập tên và chọn ít nhất một ấp.");return}
  if(id){let s=person(id);Object.assign(s,{name,phone:sphone.value.trim(),status:sstatus.value,area,routes});if(s.status==='work'){s.inactiveReason='';s.inactiveAt='';}}
  else shippers.push({id:"S"+Date.now(),name,phone:sphone.value.trim(),status:sstatus.value,area,routes,inactiveReason:'',inactiveAt:''});
  save();closeM("shipperModal");renderAll();
}
function editShipper(id){openShipper(id)}
function deleteShipper(id){if(confirm("Xóa shipper này?")){shippers=shippers.filter(s=>s.id!==id);save();renderAll()}}

function restoreShipper(id){
  const s=person(id); if(!s)return;
  s.status='work'; s.inactiveReason=''; s.inactiveAt='';
  save(); renderAll();
}
function renderShippers(){
  const q=norm(document.getElementById("shipperSearch")?.value||"");
  const active=shippers.filter(s=>s.status!=='inactive');
  const archived=shippers.filter(s=>s.status==='inactive');
  const arr=active.filter(s=>!q||norm(s.name).includes(q)||norm(s.phone).includes(q)||norm(s.area).includes(q)||s.routes.some(r=>norm(r).includes(q)));
  const html=arr.length?arr.map(s=>`<div class="shipperRow"><div class="avatar">${esc((s.name||'?')[0].toUpperCase())}</div><div class="grow"><b>${esc(s.name)}</b><div style="font-size:11px;color:var(--muted)">${esc(s.phone||"Chưa có SĐT")} • ${esc(s.area)} • ${(s.routes||[]).map(esc).join(", ")}</div></div><span class="badge ${s.status==="work"?"work":"off"}">${s.status==="work"?"Đang chạy":"Không hoạt động"}</span><button class="btn light" onclick="openShipper('${s.id}')">Sửa</button><button class="btn danger" onclick="deleteShipper('${s.id}')">Xóa</button></div>`).join(""):`<div class="empty">Không tìm thấy shipper đang hoạt động.</div>`;
  const archivedHtml=archived.length?`<div class="card inactiveBox" style="margin-top:14px;padding:12px"><div class="head"><div><b>⏸️ Đã tự ngưng</b><small>OFF liên tục quá 14 ngày — dữ liệu lịch cũ vẫn được giữ.</small></div><span class="badge off">${archived.length}</span></div>${archived.map(s=>`<div class="shipperRow"><div class="avatar">${esc((s.name||'?')[0].toUpperCase())}</div><div class="grow"><b>${esc(s.name)}</b><div style="font-size:11px;color:var(--muted)">${esc(s.area)} • ${esc(s.inactiveReason||'OFF quá 14 ngày')}</div></div><button class="btn light" onclick="restoreShipper('${s.id}')">↩ Khôi phục</button></div>`).join('')}</div>`:'';
  shipperList.innerHTML=html+archivedHtml;
}

function removeOff(id){let k=key(selected);schedules[k]=(schedules[k]||[]).filter(x=>x.offId!==id);save();renderAll()}

function renderOffPage(){
  if(!document.getElementById("offPageBody"))return;
  let q=norm(document.getElementById("offSearch")?.value||"");
  let data=getOff().filter(o=>{let s=person(o.offId),r=person(o.replaceId);let text=[s?.name,s?.area,...(s?.routes||[]),r?.name,o.note].join(" ");return !q||norm(text).includes(q)});
  offPageBody.innerHTML=data.length?data.map(o=>{let s=person(o.offId),r=person(o.replaceId);return `<tr><td><b>${s?.name||""}</b></td><td>${s?.area||""}</td><td>${s?.routes.join(", ")||""}</td><td>${r?.name||"⚠️ Chưa có"}</td><td>${o.note||"—"}</td><td><button class="btn danger" onclick="removeOff('${o.offId}')">Xóa OFF</button></td></tr>`}).join(""):`<tr><td colspan="6"><div class="empty">Không có kết quả.</div></td></tr>`;
}

function getPasteDate(){
  let d=+(document.getElementById('pasteDay')?.value||0), my=(document.getElementById('pasteMonthYear')?.value||'').trim();
  let m=my.match(/^(\d{1,2})[\/-](\d{4})$/);
  if(!d||!m)return new Date(selected.getFullYear(),selected.getMonth(),selected.getDate()+1);
  return new Date(+m[2],+m[1]-1,d);
}
function setPasteTomorrow(){let d=new Date(selected);d.setDate(d.getDate()+1);document.getElementById('pasteDay').value=d.getDate();document.getElementById('pasteMonthYear').value=String(d.getMonth()+1).padStart(2,'0')+'/'+d.getFullYear();renderPasteStatus()}
function populatePasteAreas(){const el=document.getElementById('pasteArea');if(!el)return;const cur=el.value;el.innerHTML='<option value="">— Chọn xã để dán lịch —</option>'+Object.keys(AREAS).sort((a,b)=>a.localeCompare(b,'vi')).map(a=>`<option value="${esc(a)}">${esc(a)}</option>`).join('');if(cur&&AREAS[cur])el.value=cur}
function onPasteAreaChange(){
  const area=document.getElementById('pasteArea')?.value||'';
  const box=document.getElementById('pastePreview');
  parsedSchedule=null;
  if(!area){box.innerHTML='<div class="empty">Hãy chọn xã trước khi phân tích. Hệ thống không tự setup tuyến trước khi bạn dán lịch.</div>';return;}
  box.innerHTML=`<div class="pasteHint">🏠 <b>${esc(area)}</b> đã chọn. Chưa có tuyến nào được setup trước. Hãy dán lịch và bấm <b>Phân tích</b>.</div>`;
}

function setupPasteDate(){let d=new Date(selected);d.setDate(d.getDate()+1);document.getElementById('pasteDay').value=d.getDate();document.getElementById('pasteMonthYear').value=String(d.getMonth()+1).padStart(2,'0')+'/'+d.getFullYear();populatePasteAreas();renderPasteStatus()}
function pasteKey(d){return key(d)}
function renderPasteStatus(){
  const d=getPasteDate(), k=pasteKey(d), areas=Object.keys(AREAS).filter(Boolean).sort((a,b)=>a.localeCompare(b,'vi'));
  const done=new Set(pasteLog[k]||[]), yes=areas.filter(a=>done.has(a)), no=areas.filter(a=>!done.has(a));
  const total=areas.length;
  document.getElementById('pasteStatusDate').textContent='Lịch setup ngày '+fmt(d);
  document.getElementById('pasteCountBadge').textContent=`${yes.length} / ${total} xã đã dán`;
  document.getElementById('pasteProgress').innerHTML=`<div style="display:flex;justify-content:space-between;gap:10px;font-size:12px"><b>📅 ${fmt(d)}</b><span><b>${yes.length}</b> đã dán • <b>${no.length}</b> chưa dán</span></div><div style="height:9px;background:#eef2f7;border-radius:99px;overflow:hidden;margin-top:8px"><div style="height:100%;width:${total?Math.round(yes.length/total*100):0}%;background:linear-gradient(90deg,#10b981,#34d399);border-radius:99px"></div></div>`;
  const card=a=>{const rec=setupRecords[k]?.[a];const count=rec?.entries?.length||0;return `<div class="pasteAreaItem clickSetup" onclick="openSetupDetail(${JSON.stringify(a)},'${k}')"><div><b>${a}</b><small style="display:block">${count?`${count} dòng • bấm để xem/sửa`:'Đã đánh dấu setup'}</small></div><span class="badge green">Đã dán</span></div>`};
  document.getElementById('pasteAreaStatus').innerHTML=`<div class="pasteStatusCol"><div class="pasteStatusHead done"><span>✅ Đã dán / setup</span><span>${yes.length}</span></div><div class="pasteAreaList">${yes.length?yes.map(card).join(''):'<div class="empty">Chưa có xã nào.</div>'}</div></div><div class="pasteStatusCol"><div class="pasteStatusHead todo"><span>⏳ Chưa dán</span><span>${no.length}</span></div><div class="pasteAreaList">${no.length?no.map(a=>`<div class="pasteAreaItem"><div><b>${a}</b><small style="display:block">Chưa có dữ liệu setup ngày này</small></div><span class="badge" style="background:#fff7ed;color:#c2410c">Chưa dán</span></div>`).join(''):'<div class="empty">🎉 Đã setup đủ các xã.</div>'}</div></div>`;
}
function saveSetupRecord(pd,area,entries,raw,autoAdded){
  const k=key(pd); setupRecords[k]=setupRecords[k]||{};
  setupRecords[k][area]={area,date:k,raw:raw||'',updatedAt:new Date().toISOString(),autoAdded:[...new Set(autoAdded||[])],entries:entries.map(e=>({name:e.name||'',shipperId:findShipperByName(e.name||'')?.id||e.shipperId||'',routes:[...new Set(e.routes||[])],off:!!e.off,note:e.note||''}))};
}
function openSetupDetail(area,k){
  const rec=setupRecords[k]?.[area];
  if(!rec){alert('Xã này đã được đánh dấu nhưng chưa có bản lưu chi tiết.');return}
  window.setupDetailState={area,k};
  document.getElementById('setupDetailTitle').textContent=`${area} • Chi tiết setup`;
  document.getElementById('setupDetailSub').textContent=`Ngày ${fmt(new Date(k+'T00:00:00'))} • Sửa ở đây sẽ tự lưu lại đúng ngày này`;
  document.getElementById('setupDetailSearch').value='';
  document.getElementById('setupDetailModal').classList.add('show');
  renderSetupDetail();
}
function renderSetupDetail(){
  const st=window.setupDetailState;if(!st)return; const rec=setupRecords[st.k]?.[st.area]; if(!rec)return;
  const q=norm(document.getElementById('setupDetailSearch').value||'');
  const all=rec.entries||[], shown=all.map((e,i)=>({...e,_i:i})).filter(e=>!q||norm([e.name,...e.routes].join(' ')).includes(q));
  const routeCount=[...new Set(all.flatMap(e=>e.routes||[]))].length, offCount=all.filter(e=>e.off).length, missing=all.filter(e=>!e.name).length;
  document.getElementById('setupDetailSummary').innerHTML=`<div class="setupMetric"><b>${all.length}</b><span>DÒNG LỊCH</span></div><div class="setupMetric"><b>${routeCount}</b><span>ẤP/KHU VỰC</span></div><div class="setupMetric"><b>${offCount}</b><span>OFF</span></div><div class="setupMetric"><b>${missing}</b><span>CHƯA CÓ SHIPPER</span></div>`;
  document.getElementById('setupDetailRows').innerHTML=shown.length?shown.map(e=>`<div class="setupDetailRow"><div class="setupDetailHead"><div class="avatar">${(e.name||'?')[0].toUpperCase()}</div><div class="grow"><b>${e.name||'⚠️ Chưa tìm được shipper'}</b><div style="font-size:10px;color:var(--muted)">${e.off?'🔴 OFF':'🚚 Lịch chạy'} • ${e.routes?.length||0} ấp</div></div><button class="miniBtn blue" onclick="editSetupEntry(${e._i})">✏️ Sửa</button></div><div class="setupRouteChips">${(e.routes||[]).length?e.routes.map((r,j)=>`<span class="setupRouteChip">📍 ${r}<button title="Xóa ấp khỏi lịch ngày này" onclick="removeSetupRoute(${e._i},${j})">×</button></span>`):'<span style="font-size:11px;color:#9ca3af">Chưa có ấp</span>'}</div></div>`).join(''):'<div class="empty">Không có dòng phù hợp.</div>';
}
function editSetupEntry(i){
  const st=window.setupDetailState, rec=setupRecords[st.k]?.[st.area], e=rec?.entries?.[i]; if(!e)return;
  const current=e.name||'';
  const list=getAreaShippers(st.area);
  const menu=list.map((s,i)=>`${i+1}. ${s.name}`).join('\n');
  const answer=prompt(`Chọn shipper chạy ${st.area}\n\n${menu}\n\nNhập số hoặc tên:`,current); if(answer===null)return;
  const idx=Number(answer);
  const ship=Number.isInteger(idx)&&idx>=1&&idx<=list.length?list[idx-1]:findShipperByNameInArea(st.area,answer.trim());
  if(!ship){alert('Shipper không thuộc xã này hoặc không tồn tại.');return;}
  e.name=ship.name; e.shipperId=ship.id;
  const rv=prompt('Danh sách ấp, ngăn cách bằng dấu phẩy:',(e.routes||[]).join(', ')); if(rv!==null){
    const vals=rv.split(/[,;]+/).map(x=>x.trim()).filter(Boolean); e.routes=[...new Set(vals)];
  }
  rec.updatedAt=new Date().toISOString(); setupRecords[st.k][st.area]=rec; save(); renderSetupDetail(); renderAll();
}
function removeSetupRoute(i,j){
  const st=window.setupDetailState, rec=setupRecords[st.k]?.[st.area]; if(!rec)return;
  rec.entries[i].routes.splice(j,1); rec.updatedAt=new Date().toISOString(); save(); renderSetupDetail(); renderAll();
}
function cleanHeaderLine(line){return line.replace(/^(?:thứ\s*[2-8]|thu\s*[2-8])(?:\s*ngày)?\s*\d{1,2}[\/.\-]\d{1,2}(?:[\/.\-]\d{4})?\s*/i,'').trim()}
function autoAddRoute(area, raw){
  // Dán lịch TUYỆT ĐỐI KHÔNG tự tạo ấp/khóm mới.
  // Nếu không khớp danh mục hiện có -> trả null để người dùng chọn/sửa thủ công.
  if(!area||!raw)return null;
  return findRoute(area, raw);
}

function getAreaShippers(area){
  return shippers.filter(s=>s.area===area && s.status!=='inactive');
}
function findShipperByNameInArea(area,name){
  const n=norm(name); if(!n)return null;
  const list=getAreaShippers(area);
  return list.find(s=>norm(s.name)===n)||list.find(s=>norm(s.name).includes(n)||n.includes(norm(s.name)))||null;
}
function assignParsedRunner(index,shipperId){
  if(!parsedSchedule?.entries?.[index])return;
  const e=parsedSchedule.entries[index];
  const s=shipperId?person(shipperId):null;
  if(s && s.area===parsedSchedule.area && s.status==='work'){
    e.shipperId=s.id; e.name=s.name; e.unmatched=false;
  }else{
    e.shipperId=''; e.name=''; e.unmatched=true;
  }
  renderPastePreview();
  renderParseSummary();
}
function renderParseSummary(){
  if(!parsedSchedule)return;
  const entries=parsedSchedule.entries||[];
  const assigned=entries.filter(e=>!e.off&&e.shipperId&&e.name);
  const unresolved=entries.filter(e=>!e.off&&(!e.shipperId||!e.name||!e.routes?.length));
  const routes=entries.filter(e=>e.routes?.length).length;
  const offCount=entries.filter(e=>e.off).length;
  const msg=document.getElementById('parseMessage');
  if(!msg)return;
  msg.innerHTML=`<b>Phân tích hợp lệ</b><div class="analysisBox"><div class="analysisMetric"><b>${routes}</b><span>ẤP TRONG LỊCH</span></div><div class="analysisMetric"><b>${assigned.length}</b><span>ĐÃ XÁC ĐỊNH</span></div><div class="analysisMetric"><b>${unresolved.length}</b><span>CẦN CHỌN NGƯỜI</span></div><div class="analysisMetric"><b>${offCount}</b><span>OFF</span></div></div>${unresolved.length?'<div class="analysisNotes"><div class="analysisNote analysisWarn">🟡 Có ấp chưa tham chiếu được shipper. Hãy chọn người chạy ngay trên dòng đó trước khi lưu.</div></div>':'<div class="analysisNotes"><div class="analysisNote analysisOk">✓ Tất cả ấp trong lịch đã xác định được người chạy.</div></div>'}`;
}
function renderPastePreview(){
  const box=document.getElementById('pastePreview');
  if(!box)return;
  if(!parsedSchedule){box.innerHTML='<div class="empty">Chưa phân tích lịch.</div>';return;}
  const area=parsedSchedule.area;
  const list=getAreaShippers(area);
  box.innerHTML=(parsedSchedule.entries||[]).map((e,i)=>{
    if(e.off)return `<div class="previewRouteRow offRow"><div><div class="previewRouteName">🔴 OFF</div><small>${esc(e.name||'Chưa xác định')}</small></div><span class="previewAssigned">OFF trong ngày</span></div>`;
    const route=e.routes?.[0]||'';
    const current=e.shipperId?person(e.shipperId):null;
    if(!route){
      return `<div class="previewRouteRow unassignedRow"><div class="previewRouteMain"><div class="previewRouteName">⚠️ ${esc(e.unknownText||'Không nhận diện được ấp')}</div><small>Không có trong danh mục của <b>${esc(area)}</b>. Không tự tạo mới. Hãy sửa tên ấp hoặc thêm thủ công trong Danh mục địa chỉ.</small></div><span class="badge amber">Chưa khớp</span></div>`;
    }
    const options='<option value="">🟡 Chọn người chạy</option>'+list.map(s=>`<option value="${esc(s.id)}" ${current?.id===s.id?'selected':''}>${esc(s.name)}${s.status==='off'?' • OFF':''}</option>`).join('');
    return `<div class="previewRouteRow ${current?'assignedRow':'unassignedRow'}"><div class="previewRouteMain"><div class="previewRouteName">📍 ${esc(route)}</div><small>${current?'👤 '+esc(current.name)+' • '+esc(area):'⚠️ Chưa tham chiếu được người chạy'}</small></div><div class="previewRunnerControl"><select class="select runnerSelect" onchange="assignParsedRunner(${i},this.value)">${options}</select></div></div>`;
  }).join('')||'<div class="empty">Không nhận diện được ấp trong lịch.</div>';
}
function extractKnownRoutesFromLine(area,line){
  const routes=AREAS[area]||[];
  const ordered=routes.slice().sort((a,b)=>norm(b).length-norm(a).length);
  const found=[];
  let n=norm(line);
  for(const route of ordered){
    const rn=norm(route).replace(/^(ap|op)\s+/,'');
    if(!rn)continue;
    const words=rn.split(' ');
    const tokens=n.split(' ').filter(Boolean);
    let hit=false;
    for(let i=0;i<=tokens.length-words.length;i++){
      if(words.every((w,j)=>tokens[i+j]===w)){hit=true;break;}
    }
    if(hit)found.push(route);
  }
  return [...new Set(found)];
}
function guessShipperBeforeRoutes(area,line,routes){
  if(!routes.length)return null;
  const original=String(line).trim();
  let firstIndex=Infinity;
  for(const route of routes){
    const n=norm(original), rn=norm(route).replace(/^(ap|op)\s+/,'');
    const tokens=n.split(' '), rt=rn.split(' ');
    for(let i=0;i<=tokens.length-rt.length;i++){
      if(rt.every((w,j)=>tokens[i+j]===w)){ firstIndex=Math.min(firstIndex,i); break; }
    }
  }
  if(firstIndex===Infinity||firstIndex===0)return null;
  const tokens=original.split(/\s+/);
  const prefix=tokens.slice(0,firstIndex).join(' ').trim();
  return findShipperByNameInArea(area,prefix)||null;
}

function parsePaste(){
  const text=document.getElementById('pasteText').value.trim();
  if(!text){alert('Dán lịch trước.');return;}
  const area=document.getElementById('pasteArea')?.value||'';
  if(!area){alert('Hãy chọn xã cần dán lịch trước.');return;}
  const dateMatch=text.match(/(\d{1,2})[\/.\-](\d{1,2})(?:[\/.\-](\d{4}))?/);
  const fallback=getPasteDate();
  const date=dateMatch?`${dateMatch[1]}/${dateMatch[2]}/${dateMatch[3]||fallback.getFullYear()}`:fmt(fallback);
  const lines=text.replace(/\r/g,'').split(/\n+/).map(x=>x.trim()).filter(Boolean);
  let entries=[],autoAdded=[];
  lines.forEach(line=>{
    const originalLine=line; line=cleanHeaderLine(line); if(!line)return;
    if(/^(?:xã|thị trấn|tt)\b/i.test(line))return;
    if(/^(?:thứ|thu)\s*\d/i.test(originalLine)&&/\d{1,2}[\/.\-]\d{1,2}/.test(originalLine))return;
    const off=/\b(off|nghi|nghỉ)\b/i.test(line);
    let known=findKnownShipperInText(line);
    if(known && known.area!==area) known=null;
    if(known){
      const rhs=line.replace(new RegExp(known.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'),'').replace(/^[\s:：–-]+/,'').trim();
      if(off)entries.push({name:known.name,shipperId:known.id,routes:[],off:true});
      else entries.push({name:known.name,shipperId:known.id,routes:rhs?resolveRoutes(area,rhs,autoAdded):[],off:false});
      return;
    }
    let m=line.match(/^([^:：–-]{1,50}?)\s*[:：–-]\s*(.+)$/);
    if(m){
      const name=m[1].trim(),rhs=m[2].trim(),ss=findShipperByNameInArea(area,name);
      if(/^(off|nghi|nghỉ)$/i.test(rhs))entries.push({name:ss?.name||name,shipperId:ss?.id||'',routes:[],off:true});
      else entries.push({name:ss?.name||'',shipperId:ss?.id||'',unmatched:!ss,routes:resolveRoutes(area,rhs,autoAdded),off:false,sourceName:name});
      return;
    }
    if(off){
      const nm=line.replace(/\b(off|nghi|nghỉ)\b/i,'').trim(),ss=findShipperByNameInArea(area,nm);
      entries.push({name:ss?.name||nm,shipperId:ss?.id||'',routes:[],off:true}); return;
    }
    const natural=line.match(/^(.+?)\s+(?:ấp|ốp|ap|khóm|khu phố|kp)\s+(.+)$/i);
    if(natural){
      const nm=natural[1].trim(),rr=resolveNaturalRoutes(area,natural[2].trim(),autoAdded),ss=findShipperByNameInArea(area,nm);
      if(rr.routes.length)entries.push({name:ss?.name||'',shipperId:ss?.id||'',routes:rr.routes,off:false,auto:true,unmatched:!ss,sourceName:nm});
      return;
    }
    const parts=line.split(/\s{2,}|\t+/).filter(Boolean);
    if(parts.length>=2){
      const ss=findShipperByNameInArea(area,parts[0].trim());
      entries.push({name:ss?.name||'',shipperId:ss?.id||'',unmatched:!ss,routes:resolveRoutes(area,parts.slice(1).join(' '),autoAdded),off:false,sourceName:parts[0].trim()});
      return;
    }
    // Dạng tự nhiên: "Giang Trà Ốp Ninh Bình".
    // Tự đối chiếu ấp đã có trong xã, sau đó lấy phần tên đứng trước ấp để tìm shipper.
    const detectedRoutes=extractKnownRoutesFromLine(area,line);
    if(detectedRoutes.length){
      const ss=guessShipperBeforeRoutes(area,line,detectedRoutes);
      entries.push({
        name:ss?.name||'',
        shipperId:ss?.id||'',
        routes:detectedRoutes,
        off:false,
        auto:true,
        unmatched:!ss,
        sourceName:ss?.name||line
      });
      return;
    }
    // Một dòng chỉ có đúng tên ấp cũng được đưa vào xem trước để chọn người chạy.
    const assignedRoute=findRoute(area,line);
    if(assignedRoute)entries.push({name:'',shipperId:'',routes:[assignedRoute],off:false,auto:true,unmatched:true});
    else entries.push({name:'',shipperId:'',routes:[],off:false,unmatched:true,unknownText:line});
  });
  const expanded=[];
  entries.forEach(e=>{
    if(e.off){expanded.push(e);return;}
    (e.routes||[]).forEach(route=>expanded.push({...e,routes:[route]}));
  });
  parsedSchedule={date,area,entries:expanded,raw:text,autoAdded:[...new Set(autoAdded)]};
  renderParseSummary(); renderPastePreview(); renderPasteStatus();
  // Chỉ tự lưu khi mọi ấp đã xác định được người. Nếu còn thiếu, bắt buộc chọn.
  const unresolved=expanded.some(e=>!e.off&&(!e.shipperId||!e.name));
  window.parsedSchedule=parsedSchedule;
  if(!unresolved && expanded.length) setTimeout(()=>{if(window.parsedSchedule===parsedSchedule)applyPaste();},0);
}

function resolveNaturalRoutes(area,text,autoAdded){
  if(!area||!text)return {routes:[]};
  const source=String(text).replace(/\s+/g,' ').trim();
  const routes=AREAS[area]||[];
  const found=[];
  // Chỉ nhận diện các ấp đã có trong danh mục; không tự sinh dữ liệu.
  const ordered=routes.slice().sort((a,b)=>norm(b).length-norm(a).length);
  for(const route of ordered){
    const rn=norm(route).replace(/^(ap|op)\s+/,'');
    if(!rn)continue;
    const words=rn.split(' ').filter(Boolean);
    const hay=norm(source).split(' ');
    for(let i=0;i<=hay.length-words.length;i++){
      if(words.every((w,j)=>hay[i+j]===w)){
        found.push(route);
        break;
      }
    }
  }
  return {routes:[...new Set(found)]};
}

function resolveRoutes(area,rhs,autoAdded){
  if(!area||!rhs)return [];
  const raw=expandRouteNames(rhs), out=[];
  raw.forEach(r=>{
    const natural=resolveNaturalRoutes(area,r,autoAdded);
    if(natural.routes.length){out.push(...natural.routes);return;}
    const rr=findRoute(area,r);
    if(rr)out.push(rr);
    // Không khớp thì KHÔNG thêm vào AREAS. Frontend sẽ hiển thị để chọn thủ công.
  });
  return [...new Set(out)];
}

function expandRouteNames(rhs){
  let routes=rhs.split(/[,;]+/).map(x=>x.trim()).filter(Boolean),out=[];
  routes.forEach(r=>{let mm=r.match(/^(.+?)\s+([0-9,\s]+)$/);if(mm&&mm[2].includes(','))mm[2].split(',').map(n=>n.trim()).filter(Boolean).forEach(n=>out.push(`${mm[1].trim()} ${n}`));else out.push(r)});return out
}
function findArea(input){
  let n=norm(input).replace(/\b(xa|thị trấn|thi tran|tt)\b/g,' ').replace(/\s+/g,' ').trim();
  for(let a of Object.keys(AREAS))if(n===norm(a)||n.includes(norm(a)))return a;
  return null;
}
function findRoute(area,input){
  let n=norm(input).replace(/^(ap|op|ấp|ốp)\s+/,'').trim(), routes=AREAS[area]||[];
  let exact=routes.find(r=>norm(r)===n||norm(r).replace(/^(ap|op)\s+/,'')===n); if(exact)return exact;
  let candidates=routes.filter(r=>norm(r).includes(n)||n.includes(norm(r))); return candidates.length===1?candidates[0]:null;
}
function findShipperByName(name){let n=norm(name);if(!n)return null;return shippers.find(s=>norm(s.name)===n)||shippers.find(s=>norm(s.name).includes(n)||n.includes(norm(s.name)))}
function findKnownShipperInText(text){const n=norm(text);return shippers.slice().sort((a,b)=>b.name.length-a.name.length).find(s=>n.includes(norm(s.name)))||null}
function findAssignedShipper(area,route,date=null){
  const d=date||selected, dk=typeof d==='string'?d:key(d), n=norm(route);
  const offIds=new Set((schedules[dk]||[]).map(x=>String(x.offId)));
  const fixed=shippers.filter(s=>s.area===area&&s.status==='work'&&!offIds.has(String(s.id))&&s.routes.some(r=>norm(r)===n));
  return fixed.length===1?fixed[0]:null;
}
function findEffectiveRunner(area,route,date=null){
  const d=date||selected, dk=typeof d==='string'?d:key(d), n=norm(route);
  // 1) Nếu ngày đó đã có setup, setup thực tế là nguồn ưu tiên.
  const rec=setupRecords[dk]?.[area];
  const pasted=[];
  (rec?.entries||[]).forEach(e=>{
    if(e.off || !e.shipperId || !e.routes?.some(r=>norm(r)===n))return;
    const s=person(e.shipperId)||findShipperByNameInArea(area,e.name);
    if(s && s.status!=='inactive') pasted.push(s);
  });
  const unique=[...new Map(pasted.map(s=>[s.id,s])).values()];
  if(unique.length===1)return {shipper:unique[0],source:'Lịch đã dán'};
  if(unique.length>1)return {shipper:null,source:'Lịch đã dán có nhiều người'};
  // 2) Chưa có setup cho ấp này -> chỉ tham chiếu danh sách shipper của xã.
  const fixed=findAssignedShipper(area,route,d);
  if(fixed)return {shipper:fixed,source:'Danh sách shipper'};
  return {shipper:null,source:'Chưa tham chiếu được'};
}

function applyPaste(){
  if(!parsedSchedule)parsePaste();
  if(!parsedSchedule||!parsedSchedule.entries?.length)return;
  const area=parsedSchedule.area;
  const pdParts=parsedSchedule.date?.split('/');
  let pd=getPasteDate();
  if(pdParts){const dd=+pdParts[0],mm=+pdParts[1]-1,yy=+(pdParts[2]||pd.getFullYear());pd=new Date(yy,mm,dd)}
  const unresolved=parsedSchedule.entries.filter(e=>!e.off&&(!e.shipperId||!e.name||!e.routes?.length));
  if(unresolved.length){alert(`Còn ${unresolved.length} ấp chưa chọn người chạy. Hãy chọn ở phần Xem trước rồi lưu.`);return;}
  const appliedEntries=parsedSchedule.entries.map(e=>({name:e.name||'',shipperId:e.shipperId||'',routes:[...new Set(e.routes||[])],off:!!e.off,note:e.note||''}));
  const k=pasteKey(pd);
  pasteLog[k]=[...new Set([...(pasteLog[k]||[]),area])];
  saveSetupRecord(pd,area,appliedEntries,parsedSchedule.raw,parsedSchedule.autoAdded);
  // OFF từ lịch dán được ghi nhận theo ngày, nhưng KHÔNG sửa tuyến gốc của shipper.
  const offList=schedules[k]||[];
  appliedEntries.filter(e=>e.off&&e.shipperId).forEach(e=>{
    if(!offList.some(x=>String(x.offId)===String(e.shipperId))) offList.push({offId:e.shipperId,replaceId:'',note:'Dán lịch tự động'});
  });
  schedules[k]=offList;
  selected=pd; syncDate();
  autoRetireLongOffShippers(false);
  save(); renderAll(); renderPasteStatus();
  const unknown=appliedEntries.filter(e=>!e.off&&!e.shipperId).length;
  document.getElementById('parseMessage').innerHTML=`<div class="analysisNote analysisOk">✓ Đã lưu setup <b>${esc(area)}</b> cho ngày <b>${esc(fmt(pd))}</b>. ${unknown?'⚠️ Còn '+unknown+' ấp chưa có người.':'Tất cả ấp đã xác định người chạy.'}</div>`;
}

function page(p,btn){
  ["homePage","shippersPage","offPage","pastePage","statsPage","areasPage"].forEach(id=>document.getElementById(id).style.display="none");
  let map={home:"homePage",shippers:"shippersPage",off:"offPage",paste:"pastePage",stats:"statsPage",areas:"areasPage"};
  document.getElementById(map[p]).style.display="";
  document.getElementById("pageTitle").textContent={home:"Lịch chạy khu vực",shippers:"Danh sách shipper",off:"Danh sách OFF",paste:"Dán lịch tự động",stats:"Thống kê",areas:"Danh mục địa chỉ"}[p];
  document.querySelectorAll(".nav button,.mobileNav button").forEach(x=>x.classList.remove("active"));if(btn)btn.classList.add("active");
  renderAll();
}
function renderStats(){
  const data=getOff(), dk=key(selected);
  let byArea={}; data.forEach(x=>{const s=person(x.offId);if(s)byArea[s.area]=(byArea[s.area]||0)+1});
  const warnings=[], unresolved=[];
  Object.entries(AREAS).forEach(([area,routes])=>routes.forEach(route=>{
    const result=findEffectiveRunner(area,route,selected);
    const fixed=shippers.filter(s=>s.area===area&&s.routes.some(r=>norm(r)===norm(route)));
    const offFixed=fixed.filter(s=>data.some(o=>String(o.offId)===String(s.id)));
    const rec=setupRecords[dk]?.[area];
    if(rec && !result.shipper){
      const w={area,route,people:offFixed.map(x=>x.name),reason:result.source};
      if(result.source==='Chưa tham chiếu được') unresolved.push(w); else warnings.push(w);
    }else if(offFixed.length && !result.shipper){
      warnings.push({area,route,people:offFixed.map(x=>x.name),reason:'OFF'});
    }
  }));
  const autoInactive=shippers.filter(s=>s.status==='inactive');
  const covered=data.filter(o=>{const s=person(o.offId);return s&&Object.values(setupRecords[dk]||{}).some(rec=>(rec.entries||[]).some(e=>e.shipperId===o.offId&&!e.off));}).length;
  statsDetail.innerHTML=`<div class="stats"><div class="card stat"><strong>${data.length}</strong><span>OFF hôm nay</span></div><div class="card stat"><strong>${covered}</strong><span>OFF đã có người chạy</span></div><div class="card stat"><strong>${warnings.length}</strong><span>Ấp OFF chưa có người</span></div><div class="card stat"><strong>${unresolved.length}</strong><span>Ấp cần chọn người</span></div><div class="card stat"><strong>${autoInactive.length}</strong><span>Đã ngưng >14 ngày OFF</span></div></div>
  ${data.length?`<h3 style="margin:18px 0 8px">🔴 OFF trong ngày</h3><div class="offStatList">${data.map(o=>{const s=person(o.offId);const r=person(o.replaceId);return `<div class="card offStatRow"><div><b>${esc(s?.name||'—')}</b><small>${esc(s?.area||'')} • ${(s?.routes||[]).map(esc).join(', ')}</small></div><span class="badge ${r?'work':'off'}">${r?'🔄 '+esc(r.name):'⚠️ Chưa có người thay'}</span></div>`}).join('')}</div>`:''}
  <h3 style="margin:18px 0 8px">🚨 Cảnh báo chưa có người chạy</h3>
  ${warnings.length?warnings.map(w=>`<div class="warningRoute" style="padding:11px 12px;border-radius:11px;margin:6px 0"><b>${esc(w.area)}</b> <span style="color:#9a3412">• ${esc(w.route)}</span><div style="font-size:11px;margin-top:3px">${w.people.length?'Shipper OFF: '+w.people.map(esc).join(', '):'Đã setup nhưng chưa xác định được người chạy.'}</div></div>`).join(''):'<div class="empty">🎉 Không có ấp nào đang thiếu người chạy.</div>'}
  ${unresolved.length?`<h3 style="margin:18px 0 8px">🟡 Cần chọn người chạy</h3>${unresolved.map(w=>`<div class="card" style="padding:11px;margin:6px 0"><b>${esc(w.area)}</b> • ${esc(w.route)}<div style="font-size:11px;color:var(--muted);margin-top:3px">Chưa tham chiếu được shipper từ lịch/danh sách. Vào Dán lịch để chọn người chạy.</div></div>`).join('')}`:''}
  <h3 style="margin:18px 0 8px">🔴 OFF theo xã</h3>${Object.keys(byArea).length?Object.entries(byArea).map(([a,n])=>`<div style="padding:10px 12px;border-bottom:1px solid var(--line)"><b>${esc(a)}</b><span style="float:right;font-weight:900">${n}</span></div>`).join(''):'<div class="empty">Không có OFF.</div>'}`;
}

function openCommuneDetail(area){
  if(!AREAS[area])return;
  window.communeDetailState={area};
  document.getElementById('communeDetailTitle').textContent=`🏘️ ${area}`;
  document.getElementById('communeDetailSub').textContent=`Chỉ hiển thị dữ liệu của ${area} • ${AREAS[area].length} ấp/khu vực`;
  document.getElementById('communeDetailSearch').value='';
  document.getElementById('communeDetailModal').classList.add('show');
  renderCommuneDetail();
}
function renderCommuneDetail(){
  const area=window.communeDetailState?.area;
  if(!area||!AREAS[area])return;
  const q=norm(document.getElementById('communeDetailSearch')?.value||'');
  const routes=AREAS[area];
  const off=getOff();
  const rows=routes.map(route=>{
    const resolved=findEffectiveRunner(area,route,selected);
    const fixed=shippers.filter(s=>s.area===area&&s.routes.some(r=>norm(r)===norm(route)));
    const offFixed=fixed.find(s=>off.some(o=>String(o.offId)===String(s.id)));
    return {route,resolved,offFixed};
  }).filter(x=>!q||norm([x.route,x.resolved?.shipper?.name,x.offFixed?.name].join(' ')).includes(q));
  const assigned=rows.filter(x=>x.resolved?.shipper).length;
  const offCount=rows.filter(x=>x.offFixed).length;
  const missing=rows.filter(x=>!x.resolved?.shipper).length;
  document.getElementById('communeDetailSummary').innerHTML=`<div class="setupMetric"><b>${routes.length}</b><span>ẤP/KHU VỰC</span></div><div class="setupMetric"><b>${assigned}</b><span>CÓ NGƯỜI</span></div><div class="setupMetric"><b>${offCount}</b><span>OFF</span></div><div class="setupMetric"><b>${missing}</b><span>CẦN KIỂM TRA</span></div>`;
  document.getElementById('communeDetailRows').innerHTML=rows.map(x=>{
    const r=x.resolved?.shipper;
    const offId=x.offFixed?.id;
    const replacement=offId?off.find(o=>String(o.offId)===String(offId))?.replaceId:null;
    const repl=replacement?person(replacement):null;
    return `<div class="setupDetailRow ${r?'':'needsRunner'}"><div class="setupDetailHead"><div class="avatar">${r?(r.name||'?')[0].toUpperCase():'?'}</div><div class="grow"><b>📍 ${esc(x.route)}</b><div style="font-size:10px;color:var(--muted)">${r?'🚚 '+esc(r.name):'⚠️ Chưa có người chạy'}${x.resolved?.source?` • ${esc(x.resolved.source)}`:''}</div>${x.offFixed?`<div style="font-size:10px;color:#b91c1c">🔴 OFF: ${esc(x.offFixed.name)}${repl?' • 🔄 '+esc(repl.name):''}</div>`:''}</div><div class="setupDetailActions"><button class="miniBtn blue" onclick="quickAssignCommuneRoute(${JSON.stringify(area)},${JSON.stringify(x.route)})">${r?'✏️ Đổi':'＋ Chọn'}</button><button class="miniBtn danger" onclick="deleteRouteFromHome(${JSON.stringify(area)},${JSON.stringify(x.route)})">🗑️</button></div></div></div>`;
  }).join('')||'<div class="empty">Không có dữ liệu phù hợp.</div>';
}
function quickAssignCommuneRoute(area,route){
  const list=getAreaShippers(area);
  if(!list.length){alert('Xã này chưa có shipper trong danh sách.');return;}
  const menu=list.map((s,i)=>`${i+1}. ${s.name}${s.status==='off'?' (OFF)':''}`).join('\n');
  const answer=prompt(`Chọn shipper chạy ấp ${route}\n\n${menu}\n\nNhập số hoặc tên:`, '');
  if(answer===null)return;
  const idx=Number(answer);
  const ship=Number.isInteger(idx)&&idx>=1&&idx<=list.length?list[idx-1]:findShipperByNameInArea(area,answer.trim());
  if(!ship){alert('Không tìm thấy shipper thuộc xã này.');return;}
  const k=key(selected);
  setupRecords[k]=setupRecords[k]||{};
  setupRecords[k][area]=setupRecords[k][area]||{area,date:k,raw:'',updatedAt:new Date().toISOString(),entries:[]};
  const rec=setupRecords[k][area];
  let e=rec.entries.find(e=>(e.routes||[]).some(r=>norm(r)===norm(route)));
  if(!e){e={name:ship.name,shipperId:ship.id,routes:[route],off:false,note:'Chọn thủ công'};rec.entries.push(e);}else{e.name=ship.name;e.shipperId=ship.id;e.off=false;}
  rec.updatedAt=new Date().toISOString();
  save(); renderCommuneDetail(); renderAll();
}
function deleteRouteFromHome(area,route){
  if(!confirm(`Xóa ấp "${route}" khỏi xã ${area}?\n\nThao tác này chỉ xóa khỏi danh mục địa chỉ.`))return;
  const i=(AREAS[area]||[]).findIndex(r=>norm(r)===norm(route));
  if(i<0)return;
  AREAS[area].splice(i,1);
  shippers.forEach(s=>{if(s.area===area)s.routes=(s.routes||[]).filter(r=>norm(r)!==norm(route));});
  save(); renderCommuneDetail(); renderAll();
}

function renderAreas(){
  const box=document.getElementById('areaEditor'); if(!box)return;
  document.getElementById('areaSource').textContent=AREA_SOURCE;
  box.innerHTML=Object.entries(AREAS).map(([area,routes])=>`<div class="card areaCard"><div class="areaCardHead"><div><b>🏘️ ${area}</b><span class="sourceTag">${routes.length} đơn vị</span></div><button class="miniBtn danger" onclick="deleteArea(${JSON.stringify(area)})">Xóa đơn vị</button></div><div class="areaGrid">${routes.map((r,i)=>`<div class="areaItem"><input class="input" value="${r.replace(/"/g,'&quot;')}" onchange="renameRoute(${JSON.stringify(area)},${i},this.value)"><button class="miniBtn light" onclick="deleteRoute(${JSON.stringify(area)},${i})">×</button></div>`).join('')}<button class="miniBtn blue" onclick="addRoute(${JSON.stringify(area)})">＋ Thêm ấp</button></div></div>`).join('');
}
function renameRoute(area,i,value){value=value.trim();if(!value)return;const old=AREAS[area][i];AREAS[area][i]=value;shippers.forEach(s=>{if(s.area===area)s.routes=s.routes.map(r=>r===old?value:r)});save();renderAreas();renderAll()}
function addRoute(area){let v=prompt('Tên ấp/khóm mới:');if(v&&v.trim()){AREAS[area].push(v.trim());save();renderAreas();renderAll()}}
function deleteRoute(area,i){if(confirm('Xóa ấp/khóm này khỏi danh mục?')){const old=AREAS[area][i];AREAS[area].splice(i,1);shippers.forEach(s=>{if(s.area===area)s.routes=s.routes.filter(r=>r!==old)});save();renderAreas();renderAll()}}
function addArea(){let a=prompt('Tên xã/thị trấn cũ:');if(a&&a.trim()&&!AREAS[a.trim()]){AREAS[a.trim()]=[];save();renderAreas();renderAll()}}
function deleteArea(area){if(confirm(`Xóa đơn vị ${area} khỏi danh mục?`)){delete AREAS[area];shippers.forEach(s=>{if(s.area===area){s.area='';s.routes=[]}});save();renderAreas();renderAll()}}
function closeM(id){document.getElementById(id).classList.remove("show")}
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("show")}));
day.onchange=month.onchange=year.onchange=dateChanged;document.getElementById("pasteDay")?.addEventListener("change",renderPasteStatus);document.getElementById("pasteMonthYear")?.addEventListener("change",renderPasteStatus);document.getElementById("pasteArea")?.addEventListener("change",onPasteAreaChange);
document.addEventListener("DOMContentLoaded",async()=>{
  setupDate();setupPasteDate();
  window.shipAreaCloudRefreshStatus?.();
  try{
    const cloud=await window.shipAreaCloudLoad?.();
    // Chỉ ghi đè dữ liệu local khi Supabase thực sự có dữ liệu.
    // Nếu cloud đang trống, tuyệt đối không apply payload rỗng vì sẽ làm danh sách shipper biến mất sau F5.
    if(cloud?.meta?.hasData){
      window.shipAreaApplyCloud?.(cloud.payload);
    }else if(cloud && cloud.meta && !cloud.meta.hasData){
      // Cloud trống: giữ dữ liệu local. Nếu local có dữ liệu thì đẩy lên cloud một lần.
      const local=window.shipAreaGetPayload?.();
      if(local && (local.shippers?.length || Object.keys(local.areas||{}).length || Object.keys(local.schedules||{}).length || Object.keys(local.setupRecords||{}).length)){
        try{ await window.shipAreaCloudSave?.(local); }catch(syncErr){ console.warn("Supabase initial sync:",syncErr); }
      }
    }
  }catch(e){ console.warn("Supabase load:",e); }
  autoRetireLongOffShippers(true);
  renderAll();
});

window.shipAreaAfterCloudLoad=()=>{try{renderAll()}catch(e){console.warn(e)}};
