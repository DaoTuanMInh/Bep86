import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Globe, Clock, MessageSquare, ShieldCheck, Headphones, Send } from 'lucide-react';
import Footer from '../components/layout/Footer';

const branches = [
    {
        region: 'Miền Bắc',
        accent: '#1b6ca8',
        items: [
            { icon: <MapPin className="w-4 h-4" />, text: 'Cụm Công Nghiệp, Trường An, An Khánh, Hoài Đức, Hà Nội' },
            { icon: <Phone className="w-4 h-4" />, text: '0985.700.057 – 0862.662.022', bold: true },
            { icon: <Mail className="w-4 h-4" />, text: 'truonglinhgroup@gmail.com' },
            { icon: <Globe className="w-4 h-4" />, text: 'thietbibepcongnghieptl.com.vn' },
        ],
    },
    {
        region: 'Miền Trung',
        accent: '#d97706',
        items: [
            { icon: <MapPin className="w-4 h-4" />, text: 'Số 18 Nguyễn Đức Cảnh, TP Vinh, Nghệ An' },
            { icon: <Phone className="w-4 h-4" />, text: '0985.700.057 – 0862.662.022', bold: true },
            { icon: <Mail className="w-4 h-4" />, text: 'truonglinhgroup@gmail.com' },
            { icon: <Globe className="w-4 h-4" />, text: 'thietbibepcongnghieptl.com.vn' },
        ],
    },
    {
        region: 'Miền Nam',
        accent: '#059669',
        items: [
            { icon: <MapPin className="w-4 h-4" />, text: '518 Hương Lộ 2, Bình Tân, TP.HCM' },
            { icon: <MapPin className="w-4 h-4" />, text: 'Tân Phước Khánh, Tân Uyên, Bình Dương' },
            { icon: <MapPin className="w-4 h-4" />, text: '13 Phạm Văn Bạch, Tân Bình, TP.HCM' },
            { icon: <Phone className="w-4 h-4" />, text: '0969.150.790 – 0383.833.666', bold: true },
        ],
    },
];

interface ContactPageProps {
    products?: string[];
}

