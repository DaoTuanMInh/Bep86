import 'dotenv/config';
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";
import { connectDB, Product, Order, Video } from "./src/models/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  // Kết nối MongoDB Atlas
  await connectDB();

  // Seed dữ liệu ban đầu nếu DB trống
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    console.log('📦 Đang nhập dữ liệu sản phẩm mẫu...');
    await Product.insertMany([
      // Bàn Lạnh
      { name: "Bàn Mát 2 Cánh Inox Fushimavina", description: "Thiết bị bảo quản thực phẩm chuyên nghiệp cho nhà hàng.", price: 15500000, image: "https://picsum.photos/seed/fridge1/400/400", category: "Bàn Lạnh - Bàn Đông - Bàn Mát", stock: 10 },
      { name: "Bàn Đông 3 Cánh Cao Cấp", description: "Làm lạnh nhanh, tiết kiệm điện năng tối ưu.", price: 18900000, image: "https://picsum.photos/seed/fridge2/400/400", category: "Bàn Lạnh - Bàn Đông - Bàn Mát", stock: 5 },
      { name: "Bàn Salad 2 Cánh Kính", description: "Trưng bày và bảo quản rau củ quả tươi ngon.", price: 16800000, image: "https://picsum.photos/seed/fridge3/400/400", category: "Bàn Lạnh - Bàn Đông - Bàn Mát", stock: 7 },
      // Tủ Nấu Cơm
      { name: "Tủ Nấu Cơm 6 Khay Điện", description: "Nấu cơm ngon, chín đều, giữ nhiệt tốt.", price: 13716000, image: "https://picsum.photos/seed/rice1/400/400", category: "Tủ Nấu Cơm", stock: 15 },
      { name: "Tủ Nấu Cơm 6 Khay Gas", description: "Tiết kiệm điện, sử dụng linh hoạt.", price: 15660000, image: "https://picsum.photos/seed/rice2/400/400", category: "Tủ Nấu Cơm", stock: 8 },
      { name: "Tủ Nấu Cơm Gas Điện 10 Khay", description: "Kết hợp gas và điện thông minh.", price: 20520000, image: "https://picsum.photos/seed/rice3/400/400", category: "Tủ Nấu Cơm", stock: 12 },
      { name: "Tủ Nấu Cơm 12 Khay Gas", description: "Công suất lớn cho nhà hàng.", price: 17820000, image: "https://picsum.photos/seed/rice4/400/400", category: "Tủ Nấu Cơm", stock: 10 },
      { name: "Tủ Nấu Cơm 20 Khay Gas", description: "Dành cho bếp ăn công nghiệp lớn.", price: 29160000, image: "https://picsum.photos/seed/rice5/400/400", category: "Tủ Nấu Cơm", stock: 5 },
      // Tủ Lạnh Công Nghiệp
      { name: "Tủ Mát Công Nghiệp 1 Cánh", description: "Bảo quản thực phẩm tươi sống.", price: 21060000, image: "https://picsum.photos/seed/ref1/400/400", category: "Tủ Lạnh Công Nghiệp", stock: 10 },
      { name: "Tủ Mát Công Nghiệp 2 Cánh", description: "Dung tích lớn, làm lạnh nhanh.", price: 30780000, image: "https://picsum.photos/seed/ref2/400/400", category: "Tủ Lạnh Công Nghiệp", stock: 5 },
      { name: "Tủ Đông Mát 2 Cánh", description: "Hai chế độ đông và mát linh hoạt.", price: 34020000, image: "https://picsum.photos/seed/ref3/400/400", category: "Tủ Lạnh Công Nghiệp", stock: 7 },
      { name: "Tủ Mát Công Nghiệp 4 Cánh", description: "Sử dụng cho nhà hàng khách sạn lớn.", price: 41580000, image: "https://picsum.photos/seed/ref4/400/400", category: "Tủ Lạnh Công Nghiệp", stock: 4 },
      // Tủ Sấy Bát
      { name: "Tủ Sấy Bát Fushimavina 1 Cánh", description: "Diệt khuẩn bằng Ozone và nhiệt độ cao.", price: 5200000, image: "https://picsum.photos/seed/dryer1/400/400", category: "Tủ Sấy Bát", stock: 20 },
      { name: "Tủ Sấy Bát Công Nghiệp 2 Cánh", description: "Sấy khô và diệt khuẩn số lượng lớn bát đĩa.", price: 9800000, image: "https://picsum.photos/seed/dryer2/400/400", category: "Tủ Sấy Bát", stock: 10 },
      // Lò Nướng
      { name: "Lò Nướng Bánh Đối Lưu 5 Khay", description: "Nướng bánh mì, bánh ngọt hoàn hảo.", price: 12800000, image: "https://picsum.photos/seed/oven1/400/400", category: "Lò Nướng Bánh", stock: 12 },
      { name: "Lò Nướng Pizza Chuyên Dụng", description: "Nhiệt độ cao, nướng pizza giòn ngon.", price: 7500000, image: "https://picsum.photos/seed/oven2/400/400", category: "Lò Nướng Bánh", stock: 15 },
      // Bếp Từ
      { name: "Bếp Từ Công Nghiệp Đơn 5KW", description: "An toàn, sạch sẽ, hiệu suất nấu nướng cao.", price: 4500000, image: "https://picsum.photos/seed/induction1/400/400", category: "Bếp Từ Công Nghiệp", stock: 25 },
      { name: "Bếp Từ Công Nghiệp Đôi 10KW", description: "Hai vùng nấu độc lập, tiết kiệm thời gian.", price: 8900000, image: "https://picsum.photos/seed/induction2/400/400", category: "Bếp Từ Công Nghiệp", stock: 15 },
    ]);
    console.log('✅ Đã nhập xong dữ liệu sản phẩm mẫu!');
  }

  const videoCount = await Video.countDocuments();
  if (videoCount === 0) {
    await Video.insertMany([
      { youtubeId: "dQw4w9WgXcQ", title: "Quy trình sản xuất thiết bị bếp inox Bếp 86", description: "Khám phá quy trình sản xuất hiện đại.", category: "Giới thiệu", duration: "5:32", featured: true },
      { youtubeId: "dQw4w9WgXcQ", title: "Hướng dẫn sử dụng Tủ Nấu Cơm Gas 6 Khay", description: "Hướng dẫn chi tiết cách sử dụng và bảo dưỡng.", category: "Hướng dẫn", duration: "8:14", featured: false },
    ]);
  }

  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // ── File Upload ──
  const uploadDir = path.join(__dirname, "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
    },
  });
  const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

  app.use("/uploads", express.static(uploadDir));
  app.post("/api/upload", upload.single("file"), (req: any, res) => {
    if (!req.file) return res.status(400).json({ error: "Không có file" });
    res.json({ url: `/uploads/${req.file.filename}` });
  });

  // ── PRODUCTS API ──
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await Product.find().lean();
      // Chuyển _id -> id cho frontend
      res.json(products.map(p => ({ ...p, id: p._id.toString() })));
    } catch (e) { res.status(500).json({ error: 'Lỗi lấy danh sách sản phẩm' }); }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const p = await Product.findById(req.params.id).lean();
      if (!p) return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
      res.json({ ...p, id: (p as any)._id.toString() });
    } catch (e) { res.status(500).json({ error: 'Lỗi lấy sản phẩm' }); }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.json({ id: product._id.toString() });
    } catch (e) { res.status(500).json({ error: 'Lỗi tạo sản phẩm' }); }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      await Product.findByIdAndUpdate(req.params.id, req.body);
      res.json({ success: true });
    } catch (e) { res.status(500).json({ error: 'Lỗi cập nhật sản phẩm' }); }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (e) { res.status(500).json({ error: 'Lỗi xóa sản phẩm' }); }
  });

  // ── ORDERS API ──
  app.get("/api/orders", async (_req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 }).lean();
      res.json(orders.map(o => ({ ...o, id: (o as any)._id.toString() })));
    } catch (e) { res.status(500).json({ error: 'Lỗi lấy đơn hàng' }); }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const { customer_name, customer_email, items, total_amount } = req.body;
      const order = await Order.create({
        customerName: customer_name,
        customerEmail: customer_email,
        items,
        totalAmount: total_amount,
      });

      // Cập nhật stock
      for (const item of items) {
        await Product.findByIdAndUpdate(item.id, { $inc: { stock: -item.quantity } });
      }

      res.json({ id: order._id.toString() });
    } catch (e) { res.status(500).json({ error: 'Lỗi đặt hàng' }); }
  });

  // ── VIDEOS API ──
  app.get("/api/videos", async (_req, res) => {
    try {
      const videos = await Video.find().sort({ featured: -1, createdAt: -1 }).lean();
      res.json(videos.map(v => ({ ...v, id: (v as any)._id.toString() })));
    } catch (e) { res.status(500).json({ error: 'Lỗi lấy video' }); }
  });

  app.post("/api/videos", async (req, res) => {
    try {
      const video = await Video.create(req.body);
      res.json({ id: video._id.toString() });
    } catch (e) { res.status(500).json({ error: 'Lỗi tạo video' }); }
  });

  app.put("/api/videos/:id", async (req, res) => {
    try {
      await Video.findByIdAndUpdate(req.params.id, req.body);
      res.json({ success: true });
    } catch (e) { res.status(500).json({ error: 'Lỗi cập nhật video' }); }
  });

  app.delete("/api/videos/:id", async (req, res) => {
    try {
      await Video.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (e) { res.status(500).json({ error: 'Lỗi xóa video' }); }
  });

  // Vite middleware (development) or static (production)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('❌ Lỗi khởi động server:', err.message);
  process.exit(1);
});
