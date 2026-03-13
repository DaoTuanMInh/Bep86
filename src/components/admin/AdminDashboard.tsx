import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, X, Package, ShoppingCart, Plus, Edit, Trash2,
    Video, Star, AlertTriangle, Newspaper, Mail,
    Search, RefreshCw, CheckCircle, Clock, Truck, XCircle, ExternalLink, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Order, MenuCategory } from '../../types';
import ImageUploader from './ImageUploader';

interface AdminDashboardProps {
    products: Product[];
    orders: Order[];
    categories: string[];
    menuCategories: MenuCategory[];
    onAddProduct: () => void;
    onEditProduct: (p: Product) => void;
    onDeleteProduct: (id: string) => void;
    onGoToProduct: (p: Product) => void;
    onGoToNewsPost?: (slug: string) => void;
    onRefresh?: () => void;
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

const AdminDashboard = ({ 
    products, 
    orders, 
    categories, 
    menuCategories, 
    onAddProduct, 
    onEditProduct, 
    onDeleteProduct, 
    onGoToProduct,
    onGoToNewsPost,
    onRefresh,
    onClose 
}: AdminDashboardProps) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'videos' | 'news' | 'consultations'>('overview');
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [videoModal, setVideoModal] = useState<{ open: boolean; editing: VideoItem | null }>({ open: false, editing: null });
    const [videoForm, setVideoForm] = useState({ youtubeId: '', title: '', description: '', category: 'Giới thiệu', duration: '', featured: false, thumbnail: '' });
    const [productSearch, setProductSearch] = useState('');
    const [orderSearch, setOrderSearch] = useState('');
    const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // ── News state ──
    interface NewsItem { id: string; slug: string; title: string; excerpt: string; content: string; category: string; date: string; image: string; author: string; readTime: number; }
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [newsModal, setNewsModal] = useState<{ open: boolean; editing: NewsItem | null }>({ open: false, editing: null });
    const [newsForm, setNewsForm] = useState({ slug: '', title: '', excerpt: '', content: '', category: 'Tin tức', date: new Date().toISOString().slice(0, 10), image: '', author: 'Admin', readTime: 5 });
    const [newsSearch, setNewsSearch] = useState('');

    // ── Consultation state ──
    interface ConsultationItem { id: string; name: string; phone: string; product: string; message: string; status: string; createdAt: string; }
    const [consultations, setConsultations] = useState<ConsultationItem[]>([]);
    const [consultationSearch, setConsultationSearch] = useState('');

