
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

// DANH MỤC CHUẨN: huyện Càng Long cũ có đúng 14 đơn vị cấp xã/thị trấn.
// Mọi biến thể có tiền tố "Xã " / tên xã mới đều được quy về 14 tên chuẩn bên dưới.
const CANONICAL_AREAS=["Thị trấn Càng Long","Tân An","Đại Phước","An Trường","An Trường A","Đức Mỹ","Bình Phú","Tân Bình","Phương Thạnh","Mỹ Cẩm","Huyền Hội","Nhị Long","Nhị Long Phú","Đại Phúc"];
const AREA_ALIAS={
  "cang long":"Thị trấn Càng Long","thi tran cang long":"Thị trấn Càng Long",
  "xa cang long":"Thị trấn Càng Long","xã càng long":"Thị trấn Càng Long",
  "xa tan an":"Tân An","xã tân an":"Tân An","xa dai phuoc":"Đại Phước","xã đại phước":"Đại Phước",
  "xa an truong":"An Trường","xã an trường":"An Trường","xa an truong a":"An Trường A","xã an trường a":"An Trường A",
  "xa duc my":"Đức Mỹ","xã đức mỹ":"Đức Mỹ","xa binh phu":"Bình Phú","xã bình phú":"Bình Phú",
  "xa tan binh":"Tân Bình","xã tân bình":"Tân Bình","xa phuong thanh":"Phương Thạnh","xã phương thạnh":"Phương Thạnh",
  "xa my cam":"Mỹ Cẩm","xã mỹ cẩm":"Mỹ Cẩm","xa huyen hoi":"Huyền Hội","xã huyền hội":"Huyền Hội",
  "xa nhi long":"Nhị Long","xã nhị long":"Nhị Long","xa nhi long phu":"Nhị Long Phú","xã nhị long phú":"Nhị Long Phú",
  "xa dai phuc":"Đại Phúc","xã đại phúc":"Đại Phúc"
};
function canonicalAreaName(name){
  const areaNorm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
  const raw=String(name||"").trim();
  if(!raw)return "";
  const n=areaNorm(raw.replace(/^xã\s+/i,"").replace(/^thị trấn\s+/i,"").trim());
  const exact=CANONICAL_AREAS.find(a=>areaNorm(a)===n);
  if(exact)return exact;
  const alias=AREA_ALIAS[areaNorm(raw)];
  return alias||"";
}
function canonicalizeAreas(source){
  const out={};
  CANONICAL_AREAS.forEach(a=>out[a]=[]);
  Object.entries(source||{}).forEach(([raw,routes])=>{
    const area=canonicalAreaName(raw);
    if(!area)return; // loại bỏ xã mới/biến thể không thuộc 14 đơn vị chuẩn
    const list=Array.isArray(routes)?routes:[];
    out[area]=[...new Set([...out[area],...list.map(x=>String(x||"").trim()).filter(Boolean)])];
  });
  return out;
}
const AREA_SOURCE='Địa bàn huyện Càng Long (Trà Vinh cũ) — đối chiếu QĐ 13/2024/QĐ-UBND và hồ sơ quy hoạch địa phương; dữ liệu có thể chỉnh sửa theo thực tế giao nhận.';
let AREAS=canonicalizeAreas(JSON.parse(localStorage.getItem('SA_AREAS')||'null')||structuredClone(DEFAULT_AREAS));
localStorage.setItem('SA_AREAS',JSON.stringify(AREAS));

let shippers=JSON.parse(localStorage.getItem("SA_SHIPPERS")||"null")||[
{id:"S1",name:"Nguyễn A",phone:"",status:"work",area:"Đại Phước",routes:["Ấp Rạch Dừa"]},
{id:"S2",name:"Nguyễn B",phone:"",status:"work",area:"Đại Phước",routes:["Ấp Rạch Sen"]},
{id:"S3",name:"Nguyễn C",phone:"",status:"work",area:"Đại Phước",routes:["Ấp Long Hòa"]}
];

// Chuẩn hóa dữ liệu cũ: chỉ giữ đúng 14 xã/thị trấn chuẩn, gộp mọi biến thể/trùng tên.
function normalizeAllData(){
  const oldAreas=AREAS||{};
  AREAS=canonicalizeAreas(oldAreas);
  shippers=(Array.isArray(shippers)?shippers:[]).map(s=>{
    const area=canonicalAreaName(s.area)||s.area||"";
    const routes=Array.isArray(s.routes)?s.routes:[];
    const valid=AREAS[area]||[];
    return {...s,area,routes:[...new Set(routes.map(String).filter(r=>valid.some(v=>norm(v)===norm(r))))]};
  });
  localStorage.setItem("SA_AREAS",JSON.stringify(AREAS));
  localStorage.setItem("SA_SHIPPERS",JSON.stringify(shippers));
}

let schedules=JSON.parse(localStorage.getItem("SA_SCHEDULES")||"{}");
let pasteLog=JSON.parse(localStorage.getItem("SA_PASTE_LOG")||"{}");
let setupRecords=JSON.parse(localStorage.getItem("SA_SETUP_RECORDS")||"{}");
let selected=new Date(), parsedSchedule=null, allOpen=false, dutySelectedShift=null, dutyManagerDay=null, dutyTimer=null, dutyFollowToday=true;
// v20: trạng thái UI luôn tồn tại ở window để render lại không làm mất trạng thái.
window.openCommuneArea=window.openCommuneArea??null;
window._areaEditorOpen=window._areaEditorOpen??null;
let dutyAttendance=JSON.parse(localStorage.getItem("SA_DUTY_ATTENDANCE")||"{}");
let dutyReportMode=false;
window.shipAreaGetPayload=()=>({shippers,schedules,areas:AREAS,pasteLog,setupRecords,dutyAttendance,dutyRoster:DUTY});
window.shipAreaApplyCloud=(p)=>{
  if(p.shippers)shippers=p.shippers;
  if(p.schedules)schedules=p.schedules;
  if(p.areas){
    const cloudAreas=p.areas||{};
    const localAreas=JSON.parse(localStorage.getItem("SA_AREAS")||"null")||{};
    // Không bao giờ để dữ liệu cloud thiếu ấp làm mất danh mục đang có.
    // Ưu tiên: cloud có ấp > local có ấp > DEFAULT_AREAS. Xã vẫn được giữ lại dù mảng ấp rỗng.
    const merged=canonicalizeAreas(DEFAULT_AREAS);
    const cloudCanonical=canonicalizeAreas(cloudAreas);
    const localCanonical=canonicalizeAreas(localAreas);
    CANONICAL_AREAS.forEach(area=>{
      const cloudRoutes=cloudCanonical[area]||[];
      const localRoutes=localCanonical[area]||[];
      const defaultRoutes=DEFAULT_AREAS[area]||[];
      merged[area]=[...new Set(cloudRoutes.length?cloudRoutes:(localRoutes.length?localRoutes:defaultRoutes))];
    });
    AREAS=merged;
    localStorage.setItem('SA_AREAS',JSON.stringify(AREAS));
  }
  if(p.pasteLog)pasteLog=p.pasteLog;
  if(p.setupRecords)setupRecords=p.setupRecords;
  if(p.dutyAttendance && Object.keys(p.dutyAttendance).length)dutyAttendance=p.dutyAttendance;
  if(p.dutyRoster && p.dutyRoster.ca1 && p.dutyRoster.ca2 && p.dutyRoster.ca3){DUTY=p.dutyRoster;localStorage.setItem("SA_DUTY_ROSTER",JSON.stringify(DUTY));}
  localStorage.setItem("SA_SHIPPERS",JSON.stringify(shippers));
  localStorage.setItem("SA_SCHEDULES",JSON.stringify(schedules));
  localStorage.setItem("SA_AREAS",JSON.stringify(AREAS));
  localStorage.setItem("SA_PASTE_LOG",JSON.stringify(pasteLog));
  localStorage.setItem("SA_SETUP_RECORDS",JSON.stringify(setupRecords));
  localStorage.setItem("SA_DUTY_ATTENDANCE",JSON.stringify(dutyAttendance));
  populatePasteAreas();
  renderAll();
  window.shipAreaAfterCloudLoad?.();
};

const norm=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/'/g,'&#39;');
const key=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const fmt=d=>d.toLocaleDateString("vi-VN",{weekday:"long",day:"2-digit",month:"2-digit",year:"numeric"});
const getOff=()=>schedules[key(selected)]||[];
const person=id=>shippers.find(x=>x.id===id);
const save=()=>{
  const payload={shippers,schedules,areas:AREAS,pasteLog,setupRecords,dutyAttendance};
  localStorage.setItem("SA_SHIPPERS",JSON.stringify(shippers));
  localStorage.setItem("SA_SCHEDULES",JSON.stringify(schedules));
  localStorage.setItem("SA_AREAS",JSON.stringify(AREAS));
  localStorage.setItem("SA_PASTE_LOG",JSON.stringify(pasteLog));
  localStorage.setItem("SA_SETUP_RECORDS",JSON.stringify(setupRecords));
  window.shipAreaCloudSave?.(payload);
};


