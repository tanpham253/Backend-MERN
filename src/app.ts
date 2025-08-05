//Import thư viện Express
import express, { Express, Request, Response } from 'express';
//Khởi tạo một ứng dụng Express
const app: Express = express();

// fake object
const products = [
  { id: 1, name: "Sản phẩm 1", price: 100 },
  { id: 2, name: "Sản phẩm 2", price: 200 },
  { id: 3, name: "Sản phẩm 3", price: 300 },
];

//Cấu hình cổng server
const PORT = process.env.PORT || 9000;

// Tạo route đầu tiên cho trang chủ (Home page)
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message: 'Express + TypeScript Server'});
});

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

// Lắng nghe trên cổng PORT
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});