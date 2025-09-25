//Import thư viện Express
import express, { NextFunction, Express, Request, Response } from 'express';
//Khởi tạo một ứng dụng Express
const app: Express = express();

// able to parse json, built in middleware
app.use(express.json()); // to parse json body
app.use(express.urlencoded({ extended: false })); // to parse urlencoded body

// express rate limit
import { rateLimit } from 'express-rate-limit';
app.use(rateLimit({
  windowMs: 15 * 60 *1000, // 15 min
  max: 100, // limit each IP 100 request each above time
  message: {
    statusCode: 429,
    message: 'Too many requests, please try again later.',
    data: null
  }
}));

// users
import usersRouter from "./routes/v1/users.route";
// app.use("/api/v1", usersRouter); // disable this after create admin
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
import discountRouter from "./routes/v1/discounts.route";
// shipment
import shipmentRouter from "./routes/v1/shipment.route";
// payment
import paymentRouter from "./routes/v1/payment.routes";
// address
import addressRouter from "./routes/v1/address.route";
// inventory
import inventoryRouter from "./routes/v1/inventory.route";
// supplier
import supplierRouter from "./routes/v1/supplier.route";
// brand
import brandRouter from "./routes/v1/brands.routes";
// notifications
import notificationsRouter from "./routes/v1/notifications.route";
// roles
import rolesRouter from "./routes/v1/roles.routes";
// audit_log
import auditLogRouter from "./routes/v1/audit_log.route";
// utilities
import compression from 'compression';
import helmet from 'helmet';
import { authApiKey } from './middleware/authApiKey.middleware';
app.use(helmet());

// user authorization
import authRouter from './routes/v1/auth.route';
app.use('/api/v1/auth', authRouter);

app.use(compression());

// public
app.use("/api/v1", customersRouter);
app.use("/api/v1", brandRouter);
app.use("/api/v1", categoriesRouter);
app.use("/api/v1", productsRouter);

app.use(authApiKey);

// middleware app level example
// import { appExample } from './middleware/appExample.midleware';
// app.use(appExample);

// Register all routers with prefix
app.use("/api/v1", usersRouter);
app.use("/api/v1", ordersRouter);
app.use("/api/v1", orderItemsRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", cartItemsRouter);
app.use("/api/v1", reviewRouter);
app.use("/api/v1", discountRouter);
app.use("/api/v1", shipmentRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/v1", addressRouter);
app.use("/api/v1", inventoryRouter);
app.use("/api/v1", supplierRouter);
app.use("/api/v1", notificationsRouter);
app.use("/api/v1", rolesRouter);
app.use("/api/v1", auditLogRouter);
app.use("/api/v1", wishlistRouter);

// test
import testRouter from "./routes/v1/test.route";
import { ValidationError } from 'yup';
app.use("/api/v1", testRouter);

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
  console.error(err.stack);

  if (err instanceof ValidationError) {
    return res.status(400).json({
      statusCode: 400,
      message: err.errors, // all validation messages
      typeError: "validateSchema",
    });
  }

  return res.status(err.status || 500).json({
    statusCode: err.status || 500,
    message: err.message || "Internal Server Error",
    typeError: "server",
    data: null,
  });
});

export default app;