import 'dotenv/config';
import express from "express";
import { connectDB, Product, Order, Video, SiteContent, MenuCategory, NewsItem, CategoryContentDB, StoredFile, Consultation } from "../src/models/db.js";
import multer from "multer";

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ── Multer in-memory storage ──
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// ── Kết nối DB (Cho Vercel Serverless) ──
connectDB().catch(console.error);

// ── FILE MANAGEMENT (MongoDB) ──
app.get("/api/files", async (_req, res) => {
    try {
        const files = await StoredFile.find().sort({ createdAt: -1 }).lean();
        res.json(files.map(f => ({
            id: f._id.toString(),
            name: f.name,
            url: `/api/file-view/${f._id}`,
            folder: f.folder || '/'
        })));
    } catch (e) { res.status(500).json({ error: 'Lỗi lấy danh sách file' }); }
});

app.get("/api/file-view/:id", async (req, res) => {
    try {
        const file = await StoredFile.findById(req.params.id);
        if (!file) return res.status(404).send('Not found');
        const buffer = Buffer.from(file.data, 'base64');
        res.set('Content-Type', file.contentType);
        res.send(buffer);
    } catch (e) { res.status(500).send('Error'); }
});

// ── Legacy support for local filename paths ──
app.get("/uploads/:filename", async (req, res) => {
    try {
        const file = await StoredFile.findOne({ name: req.params.filename });
        if (!file) return res.status(404).send('Not found');
        const buffer = Buffer.from(file.data, 'base64');
        res.set('Content-Type', file.contentType);
        res.send(buffer);
    } catch (e) { res.status(500).send('Error'); }
});

app.post("/api/upload", upload.single("file"), async (req: any, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "Không có file" });
        const { folder } = req.body;
        const base64Data = req.file.buffer.toString('base64');
        const newFile = await StoredFile.create({
            name: req.file.originalname,
            data: base64Data,
            contentType: req.file.mimetype,
            folder: folder || '/'
        });
        res.json({ url: `/api/file-view/${newFile._id}` });
    } catch (e) { res.status(500).json({ error: 'Lỗi tải tệp lên' }); }
});

app.delete("/api/files/:id", async (req, res) => {
    try {
        await StoredFile.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: 'Lỗi xóa tệp' }); }
});

app.delete("/api/folders", async (req, res) => {
    try {
        const { folder } = req.query;
        if (!folder || folder === '/') return res.status(400).json({ error: 'Thư mục không hợp lệ' });
        await StoredFile.deleteMany({ folder });
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: 'Lỗi xóa thư mục' }); }
});

// ── GET/POST CONTENT (CMS Tự Động) ──
app.get("/api/content", async (_req, res) => {
    try {
        const contents = await SiteContent.find().lean();
        res.json(contents);
    } catch (e) { res.status(500).json({ error: 'Lỗi lấy nội dung' }); }
});

app.post("/api/content", async (req, res) => {
    try {
        const { key, value } = req.body;
        if (!key) return res.status(400).json({ error: 'Thiếu key' });
        await SiteContent.findOneAndUpdate({ key }, { value }, { upsert: true });
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: 'Lỗi cập nhật nội dung' }); }
});


// ── PRODUCTS API ──
app.get("/api/products", async (_req, res) => {
    try {
        const products = await Product.find().lean();
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
        const { category, subCategory } = req.body;
        // Tự động thêm vào MenuCategory nếu là danh mục mới
        if (category) {
            const existingCat = await MenuCategory.findOne({ name: category });
            if (!existingCat) {
                await MenuCategory.create({ name: category, sub: subCategory ? [subCategory] : [] });
            } else if (subCategory && !existingCat.sub.includes(subCategory)) {
                await MenuCategory.updateOne({ name: category }, { $addToSet: { sub: subCategory } });
            }
        }
        const product = await Product.create(req.body);
        res.json({ id: product._id.toString() });
    } catch (e) { res.status(500).json({ error: 'Lỗi tạo sản phẩm' }); }
});

app.put("/api/products/:id", async (req, res) => {
    try {
        const { category, subCategory } = req.body;
        if (category) {
            const existingCat = await MenuCategory.findOne({ name: category });
            if (!existingCat) {
                await MenuCategory.create({ name: category, sub: subCategory ? [subCategory] : [] });
            } else if (subCategory && !existingCat.sub.includes(subCategory)) {
                await MenuCategory.updateOne({ name: category }, { $addToSet: { sub: subCategory } });
            }
        }
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

        for (const item of items) {
            await Product.findByIdAndUpdate(item.id, { $inc: { stock: -item.quantity } });
        }

        res.json({ id: order._id.toString() });
    } catch (e) { res.status(500).json({ error: 'Lỗi đặt hàng' }); }
});

app.put("/api/orders/:id", async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: 'Lỗi cập nhật đơn hàng' }); }
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

// ── GET CATEGORIES ──
app.get("/api/categories", async (_req, res) => {
    try {
        const categories = await MenuCategory.find().lean();
        res.json(categories);
    } catch (e) { res.status(500).json({ error: 'Lỗi lấy danh mục' }); }
});

// ── GET NEWS ──
app.get("/api/news", async (_req, res) => {
    try {
        const news = await NewsItem.find().lean();
        res.json(news);
    } catch (e) { res.status(500).json({ error: 'Lỗi lấy tin tức' }); }
});

app.get("/api/news/:slug", async (req, res) => {
    try {
        const post = await NewsItem.findOne({ slug: req.params.slug }).lean();
        if (!post) return res.status(404).json({ error: 'Không tìm thấy bài viết' });
        res.json(post);
    } catch (e) { res.status(500).json({ error: 'Lỗi lấy tin tức' }); }
});

app.post("/api/news", async (req, res) => {
    try {
        const news = await NewsItem.create(req.body);
        res.json({ id: news._id.toString() });
    } catch (e) { res.status(500).json({ error: 'Lỗi tạo bài viết' }); }
});

app.put("/api/news/:id", async (req, res) => {
    try {
        await NewsItem.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: 'Lỗi cập nhật bài viết' }); }
});

app.delete("/api/news/:id", async (req, res) => {
    try {
        await NewsItem.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: 'Lỗi xóa bài viết' }); }
});

// ── GET CATEGORY CONTENT ──
app.get("/api/category-content", async (_req, res) => {
    // This allows fetching all category contents at once
    try {
        const contents = await CategoryContentDB.find().lean();
        res.json(contents);
    } catch (e) { res.status(500).json({ error: 'Lỗi lấy thông tin danh mục' }); }
});

// ── CONSULTATIONS API ──
app.get("/api/consultations", async (_req, res) => {
    try {
        const items = await Consultation.find().sort({ createdAt: -1 }).lean();
        res.json(items.map(i => ({ ...i, id: (i as any)._id.toString() })));
    } catch (e) { res.status(500).json({ error: 'Lỗi lấy yêu cầu tư vấn' }); }
});

app.post("/api/consultations", async (req, res) => {
    try {
        const item = await Consultation.create(req.body);
        res.json({ id: item._id.toString() });
    } catch (e) { res.status(500).json({ error: 'Lỗi gửi yêu cầu tư vấn' }); }
});

app.delete("/api/consultations/:id", async (req, res) => {
    try {
        await Consultation.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: 'Lỗi xóa yêu cầu tư vấn' }); }
});

app.put("/api/consultations/:id", async (req, res) => {
    try {
        await Consultation.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: 'Lỗi cập nhật yêu cầu tư vấn' }); }
});

export default app;
