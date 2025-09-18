# User Story cho **Customer**


## 🎯 **Story ID:** `CU-001`

**Tiêu đề:** Xem và mua sản phẩm

**User Story:**
👉 “Là một khách hàng, tôi muốn xem và mua sản phẩm để đáp ứng nhu cầu của mình.”

**Acceptance Criteria:**

* Tôi có thể xem danh sách sản phẩm đang bán.
* Tôi có thể tìm kiếm và lọc sản phẩm theo tên, loại.
* Tôi có thể xem chi tiết sản phẩm (tên, giá, mô tả, hình ảnh, số lượng còn lại).
* Tôi có thể thêm sản phẩm vào giỏ hàng.
* Tôi có thể đặt mua sản phẩm.

**Mapping:**

* **Backend API**:

 * `GET v1/products` chỉ trả về sản phẩm đang bán.
 * `GET v1/products/:id` xem chi tiết sản phẩm.
 * `POST v1/cart` thêm sản phẩm vào giỏ.
 * `POST v1/orders` đơn hàng.