function setupDate(){
  const day=document.getElementById("day"),month=document.getElementById("month"),year=document.getElementById("year"); if(!day||!month||!year)return;
  day.innerHTML=Array.from({length:31},(_,i)=>`<option value="${i+1}">Ngày ${i+1}</option>`).join("");
  month.innerHTML=Array.from({length:12},(_,i)=>`<option value="${i}">Tháng ${i+1}</option>`).join("");
  const y=new Date().getFullYear();year.innerHTML=Array.from({length:8},(_,i)=>`<option>${y-2+i}</option>`).join("");
  syncDate();
}
function syncDate(){const day=document.getElementById("day"),month=document.getElementById("month"),year=document.getElementById("year");if(!day||!month||!year)return;day.value=selected.getDate();month.value=selected.getMonth();year.value=selected.getFullYear();document.getElementById("offDate")&&(document.getElementById("offDate").textContent=fmt(selected));document.getElementById("dateInfo")&&(document.getElementById("dateInfo").textContent=fmt(selected));document.getElementById("sideDateLabel")&&(document.getElementById("sideDateLabel").textContent=fmt(selected));document.getElementById("dateInfoMobile")&&(document.getElementById("dateInfoMobile").textContent=fmt(selected))}
function dateChanged(){const day=document.getElementById("day"),month=document.getElementById("month"),year=document.getElementById("year");if(!day||!month||!year)return;let y=+year.value,m=+month.value,d=Math.min(+day.value,new Date(y,m+1,0).getDate());selected=new Date(y,m,d);dutyManagerDay=selected.getDay();dutyFollowToday=key(selected)===key(new Date());syncDate();renderAll()}
function today(){selected=new Date();dutyManagerDay=selected.getDay();dutyFollowToday=true;syncDate();renderAll()}

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


/* ================= TRỰC XE ================= */
const DEFAULT_DUTY={
  ca1:{label:"CA 1",time:"04:30 – 07:30",source:"Hàng đầu — Lịch trực xe CA 1 + CA 3",days:{
    1:["Võ Thanh Điền","Nguyễn Văn Trung","Nguyễn Đức Huy","Nguyễn Hiếu","Dương Quốc Nhân","Nguyễn Hồng Định","Đồng Công Thành","Phạm Văn Mến","Bánh Trung Hào","Huỳnh Chí Thoại"],
    2:["Nguyễn Hoàng Lâm","Nguyễn Chí Linh","Phan Trọng Phúc","Ngô Lê Hải Bằng","Đoàn Hoàng Nghĩa","Phan Thanh Phong","Nguyễn Văn Phi","Diệp Xuân Quỳnh","Nguyễn Thành Trung","Nguyễn Văn Trường"],
    3:["Lê Văn Chí Tâm","Nguyễn Bùi Thanh Huy","Phạm Tùng Duy","Huỳnh Văn Tân","Nguyễn Minh Nhựt","Nguyễn Phước Lộc","Huỳnh Minh Thương","Lê Hoài Vinh","Trương Minh Nhựt","Huỳnh Phước Nhanh"],
    4:["Cao Minh Giang","Võ Hoài Sơn","Nguyễn Ngọc Thuận","Nguyễn Thanh Tùng","Nguyễn Phúc Nguyên","Trần Nguyễn Hoàng Phúc","Trương Văn Đa","Cao Quốc Thái","Nguyễn Hoài Nam","Thang Bảo Khánh"],
    5:["Nguyễn Duy Phương","Phạm Quỳnh Lên","Cao Hoàng Nhân","Biện Hoàng Mỹ","Phạm Minh Truyền","Phan Hoàng Vinh","Cao Hoà Phúc","Nguyễn Mộng Hải","Nguyễn Lê Nguyên Bảo","Nguyễn Huỳnh Thảo Nguyên"],
    6:["Nguyễn Minh Nghĩa","Phan Thanh Thoại","Trần Thành Đạt","Châu Hoàng Giang","Nguyễn Quốc Vinh","Võ Văn Hiền","Trần Vũ Cẩn","Nguyễn Thanh Huy","Nguyễn Hoàng Bửu","Nguyễn Vũ Trương"],
    0:["Nguyễn Văn Đông","Bùi Quang Thịnh","Nguyễn Trường Giang","Nguyễn Văn Phú","Nguyễn Văn Phúc","Nguyễn Phan Bảo Duy","Lê Văn Nhật Duy","Võ Minh Kha","Tiêu Văn Phúc","Nguyễn Thái Tuyên"]
  }},
  ca2:{label:"CA 2",time:"08:00 – 13:30",source:"Hàng dưới — Lịch trực xe CA 2",days:{
    1:["Võ Văn Thái","Trần Hoài Phong","Lê Thanh Tùng","Nguyễn Trịnh Đình Thái","Nguyễn Việt Hưng","Biện Tuấn Khang","Trần Minh Trí","Lê Văn Luân","Huỳnh Thanh Nhã","Nguyễn Hoàng An"],
    2:["Nguyễn Quốc Thắng","Nguyễn Tài Linh","Phạm Văn Thanh Hải","Đoàn Văn Tín","Nguyễn Việt Hưng","Biện Tuấn Khang","Trần Minh Trí","Lê Văn Luân","Huỳnh Thanh Nhã","Nguyễn Hoàng An"],
    3:["Nguyễn Quốc Thắng","Nguyễn Tài Linh","Phạm Văn Thanh Hải","Đoàn Văn Tín","Võ Văn Thái","Trần Hoài Phong","Lê Thanh Tùng","Nguyễn Trịnh Đình Thái","Huỳnh Thanh Nhã","Nguyễn Hoàng An"],
    4:["Phạm Văn Thanh Hải","Đoàn Văn Tín","Võ Văn Thái","Trần Hoài Phong","Lê Thanh Tùng","Nguyễn Trịnh Đình Thái","Nguyễn Việt Hưng","Biện Tuấn Khang","Trần Minh Trí","Lê Văn Luân"],
    5:["Nguyễn Quốc Thắng","Nguyễn Tài Linh","Lê Thanh Tùng","Nguyễn Trịnh Đình Thái","Nguyễn Việt Hưng","Biện Tuấn Khang","Trần Minh Trí","Lê Văn Luân","Huỳnh Thanh Nhã","Nguyễn Hoàng An"],
    6:["Nguyễn Quốc Thắng","Nguyễn Tài Linh","Phạm Văn Thanh Hải","Đoàn Văn Tín","Võ Văn Thái","Trần Hoài Phong","Trần Minh Trí","Lê Văn Luân","Huỳnh Thanh Nhã","Nguyễn Quốc Thắng"],
    0:["Nguyễn Hoàng Ân","Nguyễn Tài Linh","Phạm Văn Thanh Hải","Đoàn Văn Tín","Võ Văn Thái","Trần Hoài Phong","Lê Thanh Tùng","Nguyễn Trịnh Đình Thái","Nguyễn Việt Hưng","Biện Tuấn Khang"]
  }},
  ca3:{label:"CA 3",time:"16:30 – 22:30",source:"Hàng đầu — Lịch trực xe CA 1 + CA 3",days:{
    1:["Võ Thanh Điền","Nguyễn Văn Trung","Nguyễn Đức Huy","Nguyễn Hiếu","Dương Quốc Nhân","Nguyễn Hồng Định","Đồng Công Thành","Phạm Văn Mến","Bánh Trung Hào","Huỳnh Chí Thoại"],
    2:["Nguyễn Hoàng Lâm","Nguyễn Chí Linh","Phan Trọng Phúc","Ngô Lê Hải Bằng","Đoàn Hoàng Nghĩa","Phan Thanh Phong","Nguyễn Văn Phi","Diệp Xuân Quỳnh","Nguyễn Thành Trung","Nguyễn Văn Trường"],
    3:["Lê Văn Chí Tâm","Nguyễn Bùi Thanh Huy","Phạm Tùng Duy","Huỳnh Văn Tân","Nguyễn Minh Nhựt","Nguyễn Phước Lộc","Huỳnh Minh Thương","Lê Hoài Vinh","Trương Minh Nhựt","Huỳnh Phước Nhanh"],
    4:["Cao Minh Giang","Võ Hoài Sơn","Nguyễn Ngọc Thuận","Nguyễn Thanh Tùng","Nguyễn Phúc Nguyên","Trần Nguyễn Hoàng Phúc","Trương Văn Đa","Cao Quốc Thái","Nguyễn Hoài Nam","Thang Bảo Khánh"],
    5:["Nguyễn Duy Phương","Phạm Quỳnh Lên","Cao Hoàng Nhân","Biện Hoàng Mỹ","Phạm Minh Truyền","Phan Hoàng Vinh","Cao Hoà Phúc","Nguyễn Mộng Hải","Nguyễn Lê Nguyên Bảo","Nguyễn Huỳnh Thảo Nguyên"],
    6:["Nguyễn Minh Nghĩa","Phan Thanh Thoại","Trần Thành Đạt","Châu Hoàng Giang","Nguyễn Quốc Vinh","Võ Văn Hiền","Trần Vũ Cẩn","Nguyễn Thanh Huy","Nguyễn Hoàng Bửu","Nguyễn Vũ Trương"],
    0:["Nguyễn Văn Đông","Bùi Quang Thịnh","Nguyễn Trường Giang","Nguyễn Văn Phú","Nguyễn Văn Phúc","Nguyễn Phan Bảo Duy","Lê Văn Nhật Duy","Võ Minh Kha","Tiêu Văn Phúc","Nguyễn Thái Tuyên"]
  }}
};

