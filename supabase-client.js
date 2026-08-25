/* ShipArea Pro - Supabase client
   Không Auth / không phân quyền.
   Hỗ trợ cả tên anonKey (đang dùng trong app) và publishableKey nếu sau này đổi tên.
*/
(function(){
  const STORAGE_KEY = "SA_SUPABASE_CONFIG";
  let client = null;
  let syncing = false;
  let loading = false;

  const base = window.SHIPAREA_SUPABASE_CONFIG || {};
  const now = () => new Date().toISOString();
  const cfg = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || base; }
    catch { return base; }
  };
  const keyOf = c => c?.anonKey || c?.publishableKey || "";
  const saveCfg = c => localStorage.setItem(STORAGE_KEY, JSON.stringify(c));

  function setStatus(text, kind="") {
    const el = document.getElementById("cloudStatus");
    if (el) { el.textContent = text; el.className = "cloudStatus " + kind; }
  }

  function ensure(showError=false) {
    const c = cfg();
    const k = keyOf(c);
    if (!c?.url || !k || !window.supabase?.createClient) {
      client = null;
      setStatus("☁️ Chưa kết nối", "");
      if (showError) throw new Error("Thiếu Supabase URL hoặc Publishable/anon key.");
      return null;
    }
    try {
      if (!client || client.__shipareaUrl !== c.url || client.__shipareaKey !== k) {
        client = window.supabase.createClient(c.url.replace(/\/$/, ""), k, {
          auth: { persistSession:false, autoRefreshToken:false, detectSessionInUrl:false }
        });
        client.__shipareaUrl = c.url;
        client.__shipareaKey = k;
      }
      setStatus("☁️ Đã kết nối DB", "ok");
      return client;
    } catch (e) {
      client = null;
      setStatus("☁️ Lỗi kết nối", "err");
      if (showError) throw e;
      return null;
    }
  }

  const routeId = (area,route) => btoa(unescape(encodeURIComponent(`${area}::${route}`))).replace(/=+$/,'').replace(/\+/g,'-').replace(/\//g,'_');
  const setupId = (date,area) => btoa(unescape(encodeURIComponent(`${date}::${area}`))).replace(/=+$/,'').replace(/\+/g,'-').replace(/\//g,'_');
  const entryId = (setup,index) => `${setup}::${index}`;
  const uniq = a => [...new Set(a)];

  function payloadToRows(payload){
    const areas = payload.areas || {};
    const communes = Object.keys(areas).map((name,i)=>({name,source:"ShipArea Pro",sort_order:i,updated_at:now()}));
    const routes = [];
    Object.entries(areas).forEach(([area,rs])=>rs.forEach((name,i)=>routes.push({id:routeId(area,name),commune_name:area,name,sort_order:i,updated_at:now()})));

    const shippers = (payload.shippers||[]).map(s=>({
      id:String(s.id), name:s.name||"", phone:s.phone||"", status:s.status||"work",
      inactive_reason:s.inactiveReason||null, inactive_at:s.inactiveAt||null,
      commune_name:s.area||null, updated_at:now()
    }));

    const shipperRoutes = [];
    (payload.shippers||[]).forEach(s=>(s.routes||[]).forEach(r=>{
      if ((areas[s.area]||[]).some(x=>x===r)) shipperRoutes.push({shipper_id:String(s.id),route_id:routeId(s.area,r)});
    }));

    const off = [];
    Object.entries(payload.schedules||{}).forEach(([date,list])=>(list||[]).forEach(o=>off.push({
      id:`${date}::${o.offId}`, work_date:date, off_shipper_id:String(o.offId),
      replace_shipper_id:o.replaceId?String(o.replaceId):null, note:o.note||"", updated_at:now()
    })));

    const setup=[]; const entries=[]; const entryRoutes=[];
    Object.entries(payload.setupRecords||{}).forEach(([date,byArea])=>Object.entries(byArea||{}).forEach(([area,rec])=>{
      const sid=setupId(date,area);
      setup.push({id:sid,work_date:date,commune_name:area,raw_text:rec.raw||"",auto_added:uniq(rec.autoAdded||[]),updated_at:rec.updatedAt||now()});
      (rec.entries||[]).forEach((e,i)=>{
        const eid=entryId(sid,i);
        entries.push({id:eid,setup_id:sid,entry_index:i,shipper_id:e.shipperId?String(e.shipperId):null,shipper_name_snapshot:e.name||"",off:!!e.off,note:e.note||""});
        (e.routes||[]).forEach((r,j)=>entryRoutes.push({entry_id:eid,route_id:(areas[area]||[]).includes(r)?routeId(area,r):null,route_name_snapshot:r,route_index:j}));
      });
    }));

    const paste=[];
    Object.entries(payload.pasteLog||{}).forEach(([date,areasDone])=>(areasDone||[]).forEach(area=>paste.push({work_date:date,commune_name:area,updated_at:now()})));
    return {communes,routes,shippers,shipperRoutes,off,setup,entries,entryRoutes,paste};
  }

  async function replaceAll(payload){
    const sb=ensure(true);
    const r=payloadToRows(payload);

    // Xóa theo FK rồi nạp lại snapshot hiện tại.
    // Phù hợp app nội bộ, dữ liệu quy mô nhỏ/vừa.
    const deletes=[
      ["sa_setup_entry_routes","route_name_snapshot"],
      ["sa_setup_entries","id"],
      ["sa_setup_records","id"],
      ["sa_off_records","id"],
      ["sa_paste_days","commune_name"],
      ["sa_shipper_routes","shipper_id"],
      ["sa_shippers","id"],
      ["sa_routes","id"],
      ["sa_communes","name"]
    ];
    for(const [table,column] of deletes){
      const {error}=await sb.from(table).delete().neq(column, "");
      if(error) throw error;
    }

    const batches=[
      ["sa_communes",r.communes], ["sa_routes",r.routes], ["sa_shippers",r.shippers],
      ["sa_shipper_routes",r.shipperRoutes], ["sa_off_records",r.off], ["sa_setup_records",r.setup],
      ["sa_setup_entries",r.entries], ["sa_setup_entry_routes",r.entryRoutes], ["sa_paste_days",r.paste]
    ];
    for(const [table,rows] of batches){
      if(!rows.length) continue;
      for(let i=0;i<rows.length;i+=500){
        const {error}=await sb.from(table).insert(rows.slice(i,i+500));
        if(error) throw error;
      }
    }
    return true;
  }

  async function load(){
    const sb=ensure();
    if(!sb) return null;
    loading=true;
    try{
      const names=["sa_communes","sa_routes","sa_shippers","sa_shipper_routes","sa_off_records","sa_setup_records","sa_setup_entries","sa_setup_entry_routes","sa_paste_days"];
      const res={};
      for(const t of names){
        const {data,error}=await sb.from(t).select("*");
        if(error) throw error;
        res[t]=data||[];
      }

      const areas={};
      res.sa_communes.forEach(c=>areas[c.name]=[]);
      res.sa_routes
        .sort((a,b)=>(a.commune_name.localeCompare(b.commune_name,'vi')||a.sort_order-b.sort_order))
        .forEach(r=>{areas[r.commune_name]??=[];areas[r.commune_name].push(r.name)});

      const shippers=res.sa_shippers.map(s=>({id:s.id,name:s.name,phone:s.phone||"",status:s.status||"work",inactiveReason:s.inactive_reason||"",inactiveAt:s.inactive_at||"",area:s.commune_name||"",routes:[]}));
      const shipMap=new Map(shippers.map(s=>[s.id,s]));
      const routeMap=new Map(res.sa_routes.map(r=>[r.id,r]));
      res.sa_shipper_routes.forEach(x=>{const s=shipMap.get(x.shipper_id),r=routeMap.get(x.route_id);if(s&&r)s.routes.push(r.name)});

      const schedules={};
      res.sa_off_records.forEach(o=>(schedules[o.work_date]??=[]).push({offId:o.off_shipper_id,replaceId:o.replace_shipper_id||"",note:o.note||""}));

      const setupRecords={}; const setupMap=new Map();
      res.sa_setup_records.forEach(r=>{
        setupMap.set(r.id,r);
        setupRecords[r.work_date]??={};
        setupRecords[r.work_date][r.commune_name]={area:r.commune_name,date:r.work_date,raw:r.raw_text||"",updatedAt:r.updated_at,autoAdded:Array.isArray(r.auto_added)?r.auto_added:[],entries:[]};
      });
      const entryMap=new Map();
      res.sa_setup_entries.sort((a,b)=>a.entry_index-b.entry_index).forEach(e=>{
        const r=setupMap.get(e.setup_id); if(!r)return;
        const rec=setupRecords[r.work_date][r.commune_name];
        const obj={name:e.shipper_name_snapshot||"",shipperId:e.shipper_id||"",routes:[],off:!!e.off,note:e.note||""};
        rec.entries.push(obj); entryMap.set(e.id,obj);
      });
      res.sa_setup_entry_routes.sort((a,b)=>a.route_index-b.route_index).forEach(x=>{const e=entryMap.get(x.entry_id);if(e)e.routes.push(x.route_name_snapshot)});

      const pasteLog={};
      res.sa_paste_days.forEach(x=>(pasteLog[x.work_date]??=[]).push(x.commune_name));

      return {
        payload:{areas,shippers,schedules,pasteLog,setupRecords},
        meta:{hasData:Object.keys(areas).length>0||shippers.length>0||Object.keys(schedules).length>0||Object.keys(setupRecords).length>0}
      };
    } finally { loading=false; }
  }

  async function save(payload){
    if(syncing || loading) return;
    if(!ensure()) return;
    syncing=true;
    try { await replaceAll(payload); setStatus("☁️ Đã đồng bộ DB","ok"); }
    catch(e){ console.warn("Supabase save:",e); setStatus("☁️ Lỗi đồng bộ","err"); throw e; }
    finally { syncing=false; }
  }

  window.shipAreaCloudLoad=load;
  window.shipAreaCloudSave=save;
  window.shipAreaCloudRefreshStatus=()=>ensure();

  window.openCloudSettings=()=>{
    const c=cfg();
    document.getElementById("sbUrl").value=c?.url||"";
    document.getElementById("sbKey").value=keyOf(c);
    document.getElementById("cloudMessage").textContent="";
    document.getElementById("cloudModal").classList.add("show");
  };

  window.closeCloudSettings=()=>document.getElementById("cloudModal").classList.remove("show");

  window.connectCloud=async()=>{
    const url=document.getElementById("sbUrl").value.trim().replace(/\/$/,"");
    const anonKey=document.getElementById("sbKey").value.trim();
    const msg=document.getElementById("cloudMessage");
    if(!url||!anonKey){msg.textContent="Vui lòng nhập đủ Project URL và Publishable/anon key.";return;}
    saveCfg({url,anonKey});
    client=null;
    try{
      const p=await load();
      if(p?.payload && p?.meta?.hasData){
        msg.textContent="✓ Kết nối thành công. Database đang có dữ liệu.";
        if(confirm("Supabase đang có dữ liệu. Bạn muốn tải dữ liệu cloud xuống ứng dụng và thay dữ liệu đang có trên máy này không?")) window.shipAreaApplyCloud?.(p.payload);
      }else{
        msg.textContent="✓ Kết nối thành công. Database đang trống.";
        if(window.shipAreaGetPayload){
          if(confirm("Database đang trống. Đồng bộ dữ liệu hiện có trên máy này lên Supabase ngay không?")) await save(window.shipAreaGetPayload());
        }
      }
    }catch(e){msg.textContent="✕ Kết nối thất bại: "+(e.message||e);setStatus("☁️ Lỗi kết nối","err");}
  };

  window.pushCloudNow=async()=>{
    const msg=document.getElementById("cloudMessage");
    try{
      const payload=window.shipAreaGetPayload?.();
      if(!payload) throw new Error("Ứng dụng chưa sẵn sàng");
      await save(payload);
      msg.textContent="✓ Đã đồng bộ dữ liệu vào Supabase.";
    }catch(e){msg.textContent="✕ Đồng bộ thất bại: "+(e.message||e);}
  };

  window.pullCloudNow=async()=>{
    const msg=document.getElementById("cloudMessage");
    try{
      const p=await load();
      if(!p?.payload) throw new Error("Không tải được dữ liệu");
      window.shipAreaApplyCloud?.(p.payload);
      msg.textContent="✓ Đã tải dữ liệu mới nhất từ Supabase.";
    }catch(e){msg.textContent="✕ Tải thất bại: "+(e.message||e);}
  };

  window.disconnectCloud=()=>{
    localStorage.removeItem(STORAGE_KEY);
    client=null;
    setStatus("☁️ Chưa kết nối","");
    const msg=document.getElementById("cloudMessage");
    if(msg) msg.textContent="Đã ngắt cấu hình cloud trên trình duyệt này. Dữ liệu local vẫn còn.";
  };
})();
