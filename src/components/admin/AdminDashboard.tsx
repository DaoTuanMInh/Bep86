import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, X, Package, ShoppingCart, Plus, Edit, Trash2,
    Video, Star, TrendingUp, Users, DollarSign, AlertTriangle,
    Search, Filter, RefreshCw, CheckCircle, Clock, Truck, XCircle,
    Database, Wifi, ChevronDown
} from 'lucide-react';
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
    onDeleteProduct: (id: string) => void;
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

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    pending: { label: 'Chờ xử lý', color: 'bg-amber-100 text-amber-700', icon: <Clock className="w-3 h-3" /> },
    shipped: { label: 'Đang giao', color: 'bg-blue-100 text-blue-700', icon: <Truck className="w-3 h-3" /> },
    delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-700', icon: <CheckCircle className="w-3 h-3" /> },
    cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700', icon: <XCircle className="w-3 h-3" /> },
};

const AdminDashboard = ({ products, orders, onAddProduct, onEditProduct, onDeleteProduct, onClose }: AdminDashboardProps) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'videos'>('overview');
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [videoModal, setVideoModal] = useState<{ open: boolean; editing: VideoItem | null }>({ open: false, editing: null });
    const [videoForm, setVideoForm] = useState({ youtubeId: '', title: '', description: '', category: 'Giới thiệu', duration: '', featured: false, thumbnail: '' });
    const [productSearch, setProductSearch] = useState('');
    const [orderSearch, setOrderSearch] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const loadVideos = () => fetch('/api/videos').then(r => r.json()).then(setVideos).catch(() => { });
    useEffect(() => { loadVideos(); }, []);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await loadVideos();
        setTimeout(() => setIsRefreshing(false), 600);
    };

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

    // Stats
    const totalRevenue = orders.reduce((s, o) => s + (o.total_amount || o.totalAmount || 0), 0);
    const lowStockProducts = products.filter(p => p.stock < 5);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(productSearch.toLowerCase())
    );
    const filteredOrders = orders.filter(o => {
        const name = (o.customer_name || o.customerName || '').toLowerCase();
        return name.includes(orderSearch.toLowerCase());
    });

    const navItems = [
        { id: 'overview', label: 'Tổng quan', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'products', label: 'Sản phẩm', icon: <Package className="w-4 h-4" />, badge: products.length },
        { id: 'orders', label: 'Đơn hàng', icon: <ShoppingCart className="w-4 h-4" />, badge: pendingOrders, badgeColor: 'bg-amber-400' },
        { id: 'videos', label: 'Video', icon: <Video className="w-4 h-4" />, badge: videos.length },
    ];

    return (
        <div className="fixed inset-0 bg-zinc-950 z-[200] flex flex-col text-white">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-zinc-900 border-b border-zinc-800 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 header-gradient flex items-center justify-center">
                        <Database className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h1 className="font-black text-sm uppercase tracking-widest">Bếp 86 Admin</h1>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <Wifi className="w-3 h-3 text-green-400" />
                            <span className="text-[10px] text-green-400 font-bold">Đã kết nối MongoDB Atlas</span>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-56 bg-zinc-900 border-r border-zinc-800 py-4 flex flex-col flex-shrink-0">
                    <nav className="flex-1 px-3 space-y-1">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as any)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition-all ${activeTab === item.id ? 'bg-brand-blue text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                            >
                                {item.icon}
                                <span className="flex-1 text-left">{item.label}</span>
                                {item.badge !== undefined && (
                                    <span className={`text-[10px] font-black px-1.5 py-0.5 min-w-[20px] text-center ${item.badgeColor || 'bg-zinc-700 text-zinc-300'}`}>
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                    <div className="px-4 py-4 border-t border-zinc-800">
                        <div className="bg-zinc-800 p-3 text-center">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Database</p>
                            <p className="text-xs font-bold text-green-400 mt-1 flex items-center justify-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                                MongoDB Atlas
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto bg-zinc-950">

                    {/* ── OVERVIEW ── */}
                    {activeTab === 'overview' && (
                        <div className="p-8">
                            <h2 className="text-2xl font-black mb-6 uppercase tracking-wide">Tổng quan hệ thống</h2>
                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                {[
                                    { label: 'Tổng doanh thu', value: totalRevenue.toLocaleString('vi-VN') + 'đ', icon: <DollarSign className="w-6 h-6" />, color: 'text-green-400', bg: 'bg-green-400/10' },
                                    { label: 'Tổng sản phẩm', value: products.length, icon: <Package className="w-6 h-6" />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                                    { label: 'Đơn chờ xử lý', value: pendingOrders, icon: <Clock className="w-6 h-6" />, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                                    { label: 'Hàng sắp hết', value: lowStockProducts.length, icon: <AlertTriangle className="w-6 h-6" />, color: 'text-red-400', bg: 'bg-red-400/10' },
                                ].map((s, i) => (
                                    <div key={i} className="bg-zinc-900 border border-zinc-800 p-5">
                                        <div className={`inline-flex p-2 ${s.bg} mb-3`}>
                                            <span className={s.color}>{s.icon}</span>
                                        </div>
                                        <p className="text-2xl font-black text-white">{s.value}</p>
                                        <p className="text-xs text-zinc-500 mt-1 font-semibold">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                            {/* Low Stock Warning */}
                            {lowStockProducts.length > 0 && (
                                <div className="bg-red-500/10 border border-red-500/30 p-5 mb-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <AlertTriangle className="w-5 h-5 text-red-400" />
                                        <h3 className="font-bold text-red-400">Sản phẩm sắp hết hàng ({lowStockProducts.length})</h3>
                                    </div>
                                    <div className="space-y-2">
                                        {lowStockProducts.map(p => (
                                            <div key={p.id} className="flex justify-between items-center text-sm">
                                                <span className="text-zinc-300">{p.name}</span>
                                                <span className="font-bold text-red-400">{p.stock} còn lại</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Recent Orders */}
                            <h3 className="font-bold text-zinc-400 uppercase tracking-widest text-xs mb-3">Đơn hàng gần đây</h3>
                            <div className="bg-zinc-900 border border-zinc-800 overflow-hidden">
                                {orders.slice(0, 5).map((order, i) => {
                                    const st = statusConfig[order.status] || statusConfig.pending;
                                    const amount = order.total_amount || order.totalAmount || 0;
                                    const name = order.customer_name || order.customerName || '—';
                                    return (
                                        <div key={order.id} className={`flex items-center justify-between px-5 py-3 ${i < orders.slice(0, 5).length - 1 ? 'border-b border-zinc-800' : ''}`}>
                                            <div>
                                                <p className="font-bold text-sm text-white">{name}</p>
                                                <p className="text-xs text-zinc-500">{new Date(order.created_at || order.createdAt || '').toLocaleDateString('vi-VN')}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 ${st.color}`}>{st.icon}{st.label}</span>
                                                <span className="font-black text-sm text-white">{amount.toLocaleString('vi-VN')}đ</span>
                                            </div>
                                        </div>
                                    );
                                })}
                                {orders.length === 0 && <div className="py-12 text-center text-zinc-600">Chưa có đơn hàng nào</div>}
                            </div>
                        </div>
                    )}

                    {/* ── PRODUCTS ── */}
                    {activeTab === 'products' && (
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-black uppercase tracking-wide">Quản lý sản phẩm</h2>
                                <button onClick={onAddProduct} className="header-gradient text-white px-5 py-2.5 font-bold flex items-center gap-2 text-sm transition-all hover:opacity-90 shadow-lg">
                                    <Plus className="w-4 h-4" /> Thêm sản phẩm
                                </button>
                            </div>
                            {/* Search */}
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Tìm theo tên hoặc danh mục..."
                                    value={productSearch}
                                    onChange={e => setProductSearch(e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-700 pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-brand-blue transition-colors"
                                />
                            </div>
                            <div className="bg-zinc-900 border border-zinc-800 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="border-b border-zinc-800 bg-zinc-800/50">
                                        <tr>
                                            <th className="px-5 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-500">Sản phẩm</th>
                                            <th className="px-5 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-500">Danh mục</th>
                                            <th className="px-5 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-500">Giá</th>
                                            <th className="px-5 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-500">Kho</th>
                                            <th className="px-5 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-500 text-right">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-800">
                                        {filteredProducts.map(product => (
                                            <tr key={product.id} className="hover:bg-zinc-800/50 transition-colors">
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <img src={product.image} className="w-10 h-10 object-cover bg-zinc-800 flex-shrink-0" referrerPolicy="no-referrer" />
                                                        <span className="font-semibold text-sm text-white line-clamp-1">{product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-xs text-zinc-400">{product.category}</td>
                                                <td className="px-5 py-3 font-bold text-sm text-white">{product.price.toLocaleString('vi-VN')}đ</td>
                                                <td className="px-5 py-3">
                                                    <span className={`px-2 py-0.5 text-xs font-bold ${product.stock < 5 ? 'bg-red-500/20 text-red-400' : product.stock < 10 ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>
                                                        {product.stock}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 text-right">
                                                    <div className="flex justify-end gap-1">
                                                        <button onClick={() => onEditProduct(product)} className="p-1.5 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => onDeleteProduct(product.id)} className="p-1.5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {filteredProducts.length === 0 && (
                                    <div className="py-16 text-center text-zinc-600">
                                        <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                        <p className="text-sm">Không tìm thấy sản phẩm nào</p>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-zinc-600 mt-3">{filteredProducts.length} / {products.length} sản phẩm</p>
                        </div>
                    )}

                    {/* ── ORDERS ── */}
                    {activeTab === 'orders' && (
                        <div className="p-8">
                            <h2 className="text-2xl font-black uppercase tracking-wide mb-6">Quản lý đơn hàng</h2>
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Tìm theo tên khách hàng..."
                                    value={orderSearch}
                                    onChange={e => setOrderSearch(e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-700 pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-brand-blue transition-colors"
                                />
                            </div>
                            <div className="space-y-3">
                                {filteredOrders.map(order => {
                                    const st = statusConfig[order.status] || statusConfig.pending;
                                    const amount = order.total_amount || order.totalAmount || 0;
                                    const name = order.customer_name || order.customerName || '—';
                                    const email = order.customer_email || order.customerEmail || '—';
                                    const date = order.created_at || order.createdAt || '';
                                    return (
                                        <div key={order.id} className="bg-zinc-900 border border-zinc-800 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="font-black text-sm text-white">#{String(order.id).slice(-6).toUpperCase()}</span>
                                                    <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 ${st.color}`}>{st.icon}{st.label}</span>
                                                </div>
                                                <p className="text-sm font-semibold text-zinc-300">{name}</p>
                                                <p className="text-xs text-zinc-500">{email}</p>
                                                <p className="text-xs text-zinc-600 mt-1">{date ? new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-xl font-black text-white">{amount.toLocaleString('vi-VN')}đ</p>
                                            </div>
                                        </div>
                                    );
                                })}
                                {filteredOrders.length === 0 && (
                                    <div className="py-20 text-center text-zinc-600 bg-zinc-900 border border-zinc-800">
                                        <ShoppingCart className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                        <p className="text-sm">Chưa có đơn hàng nào</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ── VIDEOS ── */}
                    {activeTab === 'videos' && (
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-black uppercase tracking-wide">Quản lý Video</h2>
                                <div className="flex gap-2">
                                    <button onClick={handleRefresh} className={`p-2.5 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all ${isRefreshing ? 'animate-spin' : ''}`}>
                                        <RefreshCw className="w-4 h-4" />
                                    </button>
                                    <button onClick={openAddVideo} className="header-gradient text-white px-5 py-2.5 font-bold flex items-center gap-2 text-sm hover:opacity-90 shadow-lg">
                                        <Plus className="w-4 h-4" /> Thêm Video
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {videos.map(v => (
                                    <div key={v.id} className="bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-zinc-600 transition-colors">
                                        <div className="relative aspect-video bg-zinc-800">
                                            <img
                                                src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                                                alt={v.title}
                                                className="w-full h-full object-cover"
                                            />
                                            {v.featured && (
                                                <div className="absolute top-2 left-2 bg-yellow-400 text-zinc-900 text-[9px] font-black uppercase px-2 py-0.5 flex items-center gap-1">
                                                    <Star className="w-2.5 h-2.5" fill="currentColor" /> Nổi bật
                                                </div>
                                            )}
                                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5">
                                                {v.duration}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <span className="text-[9px] font-black uppercase text-brand-blue tracking-widest">{v.category}</span>
                                            <h3 className="font-bold text-sm text-white line-clamp-2 mt-1 mb-3">{v.title}</h3>
                                            <div className="flex gap-2">
                                                <button onClick={() => openEditVideo(v)} className="flex-1 py-1.5 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 text-xs font-bold flex items-center justify-center gap-1 transition-colors">
                                                    <Edit className="w-3 h-3" /> Sửa
                                                </button>
                                                <button onClick={() => deleteVideo(v.id)} className="flex-1 py-1.5 border border-red-900 text-red-500 hover:bg-red-500/10 text-xs font-bold flex items-center justify-center gap-1 transition-colors">
                                                    <Trash2 className="w-3 h-3" /> Xóa
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {videos.length === 0 && (
                                    <div className="col-span-3 py-20 text-center text-zinc-600 border border-zinc-800">
                                        <Video className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                        <p className="text-sm">Chưa có video nào</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {videoModal.open && (
                    <div className="fixed inset-0 z-[210] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVideoModal({ open: false, editing: null })} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-zinc-900 border border-zinc-700 w-full max-w-lg relative overflow-hidden max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-black uppercase tracking-wide">{videoModal.editing ? 'Sửa Video' : 'Thêm Video Mới'}</h2>
                                    <button onClick={() => setVideoModal({ open: false, editing: null })} className="p-2 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <form onSubmit={saveVideo} className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">YouTube Video ID <span className="text-zinc-600 normal-case">(vd: dQw4w9WgXcQ)</span></label>
                                        <input value={videoForm.youtubeId} onChange={e => setVideoForm(f => ({ ...f, youtubeId: e.target.value }))} required placeholder="Dán YouTube ID..." className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white text-sm outline-none focus:border-brand-blue transition-colors font-mono" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Tiêu đề</label>
                                        <input value={videoForm.title} onChange={e => setVideoForm(f => ({ ...f, title: e.target.value }))} required className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white text-sm outline-none focus:border-brand-blue transition-colors" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Danh mục</label>
                                            <select value={videoForm.category} onChange={e => setVideoForm(f => ({ ...f, category: e.target.value }))} className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white text-sm outline-none focus:border-brand-blue transition-colors">
                                                {videoCategories.filter(c => c !== 'Tất cả').map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Thời lượng</label>
                                            <input value={videoForm.duration} onChange={e => setVideoForm(f => ({ ...f, duration: e.target.value }))} placeholder="5:30" className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white text-sm outline-none focus:border-brand-blue transition-colors" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Mô tả</label>
                                        <textarea value={videoForm.description} onChange={e => setVideoForm(f => ({ ...f, description: e.target.value }))} rows={2} className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white text-sm outline-none focus:border-brand-blue transition-colors resize-none" />
                                    </div>
                                    <label className="flex items-center gap-3 cursor-pointer p-3 bg-zinc-800 hover:bg-zinc-750">
                                        <input type="checkbox" checked={videoForm.featured} onChange={e => setVideoForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-brand-blue" />
                                        <div>
                                            <span className="text-sm font-bold text-white flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-400" /> Video Nổi Bật</span>
                                            <span className="text-xs text-zinc-500">Hiển thị ở vị trí đầu tiên</span>
                                        </div>
                                    </label>
                                    <div className="flex gap-3 pt-2">
                                        <button type="button" onClick={() => setVideoModal({ open: false, editing: null })} className="flex-1 px-5 py-2.5 font-bold text-zinc-400 hover:bg-zinc-800 transition-all text-sm border border-zinc-700">Hủy</button>
                                        <button type="submit" className="flex-1 header-gradient text-white px-5 py-2.5 font-bold hover:opacity-90 transition-all shadow-lg text-sm">Lưu Video</button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Product Modal
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
        onSave({ name: form.name, category: form.category, subCategory: form.subCategory, price: parseFloat(form.price), image: imageUrl, stock: parseInt(form.stock), description: form.description });
    };

    const subCatOptions = menuCategories.find(c => c.name === form.category)?.sub || [];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[210] flex items-center justify-center p-6">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-zinc-900 border border-zinc-700 w-full max-w-lg relative overflow-hidden max-h-[92vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-black uppercase tracking-wide">{editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
                                <button onClick={onClose} className="p-2 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Tên sản phẩm *</label>
                                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white text-sm outline-none focus:border-brand-blue transition-colors" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Danh mục *</label>
                                        <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value, subCategory: '' }))} className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white text-sm outline-none focus:border-brand-blue transition-colors">
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Giá (VNĐ) *</label>
                                        <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white text-sm outline-none focus:border-brand-blue transition-colors" />
                                    </div>
                                </div>
                                {subCatOptions.length > 0 && (
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Loại sản phẩm (Danh mục con)</label>
                                        <select value={form.subCategory} onChange={e => setForm(f => ({ ...f, subCategory: e.target.value }))} className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white text-sm outline-none focus:border-brand-blue transition-colors">
                                            <option value="">-- Thuộc tất cả --</option>
                                            {subCatOptions.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                        </select>
                                    </div>
                                )}
                                <ImageUploader value={imageUrl} onChange={setImageUrl} label="Hình ảnh sản phẩm" />
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Số lượng kho *</label>
                                    <input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} required className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white text-sm outline-none focus:border-brand-blue transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Mô tả</label>
                                    <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white text-sm outline-none focus:border-brand-blue transition-colors resize-none" />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={onClose} className="flex-1 px-5 py-2.5 font-bold text-zinc-400 hover:bg-zinc-800 transition-all text-sm border border-zinc-700">Hủy</button>
                                    <button type="submit" className="flex-1 header-gradient text-white px-5 py-2.5 font-bold hover:opacity-90 transition-all shadow-lg text-sm">Lưu sản phẩm</button>
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
