import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ShoppingCart, CheckCircle, Search, ArrowUpDown } from 'lucide-react';
import { Product } from '../types';
import { api } from '../services/api';
import { menuCategories } from '../data/categories';
import { getCategoryContent } from '../data/categoryContent';
import Footer from '../components/layout/Footer';

interface CategoryPageProps {
    categoryName: string;
    subCategoryName?: string;
    onAddToCart?: (product: Product) => void;
    onNavigate?: (page: string, cat?: string, sub?: string) => void;
    onNavigateToCategory?: (category: string, subCategory?: string) => void;
}

type SortKey = 'default' | 'price_asc' | 'price_desc' | 'bestseller' | 'newest';

const CategoryPage = ({ categoryName, subCategoryName, onAddToCart, onNavigate, onNavigateToCategory }: CategoryPageProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [addedId, setAddedId] = useState<number | null>(null);
    const [activeSub, setActiveSub] = useState(subCategoryName || '');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<SortKey>('default');
    const [expandedCats, setExpandedCats] = useState<string[]>([categoryName]);

    const content = getCategoryContent(categoryName);
    const catObj = menuCategories.find(c => c.name === categoryName);

    // Đưa danh mục đang active lên đầu sidebar
    const sortedCategories = useMemo(() => {
        const active = menuCategories.find(c => c.name === categoryName);
        const rest = menuCategories.filter(c => c.name !== categoryName);
        return active ? [active, ...rest] : menuCategories;
    }, [categoryName]);

    useEffect(() => {
        setLoading(true);
        api.getProducts()
            .then(all => {
                setProducts(all.filter(p => p.category === categoryName));
                setLoading(false);
            });

        // Luôn mở danh mục đang chọn
        setExpandedCats(prev => prev.includes(categoryName) ? prev : [...prev, categoryName]);
    }, [categoryName]);

    useEffect(() => {
        setActiveSub(subCategoryName || '');
    }, [subCategoryName]);

    const filteredProducts = useMemo(() => {
        let list = activeSub
            ? products.filter(p => p.subCategory === activeSub || p.name.toLowerCase().includes(activeSub.toLowerCase()))
            : products;

        if (search.trim()) {
            list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        }

        switch (sort) {
            case 'price_asc': return [...list].sort((a, b) => a.price - b.price);
            case 'price_desc': return [...list].sort((a, b) => b.price - a.price);
            case 'bestseller': return [...list].sort((a, b) => (b.stock < 5 ? 1 : 0) - (a.stock < 5 ? 1 : 0));
            case 'newest': return [...list].sort((a, b) => b.id - a.id);
            default: return list;
        }
    }, [products, activeSub, search, sort]);

    const handleAddToCart = (p: Product) => {
        onAddToCart?.(p);
        setAddedId(p.id);
        setTimeout(() => setAddedId(null), 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ── HERO ── */}
            <div className="relative overflow-hidden" style={{ minHeight: 220 }}>
                {content?.heroImage && (
                    <img src={content.heroImage} alt={categoryName} className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="header-gradient absolute inset-0 opacity-90" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">
                    <nav className="flex items-center gap-1.5 text-xs text-slate-300 mb-4">
                        <span className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate?.('home')}>Trang chủ</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate?.('products')}>Sản phẩm</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-yellow-400 font-semibold">{categoryName}</span>
                        {activeSub && <><ChevronRight className="w-3 h-3" /><span className="text-yellow-300">{activeSub}</span></>}
                    </nav>
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{activeSub || categoryName}</h1>
                    {content && <p className="text-slate-300 text-sm max-w-2xl">{content.tagline}</p>}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8 items-start">

                {/* ── SIDEBAR ── */}
                <aside className="w-60 flex-shrink-0">
                    <div className="bg-white border border-gray-200 overflow-hidden">
                        <div className="header-gradient px-4 py-3 border-b border-white/10">
                            <span className="text-white text-[10px] font-black uppercase tracking-widest">Danh mục sản phẩm</span>
                        </div>
                        <ul>
                            {sortedCategories.map(cat => {
                                const isCurrentCat = cat.name === categoryName;
                                const isExpanded = expandedCats.includes(cat.name);
                                return (
                                    <li key={cat.name}>
                                        <div className={`w-full flex items-center justify-between border-b border-gray-100 transition-all ${isCurrentCat ? 'bg-brand-blue text-white' : 'text-zinc-700 hover:bg-blue-50 hover:text-brand-blue'}`}>
                                            <button
                                                onClick={() => onNavigateToCategory?.(cat.name)}
                                                className="flex-1 text-left px-4 py-3 text-xs font-semibold focus:outline-none"
                                            >
                                                {cat.name}
                                            </button>
                                            {cat.sub.length > 0 && (
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setExpandedCats(prev => prev.includes(cat.name) ? prev.filter(c => c !== cat.name) : [...prev, cat.name]);
                                                    }}
                                                    className="px-4 py-3 flex-shrink-0 focus:outline-none"
                                                >
                                                    <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''} ${isCurrentCat ? 'text-white' : 'text-zinc-400 hover:text-brand-blue'}`} />
                                                </button>
                                            )}
                                        </div>
                                        {/* Subcategories */}
                                        {isExpanded && cat.sub.length > 0 && (
                                            <ul className="border-b border-gray-100">
                                                <li>
                                                    <button
                                                        onClick={() => {
                                                            if (!isCurrentCat) onNavigateToCategory?.(cat.name, '');
                                                            else setActiveSub('');
                                                        }}
                                                        className={`w-full text-left pl-7 pr-4 py-2 text-xs transition-all ${(isCurrentCat && activeSub === '') ? 'text-brand-blue font-bold bg-blue-50' : 'text-zinc-500 hover:text-brand-blue hover:bg-blue-50'}`}
                                                    >
                                                        — Giới thiệu
                                                    </button>
                                                </li>
                                                {cat.sub.map(sub => (
                                                    <li key={sub}>
                                                        <button
                                                            onClick={() => {
                                                                if (!isCurrentCat) onNavigateToCategory?.(cat.name, sub);
                                                                else setActiveSub(sub === activeSub ? '' : sub);
                                                            }}
                                                            className={`w-full text-left pl-7 pr-4 py-2 text-xs transition-all ${(isCurrentCat && activeSub === sub) ? 'text-brand-blue font-bold bg-blue-50' : 'text-zinc-500 hover:text-brand-blue hover:bg-blue-50'}`}
                                                        >
                                                            — {sub}
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

                    {/* CTA */}
                    <div className="mt-4 header-gradient p-5 text-white shadow-lg">
                        <p className="font-black text-sm mb-1">Cần tư vấn?</p>
                        <p className="text-blue-100 text-xs mb-3">Gặp chuyên gia ngay hôm nay</p>
                        <a href="tel:0985700057" className="flex items-center gap-2 font-black text-yellow-300 hover:text-yellow-200 text-sm transition-colors">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            0985.700.057
                        </a>
                    </div>
                </aside>

                {/* ── MAIN CONTENT ── */}
                <div className="flex-1 min-w-0">

                    {/* Bài giới thiệu – chỉ hiện khi đang ở mục Giới thiệu (activeSub === '') */}
                    {content && activeSub === '' && (
                        <section className="bg-white border border-gray-200 p-8 mb-8">
                            <div className="flex items-center gap-3 mb-5">
                                <span className="w-1 h-7 bg-brand-blue inline-block flex-shrink-0" />
                                <h2 className="text-xl font-black text-zinc-800 uppercase tracking-wide">
                                    Giới thiệu {categoryName}
                                </h2>
                            </div>

                            <p className="text-zinc-700 text-sm leading-relaxed mb-4 font-medium border-l-4 border-yellow-400 pl-4 bg-yellow-50 py-3 pr-4">
                                {content.intro}
                            </p>
                            {content.body.map((para, i) => (
                                <p key={i} className="text-zinc-600 text-sm leading-relaxed mb-3">
                                    {para}
                                </p>
                            ))}

                            {/* Applications tags */}
                            <div className="mt-5 pt-5 border-t border-gray-100">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mr-3">Phù hợp cho:</span>
                                {content.applications.map(app => (
                                    <span key={app} className="inline-block mr-2 mb-2 px-3 py-1 bg-gray-50 border border-gray-200 text-zinc-600 text-xs font-semibold">
                                        {app}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Search + Sort bar */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Tìm sản phẩm trong danh mục..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 bg-white text-sm outline-none focus:border-brand-blue transition-colors"
                            />
                        </div>
                        {/* Sort */}
                        <div className="relative">
                            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                            <select
                                value={sort}
                                onChange={e => setSort(e.target.value as SortKey)}
                                className="pl-9 pr-8 py-2.5 border border-gray-200 bg-white text-sm text-zinc-600 outline-none focus:border-brand-blue transition-colors appearance-none cursor-pointer min-w-[170px]"
                            >
                                <option value="default">Mặc định</option>
                                <option value="price_asc">Giá: Thấp → Cao</option>
                                <option value="price_desc">Giá: Cao → Thấp</option>
                                <option value="bestseller">Bán chạy nhất</option>
                                <option value="newest">Mới nhất</option>
                            </select>
                        </div>
                    </div>

                    {/* Sản phẩm header */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-1 h-7 bg-yellow-400 inline-block flex-shrink-0" />
                        <h2 className="text-lg font-black text-zinc-800 uppercase tracking-wide">
                            Sản phẩm {activeSub || categoryName}
                        </h2>
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-zinc-400 font-semibold">{filteredProducts.length} sản phẩm</span>
                    </div>

                    {/* Products grid */}
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white border border-gray-100 animate-pulse">
                                    <div className="aspect-square bg-gray-200" />
                                    <div className="p-4 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded" />
                                        <div className="h-3 bg-gray-100 rounded w-2/3" />
                                        <div className="h-8 bg-gray-100 rounded mt-3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center py-20 text-zinc-400 bg-white border border-gray-200">
                            <Search className="w-10 h-10 mx-auto mb-3 opacity-20" />
                            <p className="font-bold text-zinc-500">Chưa có sản phẩm trong mục này</p>
                            <p className="text-sm mt-1">Liên hệ để được tư vấn sản phẩm phù hợp</p>
                            <a href="tel:0985700057" className="inline-block mt-4 px-6 py-2.5 bg-brand-blue text-white text-sm font-bold hover:bg-blue-700 transition-colors">
                                Gọi ngay: 0985.700.057
                            </a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {filteredProducts.map(product => (
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
                                        {product.stock < 5 && (
                                            <div className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-black uppercase px-2 py-0.5">
                                                Sắp hết
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <h3 className="font-bold text-zinc-800 text-sm leading-snug mb-auto line-clamp-2">{product.name}</h3>
                                        <div className="mt-3">
                                            <span className="text-brand-blue font-black text-base block mb-2">
                                                {product.price.toLocaleString('vi-VN')}₫
                                            </span>
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className={`w-full py-2.5 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${addedId === product.id ? 'bg-green-500 text-white' : 'bg-brand-blue text-white hover:bg-blue-700 active:scale-95'}`}
                                            >
                                                {addedId === product.id
                                                    ? <><CheckCircle className="w-3.5 h-3.5" /> Đã thêm</>
                                                    : <><ShoppingCart className="w-3.5 h-3.5" /> Thêm giỏ hàng</>
                                                }
                                            </button>
                                        </div>
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

export default CategoryPage;
