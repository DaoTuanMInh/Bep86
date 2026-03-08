import React, { useState } from 'react';
import Footer from '../components/layout/Footer';

const branches = [
    {
        region: 'Miền Bắc',
        accent: '#1b6ca8',
        items: [
            { icon: 'map', text: 'Cụm Công Nghiệp, Trường An, An Khánh, Hoài Đức, Hà Nội' },
            { icon: 'phone', text: '0985.700.057 – 0862.662.022', bold: true },
            { icon: 'mail', text: 'truonglinhgroup@gmail.com' },
            { icon: 'web', text: 'thietbibepcongnghieptl.com.vn' },
        ],
    },
    {
        region: 'Miền Trung',
        accent: '#d97706',
        items: [
            { icon: 'map', text: 'Số 18 Nguyễn Đức Cảnh, TP Vinh, Nghệ An' },
            { icon: 'phone', text: '0985.700.057 – 0862.662.022', bold: true },
            { icon: 'mail', text: 'truonglinhgroup@gmail.com' },
        ],
    },
    {
        region: 'Miền Nam',
        accent: '#059669',
        items: [
            { icon: 'map', text: '518 Hương Lộ 2, Bình Tân, TP.HCM' },
            { icon: 'map', text: 'Tân Phước Khánh, Tân Uyên, Bình Dương' },
            { icon: 'map', text: '13 Phạm Văn Bạch, Tân Bình, TP.HCM' },
            { icon: 'phone', text: '0969.150.790 – 0383.833.666', bold: true },
        ],
    },
];

