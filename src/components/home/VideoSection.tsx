import { useState, useEffect } from 'react';
import { ChevronRight, PlayCircle, Plus } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

interface VideoItem {
    id: string;
    youtubeId: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    featured: boolean;
}

interface VideoSectionProps {
    onNavigate?: (page: string) => void;
}

const TOTAL_SIDE_SLOTS = 4;

const VideoSection = ({ onNavigate }: VideoSectionProps) => {
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const { isAdmin } = useAdmin();

    useEffect(() => {
        fetch('/api/videos')
            .then(r => r.json())
            .then(data => { if (Array.isArray(data)) setVideos(data); })
            .catch(() => { });
    }, []);

    // Sort: featured first
    const sorted = [...videos].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    const featured = sorted[0] || null;
    const sideVideos = sorted.slice(1, 1 + TOTAL_SIDE_SLOTS);
    const emptySlots = TOTAL_SIDE_SLOTS - sideVideos.length;

    return (
        <section className="bg-zinc-900 py-20 px-6 relative overflow-hidden">
            {/* Background Decorative Pattern */}
            <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
                <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
                    <defs><pattern id="video-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="4" height="4" fill="currentColor"></rect></pattern></defs>
                    <rect width="404" height="384" fill="url(#video-pattern)"></rect>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
                    <div>
                        <div data-cms-key="video-section-tag" className="inline-block bg-brand-red text-white text-xs font-black px-3 py-1 uppercase tracking-widest mb-3">Thư viện truyền thông</div>
                        <h2 data-cms-key="video-section-title" className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Trải Nghiệm Thực Tế</h2>
                    </div>
                    <button
                        onClick={() => onNavigate?.('video')}
                        className="group bg-white/10 hover:bg-white text-white hover:text-zinc-900 font-bold px-6 py-3 transition-all flex items-center gap-2 border border-white/20"
                    >
                        Xem tất cả video <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Featured Video */}
                    <div
                        className="lg:col-span-8 group cursor-pointer relative h-[300px] md:h-[450px] lg:h-[500px] bg-zinc-800 overflow-hidden border border-zinc-800 shadow-2xl"
                        onClick={() => featured && window.open(`https://www.youtube.com/watch?v=${featured.youtubeId}`, '_blank')}
                    >
                        {featured ? (
                            <>
                                <img
                                    data-no-edit
                                    src={`https://img.youtube.com/vi/${featured.youtubeId}/maxresdefault.jpg`}
                                    alt={featured.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                                    onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${featured.youtubeId}/hqdefault.jpg`; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 bg-brand-red/90 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)] group-hover:scale-110 group-hover:bg-brand-red transition-all duration-300 backdrop-blur-sm">
                                        <PlayCircle className="w-10 h-10 ml-1" />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20" data-no-edit>
                                    <div className="inline-block bg-brand-blue text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-3">{featured.category}</div>
                                    <h3 className="text-white font-black text-2xl md:text-3xl leading-tight mb-2 group-hover:text-brand-red transition-colors">{featured.title}</h3>
                                    <p className="text-zinc-300 text-sm md:text-base line-clamp-2 max-w-2xl">{featured.description}</p>
                                </div>
                            </>
                        ) : (
                            /* No featured video yet — show add prompt */
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                                <div className="w-20 h-20 rounded-full border-2 border-dashed border-zinc-600 flex items-center justify-center mb-4 text-zinc-500">
                                    <Plus className="w-10 h-10" />
                                </div>
                                <p className="text-zinc-400 font-bold mb-2">Chưa có video nổi bật</p>
                                <button
                                    onClick={e => { e.stopPropagation(); onNavigate?.('video'); }}
                                    className="bg-brand-blue text-white text-xs font-bold px-4 py-2 rounded hover:opacity-90 transition"
                                >
                                    + Thêm video từ trang Quản trị
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Side Videos */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {sideVideos.map((v) => (
                            <div
                                key={v.id}
                                className="group cursor-pointer flex gap-4 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 hover:border-zinc-600 transition-colors p-3 items-center h-[115px]"
                                onClick={() => window.open(`https://www.youtube.com/watch?v=${v.youtubeId}`, '_blank')}
                            >
                                <div className="w-32 h-full relative overflow-hidden flex-shrink-0">
                                    <img
                                        data-no-edit
                                        src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                                        alt={v.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/40 group-hover:bg-brand-red group-hover:border-brand-red transition-all">
                                            <PlayCircle className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 py-1" data-no-edit>
                                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1 block">{v.category}</span>
                                    <h4 className="text-white font-bold text-sm leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors">{v.title}</h4>
                                    {v.duration && <span className="text-zinc-500 text-[10px] mt-1 block">{v.duration}</span>}
                                </div>
                            </div>
                        ))}

                        {/* Empty slots - only visible in admin mode */}
                        {isAdmin && Array.from({ length: emptySlots }).map((_, i) => (
                            <div
                                key={`empty-${i}`}
                                className="group cursor-pointer flex gap-4 bg-zinc-800/20 hover:bg-zinc-800/40 border border-dashed border-zinc-700 transition-colors p-3 items-center h-[115px]"
                                onClick={() => onNavigate?.('video')}
                            >
                                <div className="w-32 h-full flex-shrink-0 flex items-center justify-center border border-dashed border-zinc-700 rounded">
                                    <Plus className="w-6 h-6 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-zinc-600 group-hover:text-zinc-400 text-xs font-medium transition-colors">Ô trống · Bấm để thêm video</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