let DUTY=(()=>{try{const saved=JSON.parse(localStorage.getItem("SA_DUTY_ROSTER")||"null"); if(saved?.ca1&&saved?.ca2&&saved?.ca3)return saved;}catch(e){} return structuredClone(DEFAULT_DUTY)})();
function persistDutyRoster(){localStorage.setItem("SA_DUTY_ROSTER",JSON.stringify(DUTY));window.shipAreaCloudSaveDutyRoster?.(DUTY);}
function dutyRank(st){return !st.checked?1:(st.present?0:2)}
function dutySortedList(date,shift,list){return [...list].sort((a,b)=>{const ra=dutyRank(dutyState(date,shift,a)),rb=dutyRank(dutyState(date,shift,b));return ra-rb || list.indexOf(a)-list.indexOf(b)})}
function dutyAddName(day,shift,name){name=String(name||"").trim();if(!name)return;DUTY[shift].days[day]??=[];if(!DUTY[shift].days[day].some(x=>norm(x)===norm(name)))DUTY[shift].days[day].push(name);persistDutyRoster();renderDuty();renderDutyManager();}
function dutyEditName(day,shift,index,name){name=String(name||"").trim();if(!name)return;const arr=DUTY[shift].days[day]||[];if(index<0||index>=arr.length)return;const old=arr[index];arr[index]=name;Object.values(dutyAttendance||{}).forEach(byDate=>{const people=byDate?.[shift];if(people?.[old]&&!people[name]){people[name]=people[old];delete people[old];}});localStorage.setItem("SA_DUTY_ATTENDANCE",JSON.stringify(dutyAttendance));persistDutyRoster();renderDuty();renderDutyManager();renderDutyStats();}
function dutyDeleteName(day,shift,index){const arr=DUTY[shift].days[day]||[];if(index<0||index>=arr.length)return;if(confirm(`Xóa \"${arr[index]}\" khỏi ${DUTY[shift].label} ${dutyWeekNames[day]}?`)){arr.splice(index,1);persistDutyRoster();renderDuty();renderDutyManager();}}
function dutySetTime(shift,label,time){if(label.trim())DUTY[shift].label=label.trim();if(time.trim())DUTY[shift].time=time.trim();persistDutyRoster();renderDuty();renderDutyManager();}
function renderDutyManager(){const box=document.getElementById("dutyManager");if(!box)return;const day=dutyManagerDay===null?selected.getDay():dutyManagerDay,shift=dutySelectedShift||dutyActiveShift(),arr=DUTY[shift].days[day]||[];box.innerHTML=`<div class="dutyManagerHead"><div><b>⚙️ Quản lý lịch trực xe</b><small>Thêm • sửa • xóa người trực theo từng thứ và từng ca.</small></div><span class="badge blue">${dutyWeekNames[day]} • ${DUTY[shift].label}</span></div><div class="dutyManagerGrid"><div><label>Thứ</label><select class="select" id="dutyManageDay">${[1,2,3,4,5,6,0].map(d=>`<option value="${d}" ${day===d?'selected':''}>${dutyWeekNames[d]}</option>`).join('')}</select></div><div><label>Ca</label><select class="select" id="dutyManageShift">${['ca1','ca2','ca3'].map(k=>`<option value="${k}" ${shift===k?'selected':''}>${DUTY[k].label} • ${DUTY[k].time}</option>`).join('')}</select></div><div><label>Tên ca</label><input class="input" id="dutyManageLabel" value="${esc(DUTY[shift].label)}"></div><div><label>Khung giờ</label><input class="input" id="dutyManageTime" value="${esc(DUTY[shift].time)}"></div></div><div class="dutyManageActions"><button class="btn primary" data-action="duty-save-shift">💾 Lưu ca</button><button class="btn light" data-action="duty-add-name">＋ Thêm người</button><button class="btn light" data-action="duty-reset-default">↺ Khôi phục ca này</button></div><div class="dutyManageList">${arr.map((name,i)=>`<div class="dutyManageRow"><span>${i+1}</span><input class="input" data-duty-edit-index="${i}" value="${String(name).replace(/"/g,'&quot;')}"><button class="miniBtn primary" data-action="duty-save-name" data-index="${i}">✓</button><button class="miniBtn danger" data-action="duty-delete-name" data-index="${i}">×</button></div>`).join('')||'<div class="empty">Chưa có người. Bấm ＋ Thêm người.</div>'}</div>`;
  box.querySelector('#dutyManageDay')?.addEventListener('change',()=>{dutyManagerDay=Number(box.querySelector('#dutyManageDay').value);renderDutyManager();}); box.querySelector('#dutyManageShift')?.addEventListener('change',()=>{dutySelectedShift=box.querySelector('#dutyManageShift').value;renderDuty();renderDutyManager();});}

const dutyWeekNames=["Chủ nhật","Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7"];
function dutyShiftNow(){const h=new Date().getHours()+new Date().getMinutes()/60;if(h>=4.5&&h<8)return "ca1";if(h>=8&&h<=13.5)return "ca2";if(h>=16.5&&h<=22.5)return "ca3";return null}
function dutyIsToday(){return key(selected)===key(new Date())}
function dutyActiveShift(){return dutyIsToday() ? (dutyShiftNow()||dutySelectedShift||"ca1") : (dutySelectedShift||"ca1")}
function dutyState(date,shift,name){const a=dutyAttendance[date]?.[shift]||{};return a[name]||{checked:false,present:null}}
function persistDuty(){localStorage.setItem("SA_DUTY_ATTENDANCE",JSON.stringify(dutyAttendance));window.shipAreaCloudSaveDuty?.(dutyAttendance)}
function setDutyState(date,shift,name,present){dutyAttendance[date]??={};dutyAttendance[date][shift]??={};dutyAttendance[date][shift][name]={checked:true,present:!!present,updatedAt:new Date().toISOString()};persistDuty();renderDuty();renderStats()}
function clearDutyState(date,shift,name){if(dutyAttendance[date]?.[shift]?.[name])delete dutyAttendance[date][shift][name];persistDuty();renderDuty();renderStats()}
function markAllDuty(present){const date=key(selected),shift=dutyActiveShift();dutyAttendance[date]??={};dutyAttendance[date][shift]??={};(DUTY[shift].days[selected.getDay()]||[]).forEach(name=>dutyAttendance[date][shift][name]={checked:true,present,updatedAt:new Date().toISOString()});persistDuty();renderDuty();renderStats()}
function renderDuty(){
  const box=document.getElementById("dutyDetail"); if(!box)return;
  const date=key(selected),shift=dutyActiveShift(),rawList=DUTY[shift].days[selected.getDay()]||[],list=dutySortedList(date,shift,rawList);
  const states=list.map(n=>dutyState(date,shift,n));
  const absent=states.filter(x=>x.checked&&!x.present).length;
  const present=states.filter(x=>x.checked&&x.present).length;
  const unchecked=states.filter(x=>!x.checked).length;
  const isAuto=dutyIsToday()&&dutyShiftNow()===shift;
  const statusText=(name)=>{const st=dutyState(date,shift,name);return !st.checked?'CHƯA TÍCH':st.present?'ĐI':'VẮNG'};
  const statusClass=(name)=>{const st=dutyState(date,shift,name);return !st.checked?'pending':st.present?'present':'absent'};
  const reportGrid=list.map((name,i)=>`<div class="dutyReportCell ${statusClass(name)}"><span class="dutyReportNo">${i+1}</span><div><b>${esc(name)}</b><small>${statusText(name)}</small></div></div>`).join('');
  box.innerHTML=`
    <div class="dutyNow ${isAuto?'auto':''}">
      <div><b>🚚 ${DUTY[shift].label} • ${DUTY[shift].time}</b><small>${dutyWeekNames[selected.getDay()]} • ${fmt(selected)}${isAuto?' • đang trong khung giờ':''}</small></div>
      <span class="badge ${absent?'off':'work'}">${absent} vắng</span>
    </div>
    <div class="dutyToolbar">
      <div class="dutyTabs">${['ca1','ca2','ca3'].map(k=>`<button class="dutyTab ${shift===k?'active':''}" data-action="duty-shift" data-shift="${k}">${DUTY[k].label}<small>${DUTY[k].time}</small></button>`).join('')}</div>
      <div class="dutyActions">
        <button class="btn primary" data-action="duty-mark-all" data-present="1">✓ Tất cả đi</button>
        <button class="btn light" data-action="duty-mark-all" data-present="0">✕ Tất cả vắng</button>
        <button class="btn light" data-action="duty-report-toggle">${dutyReportMode?'📝 Điểm danh':'📸 Báo cáo'}</button><button class="btn light" data-action="duty-enable-cloud">☁️ Cloud</button><button class="btn light" data-action="duty-save-roster-cloud">☁️ Lưu lịch</button>
      </div>
    </div>
    <div class="dutySummary"><span>✓ ${present} đi</span><span>✕ ${absent} vắng</span><span>• ${unchecked} chưa tích</span></div>
    <div class="dutyReportShot">
      <div class="dutyReportShotHead"><div><b>📸 BÁO CÁO TRỰC XE</b><small>${DUTY[shift].label} • ${dutyWeekNames[selected.getDay()]} • ${fmt(selected)}</small></div><span>${present}/${list.length} đã đi</span></div>
      <div class="dutyReportGrid">${reportGrid}</div>
    </div>
    ${dutyReportMode?`<div class="dutyNote">📸 Đang ở <b>chế độ báo cáo</b>. Bảng phía trên được tối ưu để chụp màn hình trên điện thoại.</div>`:`<div class="dutyList">${list.map((name,i)=>{const st=dutyState(date,shift,name);return `<div class="dutyRow ${st.checked?(st.present?'is-present':'is-absent'):'is-pending'}"><span class="dutyNo">${i+1}</span><div class="dutyPerson"><b>${esc(name)}</b>${(name==='Nguyễn Đức Huy'||name==='Bánh Trung Hào'||name==='Diệp Xuân Quỳnh'||name==='Lê Hoài Vinh'||name==='Thang Bảo Khánh'||name==='Nguyễn Vũ Trương'||name==='Võ Minh Kha')&&shift==='ca1'?'<small>CA SÁNG theo bảng</small>':''}</div><div class="dutyCheck"><button data-action="duty-set" data-name="${esc(name)}" data-present="1">✓ Đi</button><button data-action="duty-set" data-name="${esc(name)}" data-present="0">✕ Vắng</button>${st.checked?`<button class="dutyReset" data-action="duty-clear" data-name="${esc(name)}">↺</button>`:''}</div></div>`}).join('')}</div>`}
    <div class="dutyNote">⚠️ Chỉ người được tích <b>Vắng</b> mới tính vào thống kê. Người chưa tích là <b>chưa kiểm tra</b>, không tính vắng.</div>`;
}
function renderDutyStats(){const box=document.getElementById('dutyStats');if(!box)return;const now=new Date(), periods=[['7 ngày gần nhất',7],['30 ngày gần nhất',30]];let html='';periods.forEach(([label,days])=>{const end=new Date(now.getFullYear(),now.getMonth(),now.getDate());const start=new Date(end);start.setDate(start.getDate()-days+1);const map={};for(let d=new Date(start);d<=end;d.setDate(d.getDate()+1)){const dk=key(d), by=dutyAttendance[dk]||{};Object.entries(by).forEach(([shift,people])=>Object.entries(people||{}).forEach(([name,st])=>{if(st.checked&&!st.present){map[name]??=[];map[name].push({date:dk,shift})}}))}const rows=Object.entries(map).sort((a,b)=>b[1].length-a[1].length);html+=`<div class="dutyReport"><div class="dutyReportHead"><b>📅 ${label}</b><span>${rows.reduce((n,[,v])=>n+v.length,0)} lượt vắng</span></div>${rows.length?rows.map(([name,items])=>`<div class="dutyStatPerson"><b>${esc(name)}</b><strong>${items.length} lần</strong><small>${items.map(x=>{const dd=new Date(x.date+'T00:00:00');return `${dd.toLocaleDateString('vi-VN',{weekday:'short',day:'2-digit',month:'2-digit'})} • ${DUTY[x.shift].label}`}).join('  |  ')}</small></div>`).join(''):'<div class="empty">Không có lượt vắng đã xác nhận.</div>'}</div>`});box.innerHTML=html}
function dutyTick(){if(dutyFollowToday&&key(selected)!==key(new Date())){selected=new Date();syncDate();renderAll();return;}if(document.getElementById('dutyPage')&&dutyIsToday())renderDuty();renderDutyStats();}

