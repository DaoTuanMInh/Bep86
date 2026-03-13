import mongoose, { Schema, Document } from 'mongoose';

// ── Product ──
export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    subCategory: string;
    stock: number;
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    originalPrice: { type: Number, default: 0 },
    image: { type: String, default: '' },
    category: { type: String, default: '' },
    subCategory: { type: String, default: '' },
    stock: { type: Number, default: 0 },
});

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

// ── Order ──
const OrderItemSchema = new Schema({
    productId: String,
    quantity: Number,
    price: Number,
});

export interface IOrder extends Document {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    items: { productId: string; quantity: number; price: number }[];
    totalAmount: number;
    status: string;
    createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
    customerName: { type: String, required: true },
    customerEmail: { type: String, default: '' },
    customerPhone: { type: String, default: '' },
    address: { type: String, default: '' },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

// ── Video ──
export interface IVideo extends Document {
    youtubeId: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    featured: boolean;
    createdAt: Date;
}

const VideoSchema = new Schema<IVideo>({
    youtubeId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    category: { type: String, default: 'Giới thiệu' },
    duration: { type: String, default: '0:00' },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

export const Video = mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);

// ── DB Connect ──
let isConnected = false;

// ── Site Content ──
export interface ISiteContent extends Document {
    key: string;
    value: string; // HTML or Image URL
}

const SiteContentSchema = new Schema<ISiteContent>({
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true },
});

export const SiteContent = mongoose.models.SiteContent || mongoose.model<ISiteContent>('SiteContent', SiteContentSchema);

// ── Menu Category ──
export interface IMenuCategory extends Document {
    name: string;
    sub: string[];
}
const MenuCategorySchema = new Schema<IMenuCategory>({
    name: { type: String, required: true },
    sub: [{ type: String }]
});
export const MenuCategory = mongoose.models.MenuCategory || mongoose.model<IMenuCategory>('MenuCategory', MenuCategorySchema);

// ── News ──
export interface INewsItem extends Document {
    slug: string;
    category: string;
    date: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    readTime: number;
}
const NewsItemSchema = new Schema<INewsItem>({
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, default: 'Admin' },
    readTime: { type: Number, default: 5 }
});
export const NewsItem = mongoose.models.NewsItem || mongoose.model<INewsItem>('NewsItem', NewsItemSchema);

// ── Category Content (SEO Footer per Category) ──
export interface ICategoryContent extends Document {
    categoryName: string;
    content: string;
}
const CategoryContentSchema = new Schema<ICategoryContent>({
    categoryName: { type: String, required: true, unique: true },
    content: { type: String, required: true }
});
export const CategoryContentDB = mongoose.models.CategoryContent || mongoose.model<ICategoryContent>('CategoryContent', CategoryContentSchema);

// ── Stored File ──
export interface IStoredFile extends Document {
    name: string;
    data: string; // Base64 string
    contentType: string;
    folder: string;
    createdAt: Date;
}
const StoredFileSchema = new Schema<IStoredFile>({
    name: { type: String, required: true },
    data: { type: String, required: true },
    contentType: { type: String, required: true },
    folder: { type: String, default: '/' },
    createdAt: { type: Date, default: Date.now }
});
// ── Consultation Request ──
export interface IConsultation extends Document {
    name: string;
    phone: string;
    email: string;
    product: string;
    message: string;
    status: string;
    createdAt: Date;
}
const ConsultationSchema = new Schema<IConsultation>({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    product: { type: String, default: '' },
    message: { type: String, required: true },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});
export const Consultation = mongoose.models.Consultation || mongoose.model<IConsultation>('Consultation', ConsultationSchema);

export const StoredFile = mongoose.models.StoredFile || mongoose.model<IStoredFile>('StoredFile', StoredFileSchema);

export async function connectDB() {
    if (isConnected) return;
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI chưa được cấu hình trong file .env');
    await mongoose.connect(uri);
    isConnected = true;
    console.log('✅ Đã kết nối MongoDB Atlas thành công!');
}
