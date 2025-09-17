# User Story cho **Admin** (React Admin)


## 🎯 **Story ID:** `AP-001`

**Tiêu đề:** Quản lý danh sách sản phẩm

**User Story:**
👉 “Là một admin, tôi muốn quản lý sản phẩm để đảm bảo thông tin hiển thị đúng cho khách hàng.”

**Acceptance Criteria:**

* Tôi có thể xem danh sách tất cả sản phẩm (cả đang bán và ẩn).
* Tôi có thể thêm sản phẩm mới.
* Tôi có thể sửa thông tin sản phẩm (tên, giá, mô tả, hình ảnh).
* Tôi có thể xóa hoặc ẩn sản phẩm.

**Mapping:**

* **Backend API**:

  * `GET v1/products` (admin scope: trả về cả sản phẩm ẩn).
  * `POST v1/products` → thêm sản phẩm mới.
  * `PUT v1/products/:id` → chỉnh sửa sản phẩm.
  * `DELETE v1/products/:id` hoặc `PATCH v1/products/:id/hide` → xóa/ẩn sản phẩm.