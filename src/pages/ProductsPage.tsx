import React, { useState, useEffect } from 'react';
import { ChevronRight, Search, SlidersHorizontal, ShoppingCart, X } from 'lucide-react';
import { Product } from '../types';
import { api } from '../services/api';
import { menuCategories } from '../data/categories';
import Footer from '../components/layout/Footer';

interface ProductsPageProps {
    initialCategory?: string;
    initialSubCategory?: string;
    onAddToCart?: (product: Product) => void;
}

const ProductsPage = ({ initialCategory, initialSubCategory, onAddToCart }: ProductsPageProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(initialCategory || 'Tất cả');
    const [activeSubCategory, setActiveSubCategory] = useState(initialSubCategory || '');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<'default' | 'asc' | 'desc'>('default');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [addedId, setAddedId] = useState<number | null>(null);

    useEffect(() => {
        api.getProducts().then(p => { setProducts(p); setLoading(false); });
    }, []);

    useEffect(() => {
        setActiveCategory(initialCategory || 'Tất cả');
        setActiveSubCategory(initialSubCategory || '');
    }, [initialCategory, initialSubCategory]);

    const activeCatObj = menuCategories.find(c => c.name === activeCategory);

    const filtered = products
        .filter(p => {
            const matchCat = activeCategory === 'Tất cả' || p.category === activeCategory;
            const matchSub = !activeSubCategory || p.category === activeSubCategory || p.name.toLowerCase().includes(activeSubCategory.toLowerCase());
            const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
            return matchCat && matchSub && matchSearch;
        })
        .sort((a, b) => {
            if (sort === 'asc') return a.price - b.price;
            if (sort === 'desc') return b.price - a.price;
            return 0;
        });

    const handleAddToCart = (p: Product) => {
        onAddToCart?.(p);
        setAddedId(p.id);
        setTimeout(() => setAddedId(null), 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ── HERO ── */}
            <div
                className="relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0f4c75 0%, #1b262c 60%, #16213e 100%)', minHeight: 200 }}
            >
                <div className="absolute -top-16 right-0 w-96 h-96 rounded-full border border-white/5" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                        <span className="hover:text-white cursor-pointer transition-colors">Trang chủ</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="hover:text-white cursor-pointer transition-colors">Sản phẩm</span>
                        {activeCategory !== 'Tất cả' && (
                            <>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-yellow-400 font-semibold">{activeCategory}</span>
                            </>
                        )}
                        {activeSubCategory && (
                            <>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-yellow-300">{activeSubCategory}</span>
                            </>
                        )}
                    </nav>
                    <h1 className="text-2xl md:text-4xl font-black text-white">
                        {activeSubCategory || activeCategory === 'Tất cả' ? (activeSubCategory || 'Tất cả sản phẩm') : activeCategory}
                    </h1>
                    <p className="text-slate-300 text-sm mt-2">
                        {filtered.length} sản phẩm được tìm thấy
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">

                {/* ── SIDEBAR ── */}
                {sidebarOpen && (
                    <aside className="w-64 flex-shrink-0">
                        {/* Search */}
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Tìm sản phẩm..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 bg-white text-sm outline-none focus:border-brand-blue transition-colors"
                            />
                            {search && (
                                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <X className="w-3.5 h-3.5 text-zinc-400" />
                                </button>
                            )}
                        </div>

                        {/* Sort */}
                        <div className="mb-6">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Sắp xếp giá</label>
                            <div className="flex gap-2">
                                {[{ v: 'default', l: 'Mặc định' }, { v: 'asc', l: 'Thấp → Cao' }, { v: 'desc', l: 'Cao → Thấp' }].map(s => (
                                    <button
                                        key={s.v}
                                        onClick={() => setSort(s.v as any)}
                                        className={`flex-1 py-1.5 text-[10px] font-bold border transition-all ${sort === s.v ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white text-zinc-500 border-gray-200 hover:border-brand-blue'}`}
                                    >
                                        {s.l}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Danh mục</label>
                            <ul className="space-y-0.5">
                                <li>
                                    <button
                                        onClick={() => { setActiveCategory('Tất cả'); setActiveSubCategory(''); }}
                                        className={`w-full text-left px-3 py-2.5 text-sm transition-all flex items-center justify-between ${activeCategory === 'Tất cả' ? 'bg-brand-blue text-white font-bold' : 'hover:bg-blue-50 text-zinc-700'}`}
                                    >
                                        <span>Tất cả sản phẩm</span>
                                        <span className={`text-[10px] px-1.5 py-0.5 font-bold ${activeCategory === 'Tất cả' ? 'bg-white/20' : 'bg-gray-100 text-zinc-500'}`}>{products.length}</span>
                                    </button>
                                </li>
                                {menuCategories.map(cat => {
                                    const count = products.filter(p => p.category === cat.name).length;
                                    const isActive = activeCategory === cat.name;
                                    return (
                                        <li key={cat.name}>
                                            <button
                                                onClick={() => { setActiveCategory(cat.name); setActiveSubCategory(''); }}
                                                className={`w-full text-left px-3 py-2.5 text-sm transition-all flex items-center justify-between ${isActive ? 'bg-brand-blue text-white font-bold' : 'hover:bg-blue-50 text-zinc-700'}`}
                                            >
                                                <span>{cat.name}</span>
                                                <span className={`text-[10px] px-1.5 py-0.5 font-bold ${isActive ? 'bg-white/20' : 'bg-gray-100 text-zinc-500'}`}>{count}</span>
                                            </button>
                                            {/* Subcategories */}
                                            {isActive && cat.sub.length > 0 && (
                                                <ul className="border-l-2 border-brand-blue ml-3 mt-1 mb-1">
                                                    {cat.sub.map(sub => (
                                                        <li key={sub}>
                                                            <button
                                                                onClick={() => setActiveSubCategory(sub === activeSubCategory ? '' : sub)}
                                                                className={`w-full text-left px-3 py-2 text-xs transition-all ${activeSubCategory === sub ? 'text-brand-blue font-bold bg-blue-50' : 'text-zinc-500 hover:text-brand-blue hover:bg-blue-50'}`}
                                                            >
                                                                {sub}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </aside>
                )}

                {/* ── PRODUCTS GRID ── */}
                <div className="flex-1 min-w-0">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white text-zinc-600 text-sm hover:border-brand-blue hover:text-brand-blue transition-all"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            {sidebarOpen ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                        </button>
                        <span className="text-sm text-zinc-500">
                            Hiển thị <strong className="text-zinc-800">{filtered.length}</strong> sản phẩm
                        </span>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white border border-gray-100 animate-pulse">
                                    <div className="aspect-square bg-gray-200" />
                                    <div className="p-4 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded" />
                                        <div className="h-3 bg-gray-100 rounded w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-24 text-zinc-400">
                            <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p className="font-semibold">Không tìm thấy sản phẩm nào</p>
                            <p className="text-sm">Thử thay đổi bộ lọc hoặc từ khoá tìm kiếm</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filtered.map(product => (
                                <div
                                    key={product.id}
                                    className="group bg-white border border-gray-200 hover:border-brand-blue/50 hover:shadow-lg transition-all duration-300 flex flex-col"
                                >
                                    <div className="relative overflow-hidden aspect-square bg-gray-50">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            referrerPolicy="no-referrer"
                                        />
                                        <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/5 transition-colors" />
                                        {product.stock < 5 && (
                                            <div className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-black uppercase px-2 py-0.5">
                                                Sắp hết
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-brand-blue mb-1">{product.category}</span>
                                        <h3 className="font-bold text-zinc-800 text-sm leading-snug mb-2 flex-1 line-clamp-2">{product.name}</h3>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-brand-blue font-black text-base">
                                                {product.price.toLocaleString('vi-VN')}₫
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className={`w-full mt-3 py-2.5 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${addedId === product.id
                                                ? 'bg-green-500 text-white'
                                                : 'bg-brand-blue text-white hover:bg-blue-700 active:scale-95'
                                                }`}
                                        >
                                            {addedId === product.id ? (
                                                <>
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                    </svg>
                                                    Đã thêm
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="w-3.5 h-3.5" /> Thêm vào giỏ
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductsPage;
