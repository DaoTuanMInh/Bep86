import 'dotenv/config';
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";
import { connectDB, Product, Video } from "./src/models/db.js";
import apiApp from "./api/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  // Kết nối DB cho môi trường local
  await connectDB();

  // Seed sample data for empty DB
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    console.log('📦 Đã kết nối DB! DB sản phẩm trống, vui lòng thêm qua Admin.');
  }

  // Khởi tạo các Collection khác (Categories, News, v.v...) thực hiện trực tiếp trên Admin vì hệ thống chạy 100% bằng DB.
  
  // -------------------------------------------------------------

  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Mount logic API (chung cho serverless & local)
  app.use(apiApp);

  // ── Local File Upload logic removed in favor of MongoDB storage ──
  // (Logic now handled in api/index.ts)

  // Vite middleware 
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
