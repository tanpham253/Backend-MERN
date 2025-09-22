//Import thư viện Express
import express, { NextFunction, Express, Request, Response } from 'express';
//Khởi tạo một ứng dụng Express
const app: Express = express();

// categories
import categoriesRouter from "./routes/v1/categories.route";
// products
import productsRouter from "./routes/v1/products.route";
// customers
import customersRouter from "./routes/v1/customers.route";
// orders
import ordersRouter from "./routes/v1/orders.route";
// order_items
import orderItemsRouter from "./routes/v1/orderItem.route";
// cart
import cartRouter from "./routes/v1/carts.route";
// cart_items
import cartItemsRouter from "./routes/v1/cartItems.route";
// wishlist
import wishlistRouter from "./routes/v1/wishlists.route";
// review
import reviewRouter from "./routes/v1/reviews.route";
// discount
import discountRouter from "./routes/v1/discounts.routes";
// shipment
import shipmentRouter from "./routes/v1/shipment.routes";
// payment
import paymentRouter from "./routes/v1/payment.routes";
// address
import addressRouter from "./routes/v1/address.routes";
// inventory
import inventoryRouter from "./routes/v1/inventory.routes";
// supplier
import supplierRouter from "./routes/v1/supplier.routes";
// brand
import brandRouter from "./routes/v1/brand.routes";
// notifications
import notificationsRouter from "./routes/v1/notifications.routes";
// users
import usersRouter from "./routes/v1/users.routes";
// roles
import rolesRouter from "./routes/v1/roles.routes";
// audit_log
import auditLogRouter from "./routes/v1/audit_log.routes";

// able to parse json, built in middleware
app.use(express.json()); // to parse json body
app.use(express.urlencoded({ extended: false })); // to parse urlencoded body

// middleware app level example
import { appExample } from './middleware/appExample.midleware';
app.use(appExample);

// Register all routers with prefix
app.use("/api/v1", categoriesRouter);
app.use("/api/v1", productsRouter);
app.use("/api/v1", customersRouter);
app.use("/api/v1", ordersRouter);
app.use("/api/v1", orderItemsRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", cartItemsRouter);
app.use("/api/v1", wishlistRouter);
app.use("/api/v1", reviewRouter);
app.use("/api/v1", discountRouter);
app.use("/api/v1", shipmentRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/v1", addressRouter);
app.use("/api/v1", inventoryRouter);
app.use("/api/v1", supplierRouter);
app.use("/api/v1", brandRouter);
app.use("/api/v1", notificationsRouter);
app.use("/api/v1", usersRouter);
app.use("/api/v1", rolesRouter);
app.use("/api/v1", auditLogRouter);


/*
// fake object
const products = [
  { id: 1, name: "Sản phẩm 1", price: 100 },
  { id: 2, name: "Sản phẩm 2", price: 200 },
  { id: 3, name: "Sản phẩm 3", price: 300 },
];
*/

// Tạo route đầu tiên cho trang chủ (Home page)
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message: 'Express + TypeScript Server'});
});

/*
// Tạo route để lấy danh sách sản phẩm
app.get("/products/:id", (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.send(
      `ID sản phẩm: ${product.id}, Chi tiết sản phẩm: ${product.name}, Giá: ${product.price}`
    );
  } else {
    res.status(404).send(`Không tìm thấy sản phẩm với ID ${productId}`);
  }
});
*/

//handle other errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);  // show error and in which line
  res.status(err.status || 500);
    res.json({
        statusCode: err.status || 500,
        message: err.status || 'Internal Server Error',
        data: null
    });
});

export default app;