import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroSlides = [
    {
        img: '/slide.png',
        alt: 'Công ty CP Thiết Bị Bếp 86 Việt – Tủ Nấu Cơm, Tủ Lạnh Công Nghiệp',
    },
    {
        img: '/Untitled-1.png',
        alt: 'Bếp 86 – Dịch Vụ Uy Tín, Sản Phẩm Chất Lượng, Hỗ Trợ Nhiệt Tình',
    },
    {
        img: null,
        alt: 'Bếp 86 – Tủ Mát Công Nghiệp',
        fallback: {
            tag: 'BẢO QUẢN CHUYÊN NGHIỆP',
            title: 'TỦ MÁT – TỦ ĐÔNG',
            subtitle: 'CÔNG NGHIỆP',
            desc: 'Bảo quản thực phẩm tươi sống – Làm lạnh nhanh, tiết kiệm điện năng tối ưu',
            badge: { label: 'BÁN CHẠY', name: 'TỦ MÁT 2 CÁNH', sub: 'INOX CAO CẤP', discount: 'GIẢM ĐẾN 10%' },
            from: '#0057b8', to: '#003d8a',
            productImg: 'https://picsum.photos/seed/ref2/600/500',
        }
    },
];

const Hero = () => {
    const [current, setCurrent] = React.useState(0);
    const [animating, setAnimating] = React.useState(false);
    const total = heroSlides.length;

    const goTo = (idx: number) => {
        if (animating) return;
        setAnimating(true);
        setTimeout(() => {
            setCurrent((idx + total) % total);
            setAnimating(false);
        }, 350);
    };

    React.useEffect(() => {
        const timer = setInterval(() => goTo(current + 1), 5500);
        return () => clearInterval(timer);
    }, [current]);

    const slide = heroSlides[current];

    return (
        <section className="relative overflow-hidden bg-black" style={{ height: '520px' }}>
            {/* Slide content */}
            <div
                style={{
                    opacity: animating ? 0 : 1,
                    transform: animating ? 'translateX(40px)' : 'translateX(0)',
                    transition: 'opacity 0.35s ease, transform 0.35s ease',
                    height: '100%',
                }}
            >
                {slide.img ? (
                    <img
                        key={current}
                        src={slide.img}
                        alt={slide.alt}
                        className="w-full h-full object-cover object-center"
                    />
                ) : slide.fallback ? (
                    <div
                        className="relative h-full flex items-center"
                        style={{ background: `linear-gradient(135deg, ${slide.fallback.from} 0%, ${slide.fallback.to} 100%)` }}
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(30%,-30%)' }} />
                        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="text-white max-w-xl flex-1">
                                <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-black uppercase px-3 py-1 rounded-full mb-4 tracking-widest">{slide.fallback.tag}</span>
                                <h1 className="text-5xl md:text-6xl font-black mb-1 leading-tight">{slide.fallback.title}</h1>
                                <h2 className="text-3xl md:text-4xl font-black text-yellow-400 mb-4">{slide.fallback.subtitle}</h2>
                                <p className="text-base opacity-85 mb-8 leading-relaxed max-w-md">{slide.fallback.desc}</p>
                                <button className="bg-brand-red text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl">Xem sản phẩm</button>
                            </div>
                            <div className="relative flex-shrink-0">
                                <div className="w-72 h-64 md:w-96 md:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                                    <img src={slide.fallback.productImg} alt={slide.fallback.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-brand-red p-4 rounded-2xl shadow-2xl text-white transform rotate-3 min-w-[150px]">
                                    <p className="text-[9px] font-bold uppercase tracking-widest mb-1">{slide.fallback.badge.label}</p>
                                    <h3 className="text-sm font-black mb-0.5">{slide.fallback.badge.name}</h3>
                                    <p className="text-[9px] font-bold mb-2 opacity-80">{slide.fallback.badge.sub}</p>
                                    <div className="bg-yellow-400 text-brand-red font-black px-2 py-1 rounded-md text-xs inline-block">{slide.fallback.badge.discount}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>

            {/* Prev / Next arrows */}
            <button
                onClick={() => goTo(current - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 p-3 rounded-full transition-all z-20 backdrop-blur-sm"
            >
                <ChevronLeft className="text-white w-6 h-6" />
            </button>
            <button
                onClick={() => goTo(current + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 p-3 rounded-full transition-all z-20 backdrop-blur-sm"
            >
                <ChevronRight className="text-white w-6 h-6" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {heroSlides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
