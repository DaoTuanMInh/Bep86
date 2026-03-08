import { ChevronRight, PlayCircle } from 'lucide-react';

interface VideoSectionProps {
    onNavigate?: (page: string) => void;
}

const videos = [
    { title: 'Hướng dẫn sử dụng Tủ Nấu Cơm Gas Bếp 86', label: 'Hướng dẫn', img: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&auto=format&fit=crop' },
    { title: 'Review Tủ Sấy Bát FUSHIMAVINA – Diệt khuẩn Ozone', label: 'Review', img: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=800&auto=format&fit=crop' },
    { title: 'Lắp đặt Bàn Lạnh Inox tại nhà hàng khách sạn', label: 'Lắp đặt', img: 'https://images.unsplash.com/photo-1556910103-1c02745a8e32?q=80&w=800&auto=format&fit=crop' },
    { title: 'Tủ Mát Công Nghiệp 2 Cánh – Demo thực tế', label: 'Demo', img: 'https://images.unsplash.com/photo-1582285321526-af62f3f4e3c3?q=80&w=800&auto=format&fit=crop' },
    { title: 'So sánh Tủ Nấu Cơm Gas và Điện', label: 'So sánh', img: 'https://images.unsplash.com/photo-1616212177435-0811e51fcd81?q=80&w=800&auto=format&fit=crop' },
];

const VideoSection = ({ onNavigate }: VideoSectionProps) => (
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
                    <div className="inline-block bg-brand-red text-white text-xs font-black px-3 py-1 uppercase tracking-widest mb-3">Thư viện truyền thông</div>
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Trải Nghiệm Thực Tế</h2>
                </div>
                <button
                    onClick={() => onNavigate?.('video')}
                    className="group bg-white/10 hover:bg-white text-white hover:text-zinc-900 font-bold px-6 py-3 transition-all flex items-center gap-2 border border-white/20"
                >
                    Xem tất cả video <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Featured Video - Large Size */}
                <div className="lg:col-span-8 group cursor-pointer relative h-[300px] md:h-[450px] lg:h-[500px] bg-zinc-800 overflow-hidden border border-zinc-800 shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop"
                        alt="Featured Video"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                    {/* Play Button Center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-brand-red/90 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)] group-hover:scale-110 group-hover:bg-brand-red transition-all duration-300 backdrop-blur-sm">
                            <PlayCircle className="w-10 h-10 ml-1" />
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                        <div className="inline-block bg-brand-blue text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-3">Video nổi bật</div>
                        <h3 className="text-white font-black text-2xl md:text-3xl leading-tight mb-2 group-hover:text-brand-red transition-colors">Quy trình sản xuất thiết bị bếp inox tiêu chuẩn</h3>
                        <p className="text-zinc-300 text-sm md:text-base line-clamp-2 max-w-2xl">Khám phá chi tiết dây chuyền sản xuất đồng bộ và hiện đại tại nhà máy Bếp 86 với các thiết bị từ Tủ nấu cơm, Bếp từ công nghiệp đến Hệ thống lạnh.</p>
                    </div>
                </div>

                {/* Smaller Videos List */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    {videos.slice(0, 4).map((v, i) => (
                        <div key={i} className="group cursor-pointer flex gap-4 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 hover:border-zinc-600 transition-colors p-3 items-center h-[115px]">
                            <div className="w-32 h-full relative overflow-hidden flex-shrink-0">
                                <img src={v.img} alt={v.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/40 group-hover:bg-brand-red group-hover:border-brand-red transition-all">
                                        <PlayCircle className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 py-1">
                                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1 block">{v.label}</span>
                                <h4 className="text-white font-bold text-sm leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors">{v.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default VideoSection;
