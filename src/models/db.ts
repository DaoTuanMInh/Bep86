import mongoose, { Schema, Document } from 'mongoose';

// ── Product ──
export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    subCategory: string;
    stock: number;
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
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

export async function connectDB() {
    if (isConnected) return;
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI chưa được cấu hình trong file .env');
    await mongoose.connect(uri);
    isConnected = true;
    console.log('✅ Đã kết nối MongoDB Atlas thành công!');
}
