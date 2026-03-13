import React, { useState, useEffect } from 'react';
import { Play, X, Clock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Footer from '../components/layout/Footer';

export interface Video {
    id: string;
    youtubeId: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    featured?: boolean;
}

const VideoPage = () => {
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
    const [videos, setVideos] = useState<Video[]>([]);
    const videoCategories = Array.from(new Set(videos.map(v => v.category)));

    useEffect(() => {
        fetch('/api/videos')
            .then(r => r.json())
            .then(data => setVideos(data))
            .catch(() => setVideos([]));
    }, []);

    const filtered = activeCategory === 'Tất cả'
        ? videos
        : videos.filter(v => v.category === activeCategory);

    const featured = videos.find(v => v.featured);
    const rest = filtered.filter(v => activeCategory === 'Tất cả' ? v.id !== featured?.id : true);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
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
                    data-cms-key="hero-video-bg"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000")',
                    }}
                />
                <div className="absolute inset-0 z-1 bg-gradient-to-b from-transparent to-zinc-900/60 pointer-events-none" />

                <div className="relative z-10 max-w-6xl mx-auto px-6 py-14 text-center pointer-events-none">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 drop-shadow-2xl pointer-events-auto"
                        data-cms-key="video-hero-title"
                    >
                        Kênh <span className="text-yellow-400">Video</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-slate-300 text-lg md:text-xl max-w-xl mx-auto font-medium pointer-events-auto"
                        data-cms-key="video-hero-desc"
                    >
                        Hướng dẫn sử dụng, review sản phẩm và quy trình sản xuất thiết bị bếp Bếp 86
                    </motion.p>
                </div>
            </div>

            {/* ── CATEGORY FILTER ── */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 flex items-center gap-1 overflow-x-auto py-4 scrollbar-hide">
                    {videoCategories.map(cat => (
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

            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* ── FEATURED VIDEO ── */}
                {activeCategory === 'Tất cả' && featured && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-zinc-800 font-black text-lg uppercase tracking-wider mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-6 bg-brand-blue rounded-full inline-block" />
                            Video Nổi Bật
                        </h2>
                        <div
                            className="relative overflow-hidden cursor-pointer group shadow-2xl rounded-2xl"
                            onClick={() => setPlayingVideo(featured)}
                        >
                            <div className="aspect-video bg-zinc-200">
                                <img
                                    src={`https://img.youtube.com/vi/${featured.youtubeId}/maxresdefault.jpg`}
                                    alt={featured.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${featured.youtubeId}/hqdefault.jpg`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-24 h-24 rounded-full bg-brand-blue flex items-center justify-center shadow-[0_0_30px_rgba(31,115,183,0.5)] transition-all"
                                >
                                    <Play className="w-10 h-10 text-white ml-1.5" fill="currentColor" />
                                </motion.div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-10">
                                <span className="inline-block bg-brand-blue text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-lg mb-4 tracking-[0.2em] shadow-lg">
                                    {featured.category}
                                </span>
                                <h3 className="text-white font-black text-2xl md:text-4xl leading-tight mb-3 drop-shadow-xl">
                                    {featured.title}
                                </h3>
                                <p className="text-zinc-300 text-lg max-w-3xl line-clamp-2">{featured.description}</p>
                                <span className="flex items-center gap-2 mt-4 text-zinc-400 font-bold uppercase tracking-widest text-[10px]">
                                    <Clock className="w-3.5 h-3.5" /> {featured.duration}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ── VIDEO GRID ── */}
                <div className="mt-8">
                    <h2 className="text-zinc-800 font-black text-lg uppercase tracking-wider mb-8 flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-brand-blue rounded-full inline-block" />
                        {activeCategory === 'Tất cả' ? 'Tất Cả Video' : activeCategory}
                        <span className="text-zinc-400 font-normal text-sm normal-case ml-2">({rest.length} video)</span>
                    </h2>

                    {rest.length === 0 ? (
                        <div className="text-center py-24 text-zinc-400 bg-white border border-dashed border-zinc-200 rounded-2xl">
                            <Play className="w-16 h-16 mx-auto mb-4 opacity-10" />
                            <p className="font-medium">Chưa có video trong danh mục này</p>
                        </div>
                    ) : (
                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {rest.map(video => (
                                <motion.div
                                    variants={item}
                                    key={video.id}
                                    onClick={() => setPlayingVideo(video)}
                                    className="group cursor-pointer bg-white overflow-hidden border border-zinc-100 hover:border-brand-blue/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl rounded-2xl"
                                >
                                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                                        <img
                                            src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                                            alt={video.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 shadow-xl scale-90 group-hover:scale-100">
                                                <Play className="w-6 h-6 text-brand-blue group-hover:text-white ml-0.5" fill="currentColor" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-black px-2 py-1 rounded">
                                            {video.duration}
                                        </div>
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-brand-blue text-white text-[9px] font-black uppercase px-2 py-1 rounded-md shadow-lg">
                                                {video.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-zinc-800 font-bold text-sm leading-tight line-clamp-2 group-hover:text-brand-blue transition-colors mb-3">
                                            {video.title}
                                        </h3>
                                        <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed mb-4">
                                            {video.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-brand-blue text-[10px] font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                            Xem ngay <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>

            <Footer />

            {/* ── VIDEO MODAL ── */}
            <AnimatePresence>
                {playingVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-zinc-950/90 backdrop-blur-md p-4 md:p-10"
                        onClick={(e) => { if (e.target === e.currentTarget) setPlayingVideo(null); }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className="w-full max-w-5xl bg-white overflow-hidden shadow-2xl rounded-3xl"
                        >
                            <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100">
                                <div className="flex-1 pr-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-brand-blue text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shadow-sm">
                                            {playingVideo.category}
                                        </span>
                                        <span className="text-zinc-400 text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider">
                                            <Clock className="w-4 h-4" /> {playingVideo.duration}
                                        </span>
                                    </div>
                                    <h3 className="text-zinc-900 font-black text-lg md:text-xl leading-snug">{playingVideo.title}</h3>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setPlayingVideo(null)}
                                    className="w-12 h-12 rounded-full bg-zinc-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors flex-shrink-0"
                                >
                                    <X className="w-6 h-6" />
                                </motion.button>
                            </div>
                            <div className="aspect-video bg-black">
                                <iframe
                                    src={`https://www.youtube.com/embed/${playingVideo.youtubeId}?autoplay=1&rel=0`}
                                    title={playingVideo.title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="p-6 md:p-8 bg-zinc-50">
                                <p className="text-zinc-600 text-base leading-relaxed">{playingVideo.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VideoPage;
