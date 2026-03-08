import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { newsPosts, newsCategories, NewsPost } from '../data/news';
import Footer from '../components/layout/Footer';

interface TinTucPageProps {
    onOpenPost: (post: NewsPost) => void;
}

const TinTucPage = ({ onOpenPost }: TinTucPageProps) => {
    const [activeCategory, setActiveCategory] = useState('Tất cả');

    const filtered = activeCategory === 'Tất cả'
        ? newsPosts
        : newsPosts.filter(p => p.category === activeCategory);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ── HERO ── */}
            <div
                className="relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0f4c75 0%, #1b262c 60%, #16213e 100%)', minHeight: 260 }}
            >
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-white/10" />
                <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full border border-white/10" />
                <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 text-center">
                    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-3">
                        Tin Tức <span className="text-yellow-400">&amp; Hỗ Trợ</span>
                    </h1>
                    <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto">
                        Cập nhật kiến thức sử dụng thiết bị bếp, hướng dẫn kỹ thuật và tin tức mới nhất từ Bếp 86
                    </p>
                </div>
            </div>

            {/* ── FILTER CATEGORIES ── */}
            <div className="bg-white border-b border-zinc-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 flex gap-1 overflow-x-auto py-3">
                    {newsCategories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                                ? 'bg-brand-blue text-white shadow'
                                : 'text-zinc-500 hover:text-brand-blue hover:bg-blue-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── GRID BÀI VIẾT ── */}
            <section className="py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <p className="text-zinc-400 text-sm mb-8">Hiển thị {filtered.length} bài viết</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filtered.map(post => (
                            <article
                                key={post.id}
                                onClick={() => onOpenPost(post)}
                                className="bg-white border border-zinc-100 rounded-none overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1"
                            >
                                {/* Ảnh */}
                                <div className="relative h-44 overflow-hidden bg-zinc-100">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-brand-blue text-white text-[10px] font-bold uppercase px-2 py-1 rounded-none">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Nội dung */}
                                <div className="p-4">
                                    <div className="flex items-center gap-2 text-zinc-400 text-xs mb-2">
                                        <span>{post.date}</span>
                                        <span>·</span>
                                        <span>{post.readTime} phút đọc</span>
                                    </div>
                                    <h2 className="font-bold text-sm text-zinc-800 leading-snug mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-zinc-400 text-xs leading-relaxed mb-3 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <span className="text-brand-blue text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Xem chi tiết <ChevronRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default TinTucPage;
