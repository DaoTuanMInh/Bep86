const ContactSection = () => (
    <section className="bg-zinc-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <div className="trapezoid-title mx-auto">LIÊN HỆ VỚI CHÚNG TÔI</div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Contact info */}
                <div>
                    <ul className="space-y-5 mb-8">
                        {[
                            {
                                svg: <svg className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
                                text: 'Cụm Công Nghiệp, Trường An, An Khánh, Hoài Đức, Hà Nội',
                            },
                            {
                                svg: <svg className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
                                text: '0985.700.057  hoặc  0383.833.666',
                                bold: true,
                            },
                            {
                                svg: <svg className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
                                text: 'thietbicongnghiepbep86@gmail.com',
                            },
                            {
                                svg: <svg className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                                text: 'Thứ 2 – Thứ 7: 7:30 – 17:30',
                            },
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4">
                                {item.svg}
                                <span className={`text-sm leading-relaxed ${(item as any).bold ? 'text-brand-blue font-bold' : 'text-zinc-600'}`}>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex gap-3">
                        {[
                            {
                                name: 'Facebook', color: '#1877f2',
                                svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            },
                            {
                                name: 'Zalo', color: '#0068ff',
                                svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><text x="2" y="18" fontSize="16" fontWeight="bold">Z</text></svg>
                            },
                        ].map(s => (
                            <a key={s.name} href="#" className="flex items-center gap-2 px-4 py-2 rounded text-white text-sm font-bold hover:opacity-90 transition-all" style={{ background: s.color }}>
                                {s.svg} {s.name}
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
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-zinc-100">
                <div className="border-l-4 border-brand-blue pl-4 mb-6">
                    <h3 className="text-xl font-black text-zinc-800 uppercase tracking-wide">Gửi yêu cầu tư vấn</h3>
                    <p className="text-zinc-400 text-sm mt-1">Chúng tôi sẽ liên hệ trong vòng 24 giờ</p>
                </div>
                <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('Cảm ơn! Chúng tôi sẽ liên hệ bạn sớm nhất.'); }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 mb-1.5">Họ và tên <span className="text-brand-red">*</span></label>
                            <input required type="text" placeholder="Nhập họ và tên"
                                className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all text-sm bg-zinc-50 focus:bg-white"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 mb-1.5">Số điện thoại <span className="text-brand-red">*</span></label>
                            <input required type="tel" placeholder="Nhập số điện thoại"
                                className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all text-sm bg-zinc-50 focus:bg-white"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 mb-1.5">Sản phẩm quan tâm</label>
                        <select className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all text-sm text-zinc-600 bg-zinc-50 focus:bg-white">
                            <option value="">-- Chọn sản phẩm --</option>
                            {[
                                'Tủ Nấu Cơm', 'Bàn Lạnh – Bàn Đông – Bàn Mát', 'Tủ Sấy Bát',
                                'Bếp Từ Công Nghiệp', 'Tủ Giữ Nóng Thức Ăn', 'Quầy Pha Chế Inox',
                                'Tủ Đông – Tủ Mát', 'Nồi Nấu Phở, Nồi Nấu Cháo', 'Tủ Trưng Bày Bánh Kem',
                                'Linh Kiện Thiết Bị Bếp CN', 'Tủ Sấy Công Nghiệp', 'Máy Làm Đá', 'Lò Nướng Bánh',
                            ].map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 mb-1.5">Nội dung yêu cầu <span className="text-brand-red">*</span></label>
                        <textarea required rows={4} placeholder="Mô tả nhu cầu của bạn..."
                            className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all text-sm resize-none bg-zinc-50 focus:bg-white"
                        />
                    </div>
                    <button type="submit"
                        className="w-full py-3 rounded-lg font-bold text-sm text-white uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                        style={{ background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)' }}
                    >
                        Gửi yêu cầu tư vấn
                    </button>
                </form>
            </div>
        </div>
    </section >
);

export default ContactSection;
