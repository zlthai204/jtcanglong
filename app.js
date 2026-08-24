
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
      const assigned=shippers.filter(s=>s.area===area&&s.routes.includes(route)&&s.status==="work");
      const offPeople=assigned.filter(s=>off.some(o=>o.offId===s.id));
      if(offPeople.length && !offPeople.every(s=>{const o=off.find(x=>x.offId===s.id);return o&&o.replaceId&&person(o.replaceId)?.status==="work"})){
        warnings.push({area,route,people:offPeople.map(s=>s.name)});
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
    out+=`<div class="card commune ${hasWarning?'warningRoute':''}"><div class="communeHead"><div><div class="communeName">🏘️ ${area}</div><small>${routes.length} ấp / khu vực</small></div><span class="badge ${hasWarning?'off':'work'}">${hasWarning?'⚠️ Có ấp cần chạy thế':running+' đang chạy'}</span></div><div class="communeBody">`;
    filtered.forEach(route=>{
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
  if(id){let s=person(id);Object.assign(s,{name,phone:sphone.value.trim(),status:sstatus.value,area,routes})}
  else shippers.push({id:"S"+Date.now(),name,phone:sphone.value.trim(),status:sstatus.value,area,routes});
  save();closeM("shipperModal");renderAll();
}
function editShipper(id){openShipper(id)}
function deleteShipper(id){if(confirm("Xóa shipper này?")){shippers=shippers.filter(s=>s.id!==id);save();renderAll()}}

function renderShippers(){
  const q=norm(document.getElementById("shipperSearch")?.value||"");
  let arr=shippers.filter(s=>!q||norm(s.name).includes(q)||norm(s.phone).includes(q)||norm(s.area).includes(q)||s.routes.some(r=>norm(r).includes(q)));
  shipperList.innerHTML=arr.length?arr.map(s=>`<div class="shipperRow"><div class="avatar">${s.name[0].toUpperCase()}</div><div class="grow"><b>${s.name}</b><div style="font-size:11px;color:var(--muted)">${s.phone||"Chưa có SĐT"} • ${s.area} • ${s.routes.join(", ")}</div></div><span class="badge ${s.status==="work"?"work":"off"}">${s.status==="work"?"Đang chạy":"Không hoạt động"}</span><button class="btn light" onclick="openShipper('${s.id}')">Sửa</button><button class="btn danger" onclick="deleteShipper('${s.id}')">Xóa</button></div>`).join(""):`<div class="empty">Không tìm thấy shipper.</div>`;
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
function onPasteAreaChange(){const area=document.getElementById('pasteArea')?.value||'';const box=document.getElementById('pastePreview');if(!area){box.innerHTML='<div class="empty">Hãy chọn xã trước khi phân tích. Hệ thống sẽ lấy đúng danh sách ấp và shipper của xã đó.</div>';return} const routes=AREAS[area]||[]; box.innerHTML='<div class="pasteHint">🏠 Đang chọn <b>'+esc(area)+'</b>. Danh sách ấp bên dưới là toàn bộ ấp của xã; khi phân tích, hệ thống sẽ tự ghép shipper đã lưu lên từng ấp.</div>'+routes.map(r=>{const ss=findEffectiveRunner(area,r);const runner=ss?.shipper;return `<div class="previewRouteRow"><div><div class="previewRouteName">📍 ${esc(r)}</div><small>${runner?'👤 '+esc(runner.name):'Chưa có người chạy'}</small></div>${runner?'<span class="previewAssigned">🚚 '+esc(runner.name)+(ss.source==='Lịch đã dán'?' • từ lịch dán':'')+'</span>':'<span class="previewUnassigned">Chưa gán</span>'}</div>`}).join('');}
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
  const options=shippers.map(s=>`${s.id}|||${s.name}`).join('\n');
  const current=e.name||''; const nm=prompt('Tên shipper cho ngày này:',current); if(nm===null)return;
  const ship=findShipperByName(nm.trim()); e.name=ship?ship.name:nm.trim(); e.shipperId=ship?.id||'';
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
  let clean=raw.replace(/^\s*(?:ấp|ốp|ap)\s+/i,'').replace(/\s+/g,' ').trim();
  if(!area||!clean)return null;
  let existing=findRoute(area,clean); if(existing)return existing;
  // Chỉ tự thêm khi dòng có dấu hiệu là địa chỉ ấp/khóm, tránh biến tên người thành ấp.
  const addressLike=/\b(ấp|ốp|ap|khóm|khu phố|kp)\b/i.test(raw)||/\b\d+\b/.test(clean);
  if(!addressLike)return null;
  AREAS[area]=AREAS[area]||[];
  if(!AREAS[area].some(r=>norm(r)===norm(clean))){AREAS[area].push(clean);save()}
  return clean;
}
function parsePaste(){
  let text=document.getElementById('pasteText').value.trim();
  if(!text){alert('Dán lịch trước.');return}
  const area=document.getElementById('pasteArea')?.value||'';
  if(!area){alert('Hãy chọn xã cần dán lịch trước.');return}
  let dateMatch=text.match(/(\d{1,2})[\/.\-](\d{1,2})(?:[\/.\-](\d{4}))?/);
  let fallback=getPasteDate(), date=dateMatch?`${dateMatch[1]}/${dateMatch[2]}/${dateMatch[3]||fallback.getFullYear()}`:fmt(fallback);
  let lines=text.replace(/\r/g,'').split(/\n+/).map(x=>x.trim()).filter(Boolean),entries=[],autoAdded=[];
  lines.forEach(line=>{
    const originalLine=line; line=cleanHeaderLine(line); if(!line)return;
    if(/^(?:xã|thị trấn|tt)\b/i.test(line))return;
    if(/^(?:thứ|thu)\s*\d/i.test(originalLine)&&/\d{1,2}[\/.\-]\d{1,2}/.test(originalLine))return;
    let known=findKnownShipperInText(line), off=/\b(off|nghi|nghỉ)\b/i.test(line);
    if(known){
      let rhs=line.replace(new RegExp(known.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'),'').replace(/^[\s:：–-]+/,'').trim();
      if(off)entries.push({name:known.name,routes:[],off:true});
      else entries.push({name:known.name,routes:rhs?resolveRoutes(area,rhs,autoAdded):known.routes.filter(r=>AREAS[area]?.some(ar=>norm(ar)===norm(r))),off:false});
      return;
    }
    let m=line.match(/^([^:：–-]{1,50}?)\s*[:：–-]\s*(.+)$/);
    if(m){let name=m[1].trim(),rhs=m[2].trim(),ss=findShipperByName(name);if(/^(off|nghi|nghỉ)$/i.test(rhs))entries.push({name:ss?.name||name,routes:[],off:true});else entries.push({name:ss?.name||name,routes:resolveRoutes(area,rhs,autoAdded),off:false});return}
    if(off){let nm=line.replace(/\b(off|nghi|nghỉ)\b/i,'').trim(),ss=findShipperByName(nm);entries.push({name:ss?ss.name:nm,routes:[],off:true});return}
    let natural=line.match(/^(.+?)\s+(?:ấp|ốp|ap|khóm|khu phố|kp)\s+(.+)$/i);
    if(natural){let nm=natural[1].trim(),rr=resolveNaturalRoutes(area,natural[2].trim(),autoAdded),ss=findShipperByName(nm);if(rr.routes.length){entries.push({name:ss?.name||nm,routes:rr.routes,off:false,auto:true,unmatched:!ss});return}}
    let assignedRoute=findRoute(area,line)||autoAddRoute(area,line);
    if(assignedRoute){let ss=findEffectiveRunner(area,assignedRoute)?.shipper;entries.push({name:ss?.name||'',routes:[assignedRoute],off:false,auto:true,unmatched:!ss});return}
    let parts=line.split(/\s{2,}|\t+/).filter(Boolean);
    if(parts.length>=2){let ss=findShipperByName(parts[0].trim());entries.push({name:ss?.name||parts[0].trim(),routes:resolveRoutes(area,parts.slice(1).join(' '),autoAdded),off:false});}
  });
  entries=entries.filter(e=>e.name||e.auto);
  const expanded=[];
  entries.forEach(e=>{if(e.off||!e.routes?.length){expanded.push(e);return} e.routes.forEach(route=>{let ss=findEffectiveRunner(area,route)?.shipper||findShipperByName(e.name);expanded.push({...e,name:ss?.name||e.name||'',shipperId:ss?.id||'',routes:[route],unmatched:!ss})})});
  entries=expanded; parsedSchedule={date,area,entries,raw:text,autoAdded:[...new Set(autoAdded)]};
  const knownEntries=entries.filter(e=>e.name&&!e.unmatched),routeTotal=[...new Set(entries.flatMap(e=>e.routes||[]))].length,autoCount=[...new Set(autoAdded)].length,offCount=entries.filter(e=>e.off).length,unknownCount=entries.filter(e=>!e.name||e.unmatched).length;
  let notes=['<div class="analysisNote analysisOk">✓ Đã chọn xã <b>'+esc(area)+'</b>. Mọi ấp và shipper được đối chiếu trong xã này.</div>'];
  if(autoCount)notes.push('<div class="analysisNote analysisWarn">🆕 Tự đối chiếu/thêm ấp: '+[...new Set(autoAdded)].map(esc).join(', ')+'.</div>');
  if(unknownCount)notes.push('<div class="analysisNote analysisWarn">⚠️ Có '+unknownCount+' ấp chưa có shipper đã lưu trong xã.</div>');
  document.getElementById('parseMessage').innerHTML=`<b>Phân tích hợp lệ</b><div class="analysisBox"><div class="analysisMetric"><b>${entries.length}</b><span>DÒNG / ẤP</span></div><div class="analysisMetric"><b>${knownEntries.length}</b><span>ẤP CÓ SHIPPER</span></div><div class="analysisMetric"><b>${routeTotal}</b><span>ẤP/KHU VỰC</span></div><div class="analysisMetric"><b>${offCount}</b><span>OFF</span></div></div><div class="analysisNotes">${notes.join('')}</div>`;
  pastePreview.innerHTML=entries.length?entries.map(e=>{if(e.off)return `<div class="previewRouteRow"><div><div class="previewRouteName">🔴 ${esc(e.name||'OFF')}</div><small>OFF trong ngày</small></div><span class="previewUnassigned">OFF</span></div>`;const route=e.routes?.[0]||'—',ss=e.name&&!e.unmatched?findShipperByName(e.name):null;return `<div class="previewRouteRow"><div><div class="previewRouteName">📍 ${esc(route)}</div><small>${ss?'👤 '+esc(ss.name)+' • '+esc(area):'⚠️ Chưa có shipper đã lưu'}</small></div>${runner?'<span class="previewAssigned">🚚 '+esc(runner.name)+(ss.source==='Lịch đã dán'?' • từ lịch dán':'')+'</span>':'<span class="previewUnassigned">Chưa gán</span>'}</div>`}).join(''):'<div class="empty">Không nhận diện được dòng lịch.</div>';
  renderPasteStatus();
  if(unknownCount===0 && entries.length){ setTimeout(()=>{ if(window.parsedSchedule===parsedSchedule) applyPaste(); },0); }
}
function resolveNaturalRoutes(area,text,autoAdded){
  if(!area||!text)return {routes:[]};
  let source=text.replace(/^\s*(?:ấp|ốp|ap|khóm|khu phố|kp)\s+/i,'').replace(/\s+/g,' ').trim();
  let routes=AREAS[area]||[], found=[], remaining=source;
  // Ghép tên ấp theo tên thật trong danh mục, ưu tiên tên dài để xử lý tốt
  // các địa danh nhiều từ như "Thanh Bình", "Ngã Hậu", "Tân Định".
  let ordered=routes.slice().sort((a,b)=>norm(b).length-norm(a).length);
  let guard=0;
  while(remaining && guard++<30){
    let rn=norm(remaining), hit=null, hitStart=Infinity;
    for(const r of ordered){
      let rr=norm(r).replace(/^(ap|op)\s+/,'');
      if(!rr)continue;
      let idx=rn.indexOf(rr);
      if(idx>=0 && (idx===0 || /\s/.test(rn[idx-1])) && idx<hitStart){hit={route:r,idx,len:rr.length};hitStart=idx;}
    }
    if(!hit)break;
    if(hit.idx>0){
      let before=remaining.slice(0, hit.idx).trim();
      if(before){
        // Phần đứng trước tên ấp đã biết chỉ được giữ lại để không mất dữ liệu;
        // chưa đủ căn cứ tách thành ấp riêng nên xử lý ở bước cuối.
      }
    }
    found.push(hit.route);
    let pos=hit.idx+hit.len;
    remaining=(remaining.slice(0,hit.idx)+' '+remaining.slice(pos)).replace(/\s+/g,' ').trim();
  }
  if(remaining){
    // Không còn tên ấp chuẩn nào khớp: tự thêm phần còn lại thành ấp mới.
    // Ví dụ "Thanh Bình Ngã Hậu Tân Định" sẽ được tách đúng nếu 3 tên đã có;
    // nếu chưa có dữ liệu thì vẫn lưu nguyên chuỗi để người dùng sửa trong Danh mục địa chỉ.
    let clean=remaining.replace(/^\s*(?:ấp|ốp|ap|khóm|khu phố|kp)\s+/i,'').trim();
    if(clean){
      let rr=findRoute(area,clean)||autoAddRoute(area,clean);
      if(rr){found.push(rr);autoAdded.push(rr);}
    }
  }
  return {routes:[...new Set(found)]};
}
function resolveRoutes(area,rhs,autoAdded){
  let raw=expandRouteNames(rhs), out=[];
  raw.forEach(r=>{
    let natural=resolveNaturalRoutes(area,r,autoAdded);
    if(natural.routes.length>1){out.push(...natural.routes);return}
    let rr=area&&findRoute(area,r);
    if(!rr)rr=area&&autoAddRoute(area,r);
    if(rr){out.push(rr);if(!AREAS[area].some(x=>norm(x)===norm(rr)))autoAdded.push(rr);}
    else out.push(r);
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
  const n=norm(route);
  const d=date||selected;
  const dk=typeof d==='string'?d:key(d);
  const offIds=new Set((schedules[dk]||[]).map(x=>String(x.offId)));
  // 1) Ưu tiên phân công cố định trong danh sách shipper nếu người đó đang chạy.
  const direct=shippers.filter(s=>s.status==='work'&&!offIds.has(String(s.id))&&s.area===area&&s.routes.some(r=>norm(r)===n));
  if(direct.length===1)return direct[0];
  // 2) Nếu chưa có người, hoặc người cố định đang OFF, lấy theo lịch đã DÁN của đúng ngày.
  const rec=setupRecords[dk]?.[area];
  const pasted=[];
  (rec?.entries||[]).forEach(e=>{
    if(e.off||!e.name)return;
    if((e.routes||[]).some(r=>norm(r)===n)){
      const s=person(e.shipperId)||findShipperByName(e.name);
      if(s&&!offIds.has(String(s.id))&&s.status==='work')pasted.push(s);
    }
  });
  const unique=[...new Map(pasted.map(s=>[s.id,s])).values()];
  if(unique.length===1)return unique[0];
  return null;
}
function findEffectiveRunner(area,route,date=null){
  const d=date||selected;
  const dk=typeof d==='string'?d:key(d);
  const offIds=new Set((schedules[dk]||[]).map(x=>String(x.offId)));
  const fixed=shippers.filter(s=>s.area===area&&s.routes.some(r=>norm(r)===norm(route)));
  const working=fixed.filter(s=>s.status==='work'&&!offIds.has(String(s.id)));
  if(working.length===1)return {shipper:working[0],source:'Danh sách shipper'};
  const rec=setupRecords[dk]?.[area];
  const pasted=[];
  (rec?.entries||[]).forEach(e=>{
    if(e.off||!e.name)return;
    if((e.routes||[]).some(r=>norm(r)===norm(route))){
      const s=person(e.shipperId)||findShipperByName(e.name);
      if(s&&!offIds.has(String(s.id))&&s.status==='work')pasted.push(s);
    }
  });
  const unique=[...new Map(pasted.map(s=>[s.id,s])).values()];
  if(unique.length===1)return {shipper:unique[0],source:'Lịch đã dán'};
  return {shipper:null,source:unique.length?'Lịch đã dán có nhiều người':'Chưa có dữ liệu'};
}
function applyPaste(){
  if(!parsedSchedule)parsePaste(); if(!parsedSchedule||!parsedSchedule.entries.length)return;
  let area=parsedSchedule.area; if(!area){alert('Không tìm thấy xã trong nội dung lịch. Hãy ghi rõ tên xã, ví dụ: “xã Bình Phú”.');return}
  let dateParts=parsedSchedule.date?.split('/'), pd=getPasteDate();
  if(dateParts){let dd=+dateParts[0],mm=+dateParts[1]-1,yy=+(dateParts[2]||pd.getFullYear());pd=new Date(yy,mm,dd)}
  let missing=[],matched=[],appliedEntries=[];
  parsedSchedule.entries.forEach(e=>{
    if(e.off){let ss=findShipperByName(e.name);if(ss){let k=key(pd),arr=schedules[k]||[];if(!arr.some(x=>x.offId===ss.id))arr.push({offId:ss.id,replaceId:'',note:'Dán lịch tự động'});schedules[k]=arr;matched.push(ss.name);appliedEntries.push({...e,name:ss.name,shipperId:ss.id});}else{missing.push('OFF: '+e.name);appliedEntries.push({...e});}return}
    let ss=findShipperByName(e.name);if(!ss&&e.routes.length===1)ss=findEffectiveRunner(area,e.routes[0],pd)?.shipper||null;
    if(!ss){missing.push(`Chưa tìm được shipper đã lưu cho: ${e.routes.join(', ')}`);appliedEntries.push({...e});return}
    ss.area=area;e.routes.forEach(raw=>{let rr=findRoute(area,raw)||autoAddRoute(area,raw);if(rr&&!ss.routes.includes(rr))ss.routes.push(rr);else if(!rr)missing.push(`${ss.name}: không tìm thấy ấp "${raw}" trong ${area}`)});matched.push(ss.name);appliedEntries.push({...e,name:ss.name,shipperId:ss.id});
  });
  let k=pasteKey(pd);pasteLog[k]=[...new Set([...(pasteLog[k]||[]),area])];
  saveSetupRecord(pd,area,appliedEntries,parsedSchedule.raw,parsedSchedule.autoAdded);
  save(); selected=pd; syncDate(); renderAll(); renderPasteStatus();
  document.getElementById('parseMessage').innerHTML=`<b>✓ Đã áp dụng xã ${area} cho ngày ${fmt(pd)}.</b> Ghép được: ${[...new Set(matched)].join(', ')||'—'}. ${parsedSchedule.autoAdded?.length?`🆕 Tự thêm/đối chiếu ấp: ${[...new Set(parsedSchedule.autoAdded)].join(', ')}. `:''}${missing.length?`⚠️ ${missing.join(' | ')}`:'Không phát sinh địa chỉ/shipper chưa khớp.'}`;
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
  let data=getOff(),missing=data.filter(x=>!x.replaceId).length,byArea={};
  data.forEach(x=>{let s=person(x.offId);if(s)byArea[s.area]=(byArea[s.area]||0)+1});
  const warnings=[];
  Object.entries(AREAS).forEach(([area,routes])=>routes.forEach(route=>{
    const assigned=shippers.filter(s=>s.area===area&&s.routes.includes(route)&&s.status==="work");
    const offPeople=assigned.filter(s=>data.some(o=>o.offId===s.id));
    if(offPeople.length && !offPeople.every(s=>{const o=data.find(x=>x.offId===s.id);return o?.replaceId&&person(o.replaceId)?.status==="work"}))
      warnings.push({area,route,people:offPeople.map(x=>x.name)});
  }));
  statsDetail.innerHTML=`<div class="stats"><div class="card stat"><strong>${data.length}</strong><span>OFF</span></div><div class="card stat"><strong>${missing}</strong><span>Chưa có người thay</span></div><div class="card stat"><strong>${data.length-missing}</strong><span>Đã có người thay</span></div><div class="card stat"><strong>${warnings.length}</strong><span>Ấp/xã cần chạy thế</span></div></div>
  <div class="${warnings.length?'warningBanner':''}">${warnings.length?`<div style="font-size:24px">🚨</div><div><b>CẢNH BÁO: ${warnings.length} ẤP/XÃ CHƯA CÓ NGƯỜI CHẠY THẾ</b><div style="font-size:11px;margin-top:4px">Shipper OFF nhưng khu vực phụ trách chưa được phủ bởi người thay.</div></div>`:""}</div>
  <h3 style="margin:18px 0 8px">⚠️ Khu vực cần xử lý</h3>
  ${warnings.length?warnings.map(w=>`<div class="warningRoute" style="padding:11px 12px;border-radius:11px;margin:6px 0"><b>${w.area}</b> <span style="color:#9a3412">• ${w.route}</span><div style="font-size:11px;margin-top:3px">Shipper OFF: ${w.people.join(", ")}</div></div>`).join(""):"<div class='empty'>🎉 Tất cả ấp đang có người chạy hoặc đã có người thay.</div>"}
  <h3 style="margin:18px 0 8px">🔴 OFF theo xã</h3>${Object.keys(byArea).length?Object.entries(byArea).map(([a,n])=>`<div style="padding:10px 12px;border-bottom:1px solid var(--line)"><b>${a}</b><span style="float:right;font-weight:900">${n}</span></div>`).join(""):"<div class='empty'>Không có OFF.</div>"}`;
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
  try{ const cloud=await window.shipAreaCloudLoad?.(); if(cloud?.payload?.shippers||cloud?.payload?.areas||cloud?.payload?.schedules||cloud?.payload?.pasteLog||cloud?.payload?.setupRecords){ window.shipAreaApplyCloud?.(cloud.payload); } }catch(e){ console.warn("Supabase load:",e); }
  renderAll();
});

window.shipAreaAfterCloudLoad=()=>{try{renderAll()}catch(e){console.warn(e)}};
