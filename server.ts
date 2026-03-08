import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("shop.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image TEXT,
    category TEXT,
    stock INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    total_amount REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    price REAL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    youtube_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'Giới thiệu',
    duration TEXT DEFAULT '0:00',
    featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

try {
  db.exec("ALTER TABLE products ADD COLUMN subCategory TEXT");
} catch (e) {
  // column already exists
}

// Seed videos nếu chưa có
const videoCount = (db.prepare("SELECT COUNT(*) as c FROM videos").get() as { c: number }).c;
if (videoCount === 0) {
  const iv = db.prepare("INSERT INTO videos (youtube_id, title, description, category, duration, featured) VALUES (?, ?, ?, ?, ?, ?)");
  iv.run("dQw4w9WgXcQ", "Quy trình sản xuất thiết bị bếp inox Bếp 86", "Khám phá quy trình sản xuất hiện đại, khép kín tại nhà máy Bếp 86.", "Giới thiệu", "5:32", 1);
  iv.run("dQw4w9WgXcQ", "Hướng dẫn sử dụng Tủ Nấu Cơm Gas 6 Khay", "Hướng dẫn chi tiết cách sử dụng và bảo dưỡng tủ nấu cơm gas 6 khay.", "Hướng dẫn", "8:14", 0);
  iv.run("dQw4w9WgXcQ", "Review Tủ Sấy Bát FUSHIMAVINA – Diệt khuẩn Ozone", "Đánh giá chi tiết tủ sấy bát công nghiệp sử dụng công nghệ Ozone.", "Review", "6:45", 0);
  iv.run("dQw4w9WgXcQ", "Lắp đặt Bàn Lạnh Inox tại nhà hàng khách sạn", "Quy trình lắp đặt bàn lạnh inox chuyên nghiệp.", "Lắp đặt", "10:07", 0);
  iv.run("dQw4w9WgXcQ", "Tủ Mát Công Nghiệp 2 Cánh – Demo thực tế", "Demo thực tế tủ mát công nghiệp 2 cánh tại bếp nhà hàng.", "Demo", "4:20", 0);
  iv.run("dQw4w9WgXcQ", "So sánh Tủ Nấu Cơm Gas và Điện", "Phân tích chi tiết ưu nhược điểm của từng loại.", "Review", "7:55", 0);
}

// Seed initial data if empty or contains old mock data
const firstProduct = db.prepare("SELECT name FROM products LIMIT 1").get() as { name: string } | undefined;
if (!firstProduct || firstProduct.name === "Premium Wireless Headphones") {
  db.prepare("DELETE FROM order_items").run();
  db.prepare("DELETE FROM orders").run();
  db.prepare("DELETE FROM products").run();

  const insert = db.prepare("INSERT INTO products (name, description, price, image, category, stock) VALUES (?, ?, ?, ?, ?, ?)");

  // Bàn Lạnh
  insert.run("Bàn Mát 2 Cánh Inox Fushimavina", "Thiết bị bảo quản thực phẩm chuyên nghiệp cho nhà hàng.", 15500000, "https://picsum.photos/seed/fridge1/400/400", "Bàn Lạnh - Bàn Đông - Bàn Mát", 10);
  insert.run("Bàn Đông 3 Cánh Cao Cấp", "Làm lạnh nhanh, tiết kiệm điện năng tối ưu.", 18900000, "https://picsum.photos/seed/fridge2/400/400", "Bàn Lạnh - Bàn Đông - Bàn Mát", 5);
  insert.run("Bàn Salad 2 Cánh Kính", "Trưng bày và bảo quản rau củ quả tươi ngon.", 16800000, "https://picsum.photos/seed/fridge3/400/400", "Bàn Lạnh - Bàn Đông - Bàn Mát", 7);

  // Tủ Nấu Cơm
  insert.run("Tủ Nấu Cơm 6 Khay Điện", "Nấu cơm ngon, chín đều, giữ nhiệt tốt.", 13716000, "https://picsum.photos/seed/rice1/400/400", "Tủ Nấu Cơm", 15);
  insert.run("Tủ Nấu Cơm 6 Khay Gas", "Tiết kiệm điện, sử dụng linh hoạt.", 15660000, "https://picsum.photos/seed/rice2/400/400", "Tủ Nấu Cơm", 8);
  insert.run("Tủ Nấu Cơm Gas Điện 10 Khay", "Kết hợp gas và điện thông minh.", 20520000, "https://picsum.photos/seed/rice3/400/400", "Tủ Nấu Cơm", 12);
  insert.run("Tủ Nấu Cơm 12 Khay Gas", "Công suất lớn cho nhà hàng.", 17820000, "https://picsum.photos/seed/rice4/400/400", "Tủ Nấu Cơm", 10);
  insert.run("Tủ Nấu Cơm 20 Khay Gas", "Dành cho bếp ăn công nghiệp lớn.", 29160000, "https://picsum.photos/seed/rice5/400/400", "Tủ Nấu Cơm", 5);
  insert.run("Tủ Nấu Cơm Gas Điện 20 Khay", "Đa năng và hiệu suất cực cao.", 31860000, "https://picsum.photos/seed/rice6/400/400", "Tủ Nấu Cơm", 3);

  // Tủ Lạnh Công Nghiệp
  insert.run("Tủ Mát Công Nghiệp 1 Cánh", "Bảo quản thực phẩm tươi sống.", 21060000, "https://picsum.photos/seed/ref1/400/400", "Tủ Lạnh Công Nghiệp", 10);
  insert.run("Tủ Mát Công Nghiệp 2 Cánh", "Dung tích lớn, làm lạnh nhanh.", 30780000, "https://picsum.photos/seed/ref2/400/400", "Tủ Lạnh Công Nghiệp", 5);
  insert.run("Tủ Đông Mát 2 Cánh", "Hai chế độ đông và mát linh hoạt.", 34020000, "https://picsum.photos/seed/ref3/400/400", "Tủ Lạnh Công Nghiệp", 7);
  insert.run("Tủ Mát Công Nghiệp 4 Cánh", "Sử dụng cho nhà hàng khách sạn lớn.", 41580000, "https://picsum.photos/seed/ref4/400/400", "Tủ Lạnh Công Nghiệp", 4);
  insert.run("Tủ Đông Công Nghiệp 4 Cánh", "Trữ đông thực phẩm số lượng lớn.", 42660000, "https://picsum.photos/seed/ref5/400/400", "Tủ Lạnh Công Nghiệp", 3);
  insert.run("Tủ Mát Công Nghiệp 6 Cánh", "Đỉnh cao bảo quản thực phẩm.", 47520000, "https://picsum.photos/seed/ref6/400/400", "Tủ Lạnh Công Nghiệp", 2);

  // Tủ Sấy Bát
  insert.run("Tủ Sấy Bát Fushimavina 1 Cánh", "Diệt khuẩn bằng Ozone và nhiệt độ cao.", 5200000, "https://picsum.photos/seed/dryer1/400/400", "Tủ Sấy Bát", 20);
  insert.run("Tủ Sấy Bát Công Nghiệp 2 Cánh", "Sấy khô và diệt khuẩn số lượng lớn bát đĩa.", 9800000, "https://picsum.photos/seed/dryer2/400/400", "Tủ Sấy Bát", 10);

  // Lò Nướng
  insert.run("Lò Nướng Bánh Đối Lưu 5 Khay", "Nướng bánh mì, bánh ngọt hoàn hảo.", 12800000, "https://picsum.photos/seed/oven1/400/400", "Lò Nướng Bánh", 12);
  insert.run("Lò Nướng Pizza Chuyên Dụng", "Nhiệt độ cao, nướng pizza giòn ngon.", 7500000, "https://picsum.photos/seed/oven2/400/400", "Lò Nướng Bánh", 15);

  // Bếp Từ
  insert.run("Bếp Từ Công Nghiệp Đơn 5KW", "An toàn, sạch sẽ, hiệu suất nấu nướng cao.", 4500000, "https://picsum.photos/seed/induction1/400/400", "Bếp Từ Công Nghiệp", 25);
  insert.run("Bếp Từ Công Nghiệp Đôi 10KW", "Hai vùng nấu độc lập, tiết kiệm thời gian.", 8900000, "https://picsum.photos/seed/induction2/400/400", "Bếp Từ Công Nghiệp", 15);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ── File Upload Setup ──
  const uploadDir = path.join(__dirname, "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
    },
  });
  const upload = multer({
    storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
    fileFilter: (_req, file, cb) => {
      if (file.mimetype.startsWith("image/")) cb(null, true);
      else cb(new Error("Chỉ chấp nhận file ảnh"));
    },
  });

  app.use("/uploads", express.static(uploadDir));

  app.post("/api/upload", upload.single("file"), (req: any, res) => {
    if (!req.file) return res.status(400).json({ error: "Không có file" });
    res.json({ url: `/uploads/${req.file.filename}` });
  });

  // API Routes
  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  });

  // Video API – map snake_case → camelCase cho frontend
  const mapVideo = (v: any) => ({
    id: String(v.id),
    youtubeId: v.youtube_id,
    title: v.title,
    description: v.description,
    category: v.category,
    duration: v.duration,
    featured: Boolean(v.featured),
  });

  app.get("/api/videos", (_req, res) => {
    const rows = db.prepare("SELECT * FROM videos ORDER BY featured DESC, created_at DESC").all();
    res.json(rows.map(mapVideo));
  });

  app.post("/api/videos", (req, res) => {
    const { youtubeId, title, description, category, duration, featured } = req.body;
    const info = db.prepare(
      "INSERT INTO videos (youtube_id, title, description, category, duration, featured) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(youtubeId, title, description || "", category || "Giới thiệu", duration || "0:00", featured ? 1 : 0);
    res.json({ id: info.lastInsertRowid });
  });

  app.put("/api/videos/:id", (req, res) => {
    const { youtubeId, title, description, category, duration, featured } = req.body;
    db.prepare(
      "UPDATE videos SET youtube_id=?, title=?, description=?, category=?, duration=?, featured=? WHERE id=?"
    ).run(youtubeId, title, description || "", category || "Giới thiệu", duration || "0:00", featured ? 1 : 0, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/videos/:id", (req, res) => {
    db.prepare("DELETE FROM videos WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/products/:id", (req, res) => {
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ error: "Product not found" });
  });

  app.post("/api/products", (req, res) => {
    const { name, description, price, image, category, subCategory, stock } = req.body;
    const info = db.prepare("INSERT INTO products (name, description, price, image, category, subCategory, stock) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(name, description, price, image, category, subCategory || "", stock);
    res.json({ id: info.lastInsertRowid });
  });

  app.put("/api/products/:id", (req, res) => {
    const { name, description, price, image, category, subCategory, stock } = req.body;
    db.prepare("UPDATE products SET name = ?, description = ?, price = ?, image = ?, category = ?, subCategory = ?, stock = ? WHERE id = ?")
      .run(name, description, price, image, category, subCategory || "", stock, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/products/:id", (req, res) => {
    db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/orders", (req, res) => {
    const orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
    res.json(orders);
  });

  app.post("/api/orders", (req, res) => {
    const { customer_name, customer_email, items, total_amount } = req.body;

    const transaction = db.transaction(() => {
      const orderInfo = db.prepare("INSERT INTO orders (customer_name, customer_email, total_amount) VALUES (?, ?, ?)")
        .run(customer_name, customer_email, total_amount);

      const orderId = orderInfo.lastInsertRowid;
      const insertItem = db.prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");

      for (const item of items) {
        insertItem.run(orderId, item.id, item.quantity, item.price);
        // Update stock
        db.prepare("UPDATE products SET stock = stock - ? WHERE id = ?").run(item.quantity, item.id);
      }

      return orderId;
    });

    try {
      const orderId = transaction();
      res.json({ id: orderId });
    } catch (error) {
      res.status(500).json({ error: "Failed to place order" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