const icons: Record<string, React.ReactElement> = {
    map: (
        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
    ),
    phone: (
        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
    ),
    mail: (
        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
    ),
    web: (
        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
        </svg>
    ),
    clock: (
        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
};

const products = [
    'Tủ Nấu Cơm', 'Bàn Lạnh – Bàn Đông – Bàn Mát', 'Tủ Sấy Bát',
    'Bếp Từ Công Nghiệp', 'Tủ Giữ Nóng Thức Ăn', 'Tủ Đông – Tủ Mát',
    'Nồi Nấu Phở – Nồi Nấu Cháo', 'Lò Nướng Bánh', 'Máy Làm Đá', 'Quầy Pha Chế Inox',
];

const ContactPage = () => {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 4000);
    };

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
                        Liên <span className="text-yellow-400">Hệ</span>
                    </h1>
                    <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto">
                        Đội ngũ tư vấn Bếp 86 luôn sẵn sàng hỗ trợ bạn 24/7
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-14">

                {/* ── QUICK INFO BAR ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
                    {[
                        {
                            icon: icons.phone,
                            label: 'Hotline',
                            value: '0985.700.057',
                            sub: '0383.833.666',
                            color: 'bg-blue-50 border-blue-200',
                            iconColor: 'text-brand-blue',
                        },
                        {
                            icon: icons.mail,
                            label: 'Email',
                            value: 'thietbicongnghiepbep86',
                            sub: '@gmail.com',
                            color: 'bg-red-50 border-red-200',
                            iconColor: 'text-red-500',
                        },
                        {
                            icon: icons.clock,
                            label: 'Giờ làm việc',
                            value: 'Thứ 2 – Thứ 7',
                            sub: '07:30 – 17:30',
                            color: 'bg-green-50 border-green-200',
                            iconColor: 'text-green-600',
                        },
                    ].map(c => (
                        <div key={c.label} className={`flex items-center gap-4 p-5 border rounded-none ${c.color}`}>
                            <div className={`${c.iconColor}`}>{c.icon}</div>
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">{c.label}</div>
                                <div className="text-zinc-800 font-bold text-sm leading-snug">{c.value}</div>
                                <div className="text-zinc-500 text-xs">{c.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── MAIN GRID ── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                    {/* LEFT: Offices + Map */}
                    <div className="lg:col-span-3 space-y-8">

                        {/* Office cards */}
                        <div>
                            <h2 className="text-zinc-800 font-black text-base uppercase tracking-wider mb-5 flex items-center gap-2">
                                <span className="w-1 h-5 bg-brand-blue inline-block" />
                                Hệ thống văn phòng
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {branches.map(b => (
                                    <div key={b.region} className="bg-white border border-gray-200 p-5 hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="w-2 h-4 inline-block" style={{ background: b.accent }} />
                                            <h3 className="font-black text-sm text-zinc-800 uppercase tracking-wide">{b.region}</h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {b.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2.5">
                                                    <span style={{ color: b.accent }} className="mt-0.5 flex-shrink-0">{icons[item.icon]}</span>
                                                    <span className={`text-xs leading-relaxed ${item.bold ? 'font-bold text-zinc-800' : 'text-zinc-500'}`}>
                                                        {item.text}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Google Map */}
                        <div>
                            <h2 className="text-zinc-800 font-black text-base uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-brand-blue inline-block" />
                                Bản đồ
                            </h2>
                            <div className="w-full h-72 bg-gray-200 border border-gray-200 overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2635951662544!2d105.7275683!3d20.996054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe33dbcb557e101ef!2s!5e0!3m2!1svi!2sUS!4v1614271836123!5m2!1svi!2sUS"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Bản đồ Bếp 86"
                                />
                            </div>
                        </div>

                        {/* Social */}
                        <div>
                            <h2 className="text-zinc-800 font-black text-base uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-brand-blue inline-block" />
                                Mạng xã hội
                            </h2>
                            <div className="flex gap-3">
                                {[
                                    {
                                        name: 'Facebook', color: '#1877f2',
                                        svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                    },
                                    {
                                        name: 'Zalo', color: '#0068ff',
                                        svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><text x="2" y="18" fontSize="16" fontWeight="bold">Z</text></svg>
                                    },
                                ].map(s => (
                                    <a
                                        key={s.name}
                                        href="#"
                                        className="flex items-center gap-2.5 px-5 py-2.5 text-white text-sm font-bold hover:opacity-90 transition-all"
                                        style={{ background: s.color }}
                                    >
                                        {s.svg} {s.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Contact Form */}
                    <div className="lg:col-span-2">
                        <h2 className="text-zinc-800 font-black text-base uppercase tracking-wider mb-5 flex items-center gap-2">
                            <span className="w-1 h-5 bg-red-500 inline-block" />
                            Gửi yêu cầu tư vấn
                        </h2>

                        <div className="bg-white border border-gray-200 p-7 shadow-sm">
                            {sent ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-black text-zinc-800 mb-2">Gửi thành công!</h3>
                                    <p className="text-zinc-500 text-sm">Chúng tôi sẽ liên hệ trong vòng 24 giờ.</p>
                                </div>
                            ) : (
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Họ và tên <span className="text-red-500">*</span></label>
                                            <input
                                                required type="text" placeholder="Nhập họ và tên"
                                                className="w-full px-4 py-2.5 border border-zinc-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all text-sm bg-zinc-50 focus:bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Số điện thoại <span className="text-red-500">*</span></label>
                                            <input
                                                required type="tel" placeholder="Nhập số điện thoại"
                                                className="w-full px-4 py-2.5 border border-zinc-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all text-sm bg-zinc-50 focus:bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Email</label>
                                        <input
                                            type="email" placeholder="email@example.com"
                                            className="w-full px-4 py-2.5 border border-zinc-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all text-sm bg-zinc-50 focus:bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Sản phẩm quan tâm</label>
                                        <select className="w-full px-4 py-2.5 border border-zinc-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all text-sm text-zinc-600 bg-zinc-50 focus:bg-white">
                                            <option value="">-- Chọn sản phẩm --</option>
                                            {products.map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Nội dung yêu cầu <span className="text-red-500">*</span></label>
                                        <textarea
                                            required rows={5} placeholder="Mô tả nhu cầu của bạn..."
                                            className="w-full px-4 py-2.5 border border-zinc-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all text-sm resize-none bg-zinc-50 focus:bg-white"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 font-black text-sm text-white uppercase tracking-wider transition-all hover:opacity-90 active:scale-[0.99]"
                                        style={{ background: 'linear-gradient(135deg, #1b6ca8 0%, #0f4c75 100%)' }}
                                    >
                                        Gửi yêu cầu tư vấn →
                                    </button>

                                    <p className="text-center text-zinc-400 text-xs">
                                        Hoặc gọi ngay <a href="tel:0985700057" className="text-brand-blue font-bold hover:underline">0985.700.057</a> để được tư vấn trực tiếp
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ContactPage;