normalizeAllData();

function renderAll(){renderHome();renderOffPage();renderShippers();renderStats();renderRouteChecks();renderAreas();renderDuty();renderDutyManager();renderDutyStats()}

function renderHome(){
  const searchEl=document.getElementById("globalSearch"); const q=norm(searchEl?.value||""), off=getOff();
  const setText=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v};
  setText("s1",shippers.filter(s=>s.status==="work").length);
  setText("s2",CANONICAL_AREAS.length);
  setText("s3",Object.values(AREAS).reduce((a,b)=>a+b.length,0));
  setText("s4",off.length);
  setText("s5",off.filter(x=>x.replaceId).length);

  const warnings=[];
  CANONICAL_AREAS.forEach(area=>{const routes=AREAS[area]||[]; routes.forEach(route=>{
    const result=findEffectiveRunner(area,route,selected);
    if(result?.shipper)return;
    const fixed=shippers.filter(s=>s.area===area&&s.routes.some(r=>norm(r)===norm(route)));
    const offFixed=fixed.filter(s=>off.some(o=>String(o.offId)===String(s.id)));
    const rec=setupRecords[key(selected)]?.[area];
    if((rec||offFixed.length) && (result?.source==='Lịch đã dán có nhiều người'||offFixed.length||rec)) warnings.push({area,route,people:offFixed.map(s=>s.name)});
  });});
  const warningBox=document.getElementById("coverageWarnings");
  if(warningBox){
    warningBox.innerHTML=warnings.length?`<div class="warningBanner"><div class="warningIcon">⚠️</div><div><b>Cần kiểm tra ${warnings.length} khu vực</b><small>Có ấp đang OFF hoặc chưa xác định người chạy thay.</small></div></div>`:"";
  }

  // Nếu đang tìm kiếm, tự mở xã duy nhất phù hợp. Bình thường tuyệt đối không mở tất cả ấp.
  const matches=[];
  CANONICAL_AREAS.forEach(area=>{const routes=AREAS[area]||[];
    const people=shippers.filter(s=>s.area===area);
    const hit=norm(area).includes(q)||routes.some(r=>norm(r).includes(q))||people.some(p=>norm(p.name).includes(q));
    if(q&&hit) matches.push(area);
  });
  if(q && matches.length===1) window.openCommuneArea=matches[0];
  if(q && matches.length===0) window.openCommuneArea=null;

  let out="";
  CANONICAL_AREAS.forEach(area=>{const routes=AREAS[area]||[];
    const people=shippers.filter(s=>s.area===area);
    const running=people.filter(s=>s.status==="work"&&!off.some(o=>String(o.offId)===String(s.id))).length;
    const hasWarning=warnings.some(w=>w.area===area);
    const areaMatch=!q || norm(area).includes(q)||routes.some(r=>norm(r).includes(q))||people.some(p=>norm(p.name).includes(q));
    if(!areaMatch)return;
    const isOpen=window.openCommuneArea===area;
    const coveredCount=routes.filter(r=>!!findEffectiveRunner(area,r,selected)).length;
    out+=`<article class="commune compact ${isOpen?'is-open':''} ${hasWarning?'has-warning':''}" data-area="${esc(area)}">
      <button type="button" class="communeHead" data-action="open-commune" data-area="${esc(area)}" aria-expanded="${isOpen}">
        <span class="communeIdentity"><span class="communeIcon">🏘️</span><span class="communeTitle"><b>${esc(area)}</b><small>${routes.length} ấp · ${people.length} shipper</small></span></span>
        <span class="communeMeta"><span class="coverageMini">${coveredCount}/${routes.length}</span><span class="badge ${hasWarning?'off':'work'}">${hasWarning?'⚠️ Kiểm tra':running+' chạy'}</span><span class="communeChevron">${isOpen?'⌃':'⌄'}</span></span>
      </button>
      ${isOpen?`<div class="communeBody compactBody">
        <div class="communeQuick"><span>📍 ${routes.length} ấp</span><span>👤 ${people.length} shipper</span><span>✓ ${coveredCount} có người</span></div>
        <div class="routeCompactList">${routes.map(route=>{
          const resolved=findEffectiveRunner(area,route,selected), runner=resolved?.shipper;
          const fixed=people.filter(s=>s.routes.some(r=>norm(r)===norm(route)));
          const offFixed=fixed.find(s=>off.some(o=>String(o.offId)===String(s.id)));
          if(runner) return `<div class="routeCompact"><span class="routeDot">●</span><span class="routeCompactName">${esc(route)}</span><span class="routeCompactPerson">🚚 ${esc(runner.name)}</span></div>`;
          if(offFixed){const o=off.find(x=>String(x.offId)===String(offFixed.id)), repl=o?.replaceId?person(o.replaceId):null;return `<div class="routeCompact routeWarn"><span class="routeDot">!</span><span class="routeCompactName">${esc(route)}</span><span class="routeCompactPerson">🔴 ${esc(offFixed.name)}${repl?' → '+esc(repl.name):' · chưa có thay'}</span></div>`;}
          return `<div class="routeCompact routeMissing"><span class="routeDot">?</span><span class="routeCompactName">${esc(route)}</span><span class="routeCompactPerson">Chưa có người chạy</span></div>`;
        }).join('')}</div>
      </div>`:''}
    </article>`;
  });
  document.getElementById("communes").innerHTML=out||`<div class="card empty">🔎 Không tìm thấy xã / ấp phù hợp.</div>`;
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
  box.innerHTML=hits.length?`<div style="padding:11px;background:#f8fafc;border-radius:11px"><b>🔎 Tìm thấy ${hits.length} shipper</b><div class="quick" style="margin-top:8px">${hits.map(s=>`<button data-action="show-shipper" data-id="${esc(s.id)}">👤 ${s.name} — ${s.area} — ${s.routes.join(", ")}</button>`).join("")}</div></div>`:`<div style="padding:11px;background:#fff7ed;border-radius:11px">Không có shipper phù hợp.</div>`;
}
function showShipperResult(id){const s=person(id);if(!s)return;const el=document.getElementById("globalSearch");if(el)el.value=s.name;renderHome()}

function renderOffBody(){
  const body=document.getElementById("offBody"), data=getOff();
  body.innerHTML=data.length?data.map(o=>{
    const s=person(o.offId),r=person(o.replaceId);
    return `<tr><td><b>🔴 ${s?.name||"?"}</b></td><td>${s?.area||""}</td><td>${s?.routes.join(", ")||""}</td><td>${r?`<span class="green" style="padding:5px 7px;border-radius:7px">🔄 ${r.name}</span>`:`<span style="color:#b91c1c;font-weight:900">⚠️ Chưa có</span>`}</td><td>${o.note||"—"}</td></tr>`;
  }).join(""):`<tr><td colspan="5"><div class="empty">🎉 Không có shipper OFF trong ngày này.</div></td></tr>`;
}

