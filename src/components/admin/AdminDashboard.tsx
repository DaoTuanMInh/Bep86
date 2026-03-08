import React, { useState, useEffect } from 'react';
import { LayoutDashboard, X, Package, ShoppingCart, Plus, Edit, Trash2, ChevronRight, Video, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Order } from '../../types';
import { videoCategories } from '../../data/videos';
import { menuCategories } from '../../data/categories';
import ImageUploader from './ImageUploader';

interface AdminDashboardProps {
    products: Product[];
    orders: Order[];
    onAddProduct: () => void;
    onEditProduct: (p: Product) => void;
    onDeleteProduct: (id: number) => void;
    onClose: () => void;
}

interface VideoItem {
    id: string;
    youtubeId: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    featured: boolean;
}

const AdminDashboard = ({ products, orders, onAddProduct, onEditProduct, onDeleteProduct, onClose }: AdminDashboardProps) => {
    const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'videos'>('products');
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [videoModal, setVideoModal] = useState<{ open: boolean; editing: VideoItem | null }>({ open: false, editing: null });
    const [videoForm, setVideoForm] = useState({ youtubeId: '', title: '', description: '', category: 'Giới thiệu', duration: '', featured: false, thumbnail: '' });

    const loadVideos = () => {
        fetch('/api/videos').then(r => r.json()).then(setVideos).catch(() => { });
    };

    useEffect(() => { loadVideos(); }, []);

    const openAddVideo = () => {
        setVideoForm({ youtubeId: '', title: '', description: '', category: 'Giới thiệu', duration: '', featured: false, thumbnail: '' });
        setVideoModal({ open: true, editing: null });
    };

    const openEditVideo = (v: VideoItem) => {
        setVideoForm({ youtubeId: v.youtubeId, title: v.title, description: v.description, category: v.category, duration: v.duration, featured: v.featured, thumbnail: '' });
        setVideoModal({ open: true, editing: v });
    };

    const saveVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = videoModal.editing ? 'PUT' : 'POST';
        const url = videoModal.editing ? `/api/videos/${videoModal.editing.id}` : '/api/videos';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(videoForm) });
        setVideoModal({ open: false, editing: null });
        loadVideos();
    };

    const deleteVideo = async (id: string) => {
        if (!confirm('Xóa video này?')) return;
        await fetch(`/api/videos/${id}`, { method: 'DELETE' });
        loadVideos();
    };

    return (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col">
            <div className="border-b border-zinc-200 px-8 py-4 flex justify-between items-center bg-white sticky top-0">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                        <LayoutDashboard className="text-white w-5 h-5" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">ADMIN PANEL</h1>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 border-r border-zinc-200 p-6 space-y-2">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-zinc-900 text-white shadow-lg' : 'hover:bg-zinc-100 text-zinc-600'}`}
                    >
                        <Package className="w-5 h-5" />
                        <span className="font-semibold">Products</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'videos' ? 'bg-zinc-900 text-white shadow-lg' : 'hover:bg-zinc-100 text-zinc-600'}`}
                    >
                        <Video className="w-5 h-5" />
                        <span className="font-semibold">Videos</span>
                        <span className="ml-auto text-xs bg-zinc-200 text-zinc-600 px-2 py-0.5 rounded-full font-bold">{videos.length}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-zinc-900 text-white shadow-lg' : 'hover:bg-zinc-100 text-zinc-600'}`}
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span className="font-semibold">Orders</span>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-zinc-50">

                    {/* ── PRODUCTS ── */}
                    {activeTab === 'products' && (
                        <div className="max-w-5xl mx-auto">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-bold">Manage Products</h2>
                                <button
                                    onClick={onAddProduct}
                                    className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-800 transition-all shadow-lg"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add Product
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
                                <table className="w-full text-left">
                                    <thead className="bg-zinc-50 border-b border-zinc-200">
                                        <tr>
                                            <th className="px-6 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">Product</th>
                                            <th className="px-6 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">Stock</th>
                                            <th className="px-6 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100">
                                        {products.map(product => (
                                            <tr key={product.id} className="hover:bg-zinc-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <img src={product.image} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                                                        <span className="font-semibold">{product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-zinc-600">{product.category}</td>
                                                <td className="px-6 py-4 font-bold">{product.price.toLocaleString('vi-VN')}đ</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${product.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                                        {product.stock} units
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => onEditProduct(product)} className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-600 transition-colors">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => onDeleteProduct(product.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ── VIDEOS ── */}
                    {activeTab === 'videos' && (
                        <div className="max-w-5xl mx-auto">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-bold">Quản lý Video</h2>
                                <button
                                    onClick={openAddVideo}
                                    className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-800 transition-all shadow-lg"
                                >
                                    <Plus className="w-5 h-5" />
                                    Thêm Video
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {videos.map(v => (
                                    <div key={v.id} className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <div className="relative aspect-video bg-zinc-100">
                                            <img
                                                src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                                                alt={v.title}
                                                className="w-full h-full object-cover"
                                            />
                                            {v.featured && (
                                                <div className="absolute top-2 left-2 bg-yellow-400 text-zinc-900 text-[9px] font-black uppercase px-2 py-0.5 rounded flex items-center gap-1">
                                                    <Star className="w-2.5 h-2.5" fill="currentColor" /> Nổi bật
                                                </div>
                                            )}
                                            <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                                {v.duration}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <span className="inline-block bg-blue-100 text-blue-700 text-[9px] font-bold uppercase px-2 py-0.5 rounded mb-1">{v.category}</span>
                                            <h3 className="font-bold text-sm text-zinc-800 line-clamp-2 mb-1">{v.title}</h3>
                                            <p className="text-zinc-400 text-xs line-clamp-2 mb-3">{v.description}</p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEditVideo(v)}
                                                    className="flex-1 py-2 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-600 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                                                >
                                                    <Edit className="w-3 h-3" /> Sửa
                                                </button>
                                                <button
                                                    onClick={() => deleteVideo(v.id)}
                                                    className="flex-1 py-2 rounded-lg border border-red-100 hover:bg-red-50 text-red-500 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                                                >
                                                    <Trash2 className="w-3 h-3" /> Xóa
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {videos.length === 0 && (
                                <div className="text-center py-20 text-zinc-400">
                                    <Video className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p>Chưa có video nào. Hãy thêm video đầu tiên!</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── ORDERS ── */}
                    {activeTab === 'orders' && (
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-3xl font-bold mb-8">Recent Orders</h2>
                            <div className="space-y-4">
                                {orders.map(order => (
                                    <div key={order.id} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex justify-between items-center">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="font-bold text-lg">Order #{order.id}</span>
                                                <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-bold uppercase rounded-full">
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-zinc-500 text-sm">{order.customer_name} ({order.customer_email})</p>
                                            <p className="text-zinc-400 text-xs mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold">{order.total_amount.toLocaleString('vi-VN')}đ</p>
                                            <button className="text-zinc-400 hover:text-zinc-900 flex items-center gap-1 text-sm font-medium mt-2">
                                                Details <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── VIDEO MODAL ── */}
            <AnimatePresence>
                {videoModal.open && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setVideoModal({ open: false, editing: null })}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden"
                        >
                            <div className="p-8">
                                <h2 className="text-2xl font-bold mb-6">
                                    {videoModal.editing ? 'Sửa Video' : 'Thêm Video Mới'}
                                </h2>
                                <form onSubmit={saveVideo} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">YouTube Video ID <span className="text-zinc-400 normal-case">(ví dụ: dQw4w9WgXcQ)</span></label>
                                        <input
                                            value={videoForm.youtubeId}
                                            onChange={e => setVideoForm(f => ({ ...f, youtubeId: e.target.value }))}
                                            required
                                            placeholder="Dán YouTube ID vào đây..."
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none transition-all font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Tiêu đề</label>
                                        <input
                                            value={videoForm.title}
                                            onChange={e => setVideoForm(f => ({ ...f, title: e.target.value }))}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Danh mục</label>
                                            <select
                                                value={videoForm.category}
                                                onChange={e => setVideoForm(f => ({ ...f, category: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                                            >
                                                {videoCategories.filter(c => c !== 'Tất cả').map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Thời lượng</label>
                                            <input
                                                value={videoForm.duration}
                                                onChange={e => setVideoForm(f => ({ ...f, duration: e.target.value }))}
                                                placeholder="5:30"
                                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <ImageUploader
                                        value={videoForm.thumbnail}
                                        onChange={url => setVideoForm(f => ({ ...f, thumbnail: url }))}
                                        label="Thumbnail (tuỳ chọn – để trống sẽ dùng ảnh YouTube)"
                                    />
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Mô tả</label>
                                        <textarea
                                            value={videoForm.description}
                                            onChange={e => setVideoForm(f => ({ ...f, description: e.target.value }))}
                                            rows={2}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none transition-all resize-none"
                                        />
                                    </div>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={videoForm.featured}
                                            onChange={e => setVideoForm(f => ({ ...f, featured: e.target.checked }))}
                                            className="w-5 h-5 rounded accent-zinc-900"
                                        />
                                        <span className="text-sm font-semibold text-zinc-700">Đặt làm Video Nổi Bật</span>
                                    </label>
                                    <div className="flex gap-3 pt-4">
                                        <button type="button" onClick={() => setVideoModal({ open: false, editing: null })} className="flex-1 px-6 py-3 rounded-xl font-bold text-zinc-600 hover:bg-zinc-100 transition-all">
                                            Hủy
                                        </button>
                                        <button type="submit" className="flex-1 bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg">
                                            Lưu Video
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div >
    );
};

// Product Modal component
interface ProductModalProps {
    isOpen: boolean;
    editingProduct: Product | null;
    categories: string[];
    activeCategory: string;
    onClose: () => void;
    onSave: (data: { name: string; category: string; subCategory?: string; price: number; image: string; stock: number; description: string }) => void;
}

export const ProductModal = ({ isOpen, editingProduct, categories, activeCategory, onClose, onSave }: ProductModalProps) => {
    const [imageUrl, setImageUrl] = React.useState('');
    const [form, setForm] = React.useState({ name: '', category: '', subCategory: '', price: '', stock: '', description: '' });

    React.useEffect(() => {
        if (isOpen) {
            setImageUrl(editingProduct?.image || '');
            setForm({
                name: editingProduct?.name || '',
                category: editingProduct?.category || activeCategory,
                subCategory: editingProduct?.subCategory || '',
                price: String(editingProduct?.price || ''),
                stock: String(editingProduct?.stock || ''),
                description: editingProduct?.description || '',
            });
        }
    }, [isOpen, editingProduct, activeCategory]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            name: form.name,
            category: form.category,
            subCategory: form.subCategory,
            price: parseFloat(form.price),
            image: imageUrl,
            stock: parseInt(form.stock),
            description: form.description,
        });
    };

    const subCatOptions = menuCategories.find(c => c.name === form.category)?.sub || [];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-6">
                                {editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Tên sản phẩm</label>
                                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none transition-all" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Danh mục</label>
                                        <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value, subCategory: '' }))} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none transition-all">
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                    {subCatOptions.length > 0 && (
                                        <div className="col-span-2">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Loại sản phẩm (Danh mục con)</label>
                                            <select value={form.subCategory} onChange={e => setForm(f => ({ ...f, subCategory: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none transition-all">
                                                <option value="">-- Thuộc tất cả --</option>
                                                {subCatOptions.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                            </select>
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Giá (VNĐ)</label>
                                        <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none transition-all" />
                                    </div>
                                </div>
                                <ImageUploader value={imageUrl} onChange={setImageUrl} label="Hình ảnh sản phẩm" />
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Số lượng kho</label>
                                    <input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} required className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Mô tả</label>
                                    <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none transition-all resize-none" />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button type="button" onClick={onClose} className="flex-1 px-6 py-3 rounded-xl font-bold text-zinc-600 hover:bg-zinc-100 transition-all">
                                        Hủy
                                    </button>
                                    <button type="submit" className="flex-1 bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg">
                                        Lưu sản phẩm
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AdminDashboard;
