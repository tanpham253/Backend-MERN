# User Story cho **Admin** (React Admin)


## 🎯 **Story ID:** `P-001`

**Tiêu đề:** Quản lý danh sách sản phẩm

**User Story:**
👉 “Là một nhà cung cấp, tôi muốn quản lý sản phẩm của tôi để đảm bảo thông tin hiển thị đúng cho khách hàng.”

**Acceptance Criteria:**

* Tôi có thể xem danh sách sản phẩm do tôi cung cấp.
* Tôi có thể thêm sản phẩm mới (sau khi admin duyệt).
* Tôi có thể chỉnh sửa thông tin sản phẩm của tôi (tên, giá, mô tả, hình ảnh).
* Tôi có thể xem trạng thái duyệt (pending/approved/rejected).
* Tôi có thể ẩn sản phẩm của tôi.

**Mapping:**

* **Backend API**:

    * `GET v1/providers/:id/products` → xem danh sách sản phẩm của.
    * `POST v1/providers/:id/products` → thêm sản phẩm (yêu cầu duyệt).
    * `PUT v1/providers/:id/products/:id` → chỉnh sửa sản phẩm.
    * `GET v1/providers/:id/products/:id/status` → xem trạng thái duyệt.