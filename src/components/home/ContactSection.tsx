import React, { useState } from 'react';

interface ContactSectionProps {
    categories?: string[];
}

const ContactSection = ({ categories = [] }: ContactSectionProps) => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
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
                setSubmitted(true);
                (e.target as HTMLFormElement).reset();
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

    return (
        <section className="bg-zinc-50 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <div className="trapezoid-title mx-auto">LIÊN HỆ VỚI CHÚNG TÔI</div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact info */}
                    <div>
                        <ul className="space-y-5 mb-8">
                            <li className="flex items-start gap-4">
                                <svg className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                                <span data-cms-key="contact-addr" className="text-sm leading-relaxed text-zinc-600">Cụm Công Nghiệp, Trường An, An Khánh, Hoài Đức, Hà Nội</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <svg className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                                <a href="tel:0985700057" data-cms-link="contact-link-phone" data-cms-key="contact-phone" className="text-sm leading-relaxed text-brand-blue font-bold hover:underline">0985.700.057  hoặc  0383.833.666</a>
                            </li>
                            <li className="flex items-start gap-4">
                                <svg className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                                <a href="mailto:thietbicongnghiepbep86@gmail.com" data-cms-link="contact-link-email" data-cms-key="contact-email" className="text-sm leading-relaxed text-zinc-600 hover:text-brand-blue transition-colors">thietbicongnghiepbep86@gmail.com</a>
                            </li>
                            <li className="flex items-start gap-4">
                                <svg className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span data-cms-key="contact-hours" className="text-sm leading-relaxed text-zinc-600">Thứ 2 – Thứ 7: 7:30 – 17:30</span>
                            </li>
                        </ul>
                        <div className="flex gap-3">
                            {[
                                {
                                    name: 'Facebook', color: '#1877f2', key: 'facebook',
                                    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                },
                                {
                                    name: 'Zalo', color: '#0068ff', key: 'zalo',
                                    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><text x="2" y="18" fontSize="16" fontWeight="bold">Z</text></svg>
                                },
                            ].map(s => (
                                <a data-cms-link={`contact-social-${s.key}`} key={s.name} href="#" className="flex items-center gap-2 px-4 py-2 rounded text-white text-sm font-bold hover:opacity-90 transition-all" style={{ background: s.color }}>
                                    {s.svg} <span data-cms-key={`contact-social-name-${s.key}`}>{s.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Google Map */}
                    <div className="mt-8 border border-zinc-200 overflow-hidden shadow-sm">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2635951662544!2d105.7275683!3d20.996054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe33dbcb557e101ef!2s!5e0!3m2!1svi!2sUS!4v1614271836123!5m2!1svi!2sUS"
                            width="100%"
                            height="280"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Bản đồ Bếp 86"
                        />
                    </div>
                </div>

                {/* Consultation form */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 max-w-5xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-5">
                    {/* Image Column */}
                    <div className="lg:col-span-2 relative h-72 lg:h-auto bg-zinc-100">
                        <img
                            src="/images/consultant.png"
                            alt="Tư vấn viên Bếp 86"
                            className="absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                            data-cms-key="home-consultation-img"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white/10" />
                        <div className="absolute bottom-8 left-8 right-8 text-white">
                            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 shadow-xl">
                                <h4 className="font-black text-sm uppercase tracking-wider mb-1">Hỗ trợ trực tuyến</h4>
                                <p className="text-[10px] font-medium opacity-90 leading-relaxed italic">
                                    "Chúng tôi luôn lắng nghe và mang đến giải pháp tối ưu nhất cho không gian bếp của bạn."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="lg:col-span-3 p-8 lg:p-12">
                        <div className="border-l-4 border-brand-blue pl-5 mb-8">
                            <h3 className="text-2xl font-black text-zinc-800 uppercase tracking-tight">Gửi yêu cầu tư vấn</h3>
                            <p className="text-zinc-400 text-sm mt-1 font-medium">Chúng tôi sẽ liên hệ lại với bạn trong vòng 24 giờ làm việc</p>
                        </div>

                        {submitted ? (
                            <div className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-2xl text-center py-16">
                                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h4 className="font-black text-xl mb-2 uppercase tracking-wide">Gửi thành công!</h4>
                                <p className="text-sm opacity-90 font-medium max-w-xs mx-auto">Cảm ơn bạn. Chuyên viên của Bếp 86 sẽ gọi lại cho bạn sớm nhất có thể.</p>
                                <button onClick={() => setSubmitted(false)} className="mt-8 bg-green-600 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-green-700 transition-all shadow-md">Gửi yêu cầu khác</button>
                            </div>
                        ) : (
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[10px] font-black text-zinc-400 mb-2 uppercase tracking-widest pl-1">Họ và tên <span className="text-brand-red">*</span></label>
                                        <input name="name" required type="text" placeholder="Nhập họ và tên"
                                            className="w-full px-5 py-3.5 rounded-xl border border-zinc-200 focus:border-brand-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm bg-zinc-50 focus:bg-white font-medium shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-zinc-400 mb-2 uppercase tracking-widest pl-1">Số điện thoại <span className="text-brand-red">*</span></label>
                                        <input name="phone" required type="tel" placeholder="Nhập số điện thoại"
                                            className="w-full px-5 py-3.5 rounded-xl border border-zinc-200 focus:border-brand-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm bg-zinc-50 focus:bg-white font-medium shadow-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-zinc-400 mb-2 uppercase tracking-widest pl-1">Sản phẩm quan tâm</label>
                                    <select name="product" className="w-full px-5 py-3.5 rounded-xl border border-zinc-200 focus:border-brand-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm text-zinc-600 bg-zinc-50 focus:bg-white font-medium shadow-sm appearance-none cursor-pointer">
                                        <option value="">-- Chọn sản phẩm dự kiến --</option>
                                        {categories.map(p => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-zinc-400 mb-2 uppercase tracking-widest pl-1">Nội dung yêu cầu <span className="text-brand-red">*</span></label>
                                    <textarea name="message" required rows={4} placeholder="Mô tả chi tiết nhu cầu của bạn để được hỗ trợ tốt nhất..."
                                        className="w-full px-5 py-3.5 rounded-xl border border-zinc-200 focus:border-brand-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm resize-none bg-zinc-50 focus:bg-white font-medium shadow-sm"
                                    />
                                </div>
                                <button type="submit" disabled={loading}
                                    className={`w-full py-4.5 rounded-xl font-black text-xs text-white uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-brand-blue/20 active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden relative group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    style={{ background: 'linear-gradient(135deg, #1b6ca8 0%, #0f4c75 100%)' }}
                                >
                                    <div className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                                    {loading ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU NGAY'}
                                </button>
                                <p className="text-[9px] text-zinc-400 text-center mt-3 font-medium uppercase tracking-wider leading-relaxed">
                                    Bằng việc nhấn gửi, bạn đồng ý với <span className="underline cursor-pointer">chính sách bảo mật</span> của chúng tôi.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section >
    );
};

export default ContactSection;