function openCommuneDetail(area){
  area=String(area||"").trim();
  if(!area || !AREAS[area]) return;
  window.openCommuneArea = window.openCommuneArea===area ? null : area;
  allOpen=false;
  renderHome();
  const card=[...document.querySelectorAll(".commune")].find(x=>x.dataset.area===area);
  card?.scrollIntoView({behavior:"smooth",block:"nearest"});
}
window.openCommuneDetail=openCommuneDetail;
// Tương thích với các bản giao diện cũ còn gọi trực tiếp hàm này.
if(typeof window.openCommuneDetail!=='function') window.openCommuneDetail=(area)=>{ const a=String(area||'').trim(); if(!a||!AREAS[a]) return; window.openCommuneArea=window.openCommuneArea===a?null:a; renderHome(); };

function clearSearch(){const el=document.getElementById("globalSearch");if(el)el.value="";renderHome()}
function toggleAll(){window.openCommuneArea=null;allOpen=false;renderHome();window.scrollTo({top:document.getElementById("communes")?.offsetTop||0,behavior:"smooth"})}

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
  const groups=CANONICAL_AREAS.map(area=>({area,people:active.filter(s=>canonicalAreaName(s.area)===area)}))
    .filter(g=>!q||norm(g.area).includes(q)||g.people.some(s=>norm([s.name,s.phone,...(s.routes||[])].join(' ')).includes(q)));
  const personCard=s=>`<article class="shipperProCard">
    <div class="shipperAvatar">${esc((s.name||'?')[0].toUpperCase())}</div>
    <div class="shipperProMain">
      <div class="shipperProTop"><b>${esc(s.name)}</b><span class="statusPill ${s.status==='work'?'good':'bad'}">${s.status==='work'?'Đang hoạt động':'Không hoạt động'}</span></div>
      <div class="shipperProMeta">${s.phone?`<span>☎ ${esc(s.phone)}</span>`:'<span>☎ Chưa có SĐT</span>'}<span>📍 ${esc(canonicalAreaName(s.area)||s.area||'Chưa chọn xã')}</span></div>
      <div class="shipperRouteTags">${(s.routes||[]).map(r=>`<span>${esc(r)}</span>`).join('')||'<span>Chưa có ấp</span>'}</div>
    </div>
    <div class="shipperProActions"><button class="btn light" data-action="edit-shipper" data-id="${esc(s.id)}">Sửa</button><button class="btn danger" data-action="delete-shipper" data-id="${esc(s.id)}">Xóa</button></div>
  </article>`;
  const groupHtml=groups.map(g=>`<section class="shipperGroup">
    <header class="shipperGroupHead"><div><span class="groupIcon">🏘️</span><div><b>${esc(g.area)}</b><small>${g.people.length} shipper · ${(AREAS[g.area]||[]).length} ấp</small></div></div><strong>${g.people.length}</strong></header>
    <div class="shipperGroupList">${g.people.length?g.people.map(personCard).join(''):'<div class="groupEmpty">Chưa có shipper thuộc xã này.</div>'}</div>
  </section>`).join('');
  const archivedHtml=archived.length?`<section class="shipperArchive"><header><div><b>⏸ Người đã ngưng</b><small>OFF liên tục quá 14 ngày.</small></div><strong>${archived.length}</strong></header>${archived.map(s=>`<article class="shipperProCard archived"><div class="shipperAvatar">${esc((s.name||'?')[0].toUpperCase())}</div><div class="shipperProMain"><div class="shipperProTop"><b>${esc(s.name)}</b></div><div class="shipperProMeta"><span>📍 ${esc(canonicalAreaName(s.area)||s.area||'Chưa chọn xã')}</span><span>${esc(s.inactiveReason||'OFF quá 14 ngày')}</span></div></div><div class="shipperProActions"><button class="btn light" data-action="restore-shipper" data-id="${esc(s.id)}">↩ Khôi phục</button></div></article>`).join('')}</section>`:'';
  const empty=`<div class="emptyPro">Không tìm thấy shipper phù hợp.</div>`;
  const list=document.getElementById('shipperList');
  if(list) list.innerHTML=(groupHtml||empty)+archivedHtml;
}

function removeOff(id){let k=key(selected);schedules[k]=(schedules[k]||[]).filter(x=>x.offId!==id);save();renderAll()}

