import React, { useState, useEffect } from 'react';
import { Play, X, Clock, ChevronRight } from 'lucide-react';
import { videoCategories, Video } from '../data/videos';
import Footer from '../components/layout/Footer';

const VideoPage = () => {
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
    const [videos, setVideos] = useState<Video[]>([]);

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
    const rest = filtered.filter(v => !v.featured || activeCategory !== 'Tất cả');

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ── HERO ── */}
            <div
                className="relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0f4c75 0%, #1b262c 60%, #16213e 100%)', minHeight: 220 }}
            >
                <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full border border-white/5" />
                <div className="absolute -top-8 -right-8 w-64 h-64 rounded-full border border-white/5" />

                <div className="relative z-10 max-w-6xl mx-auto px-6 py-14 text-center">
                    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-3">
                        Kênh <span className="text-yellow-400">Video</span>
                    </h1>
                    <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto">
                        Hướng dẫn sử dụng, review sản phẩm và quy trình sản xuất thiết bị bếp Bếp 86
                    </p>
                </div>
            </div>

            {/* ── CATEGORY FILTER ── */}
            <div className="bg-white border-b border-gray-200 sticky top-[48px] z-40 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 flex gap-1 overflow-x-auto py-3">
                    {videoCategories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                                ? 'bg-brand-blue text-white shadow'
                                : 'text-zinc-500 hover:text-brand-blue hover:bg-blue-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* ── FEATURED VIDEO ── */}
                {activeCategory === 'Tất cả' && featured && (
                    <div className="mb-10">
                        <h2 className="text-zinc-800 font-black text-base uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="w-1 h-5 bg-brand-blue rounded-full inline-block" />
                            Video Nổi Bật
                        </h2>
                        <div
                            className="relative overflow-hidden cursor-pointer group shadow-lg"
                            onClick={() => setPlayingVideo(featured)}
                        >
                            <div className="aspect-video bg-zinc-200">
                                <img
                                    src={`https://img.youtube.com/vi/${featured.youtubeId}/maxresdefault.jpg`}
                                    alt={featured.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${featured.youtubeId}/hqdefault.jpg`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-brand-blue flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-9 h-9 text-white ml-1" fill="currentColor" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <span className="inline-block bg-brand-blue text-white text-[10px] font-black uppercase px-3 py-1 rounded mb-2 tracking-widest">
                                    {featured.category}
                                </span>
                                <h3 className="text-white font-black text-xl md:text-2xl leading-tight mb-1 drop-shadow">
                                    {featured.title}
                                </h3>
                                <p className="text-zinc-300 text-sm max-w-2xl">{featured.description}</p>
                                <span className="flex items-center gap-1 mt-2 text-zinc-400 text-xs">
                                    <Clock className="w-3 h-3" /> {featured.duration}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── VIDEO GRID ── */}
                <div>
                    <h2 className="text-zinc-800 font-black text-base uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="w-1 h-5 bg-brand-blue rounded-full inline-block" />
                        {activeCategory === 'Tất cả' ? 'Tất Cả Video' : activeCategory}
                        <span className="text-zinc-400 font-normal text-sm normal-case ml-1">({rest.length} video)</span>
                    </h2>

                    {rest.length === 0 ? (
                        <div className="text-center py-20 text-zinc-400">
                            <Play className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>Chưa có video trong danh mục này</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {rest.map(video => (
                                <div
                                    key={video.id}
                                    onClick={() => setPlayingVideo(video)}
                                    className="group cursor-pointer bg-white overflow-hidden border border-gray-200 hover:border-brand-blue/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                                        <img
                                            src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                                            alt={video.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-brand-blue transition-all duration-300 shadow">
                                                <Play className="w-5 h-5 text-brand-blue group-hover:text-white ml-0.5" fill="currentColor" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                            {video.duration}
                                        </div>
                                        <div className="absolute top-2 left-2">
                                            <span className="bg-brand-blue text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                                                {video.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-zinc-800 font-bold text-sm leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors mb-2">
                                            {video.title}
                                        </h3>
                                        <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                                            {video.description}
                                        </p>
                                        <div className="flex items-center gap-1 mt-3 text-brand-blue text-xs font-bold">
                                            Xem ngay <ChevronRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />

            {/* ── VIDEO MODAL ── */}
            {playingVideo && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={(e) => { if (e.target === e.currentTarget) setPlayingVideo(null); }}
                >
                    <div className="w-full max-w-4xl bg-white overflow-hidden shadow-2xl">
                        <div className="flex items-start justify-between p-4 border-b border-gray-200">
                            <div className="flex-1 pr-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-brand-blue text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                                        {playingVideo.category}
                                    </span>
                                    <span className="text-zinc-500 text-xs flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {playingVideo.duration}
                                    </span>
                                </div>
                                <h3 className="text-zinc-800 font-bold text-base leading-snug">{playingVideo.title}</h3>
                            </div>
                            <button
                                onClick={() => setPlayingVideo(null)}
                                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-colors flex-shrink-0"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="aspect-video bg-gray-100">
                            <iframe
                                src={`https://www.youtube.com/embed/${playingVideo.youtubeId}?autoplay=1&rel=0`}
                                title={playingVideo.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div className="p-4 border-t border-gray-200">
                            <p className="text-zinc-500 text-sm">{playingVideo.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPage;
