//Import thư viện Express
import express, { NextFunction, Express, Request, Response } from 'express';
import createError from "http-errors";
import usersRouter from "./routes/v1/users.route";
import categoriesRouter from "./routes/v1/categories.route";
import productsRouter from "./routes/v1/products.route";
import customersRouter from "./routes/v1/customers.route";
import ordersRouter from "./routes/v1/orders.route";
import orderItemsRouter from "./routes/v1/orderItem.route";
import cartRouter from "./routes/v1/carts.route";
import cartItemsRouter from "./routes/v1/cartItems.route";
import wishlistRouter from "./routes/v1/wishlists.route";
import reviewRouter from "./routes/v1/reviews.route";
import discountRouter from "./routes/v1/discounts.route";
import shipmentRouter from "./routes/v1/shipment.route";
import paymentRouter from "./routes/v1/payment.routes";
import addressRouter from "./routes/v1/address.route";
import inventoryRouter from "./routes/v1/inventory.route";
import supplierRouter from "./routes/v1/supplier.route";
import brandRouter from "./routes/v1/brands.routes";
import notificationsRouter from "./routes/v1/notifications.route";
import rolesRouter from "./routes/v1/roles.routes";
import auditLogRouter from "./routes/v1/audit_log.route";
import compression from 'compression';
import helmet from 'helmet';
// import { authApiKey } from './middleware/authApiKey.middleware';
// import authRouter from './routes/v1/auth.route';
import { ValidationError } from 'yup';
import cors from "cors";
import { rateLimit } from 'express-rate-limit';

//Khởi tạo một ứng dụng Express
const app = express();

// cors
app.use(cors())

// express rate limit
app.use(rateLimit({
  windowMs: 15 * 60 *1000, // 15 min
  max: 100, // limit each IP 100 request each above time
  message: {
    statusCode: 429,
    message: 'Too many requests, please try again later.',
    data: null
  }
}));

app.use(helmet());
app.use(compression());

// able to parse json, built in middleware
app.use(express.json()); // to parse json body
app.use(express.urlencoded({ extended: false })); // to parse urlencoded body

app.use("/api/v1", customersRouter);
app.use("/api/v1", brandRouter);
app.use("/api/v1", categoriesRouter);
app.use("/api/v1", productsRouter);

// middleware app level example
// import { appExample } from './middleware/appExample.midleware';
// app.use(appExample);

// app.use(authApiKey);
// app.use('/api/v1/auth', authRouter);

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
// import testRouter from "./routes/v1/test.route";
// app.use("/api/v1", testRouter);

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

// Handle 404 Not Found
app.use((req, res, next)=>{
  next(createError(404, 'Not Found'));
});

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