function renderOffPage(){
  if(!document.getElementById("offPageBody"))return;
  let q=norm(document.getElementById("offSearch")?.value||"");
  let data=getOff().filter(o=>{let s=person(o.offId),r=person(o.replaceId);let text=[s?.name,s?.area,...(s?.routes||[]),r?.name,o.note].join(" ");return !q||norm(text).includes(q)});
  offPageBody.innerHTML=data.length?data.map(o=>{let s=person(o.offId),r=person(o.replaceId);return `<tr><td><b>${s?.name||""}</b></td><td>${s?.area||""}</td><td>${s?.routes.join(", ")||""}</td><td>${r?.name||"⚠️ Chưa có"}</td><td>${o.note||"—"}</td><td><button class="btn danger" data-action="remove-off" data-id="${esc(o.offId)}">Xóa OFF</button></td></tr>`}).join(""):`<tr><td colspan="6"><div class="empty">Không có kết quả.</div></td></tr>`;
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
  const card=a=>{const rec=setupRecords[k]?.[a];const count=rec?.entries?.length||0;return `<div class="pasteAreaItem clickSetup" data-action="open-setup" data-area="${esc(a)}" data-date="${esc(k)}"><div><b>${a}</b><small style="display:block">${count?`${count} dòng • bấm để xem/sửa`:'Đã đánh dấu setup'}</small></div><span class="badge green">Đã dán</span></div>`};
  document.getElementById('pasteAreaStatus').innerHTML=`<div class="pasteStatusCol"><div class="pasteStatusHead done"><span>✅ Đã dán / setup</span><span>${yes.length}</span></div><div class="pasteAreaList">${yes.length?yes.map(card).join(''):'<div class="empty">Chưa có xã nào.</div>'}</div></div><div class="pasteStatusCol"><div class="pasteStatusHead todo"><span>⏳ Chưa dán</span><span>${no.length}</span></div><div class="pasteAreaList">${no.length?no.map(a=>`<div class="pasteAreaItem"><div><b>${a}</b><small style="display:block">Chưa có dữ liệu setup ngày này</small></div><span class="badge" style="background:#fff7ed;color:#c2410c">Chưa dán</span></div>`).join(''):'<div class="empty">🎉 Đã setup đủ các xã.</div>'}</div></div>`;
}
function saveSetupRecord(pd,area,entries,raw,autoAdded){
  const k=key(pd); setupRecords[k]=setupRecords[k]||{};
  setupRecords[k][area]={area,date:k,raw:raw||'',updatedAt:new Date().toISOString(),autoAdded:[...new Set(autoAdded||[])],entries:entries.map(e=>({name:e.name||'',shipperId:findShipperByNameInArea(area,e.name||'')?.id||e.shipperId||'',routes:[...new Set(e.routes||[])],off:!!e.off,note:e.note||''}))};
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
  document.getElementById('setupDetailSummary').innerHTML=`<div class="setupMetric"><b>${all.length}</b><span>DÒNG LỊCH</span></div><div class="setupMetric"><b>${routeCount}</b><span>ẤP/KHU VỰC</span></div><div class="setupMetric"><b>${offCount}</b><span>OFF</span></div><div class="setupMetric"><b>${missing}</b><span>CHƯA CÓ SHIPPER</span></div>`;document.getElementById('setupDetailRows').insertAdjacentHTML('beforebegin',`<div class="setupAreaEditBar"><span>🏘️ Xã hiện tại: <b>${esc(st.area)}</b></span><button class="btn light" type="button" onclick="changeSetupArea()">✏️ Đổi xã</button></div>`);
  document.getElementById('setupDetailRows').innerHTML=shown.length?shown.map(e=>`<div class="setupDetailRow"><div class="setupDetailHead"><div class="avatar">${(e.name||'?')[0].toUpperCase()}</div><div class="grow"><b>${e.name||'⚠️ Chưa tìm được shipper'}</b><div style="font-size:10px;color:var(--muted)">${e.off?'🔴 OFF':'🚚 Lịch chạy'} • ${e.routes?.length||0} ấp</div></div><button class="miniBtn blue" data-action="edit-setup-entry" data-index="${e._i}">✏️ Sửa</button></div><div class="setupRouteChips">${(e.routes||[]).length?e.routes.map((r,j)=>`<span class="setupRouteChip">📍 ${r}<button title="Xóa ấp khỏi lịch ngày này" data-action="remove-setup-route" data-index="${e._i}" data-route-index="${j}">×</button></span>`):'<span style="font-size:11px;color:#9ca3af">Chưa có ấp</span>'}</div></div>`).join(''):'<div class="empty">Không có dòng phù hợp.</div>';
}
function changeSetupArea(){
  const st=window.setupDetailState;if(!st)return;
  const current=st.area;
  const list=CANONICAL_AREAS.filter(a=>a!==current);
  const answer=prompt(`Đổi xã cho setup ngày ${st.k}\n\n${list.map((a,i)=>`${i+1}. ${a}`).join('\n')}\n\nNhập số hoặc tên xã mới:`,current);
  if(answer===null)return;
  const n=Number(answer);
  const target=(Number.isInteger(n)&&n>=1&&n<=list.length)?list[n-1]:canonicalAreaName(answer.trim());
  if(!target||!CANONICAL_AREAS.includes(target)){alert('Xã không hợp lệ. Chỉ được chọn 1 trong 14 xã chuẩn.');return;}
  if(target===current)return;
  const rec=setupRecords[st.k]?.[current];if(!rec)return;
  setupRecords[st.k][target]={...rec,area:target,entries:(rec.entries||[]).map(e=>({...e,shipperId:'',name:''}))};
  delete setupRecords[st.k][current];
  if(pasteLog[st.k]) pasteLog[st.k]=pasteLog[st.k].map(a=>a===current?target:a);
  window.setupDetailState={area:target,k:st.k};
  save();renderAll();renderSetupDetail();
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
  // Tuyệt đối không tự tạo ấp từ nội dung dán. Chỉ danh mục địa chỉ mới được phép thêm ấp.
  return null;
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
  if(s && s.area===parsedSchedule.area && s.status!=='inactive'){
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
  const unresolved=entries.filter(e=>!e.off&&(!e.shipperId||!e.name));
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
    const route=e.routes?.[0]||'—';
    const current=e.shipperId?person(e.shipperId):null;
    const options='<option value="">🟡 Chọn người chạy</option>'+list.map(s=>`<option value="${esc(s.id)}" ${current?.id===s.id?'selected':''}>${esc(s.name)}${s.area===area?'':' — '+esc(s.area)}</option>`).join('');
    return `<div class="previewRouteRow ${current?'assignedRow':'unassignedRow'}"><div class="previewRouteMain"><div class="previewRouteName">📍 ${esc(route)}</div><small>${current?'👤 '+esc(current.name)+' • '+esc(area):'⚠️ Chưa tham chiếu được người chạy'}</small></div><div class="previewRunnerControl"><select class="select runnerSelect" data-action="assign-parsed-runner" data-index="${i}">${options}</select></div></div>`;
  }).join('')||'<div class="empty">Không nhận diện được ấp trong lịch.</div>';
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
    // Dạng tự nhiên: "Tùng chạy Trung", "Thái chạy Thượng", không cần dấu :
    const runMatch=line.match(/^(.+?)\s+(?:chạy|chay|phụ trách|phu trach)\s+(.+)$/i);
    if(runMatch){
      const nm=runMatch[1].trim(), rr=resolveRoutes(area,runMatch[2].trim(),autoAdded), ss=findShipperByNameInArea(area,nm);
      if(rr.length) entries.push({name:ss?.name||'',shipperId:ss?.id||'',routes:rr,off:false,unmatched:!ss,sourceName:nm});
      else entries.push({name:ss?.name||'',shipperId:ss?.id||'',routes:[],off:false,unmatched:true,sourceName:nm});
      return;
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
    const assignedRoute=findRoute(area,line);
    if(assignedRoute) entries.push({name:'',shipperId:'',routes:[assignedRoute],off:false,auto:true,unmatched:true});
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
      let rr=findRoute(area,clean);
      if(rr) found.push(rr);
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
    if(rr){out.push(rr);}
    else { /* không tạo ấp và không ghi chuỗi lạ thành route */ } 
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
  const unresolved=parsedSchedule.entries.filter(e=>!e.off&&(!e.shipperId||!e.name));
  if(unresolved.length){alert(`Còn ${unresolved.length} ấp chưa chọn người chạy. Hãy chọn ở phần Xem trước rồi lưu.`);return;}
  const appliedEntries=parsedSchedule.entries.map(e=>({name:e.name||'',shipperId:e.shipperId||'',routes:[...new Set(e.routes||[])],off:!!e.off,note:e.note||''}));
  const k=pasteKey(pd);
  // Tự xác định người thay: nếu người setup gốc OFF, người khác có tên trong lịch
  // và được ghi chạy đúng ấp thì tự gán replaceId cho đúng ngày.
  const offIds=new Set(appliedEntries.filter(e=>e.off&&e.shipperId).map(e=>String(e.shipperId)));
  const replacements=new Map();
  appliedEntries.filter(e=>!e.off&&e.shipperId).forEach(e=>(e.routes||[]).forEach(route=>{
    const originals=shippers.filter(s=>s.area===area && s.routes.some(r=>norm(r)===norm(route)) && offIds.has(String(s.id)));
    originals.forEach(o=>{if(String(o.id)!==String(e.shipperId) && !replacements.has(String(o.id))) replacements.set(String(o.id),String(e.shipperId));});
  }));
  pasteLog[k]=[...new Set([...(pasteLog[k]||[]),area])];
  saveSetupRecord(pd,area,appliedEntries,parsedSchedule.raw,parsedSchedule.autoAdded);
  // OFF từ lịch dán được ghi nhận theo ngày, nhưng KHÔNG sửa tuyến gốc của shipper.
  const offList=schedules[k]||[];
  appliedEntries.filter(e=>e.off&&e.shipperId).forEach(e=>{
    if(!offList.some(x=>String(x.offId)===String(e.shipperId))) offList.push({offId:e.shipperId,replaceId:replacements.get(String(e.shipperId))||'',note:'Dán lịch tự động'});
    else { const old=offList.find(x=>String(x.offId)===String(e.shipperId)); if(old&&!old.replaceId&&replacements.has(String(e.shipperId))) old.replaceId=replacements.get(String(e.shipperId)); }
  });
  schedules[k]=offList;
  selected=pd; syncDate();
  autoRetireLongOffShippers(false);
  save(); renderAll(); renderPasteStatus();
  const unknown=appliedEntries.filter(e=>!e.off&&!e.shipperId).length;
  document.getElementById('parseMessage').innerHTML=`<div class="analysisNote analysisOk">✓ Đã lưu setup <b>${esc(area)}</b> cho ngày <b>${esc(fmt(pd))}</b>. ${unknown?'⚠️ Còn '+unknown+' ấp chưa có người.':'Tất cả ấp đã xác định người chạy.'}</div>`;
}

