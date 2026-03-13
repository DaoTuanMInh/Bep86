import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

interface Slide {
    img: string | null;
    alt: string;
    fallback?: {
        tag: string;
        title: string;
        subtitle: string;
        desc: string;
        badge: { label: string; name: string; sub: string; discount: string };
        from: string;
        to: string;
        productImg: string;
    }
}

const heroSlides: Slide[] = [
    {
        img: '/slide.png',
        alt: 'Công ty CP Thiết Bị Bếp 86 Việt – Tủ Nấu Cơm, Tủ Lạnh Công Nghiệp',
    },
    {
        img: '/Untitled-1.png',
        alt: 'Bếp 86 – Dịch Vụ Uy Tín, Sản Phẩm Chất Lượng, Hỗ Trợ Nhiệt Tình',
    },
    {
        img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000',
        alt: 'Bếp 86 – Tủ Mát Công Nghiệp',
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

    const { isAdmin } = useAdmin();

    React.useEffect(() => {
        if (isAdmin) return; // Pause slider when in admin mode for easier editing
        const timer = setInterval(() => goTo(current + 1), 5500);
        return () => clearInterval(timer);
    }, [current, isAdmin]);

    const slide = heroSlides[current];

    return (
        <section className="relative overflow-hidden bg-black h-[300px] md:h-[520px]">
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
                        data-cms-key={`hero-slide-${current}`}
                        src={slide.img}
                        alt={slide.alt}
                        className="w-full h-full object-cover object-center"
                    />
                ) : slide.fallback ? (
                    <div className="relative h-full flex items-center">
                        <div 
                            className="absolute inset-0 z-0 bg-cover bg-center"
                            data-cms-key={`hero-slide-bg-${current}`}
                            style={{ background: `linear-gradient(135deg, ${slide.fallback.from} 0%, ${slide.fallback.to} 100%)` }}
                        />
                        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none z-1" style={{ background: 'white', transform: 'translate(30%,-30%)' }} />
                        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-10 pointer-events-none">
                            <div className="text-white max-w-xl flex-1 pointer-events-auto">
                                <span data-cms-key={`hero-slide-tag-${current}`} className="inline-block bg-yellow-400 text-yellow-900 text-xs font-black uppercase px-3 py-1 rounded-full mb-4 tracking-widest">{slide.fallback.tag}</span>
                                <h1 data-cms-key={`hero-slide-title-${current}`} className="text-5xl md:text-6xl font-black mb-1 leading-tight">{slide.fallback.title}</h1>
                                <h2 data-cms-key={`hero-slide-subtitle-${current}`} className="text-3xl md:text-4xl font-black text-yellow-400 mb-4">{slide.fallback.subtitle}</h2>
                                <p data-cms-key={`hero-slide-desc-${current}`} className="text-base opacity-85 mb-8 leading-relaxed max-w-md">{slide.fallback.desc}</p>
                                <button className="bg-brand-red text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl">Xem sản phẩm</button>
                            </div>
                            <div className="relative flex-shrink-0 pointer-events-auto">
                                <div className="w-72 h-64 md:w-96 md:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                                    <img data-cms-key={`hero-slide-product-${current}`} src={slide.fallback.productImg} alt={slide.fallback.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-brand-red p-4 rounded-2xl shadow-2xl text-white transform rotate-3 min-w-[150px] z-20">
                                    <p data-cms-key={`hero-slide-badge-label-${current}`} className="text-[9px] font-bold uppercase tracking-widest mb-1">{slide.fallback.badge.label}</p>
                                    <h3 data-cms-key={`hero-slide-badge-name-${current}`} className="text-sm font-black mb-0.5">{slide.fallback.badge.name}</h3>
                                    <p data-cms-key={`hero-slide-badge-sub-${current}`} className="text-[9px] font-bold mb-2 opacity-80">{slide.fallback.badge.sub}</p>
                                    <div data-cms-key={`hero-slide-badge-discount-${current}`} className="bg-yellow-400 text-brand-red font-black px-2 py-1 rounded-md text-xs inline-block">{slide.fallback.badge.discount}</div>
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