const ContactPage = ({ products = [] }: ContactPageProps) => {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            product: formData.get('product'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/consultations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setSent(true);
            } else {
                alert('Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        } catch (error) {
            console.error(error);
            alert('Lỗi kết nối server.');
        } finally {
            setLoading(false);
        }
    };

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8 }
    };

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">

            {/* ── HERO ── */}
            <div className="relative overflow-hidden min-h-[400px] flex items-center justify-center bg-zinc-900">
                <motion.div
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
                    data-cms-key="hero-contact-bg"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000")',
                    }}
                />
                <div className="absolute inset-0 z-1 bg-gradient-to-b from-transparent to-zinc-900/60 pointer-events-none" />

                <div className="relative z-10 max-w-6xl mx-auto px-6 py-14 text-center pointer-events-none">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow-2xl pointer-events-auto"
                        data-cms-key="contact-hero-title"
                    >
                        Liên <span className="text-yellow-400">Hệ</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-medium pointer-events-auto"
                        data-cms-key="contact-hero-desc"
                    >
                        Đội ngũ tư vấn Bếp 86 luôn sẵn sàng hỗ trợ bạn 24/7
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20">

                {/* ── QUICK INFO BAR ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20"
                >
                    {[
                        {
                            icon: <Phone className="w-6 h-6" />,
                            label: 'Hotline',
                            value: '0985.700.057',
                            sub: '0383.833.666',
                            color: 'bg-blue-50 border-blue-200',
                            iconColor: 'text-brand-blue',
                        },
                        {
                            icon: <Mail className="w-6 h-6" />,
                            label: 'Email',
                            value: 'truonglinhgroup@gmail.com',
                            sub: 'thietbibepcongnghieptl.com.vn',
                            color: 'bg-red-50 border-red-200',
                            iconColor: 'text-red-500',
                        },
                        {
                            icon: <Clock className="w-6 h-6" />,
                            label: 'Giờ làm việc',
                            value: 'Thứ 2 – Thứ 7',
                            sub: '07:30 – 17:30',
                            color: 'bg-green-50 border-green-200',
                            iconColor: 'text-green-600',
                        },
                    ].map(c => (
                        <motion.div
                            whileHover={{ y: -5, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                            key={c.label}
                            className={`flex items-center gap-5 p-6 border-2 rounded-2xl transition-all ${c.color}`}
                        >
                            <div className={`${c.iconColor} bg-white p-3 rounded-xl shadow-sm flex-shrink-0`}>{c.icon}</div>
                             <div className="min-w-0">
                                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">{c.label}</div>
                                <div data-cms-key={`contact-h-val-${c.label}`} className="text-zinc-800 font-bold text-sm leading-snug break-all">{c.value}</div>
                                <div data-cms-key={`contact-h-sub-${c.label}`} className="text-zinc-500 text-xs font-medium break-all">{c.sub}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── MAIN GRID ── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

                    {/* LEFT: Offices + Map */}
                    <div className="lg:col-span-3 space-y-12">

                        {/* Office cards */}
                        <motion.div {...fadeIn}>
                            <h2 className="text-zinc-800 font-black text-xl uppercase tracking-wider mb-8 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-brand-blue rounded-full inline-block" />
                                Hệ thống văn phòng
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {branches.map((b, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        key={b.region}
                                        className="bg-white border border-zinc-100 p-6 rounded-2xl hover:shadow-xl transition-all group"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-2.5 h-5 rounded-full" style={{ background: b.accent }} />
                                            <h3 className="font-black text-sm text-zinc-800 uppercase tracking-wide">{b.region}</h3>
                                        </div>
                                        <ul className="space-y-4">
                                            {b.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <span style={{ color: b.accent }} className="mt-0.5 shrink-0 bg-zinc-50 p-1.5 rounded-lg group-hover:bg-opacity-80 transition-colors">{item.icon}</span>
                                                    <span 
                                                        data-cms-key={`contact-br-${b.region}-item-${i}`} 
                                                        className={`text-xs leading-relaxed break-all ${item.bold ? 'font-black text-zinc-800' : 'text-zinc-500 font-medium'}`}
                                                    >
                                                        {item.text}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Google Map */}
                        <motion.div {...fadeIn}>
                            <h2 className="text-zinc-800 font-black text-xl uppercase tracking-wider mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-brand-blue rounded-full inline-block" />
                                Bản đồ chỉ đường
                            </h2>
                            <div className="w-full h-96 bg-zinc-100 rounded-3xl overflow-hidden border border-zinc-100 shadow-inner">
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
                        </motion.div>

                        {/* Social */}
                        <motion.div {...fadeIn}>
                            <h2 className="text-zinc-800 font-black text-xl uppercase tracking-wider mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-brand-blue rounded-full inline-block" />
                                <span data-cms-key="contact-social-title">Kết nối mạng xã hội</span>
                            </h2>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    {
                                        name: 'Facebook', color: '#1877f2',
                                        icon: <ShieldCheck className="w-5 h-5" />
                                    },
                                    {
                                        name: 'Zalo / Tư vấn', color: '#0068ff',
                                        icon: <MessageSquare className="w-5 h-5" />
                                    },
                                    {
                                        name: 'Hỗ trợ kỹ thuật', color: '#dc2626',
                                        icon: <Headphones className="w-5 h-5" />
                                    },
                                ].map(s => (
                                    <motion.a
                                        whileHover={{ scale: 1.05, x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        key={s.name}
                                        href="#"
                                        data-cms-link={`contact-social-link-${s.name.replace(/\s+/g, '-').toLowerCase()}`}
                                        className="flex items-center gap-3 px-8 py-3.5 text-white text-sm font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all shadow-lg"
                                        style={{ background: s.color }}
                                    >
                                        {s.icon} <span data-cms-key={`contact-social-text-${s.name.replace(/\s+/g, '-').toLowerCase()}`}>{s.name}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: Contact Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="sticky top-28"
                        >
                            <h2 className="text-zinc-800 font-black text-xl uppercase tracking-wider mb-8 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-red-500 rounded-full inline-block" />
                                Gửi yêu cầu tư vấn
                            </h2>

                            <div className="bg-white border border-zinc-100 p-8 rounded-3xl shadow-xl">
                                {sent ? (
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="flex flex-col items-center justify-center py-20 text-center"
                                    >
                                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                            <ShieldCheck className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-2xl font-black text-zinc-900 mb-3">Gửi thành công!</h3>
                                        <p className="text-zinc-500 font-medium">Chúng tôi sẽ liên hệ lại với bạn trong vòng 24 giờ.</p>
                                    </motion.div>
                                ) : (
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] font-black text-zinc-400 mb-2 uppercase tracking-[0.2em]">Họ và tên <span className="text-red-500">*</span></label>
                                                    <input
                                                        name="name"
                                                        required type="text" placeholder="Nhập họ và tên"
                                                        className="w-full px-5 py-3.5 rounded-xl border border-zinc-100 focus:border-brand-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm font-medium bg-zinc-50/50"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-black text-zinc-400 mb-2 uppercase tracking-[0.2em]">Số điện thoại <span className="text-red-500">*</span></label>
                                                    <input
                                                        name="phone"
                                                        required type="tel" placeholder="Nhập số điện thoại"
                                                        className="w-full px-5 py-3.5 rounded-xl border border-zinc-100 focus:border-brand-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm font-medium bg-zinc-50/50"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-black text-zinc-400 mb-2 uppercase tracking-[0.2em]">Email liên hệ</label>
                                                <input
                                                    name="email"
                                                    type="email" placeholder="example@gmail.com"
                                                    className="w-full px-5 py-3.5 rounded-xl border border-zinc-100 focus:border-brand-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm font-medium bg-zinc-50/50"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-black text-zinc-400 mb-2 uppercase tracking-[0.2em]">Sản phẩm quan tâm</label>
                                                <select name="product" className="w-full px-5 py-3.5 rounded-xl border border-zinc-100 focus:border-brand-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm font-medium bg-zinc-50/50 text-zinc-600 appearance-none cursor-pointer">
                                                    <option value="">-- Chọn sản phẩm dự kiến --</option>
                                                    {products.map(p => <option key={p} value={p}>{p}</option>)}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-black text-zinc-400 mb-2 uppercase tracking-[0.2em]">Lời nhắn cho chúng tôi <span className="text-red-500">*</span></label>
                                                <textarea
                                                    name="message"
                                                    required rows={4} placeholder="Mô tả chi tiết nhu cầu của bạn để được hỗ trợ tốt nhất..."
                                                    className="w-full px-5 py-3.5 rounded-xl border border-zinc-100 focus:border-brand-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm font-medium bg-zinc-50/50 resize-none"
                                                />
                                            </div>
                                        </div>

                                        <motion.button
                                            type="submit"
                                            disabled={loading}
                                            whileHover={{ y: -2, shadow: "0 10px 20px -5px rgba(27, 108, 168, 0.4)" }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full py-4 rounded-xl font-black text-xs text-white shadow-lg uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${loading ? 'opacity-70' : ''}`}
                                            style={{ background: 'linear-gradient(135deg, #1b6ca8 0%, #0f4c75 100%)' }}
                                        >
                                            {loading ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <Send className="w-4 h-4" />
                                            )} 
                                            {loading ? 'Đang gửi...' : 'Gửi yêu cầu ngay'}
                                        </motion.button>

                                        <p className="text-center text-zinc-400 text-[10px] font-medium leading-relaxed">
                                            Bằng việc nhấn gửi, bạn đồng ý với chính sách bảo mật của chúng tôi. <br />
                                            Hoặc gọi ngay <a href="tel:0985700057" className="text-brand-blue font-bold hover:underline">0985.700.057</a>
                                        </p>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ContactPage;