function page(p,btn){
  ["homePage","shippersPage","offPage","pastePage","statsPage","areasPage","dutyPage"].forEach(id=>document.getElementById(id).style.display="none");
  let map={home:"homePage",shippers:"shippersPage",off:"offPage",paste:"pastePage",stats:"statsPage",areas:"areasPage",duty:"dutyPage"};
  const target=document.getElementById(map[p]); if(target)target.style.display="";
  document.getElementById("pageTitle").textContent={home:"Lịch chạy khu vực",shippers:"Danh sách shipper",off:"Danh sách OFF",paste:"Dán lịch tự động",stats:"Thống kê",areas:"Địa bàn Càng Long cũ",duty:"Trực xe"}[p]; document.getElementById("pageKicker")&&(document.getElementById("pageKicker").textContent={home:"CONTROL CENTER",shippers:"PEOPLE",off:"DAY OFF",paste:"SCHEDULE",stats:"ANALYTICS",areas:"MASTER DATA",duty:"VEHICLE DUTY"}[p]||"SHIPAREA PRO");
  document.querySelectorAll(".nav button,.mobileNav button").forEach(x=>x.classList.remove("active"));if(btn)btn.classList.add("active");
  renderAll();
}
function renderStats(){
  const data=getOff(), dk=key(selected), byArea={};
  data.forEach(x=>{const s=person(x.offId); if(s){const a=canonicalAreaName(s.area)||'Chưa xác định'; byArea[a]=(byArea[a]||0)+1;}});
  const totalRoutes=CANONICAL_AREAS.reduce((n,a)=>n+(AREAS[a]||[]).length,0);
  const coveredRoutes=CANONICAL_AREAS.reduce((n,a)=>n+(AREAS[a]||[]).filter(r=>!!findEffectiveRunner(a,r,selected)).length,0);
  const workCount=shippers.filter(s=>s.status==='work').length;
  const dutyAbsents=Object.values(dutyAttendance[dk]||{}).reduce((n,people)=>n+Object.values(people||{}).filter(x=>x?.checked&&!x.present).length,0);
  const offTodayIds=new Set(data.map(x=>String(x.offId)));
  // 4 chỉ số cảnh báo đúng yêu cầu quản lý
  const offToday=data.length;
  const offHasRunner=data.filter(x=>x.replaceId&&person(x.replaceId)?.status==='work').length;
  let routeMissing=0;
  CANONICAL_AREAS.forEach(area=>(AREAS[area]||[]).forEach(route=>{
    const fixed=shippers.filter(s=>canonicalAreaName(s.area)===area&&s.routes.some(r=>norm(r)===norm(route))&&s.status==='work');
    const offFixed=fixed.filter(s=>offTodayIds.has(String(s.id)));
    const result=findEffectiveRunner(area,route,selected);
    if(!result?.shipper) routeMissing++;
  }));
  const inactive14=shippers.filter(s=>s.status==='inactive' || String(s.inactiveReason||'').includes('14')).length;
  const statsEl=document.getElementById('statsDetail'); if(!statsEl)return;
  const kpi=(cls,num,label,sub)=>`<div class="proKpi ${cls||''}"><div class="proKpiIcon">${cls==='danger'?'🔴':cls==='success'?'🟢':cls==='warning'?'🟠':'✦'}</div><div><strong>${num}</strong><span>${label}</span><small>${sub||''}</small></div></div>`;
  const warnings=[];
  CANONICAL_AREAS.forEach(area=>(AREAS[area]||[]).forEach(route=>{
    const result=findEffectiveRunner(area,route,selected); if(result?.shipper)return;
    warnings.push({area,route});
  }));
  statsEl.innerHTML=`
    <div class="statsModernHero"><div><span class="eyebrow">ANALYTICS • ${esc(fmt(selected))}</span><h2>Trung tâm thống kê</h2><p>Theo dõi OFF, người chạy thay, độ phủ ấp và trực xe trên cùng một màn hình.</p></div><div class="statsDateBadge"><b>${String(selected.getDate()).padStart(2,'0')}</b><span>THÁNG ${String(selected.getMonth()+1).padStart(2,'0')} · ${selected.getFullYear()}</span></div></div>
    <div class="proKpiGrid">
      ${kpi('',workCount,'Shipper đang chạy',`${CANONICAL_AREAS.length} xã/thị trấn chuẩn`)}
      ${kpi('danger',offToday,'OFF hôm nay',`${Object.keys(byArea).length} xã có OFF`)}
      ${kpi('success',offHasRunner,'OFF đã có người chạy',`${offToday-offHasRunner} người chưa có thay`)}
      ${kpi('warning',routeMissing,'Ấp chưa có người',`${coveredRoutes}/${totalRoutes} ấp đang có người`)}
      ${kpi('danger',dutyAbsents,'Vắng trực xe hôm nay',`đã xác nhận`)}
      ${kpi('',inactive14,'Ngưng >14 ngày OFF','được đưa khỏi danh sách hoạt động')}
    </div>
    <div class="statsFocusGrid">
      <section class="statsPanel statsFocus"><div class="statsPanelHead"><div><span class="eyebrow">TODAY</span><h3>Trạng thái cần chú ý</h3></div><b>${offToday+routeMissing+dutyAbsents}</b></div>
        <div class="focusList">
          <div class="focusRow danger"><strong>${offToday}</strong><div><b>OFF hôm nay</b><small>Người nghỉ trong ngày đang chọn.</small></div></div>
          <div class="focusRow success"><strong>${offHasRunner}</strong><div><b>OFF đã có người chạy</b><small>Không còn thiếu người thay.</small></div></div>
          <div class="focusRow warning"><strong>${routeMissing}</strong><div><b>Ấp cần chọn người</b><small>Khu vực chưa xác định người chạy.</small></div></div>
          <div class="focusRow"><strong>${inactive14}</strong><div><b>Ngưng &gt;14 ngày OFF</b><small>Kiểm tra danh sách người đã ngưng.</small></div></div>
        </div>
      </section>
      <section class="statsPanel"><div class="statsPanelHead"><div><span class="eyebrow">COVERAGE</span><h3>14 xã / thị trấn</h3></div><b>${coveredRoutes}/${totalRoutes}</b></div>
        <div class="areaStatList">${CANONICAL_AREAS.map(a=>{const routes=AREAS[a]||[],covered=routes.filter(r=>!!findEffectiveRunner(a,r,selected)).length,n=byArea[a]||0;return `<div class="areaStatRow"><div><b>${esc(a)}</b><small>${routes.length} ấp · ${shippers.filter(s=>canonicalAreaName(s.area)===a&&s.status==='work').length} shipper</small></div><div class="areaStatNums"><strong>${covered}/${routes.length}</strong>${n?`<span>OFF ${n}</span>`:''}</div></div>`}).join('')}</div>
      </section>
    </div>
    <div class="statsColumns"><section class="statsPanel"><div class="statsPanelHead"><div><span class="eyebrow">ALERTS</span><h3>Ấp cần chọn người</h3></div><b>${warnings.length}</b></div>${warnings.length?`<div class="statsList">${warnings.slice(0,40).map(w=>`<div class="statsRow"><div class="statsAvatar">!</div><div class="statsMain"><b>${esc(w.route)}</b><small>${esc(w.area)}</small></div><span class="statusPill bad">Chưa có người</span></div>`).join('')}</div>`:'<div class="empty">✓ Tất cả ấp đã có người.</div>'}</section>
    <section class="statsPanel"><div class="statsPanelHead"><div><span class="eyebrow">OFF BY AREA</span><h3>OFF theo xã</h3></div></div>${Object.keys(byArea).length?`<div class="areaStatList">${Object.entries(byArea).sort((a,b)=>b[1]-a[1]).map(([a,n])=>`<div class="areaStatRow"><div><b>${esc(a)}</b><small>OFF hôm nay</small></div><div class="areaStatNums"><strong>${n}</strong></div></div>`).join('')}</div>`:'<div class="empty">Không có OFF hôm nay.</div>'}</section></div>`;
}

function renderAreas(){
  const box=document.getElementById('areaEditor'); if(!box)return;
  const source=document.getElementById('areaSource'); if(source)source.textContent=AREA_SOURCE;
  box.innerHTML=CANONICAL_AREAS.map(area=>{
    const routes=AREAS[area]||[];
    const open=window._areaEditorOpen===area;
    const covered=routes.filter(r=>!!findEffectiveRunner(area,r,selected)).length;
    const people=shippers.filter(s=>canonicalAreaName(s.area)===area&&s.status!=='inactive').length;
    return `<article class="areaCard modernAreaCard ${open?'is-open':''}" data-area-editor="${esc(area)}">
      <button type="button" class="areaCardHead" data-action="toggle-area-editor" data-area="${esc(area)}" aria-expanded="${open}">
        <span class="areaTitle"><span class="areaIcon">🏘️</span><span><b>${esc(area)}</b><small>${routes.length} ấp · ${people} shipper</small></span></span>
        <span class="areaHeadRight"><span class="sourceTag">${covered}/${routes.length}</span><span class="areaChevron">${open?'⌃':'⌄'}</span></span>
      </button>
      ${open?`<div class="areaEditorBody"><div class="areaEditorHint">Chỉnh trực tiếp danh mục ấp/khóm. Chỉ 14 xã chuẩn được hiển thị.</div><div class="areaGrid">${routes.map((r,i)=>`<div class="areaItem"><span class="routeIndex">${i+1}</span><input class="input" value="${esc(r)}" data-action="rename-route" data-area="${esc(area)}" data-index="${i}"><button class="miniBtn danger" data-action="delete-route" data-area="${esc(area)}" data-index="${i}">×</button></div>`).join('')}<button class="addRouteBtn" data-action="add-route" data-area="${esc(area)}">＋ Thêm ấp / khóm</button></div></div>`:''}
    </article>`;
  }).join('');
}

function renameRoute(area,i,value){value=value.trim();if(!value)return;const old=AREAS[area][i];AREAS[area][i]=value;shippers.forEach(s=>{if(s.area===area)s.routes=s.routes.map(r=>r===old?value:r)});save();renderAreas();renderAll()}
function addRoute(area){let v=prompt('Tên ấp/khóm mới:');if(v&&v.trim()){AREAS[area].push(v.trim());save();renderAreas();renderAll()}}
function deleteRoute(area,i){if(confirm('Xóa ấp/khóm này khỏi danh mục?')){const old=AREAS[area][i];AREAS[area].splice(i,1);shippers.forEach(s=>{if(s.area===area)s.routes=s.routes.filter(r=>r!==old)});save();renderAreas();renderAll()}}
function addArea(){alert('Danh mục chuẩn của huyện Càng Long cũ có đúng 14 xã/thị trấn. Không thêm đơn vị mới tại đây. Bạn chỉ cần thêm/sửa/xóa ấp trong 14 đơn vị chuẩn.')}
function deleteArea(area){if(confirm(`Xóa đơn vị ${area} khỏi danh mục?`)){delete AREAS[area];shippers.forEach(s=>{if(s.area===area){s.area='';s.routes=[]}});save();renderAreas();renderAll()}}
function closeM(id){document.getElementById(id).classList.remove("show")}
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("show")}));