    const [showCustomVideoCat, setShowCustomVideoCat] = useState(false);
    const [customVideoCat, setCustomVideoCat] = useState('');
    const [showCustomNewsCat, setShowCustomNewsCat] = useState(false);
    const [customNewsCat, setCustomNewsCat] = useState('');

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[đĐ]/g, "d")
            .replace(/([^0-9a-z-\s])/g, "")
            .replace(/(\s+)/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const videoCategories = Array.from(new Set(videos.map(v => v.category)));

    const loadVideos = () => fetch('/api/videos').then(r => r.json()).then(setVideos).catch(() => { });
    const loadNews = () => fetch('/api/news').then(r => r.json()).then(data => {
        const normalized = Array.isArray(data) ? data.map((n: any) => ({ ...n, id: n._id?.toString() || n.id })) : data;
        setNewsItems(normalized);
    }).catch(() => {});
    const loadConsultations = () => fetch('/api/consultations').then(r => r.json()).then(setConsultations).catch(() => { });

    useEffect(() => { loadVideos(); loadNews(); loadConsultations(); }, []);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await loadVideos();
        setTimeout(() => setIsRefreshing(false), 600);
    };

    const openAddVideo = () => {
        setVideoForm({ youtubeId: '', title: '', description: '', category: 'Giới thiệu', duration: '', featured: false, thumbnail: '' });
        setShowCustomVideoCat(false);
        setCustomVideoCat('');
        setVideoModal({ open: true, editing: null });
    };
    const openEditVideo = (v: VideoItem) => {
        setVideoForm({ youtubeId: v.youtubeId, title: v.title, description: v.description, category: v.category, duration: v.duration, featured: v.featured, thumbnail: '' });
        setShowCustomVideoCat(false);
        setCustomVideoCat('');
        setVideoModal({ open: true, editing: v });
    };
    const saveVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        const finalCategory = showCustomVideoCat ? customVideoCat : videoForm.category;
        const submitData = { ...videoForm, category: finalCategory };

        const method = videoModal.editing ? 'PUT' : 'POST';
        const url = videoModal.editing ? `/api/videos/${videoModal.editing.id}` : '/api/videos';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(submitData) });
        setVideoModal({ open: false, editing: null });
        loadVideos();
    };
    const deleteVideo = async (id: string) => {
        if (!confirm('Xóa video này?')) return;
        await fetch(`/api/videos/${id}`, { method: 'DELETE' });
        loadVideos();
    };

    // ── News handlers ──
    const openAddNews = () => {
        const today = new Date().toISOString().slice(0, 10);
        setNewsForm({ slug: '', title: '', excerpt: '', content: '', category: 'Tin tức', date: today, image: '', author: 'Admin', readTime: 5 });
        setShowCustomNewsCat(false);
        setCustomNewsCat('');
        setNewsModal({ open: true, editing: null });
    };
    const openEditNews = (n: NewsItem) => {
        setNewsForm({ slug: n.slug, title: n.title, excerpt: n.excerpt, content: n.content, category: n.category, date: n.date, image: n.image, author: n.author, readTime: n.readTime });
        setShowCustomNewsCat(false);
        setCustomNewsCat('');
        setNewsModal({ open: true, editing: n });
    };
    const saveNews = async (e: React.FormEvent) => {
        e.preventDefault();
        const finalCategory = showCustomNewsCat ? customNewsCat : newsForm.category;
        const submitData = { ...newsForm, category: finalCategory };

        const method = newsModal.editing ? 'PUT' : 'POST';
        const url = newsModal.editing ? `/api/news/${newsModal.editing.id}` : '/api/news';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(submitData) });
        setNewsModal({ open: false, editing: null });
        loadNews();
    };
    const deleteNews = async (id: string) => {
        if (!confirm('Xóa bài viết này?')) return;
        await fetch(`/api/news/${id}`, { method: 'DELETE' });
        loadNews();
    };
    const deleteConsultation = async (id: string) => {
        if (!confirm('Xóa yêu cầu tư vấn này?')) return;
        await fetch(`/api/consultations/${id}`, { method: 'DELETE' });
        loadConsultations();
    };

    const updateConsultationStatus = async (id: string, status: string) => {
        await fetch(`/api/consultations/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        loadConsultations();
    };

    const updateOrderStatus = async (id: string, status: string) => {
        await fetch(`/api/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        if (onRefresh) onRefresh();
    };

    const filteredConsultations = consultations.filter(c =>
        c.name.toLowerCase().includes(consultationSearch.toLowerCase()) ||
        c.phone.includes(consultationSearch) ||
        (c.product || '').toLowerCase().includes(consultationSearch.toLowerCase())
    );

    const filteredNews = newsItems.filter(n =>
        n.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
        n.category.toLowerCase().includes(newsSearch.toLowerCase())
    );

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
        { id: 'news', label: 'Tin tức', icon: <Newspaper className="w-5 h-5" />, badge: newsItems.length },
        { id: 'consultations', label: 'Tư vấn', icon: <MessageSquare className="w-5 h-5" />, badge: consultations.length },
        { id: 'videos', label: 'Video', icon: <Video className="w-5 h-5" />, badge: videos.length },
    ];

    return (
        <div className="fixed inset-0 bg-white z-[150] flex flex-col text-zinc-900">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-zinc-200 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 header-gradient flex items-center justify-center">
                        <LayoutDashboard className="w-4 h-4 text-white" />
                    </div>
                    <h1 className="font-black text-base">Bếp 86 — Quản trị</h1>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500 hover:text-zinc-900">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-56 bg-zinc-50 border-r border-zinc-200 py-4 flex flex-col flex-shrink-0">
                    <nav className="flex-1 px-3 space-y-1">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as any)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === item.id ? 'bg-brand-blue text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'}`}
                            >
                                {item.icon}
                                <span className="flex-1 text-left">{item.label}</span>
                                {item.badge !== undefined && (
                                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${item.badgeColor ? item.badgeColor + ' text-zinc-900' : 'bg-zinc-200 text-zinc-600'}`}>
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto bg-zinc-50">

                    {/* ── OVERVIEW ── */}
                    {activeTab === 'overview' && (
                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-zinc-800 mb-6">Tổng quan</h2>
                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                {[
                                    { label: 'Tổng sản phẩm', value: products.length, icon: <Package className="w-6 h-6" />, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
                                    { label: 'Đơn chờ xử lý', value: pendingOrders, icon: <Clock className="w-6 h-6" />, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
                                    { label: 'Hàng sắp hết', value: lowStockProducts.length, icon: <AlertTriangle className="w-6 h-6" />, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
                                ].map((s, i) => (
                                    <div key={i} className={`bg-white border ${s.border} p-5 rounded-xl shadow-sm`}>
                                        <div className={`inline-flex p-2.5 ${s.bg} rounded-lg mb-3`}>
                                            <span className={s.color}>{s.icon}</span>
                                        </div>
                                        <p className="text-2xl font-black text-zinc-800">{s.value}</p>
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
                                                <span className="text-zinc-700">{p.name}</span>
                                                <span className="font-bold text-red-500">{p.stock} còn lại</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Recent Orders */}
                            <h3 className="font-bold text-zinc-500 uppercase tracking-widest text-xs mb-3">Đơn hàng gần đây</h3>
                            <div className="bg-white border border-zinc-200 overflow-hidden rounded-xl shadow-sm">
                                {orders.slice(0, 5).map((order, i) => {
                                    const st = statusConfig[order.status] || statusConfig.pending;
                                    const amount = order.total_amount || order.totalAmount || 0;
                                    const name = order.customer_name || order.customerName || '—';
                                    return (
                                        <div key={order.id} className={`flex items-center justify-between px-5 py-3 ${i < orders.slice(0, 5).length - 1 ? 'border-b border-zinc-100' : ''}`}>
                                            <div>
                                                <p className="font-bold text-sm text-zinc-800">{name}</p>
                                                <p className="text-xs text-zinc-400">{new Date(order.created_at || order.createdAt || '').toLocaleDateString('vi-VN')}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${st.color}`}>{st.icon}{st.label}</span>
                                                <span className="font-black text-sm text-zinc-800">{amount.toLocaleString('vi-VN')}đ</span>
                                            </div>
                                        </div>
                                    );
                                })}
                                {orders.length === 0 && <div className="py-12 text-center text-zinc-400">Chưa có đơn hàng nào</div>}
                            </div>
                        </div>
                    )}

                    {/* ── PRODUCTS ── */}
                    {activeTab === 'products' && (
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-zinc-800">Quản lý sản phẩm</h2>
                                <button onClick={onAddProduct} className="header-gradient text-white px-5 py-2.5 font-bold flex items-center gap-2 text-sm transition-all hover:opacity-90 shadow-lg">
                                    <Plus className="w-4 h-4" /> Thêm sản phẩm
                                </button>
                            </div>

                            <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-lg mb-4 flex gap-2 items-start border border-blue-100">
                                <div className="mt-0.5">ℹ️</div>
                                <div>
                                    <p className="font-bold">Hướng dẫn đồng bộ dữ liệu:</p>
                                    <p>• Để thay đổi thông tin hệ thống (Tên, Giá, Hình thu nhỏ) hiển thị trong danh sách: Dùng nút <b>Sửa thông tin nhanh (✏️)</b>.</p>
                                    <p>• Để thay đổi bài viết, ảnh lớn bên trong trang chi tiết: Dùng nút <b>Xem & sửa trang (🔗)</b>.</p>
                                </div>
                            </div>

                            {/* Search */}
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Tìm theo tên hoặc danh mục..."
                                    value={productSearch}
                                    onChange={e => setProductSearch(e.target.value)}
                                    className="w-full bg-white border border-zinc-300 pl-9 pr-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-brand-blue transition-colors rounded-lg"
                                />
                            </div>
                            <div className="bg-white border border-zinc-200 overflow-hidden rounded-xl shadow-sm">
                                <table className="w-full text-left">
                                    <thead className="border-b border-zinc-100 bg-zinc-50">
                                        <tr>
                                            <th className="px-5 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-500">Sản phẩm</th>
                                            <th className="px-5 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-500">Danh mục</th>
                                            <th className="px-5 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-500">Giá</th>
                                            <th className="px-5 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-500">Kho</th>
                                            <th className="px-5 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-500 text-right">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100">
                                        {filteredProducts.map(product => (
                                            <tr key={product.id} className="hover:bg-zinc-50 transition-colors">
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <img src={product.image} className="w-10 h-10 object-cover bg-zinc-100 flex-shrink-0 rounded" referrerPolicy="no-referrer" />
                                                        <span className="font-semibold text-sm text-zinc-800 line-clamp-1">{product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-xs text-zinc-500">{product.category}</td>
                                                <td className="px-5 py-3 font-bold text-sm text-zinc-800">{product.price.toLocaleString('vi-VN')}đ</td>
                                                <td className="px-5 py-3">
                                                    <span className={`px-2 py-0.5 text-xs font-bold rounded ${product.stock < 5 ? 'bg-red-100 text-red-600' : product.stock < 10 ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                                                        {product.stock}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 text-right">
                                                    <div className="flex justify-end gap-1">
                                                        <button
                                                            onClick={() => { onGoToProduct(product); onClose(); }}
                                                            className="p-1.5 hover:bg-blue-50 text-zinc-400 hover:text-brand-blue rounded transition-colors"
                                                            title="Xem & sửa trang sản phẩm"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => onEditProduct(product)} className="p-1.5 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 rounded transition-colors" title="Sửa thông tin nhanh">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => onDeleteProduct(product.id)} className="p-1.5 hover:bg-red-50 text-zinc-400 hover:text-red-500 rounded transition-colors" title="Xóa">
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
                            <h2 className="text-2xl font-bold text-zinc-800 mb-6">Quản lý đơn hàng</h2>
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm theo tên khách hàng..."
                                    value={orderSearch}
                                    onChange={e => setOrderSearch(e.target.value)}
                                    className="w-full bg-white border border-zinc-300 pl-9 pr-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-brand-blue transition-colors rounded-lg"
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
                                        <div key={order.id} className="bg-white border border-zinc-200 px-5 py-4 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="font-black text-sm text-zinc-800">#{String(order.id).slice(-6).toUpperCase()}</span>
                                                    <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${st.color}`}>{st.icon}{st.label}</span>
                                                </div>
                                                <p className="text-sm font-semibold text-zinc-700">{name}</p>
                                                <p className="text-xs text-zinc-400">{email}</p>
                                                <p className="text-xs text-zinc-400 mt-1">{date ? new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0 flex flex-col items-end gap-2">
                                                <p className="text-xl font-black text-zinc-800">{amount.toLocaleString('vi-VN')}đ</p>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                    className="text-[10px] font-bold border border-zinc-200 rounded px-2 py-1 outline-none bg-zinc-50 hover:bg-white transition-colors cursor-pointer"
                                                >
                                                    <option value="pending">Chờ xử lý</option>
                                                    <option value="shipped">Đang giao</option>
                                                    <option value="delivered">Đã giao</option>
                                                    <option value="cancelled">Đã hủy</option>
                                                </select>
                                            </div>
                                        </div>
                                    );
                                })}
                                {filteredOrders.length === 0 && (
                                    <div className="py-20 text-center text-zinc-400 bg-white border border-zinc-200 rounded-xl">
                                        <ShoppingCart className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                        <p className="text-sm">Chưa có đơn hàng nào</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ── CONSULTATIONS ── */}
                    {activeTab === 'consultations' && (
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-zinc-800 tracking-tight">Yêu cầu tư vấn</h2>
                                <button onClick={loadConsultations} className={`p-2.5 border border-zinc-200 text-zinc-400 hover:text-zinc-700 hover:border-zinc-400 rounded-lg transition-all ${isRefreshing ? 'animate-spin' : ''}`}>
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="relative mb-6">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm theo tên, số điện thoại hoặc sản phẩm..."
                                    value={consultationSearch}
                                    onChange={e => setConsultationSearch(e.target.value)}
                                    className="w-full bg-white border border-zinc-300 pl-10 pr-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-brand-blue transition-all rounded-xl shadow-sm"
                                />
                            </div>
                            <div className="space-y-4">
                                {filteredConsultations.map(item => (
                                    <div key={item.id} className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-blue/20 group-hover:bg-brand-blue transition-colors" />
                                        <div className="flex flex-col md:flex-row justify-between gap-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-base font-bold text-zinc-800">{item.name}</h3>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${item.status === 'consulted' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                        {item.status === 'consulted' ? 'Đã tư vấn' : 'Chờ tư vấn'}
                                                    </span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                                                        {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-4">
                                                    <div className="flex items-center gap-1.5 text-zinc-600">
                                                        <div className="w-2 h-2 rounded-full bg-brand-blue" />
                                                        <span className="font-bold">{item.phone}</span>
                                                    </div>
                                                    {item.email && (
                                                        <div className="flex items-center gap-1.5 text-zinc-600">
                                                            <Mail className="w-3.5 h-3.5 text-zinc-400" />
                                                            <span>{item.email}</span>
                                                        </div>
                                                    )}
                                                    {item.product && (
                                                        <div className="flex items-center gap-1.5 text-zinc-600">
                                                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                                                            <span>SP: <span className="font-semibold text-zinc-800">{item.product}</span></span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                                                    <p className="text-sm text-zinc-600 italic leading-relaxed whitespace-pre-wrap">
                                                        "{item.message}"
                                                    </p>
                                                </div>
                                                <div className="mt-4 flex items-center gap-2">
                                                    <label className="flex items-center gap-2 cursor-pointer group">
                                                        <input 
                                                            type="checkbox" 
                                                            checked={item.status === 'consulted'} 
                                                            onChange={(e) => updateConsultationStatus(item.id, e.target.checked ? 'consulted' : 'pending')}
                                                            className="w-4 h-4 rounded border-zinc-300 text-brand-blue focus:ring-brand-blue"
                                                        />
                                                        <span className="text-xs font-bold text-zinc-600 group-hover:text-zinc-900 transition-colors">Đánh dấu đã tư vấn</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="flex md:flex-col justify-end gap-2">
                                                <a href={`tel:${item.phone}`} className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-blue text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-blue-700 transition-colors">
                                                    Gọi ngay
                                                </a>
                                                <button onClick={() => deleteConsultation(item.id)} className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-500 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-red-500 hover:text-white transition-all">
                                                    <Trash2 className="w-4 h-4" /> Xóa
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {filteredConsultations.length === 0 && (
                                    <div className="py-24 text-center text-zinc-400 bg-white border border-zinc-200 rounded-2xl border-dashed">
                                        <div className="w-16 h-16 bg-zinc-100 text-zinc-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <MessageSquare className="w-8 h-8 opacity-50" />
                                        </div>
                                        <p className="text-zinc-500 font-medium italic">Không có yêu cầu tư vấn nào phù hợp</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ── NEWS ── */}
                    {activeTab === 'news' && (
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-zinc-800">Quản lý Tin tức</h2>
                                <button onClick={openAddNews} className="header-gradient text-white px-5 py-2.5 font-bold flex items-center gap-2 text-sm hover:opacity-90 shadow-lg rounded-lg">
                                    <Plus className="w-4 h-4" /> Thêm bài viết
                                </button>
                            </div>
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input type="text" placeholder="Tìm bài viết..." value={newsSearch} onChange={e => setNewsSearch(e.target.value)} className="w-full bg-white border border-zinc-300 pl-9 pr-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-brand-blue transition-colors rounded-lg" />
                            </div>
                            <div className="space-y-3">
                                {filteredNews.map(n => (
                                    <div key={n.id} className="bg-white border border-zinc-200 rounded-xl shadow-sm flex gap-4 p-4 items-center hover:shadow-md transition-shadow">
                                        <img src={n.image} alt={n.title} className="w-20 h-16 object-cover rounded-lg flex-shrink-0 bg-zinc-100" referrerPolicy="no-referrer" />
                                        <div className="flex-1 min-w-0">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-brand-blue">{n.category}</span>
                                            <h3 className="font-bold text-sm text-zinc-800 line-clamp-1 mt-0.5">{n.title}</h3>
                                            <p className="text-xs text-zinc-400 line-clamp-1">{n.excerpt}</p>
                                            <p className="text-[10px] text-zinc-300 mt-1">{n.date} · {n.readTime} phút đọc</p>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => { if (onGoToNewsPost) { onGoToNewsPost(n.slug); onClose(); } }}
                                                className="p-2 hover:bg-blue-50 text-zinc-400 hover:text-brand-blue rounded-lg transition-colors"
                                                title="Xem & sửa trang bài viết"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => openEditNews(n)} className="p-2 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 rounded-lg transition-colors" title="Sửa thông tin nhanh">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => deleteNews(n.id)} className="p-2 hover:bg-red-50 text-zinc-400 hover:text-red-500 rounded-lg transition-colors" title="Xóa">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {filteredNews.length === 0 && (
                                    <div className="py-20 text-center text-zinc-400 bg-white border border-zinc-200 rounded-xl">
                                        <Newspaper className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                        <p className="text-sm">Chưa có bài viết nào</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ── VIDEOS ── */}
                    {activeTab === 'videos' && (
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-zinc-800">Quản lý Video</h2>
                                <div className="flex gap-2">
                                    <button onClick={handleRefresh} className={`p-2.5 border border-zinc-200 text-zinc-400 hover:text-zinc-700 hover:border-zinc-400 rounded-lg transition-all ${isRefreshing ? 'animate-spin' : ''}`}>
                                        <RefreshCw className="w-4 h-4" />
                                    </button>
                                    <button onClick={openAddVideo} className="header-gradient text-white px-5 py-2.5 font-bold flex items-center gap-2 text-sm hover:opacity-90 shadow-lg rounded-lg">
                                        <Plus className="w-4 h-4" /> Thêm Video
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {videos.map(v => (
                                    <div key={v.id} className="bg-white border border-zinc-200 overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow">
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
                                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">{v.duration}</div>
                                        </div>
                                        <div className="p-4">
                                            <span className="text-[9px] font-black uppercase text-brand-blue tracking-widest">{v.category}</span>
                                            <h3 className="font-bold text-sm text-zinc-800 line-clamp-2 mt-1 mb-3">{v.title}</h3>
                                            <div className="flex gap-2">
                                                <button onClick={() => openEditVideo(v)} className="flex-1 py-1.5 border border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:border-zinc-400 text-xs font-bold flex items-center justify-center gap-1 transition-colors rounded-lg">
                                                    <Edit className="w-3 h-3" /> Sửa
                                                </button>
                                                <button onClick={() => deleteVideo(v.id)} className="flex-1 py-1.5 border border-red-100 text-red-400 hover:bg-red-50 text-xs font-bold flex items-center justify-center gap-1 transition-colors rounded-lg">
                                                    <Trash2 className="w-3 h-3" /> Xóa
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {videos.length === 0 && (
                                    <div className="col-span-3 py-20 text-center text-zinc-400 border border-zinc-200 rounded-xl bg-white">
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
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVideoModal({ open: false, editing: null })} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white border border-zinc-200 shadow-2xl w-full max-w-lg relative overflow-hidden max-h-[90vh] overflow-y-auto rounded-2xl">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-black uppercase tracking-wide">{videoModal.editing ? 'Sửa Video' : 'Thêm Video Mới'}</h2>
                                    <button onClick={() => setVideoModal({ open: false, editing: null })} className="p-2 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 rounded-full transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <form onSubmit={saveVideo} className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">YouTube Video ID <span className="text-zinc-600 normal-case">(vd: dQw4w9WgXcQ)</span></label>
                                        <input value={videoForm.youtubeId} onChange={e => setVideoForm(f => ({ ...f, youtubeId: e.target.value }))} required placeholder="Dán YouTube ID..." className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors font-mono rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Tiêu đề</label>
                                        <input value={videoForm.title} onChange={e => setVideoForm(f => ({ ...f, title: e.target.value }))} required className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500">Danh mục</label>
                                                <button type="button" onClick={() => setShowCustomVideoCat(!showCustomVideoCat)} className="text-[10px] font-bold text-brand-blue hover:underline">
                                                    {showCustomVideoCat ? 'Chọn DS' : '+ Mới'}
                                                </button>
                                            </div>
                                            {showCustomVideoCat ? (
                                                <input value={customVideoCat} onChange={e => setCustomVideoCat(e.target.value)} placeholder="Tên danh mục mới..." required className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg" />
                                            ) : (
                                                <select value={videoForm.category} onChange={e => setVideoForm(f => ({ ...f, category: e.target.value }))} className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg">
                                                    {videoCategories.filter(c => c !== 'Tất cả').map(c => <option key={c} value={c}>{c}</option>)}
                                                    {!videoCategories.includes(videoForm.category) && videoForm.category && <option value={videoForm.category}>{videoForm.category}</option>}
                                                </select>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Thời lượng</label>
                                            <input value={videoForm.duration} onChange={e => setVideoForm(f => ({ ...f, duration: e.target.value }))} placeholder="5:30" className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Mô tả</label>
                                        <textarea value={videoForm.description} onChange={e => setVideoForm(f => ({ ...f, description: e.target.value }))} rows={2} className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors resize-none rounded-lg" />
                                    </div>
                                    <ImageUploader
                                        value={videoForm.thumbnail}
                                        onChange={url => setVideoForm(f => ({ ...f, thumbnail: url }))}
                                        label="Ảnh thumbnail (tuà chọn, mặc định lấy từ YouTube)"
                                    />
                                    <label className="flex items-center gap-3 cursor-pointer p-3 bg-zinc-50 hover:bg-zinc-100 rounded-lg border border-zinc-200">
                                        <input type="checkbox" checked={videoForm.featured} onChange={e => setVideoForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-brand-blue" />
                                        <div>
                                            <span className="text-sm font-bold text-zinc-800 flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-500" /> Video Nổi Bật</span>
                                            <span className="text-xs text-zinc-500">Hiển thị ở vị trí đầu tiên</span>
                                        </div>
                                    </label>
                                    <div className="flex gap-3 pt-2">
                                        <button type="button" onClick={() => setVideoModal({ open: false, editing: null })} className="flex-1 px-5 py-2.5 font-bold text-zinc-500 hover:bg-zinc-100 transition-all text-sm border border-zinc-200 rounded-lg">Hủy</button>
                                        <button type="submit" className="flex-1 header-gradient text-white px-5 py-2.5 font-bold hover:opacity-90 transition-all shadow-lg text-sm rounded-lg">Lưu Video</button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* News Modal */}
            <AnimatePresence>
                {newsModal.open && (
                    <div className="fixed inset-0 z-[310] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setNewsModal({ open: false, editing: null })} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white border border-zinc-200 shadow-2xl w-full max-w-2xl relative max-h-[92vh] overflow-y-auto rounded-2xl">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-black uppercase tracking-wide">{newsModal.editing ? 'Sửa bài viết' : 'Thêm bài viết mới'}</h2>
                                    <button onClick={() => setNewsModal({ open: false, editing: null })} className="p-2 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 rounded-full transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                    <form onSubmit={saveNews} className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Tiêu đề *</label>
                                        <input 
                                            value={newsForm.title} 
                                            onChange={e => {
                                                const title = e.target.value;
                                                setNewsForm(f => ({ ...f, title, slug: generateSlug(title) }));
                                            }} 
                                            required 
                                            className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Slug (URL) * <span className="normal-case font-normal text-zinc-400">Tự động tạo hoặc dán URL mới</span></label>
                                        <input value={newsForm.slug} onChange={e => setNewsForm(f => ({ ...f, slug: e.target.value }))} required placeholder="tin-tuc-moi-nhat" className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors font-mono rounded-lg" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500">Danh mục</label>
                                                <button type="button" onClick={() => setShowCustomNewsCat(!showCustomNewsCat)} className="text-[10px] font-bold text-brand-blue hover:underline">
                                                    {showCustomNewsCat ? 'Chọn DS' : '+ Mới'}
                                                </button>
                                            </div>
                                            {showCustomNewsCat ? (
                                                <input value={customNewsCat} onChange={e => setCustomNewsCat(e.target.value)} placeholder="Tên danh mục mới..." required className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg" />
                                            ) : (
                                                <select 
                                                    value={newsForm.category} 
                                                    onChange={e => setNewsForm(f => ({ ...f, category: e.target.value }))} 
                                                    className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg"
                                                >
                                                    {Array.from(new Set(newsItems.map(n => n.category))).map(c => <option key={c} value={c}>{c}</option>)}
                                                    {!newsItems.some(n => n.category === newsForm.category) && <option value={newsForm.category}>{newsForm.category}</option>}
                                                </select>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Ngày đăng</label>
                                            <input type="date" value={newsForm.date} onChange={e => setNewsForm(f => ({ ...f, date: e.target.value }))} className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Tác giả</label>
                                            <input value={newsForm.author} onChange={e => setNewsForm(f => ({ ...f, author: e.target.value }))} className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Thời gian đọc (phút)</label>
                                            <input type="number" min={1} value={newsForm.readTime} onChange={e => setNewsForm(f => ({ ...f, readTime: Number(e.target.value) }))} className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg" />
                                        </div>
                                    </div>
                                    <ImageUploader
                                        value={newsForm.image}
                                        onChange={url => setNewsForm(f => ({ ...f, image: url }))}
                                        label="Ảnh bìa bài viết *"
                                    />
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Tóm tắt *</label>
                                        <textarea value={newsForm.excerpt} onChange={e => setNewsForm(f => ({ ...f, excerpt: e.target.value }))} required rows={2} className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors resize-none rounded-lg" />
                                    </div>
                                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 items-center">
                                        <ExternalLink className="w-5 h-5 text-brand-blue flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-bold text-zinc-800">Chỉnh sửa nội dung trực tiếp</p>
                                            <p className="text-xs text-zinc-500 mt-0.5">Nhấn nút <strong>"Ảnh & sửa trang"</strong> (icon ⦬) trong danh sách để sang trang bài viết và chỉnh sửa nội dung trực tiếp trên trang.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button type="button" onClick={() => setNewsModal({ open: false, editing: null })} className="flex-1 px-5 py-2.5 font-bold text-zinc-500 hover:bg-zinc-100 transition-all text-sm border border-zinc-200 rounded-lg">Hủy</button>
                                        <button type="submit" className="flex-1 header-gradient text-white px-5 py-2.5 font-bold hover:opacity-90 transition-all shadow-lg text-sm rounded-lg">Lưu bài viết</button>
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
    menuCategories: MenuCategory[];
    activeCategory: string;
    onClose: () => void;
    onSave: (data: { name: string; category: string; subCategory?: string; price: number; originalPrice?: number; image: string; stock: number; description: string }) => void;
}

export const ProductModal = ({ isOpen, editingProduct, categories, menuCategories, activeCategory, onClose, onSave }: ProductModalProps) => {
    const [imageUrl, setImageUrl] = React.useState('');
    const [form, setForm] = React.useState({ name: '', category: '', subCategory: '', price: '', originalPrice: '', stock: '', description: '' });
    const [showCustomCat, setShowCustomCat] = React.useState(false);
    const [customCat, setCustomCat] = React.useState('');
    const [showCustomSub, setShowCustomSub] = React.useState(false);
    const [customSub, setCustomSub] = React.useState('');

    React.useEffect(() => {
        if (isOpen) {
            setImageUrl(editingProduct?.image || '');
            setShowCustomCat(false);
            setCustomCat('');
            setShowCustomSub(false);
            setCustomSub('');
            setForm({
                name: editingProduct?.name || '',
                category: editingProduct?.category || activeCategory,
                subCategory: editingProduct?.subCategory || '',
                price: String(editingProduct?.price || ''),
                originalPrice: String(editingProduct?.originalPrice || ''),
                stock: String(editingProduct?.stock || ''),
                description: editingProduct?.description || '',
            });
        }
    }, [isOpen, editingProduct, activeCategory]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalCat = showCustomCat ? customCat : form.category;
        const finalSub = showCustomSub ? customSub : form.subCategory;
        onSave({ 
            name: form.name, 
            category: finalCat, 
            subCategory: finalSub, 
            price: parseFloat(form.price), 
            originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined, 
            image: imageUrl, 
            stock: parseInt(form.stock), 
            description: form.description 
        });
    };

    const subCatOptions = menuCategories.find(c => c.name === form.category)?.sub || [];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[210] flex items-center justify-center p-6">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white border border-zinc-200 shadow-2xl w-full max-w-lg relative overflow-hidden max-h-[92vh] overflow-y-auto rounded-2xl">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-zinc-800">{editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
                                <button onClick={onClose} className="p-2 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Tên sản phẩm *</label>
                                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500">Danh mục *</label>
                                            <button 
                                                type="button" 
                                                onClick={() => setShowCustomCat(!showCustomCat)}
                                                className="text-[10px] font-bold text-brand-blue hover:underline"
                                            >
                                                {showCustomCat ? 'Chọn từ DS' : '+ Thêm mới'}
                                            </button>
                                        </div>
                                        {showCustomCat ? (
                                            <input 
                                                value={customCat} 
                                                onChange={e => setCustomCat(e.target.value)} 
                                                placeholder="Tên danh mục mới..."
                                                required
                                                className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg"
                                            />
                                        ) : (
                                            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value, subCategory: '' }))} className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg">
                                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            </select>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Giá Khuyến Mãi (VNĐ) *</label>
                                        <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Giá Gốc (VNĐ) - Tuỳ chọn</label>
                                    <input type="number" value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))} className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg" placeholder="Để trống nếu không có giảm giá" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500">Loại sản phẩm (Danh mục con)</label>
                                        <button 
                                            type="button" 
                                            onClick={() => setShowCustomSub(!showCustomSub)}
                                            className="text-[10px] font-bold text-brand-blue hover:underline"
                                        >
                                            {showCustomSub ? 'Chọn từ danh sách' : '+ Thêm loại mới'}
                                        </button>
                                    </div>
                                    {showCustomSub ? (
                                        <input 
                                            value={customSub} 
                                            onChange={e => setCustomSub(e.target.value)} 
                                            placeholder="Nhập loại sản phẩm mới..."
                                            className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg"
                                        />
                                    ) : (
                                        <select value={form.subCategory} onChange={e => setForm(f => ({ ...f, subCategory: e.target.value }))} className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg">
                                            <option value="">-- Thuộc tất cả --</option>
                                            {subCatOptions.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                        </select>
                                    )}
                                </div>
                                <ImageUploader value={imageUrl} onChange={setImageUrl} label="Hình ảnh sản phẩm" />
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Số lượng kho *</label>
                                    <input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} required className="w-full bg-zinc-50 border border-zinc-300 px-4 py-2.5 text-zinc-900 text-sm outline-none focus:border-brand-blue transition-colors rounded-lg" />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={onClose} className="flex-1 px-5 py-2.5 font-bold text-zinc-500 hover:bg-zinc-100 transition-all text-sm border border-zinc-200 rounded-lg">Hủy</button>
                                    <button type="submit" className="flex-1 header-gradient text-white px-5 py-2.5 font-bold hover:opacity-90 transition-all shadow-lg text-sm rounded-lg">Lưu sản phẩm</button>
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
