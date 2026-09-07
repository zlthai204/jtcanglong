# ShipArea Pro v18.1

## Mục tiêu
Bản frontend này chỉ nâng cấp giao diện và logic. Không có SQL `DROP/TRUNCATE/DELETE` nào được chạy khi mở trang.

## Logic dán
- Luôn chọn xã trước khi phân tích.
- Dòng tiêu đề/ngày/xã không được coi là ấp.
- Không tự tạo xã hoặc ấp từ nội dung dán.
- Chỉ đối chiếu ấp đã tồn tại trong `AREAS` của xã đang chọn.
- Hỗ trợ dạng không có dấu `:` như `Tùng chạy Trung`, `Thái chạy Thượng`.
- Nếu shipper setup gốc OFF và người khác trong chính lịch dán chạy đúng ấp đó, hệ thống tự gán người thay cho ngày đó.
- Người thay chỉ là snapshot của ngày; không sửa tuyến gốc của shipper.
- Dòng không đối chiếu được không được ghi thành ấp rác; phải chọn người trước khi áp dụng.

## Dữ liệu
Supabase là nguồn dữ liệu chính khi đã kết nối. LocalStorage chỉ là cache/khởi tạo, không phải nguồn địa bàn chính.

## Cập nhật frontend
Thay toàn bộ các file frontend trong bộ này. Sau khi upload, dùng Ctrl+F5 để tránh cache JS/CSS cũ.
