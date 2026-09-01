-- ShipArea Pro - Supabase database thật, KHÔNG cần đăng nhập.
-- Chạy toàn bộ file này trong Supabase > SQL Editor.
-- Lưu ý: vì app không có login/RLS theo user, anon key có quyền đọc/ghi toàn bộ dữ liệu của app.

create table if not exists public.sa_communes (
  name text primary key,
  source text,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.sa_routes (
  id text primary key,
  commune_name text not null references public.sa_communes(name) on update cascade on delete cascade,
  name text not null,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now(),
  unique(commune_name, name)
);

create table if not exists public.sa_shippers (
  id text primary key,
  name text not null,
  phone text not null default '',
  status text not null default 'work' check (status in ('work','off','inactive')),
  inactive_reason text,
  inactive_at date,
  commune_name text references public.sa_communes(name) on update cascade on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.sa_shippers add column if not exists inactive_reason text;
alter table public.sa_shippers add column if not exists inactive_at date;

create table if not exists public.sa_shipper_routes (
  shipper_id text not null references public.sa_shippers(id) on delete cascade,
  route_id text not null references public.sa_routes(id) on delete cascade,
  primary key(shipper_id, route_id)
);

create table if not exists public.sa_off_records (
  id text primary key,
  work_date date not null,
  off_shipper_id text not null references public.sa_shippers(id) on delete cascade,
  replace_shipper_id text references public.sa_shippers(id) on delete set null,
  note text not null default '',
  updated_at timestamptz not null default now(),
  unique(work_date, off_shipper_id)
);

create table if not exists public.sa_setup_records (
  id text primary key,
  work_date date not null,
  commune_name text not null references public.sa_communes(name) on update cascade on delete cascade,
  raw_text text not null default '',
  auto_added jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  unique(work_date, commune_name)
);

create table if not exists public.sa_setup_entries (
  id text primary key,
  setup_id text not null references public.sa_setup_records(id) on delete cascade,
  entry_index integer not null,
  shipper_id text references public.sa_shippers(id) on delete set null,
  shipper_name_snapshot text not null default '',
  off boolean not null default false,
  note text not null default '',
  unique(setup_id, entry_index)
);

create table if not exists public.sa_setup_entry_routes (
  entry_id text not null references public.sa_setup_entries(id) on delete cascade,
  route_id text references public.sa_routes(id) on delete set null,
  route_name_snapshot text not null default '',
  route_index integer not null default 0,
  primary key(entry_id, route_index)
);

create table if not exists public.sa_paste_days (
  work_date date not null,
  commune_name text not null references public.sa_communes(name) on update cascade on delete cascade,
  updated_at timestamptz not null default now(),
  primary key(work_date, commune_name)
);

create index if not exists idx_sa_routes_commune on public.sa_routes(commune_name);
create index if not exists idx_sa_off_date on public.sa_off_records(work_date);
create index if not exists idx_sa_setup_date on public.sa_setup_records(work_date);
create index if not exists idx_sa_setup_entries_setup on public.sa_setup_entries(setup_id);
create index if not exists idx_sa_paste_days_date on public.sa_paste_days(work_date);

-- RLS mở cho anon vì app chủ động không có login/phân quyền.
-- Nếu sau này đưa app lên Internet công khai, nên bật Auth và đổi các policy này.
alter table public.sa_communes enable row level security;
alter table public.sa_routes enable row level security;
alter table public.sa_shippers enable row level security;
alter table public.sa_shipper_routes enable row level security;
alter table public.sa_off_records enable row level security;
alter table public.sa_setup_records enable row level security;
alter table public.sa_setup_entries enable row level security;
alter table public.sa_setup_entry_routes enable row level security;
alter table public.sa_paste_days enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array[
    'sa_communes','sa_routes','sa_shippers','sa_shipper_routes','sa_off_records',
    'sa_setup_records','sa_setup_entries','sa_setup_entry_routes','sa_paste_days'
  ] loop
    execute format('drop policy if exists "%s_anon_all" on public.%I', t, t);
    execute format('create policy "%s_anon_all" on public.%I for all to anon, authenticated using (true) with check (true)', t, t);
  end loop;
end $$;


-- ============================================================
-- 13. DỮ LIỆU ĐỊA BÀN HUYỆN CÀNG LONG CŨ - TRÀ VINH
-- Nguồn đối chiếu: Quyết định 13/2024/QĐ-UBND và các hồ sơ
-- quy hoạch/địa danh hành chính của huyện Càng Long.
-- Dữ liệu được tách theo Xã -> Ấp/Khóm để app tự đối chiếu.
-- ============================================================

alter table public.sa_communes
  add column if not exists district_name text not null default 'Huyện Càng Long';

-- 14 đơn vị cấp xã/thị trấn của huyện Càng Long cũ
insert into public.sa_communes(name, source, sort_order, district_name)
values
 ('Thị trấn Càng Long','Càng Long cũ / QĐ 13/2024/QĐ-UBND',1,'Huyện Càng Long'),
 ('Xã Tân An','Càng Long cũ / QĐ 13/2024/QĐ-UBND',2,'Huyện Càng Long'),
 ('Xã Đại Phước','Càng Long cũ / quy hoạch xã',3,'Huyện Càng Long'),
 ('Xã An Trường','Càng Long cũ / QĐ 13/2024/QĐ-UBND',4,'Huyện Càng Long'),
 ('Xã An Trường A','Càng Long cũ / QĐ 13/2024/QĐ-UBND',5,'Huyện Càng Long'),
 ('Xã Đức Mỹ','Càng Long cũ / QĐ 13/2024/QĐ-UBND',6,'Huyện Càng Long'),
 ('Xã Bình Phú','Càng Long cũ / QĐ 13/2024/QĐ-UBND',7,'Huyện Càng Long'),
 ('Xã Tân Bình','Càng Long cũ / QĐ 13/2024/QĐ-UBND',8,'Huyện Càng Long'),
 ('Xã Phương Thạnh','Càng Long cũ / QĐ 13/2024/QĐ-UBND',9,'Huyện Càng Long'),
 ('Xã Mỹ Cẩm','Càng Long cũ / QĐ 13/2024/QĐ-UBND',10,'Huyện Càng Long'),
 ('Xã Huyền Hội','Càng Long cũ / QĐ 13/2024/QĐ-UBND',11,'Huyện Càng Long'),
 ('Xã Nhị Long','Càng Long cũ / QĐ 13/2024/QĐ-UBND',12,'Huyện Càng Long'),
 ('Xã Nhị Long Phú','Càng Long cũ / QĐ 13/2024/QĐ-UBND',13,'Huyện Càng Long'),
 ('Xã Đại Phúc','Càng Long cũ / danh mục địa danh + quy hoạch',14,'Huyện Càng Long')
on conflict (name) do update set
 source=excluded.source,
 sort_order=excluded.sort_order,
 district_name=excluded.district_name,
 updated_at=now();

-- Ấp/khóm. Tên được chuẩn hóa bỏ tiền tố "Ấp/Khóm" để app hiển thị linh hoạt.
insert into public.sa_routes(id, commune_name, name, sort_order)
select
  lower(md5('Huyện Càng Long|'||x.commune_name||'|'||x.name)),
  x.commune_name,
  x.name,
  x.ord
from (values
 ('Thị trấn Càng Long','Khóm 1',1),('Thị trấn Càng Long','Khóm 2',2),('Thị trấn Càng Long','Khóm 3',3),('Thị trấn Càng Long','Khóm 4',4),('Thị trấn Càng Long','Khóm 5',5),('Thị trấn Càng Long','Khóm 6',6),('Thị trấn Càng Long','Khóm 7',7),('Thị trấn Càng Long','Khóm 8',8),('Thị trấn Càng Long','Khóm 9',9),('Thị trấn Càng Long','Khóm 10',10),
 ('Xã Tân An','Tân An Chợ',1),('Xã Tân An','Tân Tiến',2),('Xã Tân An','Tân Trung',3),('Xã Tân An','Trà Ốp',4),('Xã Tân An','Đại An',5),('Xã Tân An','Cả Chương',6),('Xã Tân An','Nhà Thờ',7),('Xã Tân An','Long Hội',8),
 ('Xã Đại Phước','Nhị Hòa',1),('Xã Đại Phước','Rạch Dừa',2),('Xã Đại Phước','Rạch Sen',3),('Xã Đại Phước','Thượng',4),('Xã Đại Phước','Tân Trung',5),('Xã Đại Phước','Trung',6),('Xã Đại Phước','Hạ',7),('Xã Đại Phước','Trại Luận',8),('Xã Đại Phước','Trà Gật',9),('Xã Đại Phước','Trà Gút',10),('Xã Đại Phước','Long Hòa',11),
 ('Xã An Trường','3',1),('Xã An Trường','3A',2),('Xã An Trường','4',3),('Xã An Trường','4A',4),('Xã An Trường','5',5),('Xã An Trường','5A',6),('Xã An Trường','6',7),('Xã An Trường','6A',8),('Xã An Trường','7',9),('Xã An Trường','7A',10),('Xã An Trường','8',11),('Xã An Trường','8A',12),
 ('Xã An Trường A','Lo Co A',1),('Xã An Trường A','Lo Co B',2),('Xã An Trường A','Trung Thiên',3),('Xã An Trường A','9',4),('Xã An Trường A','9A',5),('Xã An Trường A','9B',6),('Xã An Trường A','9C',7),
 ('Xã Đức Mỹ','Mỹ Hiệp',1),('Xã Đức Mỹ','Đức Mỹ',2),('Xã Đức Mỹ','Đức Mỹ A',3),('Xã Đức Mỹ','Long Sơn',4),('Xã Đức Mỹ','Đức Hiệp',5),('Xã Đức Mỹ','Nhuận Thành',6),('Xã Đức Mỹ','Đại Đức',7),('Xã Đức Mỹ','Thạnh Hiệp',8),
 ('Xã Bình Phú','Nguyệt Lãng A',1),('Xã Bình Phú','Nguyệt Lãng B',2),('Xã Bình Phú','Nguyệt Lãng C',3),('Xã Bình Phú','Cây Cách',4),('Xã Bình Phú','Phú Đức',5),('Xã Bình Phú','Long Trị',6),('Xã Bình Phú','Phú Hưng 1',7),('Xã Bình Phú','Phú Hưng 2',8),('Xã Bình Phú','Phú Phong',9),('Xã Bình Phú','Phú Phong 3',10),
 ('Xã Tân Bình','An Định Giồng',1),('Xã Tân Bình','An Định Cầu',2),('Xã Tân Bình','Trà Ốp',3),('Xã Tân Bình','Ninh Bình',4),('Xã Tân Bình','Thanh Bình',5),('Xã Tân Bình','Ngã Hậu',6),('Xã Tân Bình','Tân Định',7),('Xã Tân Bình','An Chánh',8),('Xã Tân Bình','An Bình',9),('Xã Tân Bình','An Thạnh',10),
 ('Xã Phương Thạnh','Đầu Giồng',1),('Xã Phương Thạnh','Chợ',2),('Xã Phương Thạnh','Giồng Chùa',3),('Xã Phương Thạnh','Sóc Vinh',4),('Xã Phương Thạnh','Hưng Nhượng A',5),('Xã Phương Thạnh','Hưng Nhượng B',6),('Xã Phương Thạnh','Phú Thạnh',7),('Xã Phương Thạnh','Phú Hòa',8),('Xã Phương Thạnh','Nguyệt Trường',9),('Xã Phương Thạnh','Thiện Chánh',10),
 ('Xã Mỹ Cẩm','Số 1',1),('Xã Mỹ Cẩm','Số 7',2),('Xã Mỹ Cẩm','Số 2',3),('Xã Mỹ Cẩm','Số 3',4),('Xã Mỹ Cẩm','Số 4',5),('Xã Mỹ Cẩm','Số 5',6),('Xã Mỹ Cẩm','Số 6',7),('Xã Mỹ Cẩm','Số 8',8),
 ('Xã Huyền Hội','Giồng Mới',1),('Xã Huyền Hội','Sóc',2),('Xã Huyền Hội','Giồng Bèn',3),('Xã Huyền Hội','Lưu Tư',4),('Xã Huyền Hội','Trà On',5),('Xã Huyền Hội','Kinh B',6),('Xã Huyền Hội','Cầu Xây',7),('Xã Huyền Hội','Kinh A',8),('Xã Huyền Hội','Bình Hội',9),
 ('Xã Nhị Long','Long An',1),('Xã Nhị Long','Rạch Rô 1',2),('Xã Nhị Long','Rạch Rô 2',3),('Xã Nhị Long','Rạch Mát',4),('Xã Nhị Long','Rạch Đập',5),('Xã Nhị Long','Dừa Đỏ 1',6),('Xã Nhị Long','Đon',7),('Xã Nhị Long','Cầu Đúc',8),
 ('Xã Nhị Long Phú','Gò Cà',1),('Xã Nhị Long Phú','Hiệp Phú',2),('Xã Nhị Long Phú','Thạnh Hiệp',3),('Xã Nhị Long Phú','Sơn Trắng',4),('Xã Nhị Long Phú','Dừa Đỏ 2',5),('Xã Nhị Long Phú','Dừa Đỏ 3',6),
 ('Xã Đại Phúc','Cây Dương',1),('Xã Đại Phúc','Kinh Ngay',2),('Xã Đại Phúc','Rạch Cát',3),('Xã Đại Phúc','Tân Định',4),('Xã Đại Phúc','Tân Hạnh',5),('Xã Đại Phúc','Tân Phúc',6),('Xã Đại Phúc','Tất Vinh',7)
) as x(commune_name,name,ord)
on conflict (id) do update set
 commune_name=excluded.commune_name,
 name=excluded.name,
 sort_order=excluded.sort_order;

-- Gợi ý tên cũ/biến thể để bộ phân tích lịch có thể đối chiếu:
-- "Thanh bình" -> Thanh Bình; "ngã hậu" -> Ngã Hậu; "tân định" -> Tân Định.
-- Có thể thêm alias trong app mà không cần sửa database.
