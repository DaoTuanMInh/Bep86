import React, { useState } from 'react';
import { ChevronRight, Calendar, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import Footer from '../components/layout/Footer';
import { NewsPost } from '../types';

interface TinTucPageProps {
    newsPosts: NewsPost[];
    onOpenPost: (post: NewsPost) => void;
}

const TinTucPage = ({ newsPosts, onOpenPost }: TinTucPageProps) => {
    const [activeCategory, setActiveCategory] = useState('Tất cả');

    const newsCategories = Array.from(new Set(newsPosts.map(p => p.category)));

    const filtered = activeCategory === 'Tất cả'
        ? newsPosts
        : newsPosts.filter((p: NewsPost) => p.category === activeCategory);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">

            {/* ── HERO ── */}
            <div className="relative overflow-hidden min-h-[400px] flex items-center justify-center bg-zinc-900">
                {/* Background Image with Overlay */}
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
                    data-cms-key="hero-news-bg"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1495020689067-958852a7735e?auto=format&fit=crop&q=80&w=2000")',
                    }}
                />
                <div className="absolute inset-0 z-1 bg-gradient-to-b from-transparent to-zinc-900/60 pointer-events-none" />

                <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 text-center pointer-events-none">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 drop-shadow-2xl pointer-events-auto"
                        data-cms-key="news-hero-title"
                    >
                        Tin Tức <span className="text-yellow-400">&</span> Sự Kiện
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-slate-300 text-lg md:text-xl max-w-xl mx-auto font-medium pointer-events-auto"
                        data-cms-key="news-hero-desc"
                    >
                        Cập nhật những tin mới nhất về thị trường thiết bị bếp và các hoạt động của Bếp 86
                    </motion.p>
                </div>
            </div>

            {/* ── FILTER CATEGORIES ── */}
            <div className="bg-white border-b border-zinc-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 flex items-center gap-1 overflow-x-auto py-4 scrollbar-hide">
                    {newsCategories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                                ? 'bg-brand-blue text-white shadow-lg scale-105'
                                : 'text-zinc-500 hover:text-brand-blue hover:bg-blue-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── GRID BÀI VIẾT ── */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-zinc-400 text-sm mb-10 font-bold uppercase tracking-widest"
                    >
                        Hiển thị {filtered.length} bài viết
                    </motion.p>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {filtered.map(post => (
                            <motion.article
                                variants={item}
                                key={post.id}
                                onClick={() => onOpenPost(post)}
                                className="bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer rounded-2xl border border-zinc-100"
                            >
                                {/* Ảnh */}
                                <div className="relative h-52 overflow-hidden bg-zinc-100">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-brand-blue text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shadow-lg">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Nội dung */}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-zinc-400 text-xs mb-4">
                                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime} phút</span>
                                    </div>
                                    <h2 className="font-bold text-base text-zinc-800 leading-tight mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-brand-blue text-xs font-black uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                                            Xem chi tiết <ChevronRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default TinTucPage;
