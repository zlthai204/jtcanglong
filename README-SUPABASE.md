# ShipArea Pro v12 — Supabase thật, không login

## Đã cấu hình sẵn
`supabase-config.js` đã được điền Project URL và Publishable key mà bạn cung cấp.

Không cần Login/Auth.

## 1. Tạo database
Supabase → SQL Editor → dán toàn bộ `supabase-schema.sql` → Run.

Các bảng:
- `sa_communes` — xã/thị trấn
- `sa_routes` — ấp/khóm
- `sa_shippers` — shipper
- `sa_shipper_routes` — shipper phụ trách ấp nào
- `sa_off_records` — OFF/người chạy thay theo ngày
- `sa_setup_records` — lịch setup từng xã theo từng ngày
- `sa_setup_entries` — từng dòng shipper trong lịch
- `sa_setup_entry_routes` — ấp của từng dòng lịch
- `sa_paste_days` — xã nào đã dán trong ngày nào

## 2. Mở app
Mở `index.html`.

App sẽ tự đọc `supabase-config.js`.
Nếu database đang trống nhưng máy đã có dữ liệu local, app hỏi có đồng bộ dữ liệu local lên cloud hay không.

## 3. Nếu muốn đổi project
Mở `supabase-config.js`:

```js
window.SHIPAREA_SUPABASE_CONFIG = {
  url: "https://YOUR_PROJECT.supabase.co",
  anonKey: "YOUR_PUBLISHABLE_KEY"
};
```

Hoặc dùng nút `⚙️ Supabase` trong app.

## 4. Không dùng Login
Tất cả máy có cùng URL + Publishable/anon key sẽ dùng chung database.

**Không được đặt `service_role` hoặc Secret key vào frontend.** Chỉ dùng Publishable/anon key.

## 5. Luồng dữ liệu
Dán lịch hợp lệ → lưu lịch theo ngày/xã → Supabase.

Khi xem một ấp, app ưu tiên người chạy thực tế trong **lịch đã dán của đúng ngày** nếu người phụ trách cố định đang OFF hoặc không còn hợp lệ.

Sửa lịch ngày cũ → lưu lại đúng bản ghi của ngày đó.