// Dynamic UI actions: không chèn dữ liệu người dùng vào JavaScript inline.
document.addEventListener('click', (event)=>{
  const el=event.target.closest('[data-action]'); if(!el)return;
  const a=el.dataset.action;
  try{
    if(a==='open-commune'){event.stopPropagation(); window.openCommuneDetail?.(el.dataset.area);}
    else if(a==='toggle-area-editor'){window._areaEditorOpen=window._areaEditorOpen===el.dataset.area?null:el.dataset.area;renderAreas();}
    else if(a==='show-shipper'){showShipperResult(el.dataset.id)}
    else if(a==='edit-shipper'){openShipper(el.dataset.id)}
    else if(a==='delete-shipper'){deleteShipper(el.dataset.id)}
    else if(a==='restore-shipper'){restoreShipper(el.dataset.id)}
    else if(a==='remove-off'){removeOff(el.dataset.id)}
    else if(a==='open-setup'){openSetupDetail(el.dataset.area,el.dataset.date)}
    else if(a==='edit-setup-entry'){editSetupEntry(Number(el.dataset.index))}
    else if(a==='remove-setup-route'){removeSetupRoute(Number(el.dataset.index),Number(el.dataset.routeIndex))}
    else if(a==='delete-area'){deleteArea(el.dataset.area)}
    else if(a==='delete-route'){deleteRoute(el.dataset.area,Number(el.dataset.index))}
    else if(a==='add-route'){addRoute(el.dataset.area)}
  }catch(err){console.error('UI action:',err);alert('Không thể thực hiện thao tác này. Kiểm tra Console để biết chi tiết.');}
});
document.addEventListener('click',(event)=>{
  const el=event.target.closest('[data-action]');if(!el)return;
  try{
    if(el.dataset.action==='duty-shift'){dutySelectedShift=el.dataset.shift;renderDuty();renderDutyManager();}
    else if(el.dataset.action==='duty-report-toggle'){dutyReportMode=!dutyReportMode;renderDuty();}
    else if(el.dataset.action==='duty-set'){setDutyState(key(selected),dutyActiveShift(),el.dataset.name,el.dataset.present==='1');}
    else if(el.dataset.action==='duty-clear'){clearDutyState(key(selected),dutyActiveShift(),el.dataset.name);}
    else if(el.dataset.action==='duty-enable-cloud'){window.shipAreaEnableDutyCloud?.();}
    else if(el.dataset.action==='duty-save-roster-cloud'){persistDutyRoster();}
    else if(el.dataset.action==='duty-mark-all'){markAllDuty(el.dataset.present==='1');}
    else if(el.dataset.action==='duty-save-name'){const row=el.closest('.dutyManageRow');const input=row?.querySelector('[data-duty-edit-index]');dutyEditName(Number(document.getElementById('dutyManageDay')?.value),document.getElementById('dutyManageShift')?.value,Number(el.dataset.index),input?.value||'');}
    else if(el.dataset.action==='duty-delete-name'){dutyDeleteName(Number(document.getElementById('dutyManageDay')?.value),document.getElementById('dutyManageShift')?.value,Number(el.dataset.index));}
    else if(el.dataset.action==='duty-add-name'){const n=prompt('Nhập tên người trực xe mới:','');if(n)dutyAddName(Number(document.getElementById('dutyManageDay')?.value),document.getElementById('dutyManageShift')?.value,n);}
    else if(el.dataset.action==='duty-save-shift'){const k=document.getElementById('dutyManageShift')?.value;dutySetTime(k,document.getElementById('dutyManageLabel')?.value||'',document.getElementById('dutyManageTime')?.value||'');}
    else if(el.dataset.action==='duty-reset-default'){const k=document.getElementById('dutyManageShift')?.value,d=Number(document.getElementById('dutyManageDay')?.value);if(confirm('Khôi phục danh sách ca này về dữ liệu ban đầu?')){DUTY[k].days[d]=[...(DEFAULT_DUTY[k].days[d]||[])];persistDutyRoster();renderDuty();renderDutyManager();}}
  }catch(err){console.error('Duty action:',err)}
});
document.addEventListener('change',(event)=>{
  const el=event.target.closest('[data-action]'); if(!el)return;
  try{
    if(el.dataset.action==='assign-parsed-runner') assignParsedRunner(Number(el.dataset.index),el.value);
    else if(el.dataset.action==='rename-route') renameRoute(el.dataset.area,Number(el.dataset.index),el.value);
  }catch(err){console.error('UI change:',err);}
});
document.addEventListener('keydown',(event)=>{
  const el=event.target.closest('[data-action="open-commune"]');
  if(el && (event.key==='Enter'||event.key===' ')){event.preventDefault();window.openCommuneDetail?.(el.dataset.area);}
});

const dateDay=document.getElementById("day"),dateMonth=document.getElementById("month"),dateYear=document.getElementById("year"); if(dateDay)dateDay.onchange=dateChanged; if(dateMonth)dateMonth.onchange=dateChanged; if(dateYear)dateYear.onchange=dateChanged;document.getElementById("pasteDay")?.addEventListener("change",renderPasteStatus);document.getElementById("pasteMonthYear")?.addEventListener("change",renderPasteStatus);document.getElementById("pasteArea")?.addEventListener("change",onPasteAreaChange);
document.addEventListener("DOMContentLoaded",async()=>{
  setupDate();setupPasteDate();
  window.shipAreaCloudRefreshStatus?.();
  try{
    const cloud=await window.shipAreaCloudLoad?.();
    // Chỉ ghi đè dữ liệu local khi Supabase thực sự có dữ liệu.
    // Nếu cloud đang trống, tuyệt đối không apply payload rỗng vì sẽ làm danh sách shipper biến mất sau F5.
    if(cloud?.meta?.hasData){
      const beforeRouteCount=Object.values(AREAS).reduce((n,rs)=>n+(Array.isArray(rs)?rs.length:0),0);
      window.shipAreaApplyCloud?.(cloud.payload);
      const afterRouteCount=Object.values(AREAS).reduce((n,rs)=>n+(Array.isArray(rs)?rs.length:0),0);
      const cloudRouteCount=Object.values(cloud.payload?.areas||{}).reduce((n,rs)=>n+(Array.isArray(rs)?rs.length:0),0);
      if(cloudRouteCount===0 && afterRouteCount>0 && beforeRouteCount!==afterRouteCount){
        try{ await window.shipAreaCloudSave?.(window.shipAreaGetPayload?.()); }catch(e){ console.warn("Không thể tự khôi phục danh mục ấp lên cloud:",e); }
      }
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
  clearInterval(dutyTimer); dutyTimer=setInterval(dutyTick,30000);
});

window.shipAreaAfterCloudLoad=()=>{try{renderAll()}catch(e){console.warn(e)}};

/* v20.4 — stability + canonical 14-area guard + setup UI fixes */
(function(){
  // Never allow a deleted/duplicate area to reappear in the canonical directory.
  function forceCanonicalAreas(){
    const source=AREAS||{};
    const next={};
    CANONICAL_AREAS.forEach(a=>{
      const routes=Array.isArray(source[a])?source[a]:[];
      next[a]=[...new Set(routes.map(x=>String(x||'').trim()).filter(Boolean))];
    });
    AREAS=next;
    localStorage.setItem('SA_AREAS',JSON.stringify(AREAS));
  }
  forceCanonicalAreas();

  // Prevent the fixed 14-area directory from being deleted accidentally.
  window.deleteArea=function(area){
    alert('Danh mục xã/thị trấn được khóa ở đúng 14 đơn vị chuẩn. Bạn chỉ có thể sửa hoặc xóa ấp trong từng xã.');
  };

  // Render paste-area selectors from the same canonical source.
  window.populatePasteAreas=function(){
    const el=document.getElementById('pasteArea'); if(!el)return;
    const cur=el.value;
    el.innerHTML='<option value="">— Chọn xã để dán lịch —</option>'+CANONICAL_AREAS.map(a=>`<option value="${esc(a)}">${esc(a)}</option>`).join('');
    if(cur&&CANONICAL_AREAS.includes(cur))el.value=cur;
  };

  // Cleaner progress card: always 14, never 27.
  window.renderPasteStatus=function(){
    const d=getPasteDate(),k=pasteKey(d),areas=CANONICAL_AREAS.slice();
    const done=new Set(pasteLog[k]||[]),yes=areas.filter(a=>done.has(a)),no=areas.filter(a=>!done.has(a)),total=14;
    const dateEl=document.getElementById('pasteStatusDate'); if(dateEl)dateEl.textContent='Lịch setup ngày '+fmt(d);
    const badge=document.getElementById('pasteCountBadge'); if(badge)badge.textContent=`${yes.length} / ${total} xã đã dán`;
    const progress=document.getElementById('pasteProgress');
    if(progress){const pct=Math.round(yes.length/total*100);progress.innerHTML=`<div class="progressProHead"><div><b>📅 ${fmt(d)}</b><small>Tiến độ setup 14 xã chuẩn</small></div><strong>${pct}%</strong></div><div class="progressProTrack"><i style="width:${pct}%"></i></div><div class="progressProFoot"><span>✓ ${yes.length} đã dán</span><span>○ ${no.length} chưa dán</span></div>`;}
    const box=document.getElementById('pasteAreaStatus'); if(!box)return;
    const card=a=>{const rec=setupRecords[k]?.[a],count=rec?.entries?.length||0;return `<button type="button" class="pasteAreaItem clickSetup" data-action="open-setup" data-area="${esc(a)}" data-date="${esc(k)}"><span><b>${esc(a)}</b><small>${count?`${count} dòng • bấm để xem / sửa`:'Đã đánh dấu setup'}</small></span><em class="badge green">Đã dán</em></button>`};
    box.innerHTML=`<div class="pasteStatusCol"><div class="pasteStatusHead done"><span>✓ Đã dán</span><strong>${yes.length}</strong></div><div class="pasteAreaList">${yes.length?yes.map(card).join(''):'<div class="empty">Chưa có xã nào.</div>'}</div></div><div class="pasteStatusCol"><div class="pasteStatusHead todo"><span>○ Chưa dán</span><strong>${no.length}</strong></div><div class="pasteAreaList">${no.length?no.map(a=>`<div class="pasteAreaItem"><span><b>${esc(a)}</b><small>Chưa có setup ngày này</small></span><em class="badge">Chưa dán</em></div>`).join(''):'<div class="empty">🎉 Đã setup đủ 14 xã.</div>'}</div></div>`;
  };

  // Prevent duplicate "Đổi xã" bars when setup detail is re-rendered.
  const oldRenderSetupDetail=window.renderSetupDetail;
  if(typeof oldRenderSetupDetail==='function'){
    window.renderSetupDetail=function(){
      const rows=document.getElementById('setupDetailRows');
      const bar=rows?.previousElementSibling;
      if(bar?.classList?.contains('setupAreaEditBar'))bar.remove();
      oldRenderSetupDetail();
    };
  }

  // Safer global render: one broken optional element can never stop the rest of the UI.
  const oldRenderAll=window.renderAll;
  if(typeof oldRenderAll==='function'){
    window.renderAll=function(){
      try{oldRenderAll();}catch(err){console.error('ShipArea renderAll recovered:',err);}
    };
  }

  // Make the 14-area count explicit in the page header when available.
  const oldPage=window.page;
  if(typeof oldPage==='function'){
    window.page=function(p,btn){oldPage(p,btn);if(p==='areas'||p==='home'){const h=document.querySelector('.communeSurface .eyebrow');if(h)h.textContent='ĐỊA BÀN • 14 ĐƠN VỊ';}};
  }

  // Re-render after canonical cleanup once DOM is ready.
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{forceCanonicalAreas();try{renderAll()}catch(e){console.error(e)}});
  else {try{renderAll()}catch(e){console.error(e)}}
})();
