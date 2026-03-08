import { ChevronRight, MapPin, Phone, Hash, Mail, Globe, ShieldCheck, CreditCard, FileText, Truck, RotateCcw } from 'lucide-react';

const Footer = () => (
    <footer className="bg-[#0a0f18] text-white pt-20 pb-10 mt-24 border-t border-white/5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full -translate-y-1/2 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Footer top: Company name & Logo */}
            <div className="mb-16 border-b border-white/5 pb-10">
                <div>
                    <span className="text-brand-blue text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">Đối tác thiết bị bếp tin cậy</span>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
                        CÔNG TY CP ĐẦU TƯ XUẤT NHẬP KHẨU <br className="md:hidden" />
                        <span className="text-brand-blue">TRƯỜNG LINH PHÁT</span>
                    </h3>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12">

                {/* Column 1: Miền Bắc */}
                <div className="space-y-6">
                    <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                        Văn phòng Miền Bắc
                    </h4>
                    <ul className="space-y-4 text-zinc-400 text-[13px] leading-relaxed">
                        <li className="flex gap-3 group">
                            <MapPin className="w-4 h-4 text-zinc-600 group-hover:text-brand-blue transition-colors mt-0.5 shrink-0" />
                            <span>Cụm Công Nghiệp, Trường An, An Khánh, Hoài Đức, Hà Nội</span>
                        </li>
                        <li className="flex gap-3 group">
                            <Phone className="w-4 h-4 text-zinc-600 group-hover:text-brand-blue transition-colors mt-0.5 shrink-0" />
                            <span className="text-zinc-200 font-semibold text-sm">0985.700.057 – 0862.662.022</span>
                        </li>
                        <li className="flex gap-3 group">
                            <Hash className="w-4 h-4 text-zinc-600 group-hover:text-brand-blue transition-colors mt-0.5 shrink-0" />
                            <span>MST: 0109576264</span>
                        </li>
                        <li className="flex gap-3 group">
                            <Mail className="w-4 h-4 text-zinc-600 group-hover:text-brand-blue transition-colors mt-0.5 shrink-0" />
                            <a href="mailto:truonglinhgroup@gmail.com" className="hover:text-brand-blue transition-colors">truonglinhgroup@gmail.com</a>
                        </li>
                        <li className="flex gap-3 group">
                            <Globe className="w-4 h-4 text-zinc-600 group-hover:text-brand-blue transition-colors mt-0.5 shrink-0" />
                            <a href="https://thietbibepcongnghieptl.com.vn" target="_blank" className="text-brand-blue border-b border-brand-blue/20 hover:border-brand-blue transition-all">thietbibepcongnghieptl.com.vn</a>
                        </li>
                    </ul>
                </div>

                {/* Column 2: Miền Trung */}
                <div className="space-y-6">
                    <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                        Văn phòng Miền Trung
                    </h4>
                    <ul className="space-y-4 text-zinc-400 text-[13px] leading-relaxed">
                        <li className="flex gap-3 group">
                            <MapPin className="w-4 h-4 text-zinc-600 group-hover:text-yellow-400 transition-colors mt-0.5 shrink-0" />
                            <span>Số 18 Nguyễn Đức Cảnh, TP Vinh Nghệ An</span>
                        </li>
                        <li className="flex gap-3 group">
                            <Phone className="w-4 h-4 text-zinc-600 group-hover:text-yellow-400 transition-colors mt-0.5 shrink-0" />
                            <span className="text-zinc-200 font-semibold text-sm">0985.700.057 – 0862.662.022</span>
                        </li>
                        <li className="flex gap-3 group">
                            <Mail className="w-4 h-4 text-zinc-600 group-hover:text-yellow-400 transition-colors mt-0.5 shrink-0" />
                            <a href="mailto:truonglinhgroup@gmail.com" className="hover:text-yellow-400 transition-colors">truonglinhgroup@gmail.com</a>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Miền Nam */}
                <div className="space-y-6">
                    <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                        Văn phòng Miền Nam
                    </h4>
                    <ul className="space-y-4 text-zinc-400 text-[13px] leading-relaxed">
                        {[
                            { icon: <MapPin className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" />, text: '518 Hương Lộ 2, Bình Tân, TP.HCM' },
                            { icon: <MapPin className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" />, text: 'Tân Phước Khánh, Tân Uyên, Bình Dương' },
                            { icon: <Phone className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" />, text: '0969.150.790 – 0383.833.666', bold: true },
                            { icon: <MapPin className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" />, text: '13 Phạm Văn Bạch, Tân Bình, TP.HCM' },
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 group">
                                <div className="group-hover:text-brand-blue transition-colors">{item.icon}</div>
                                <span className={item.bold ? 'text-zinc-200 font-semibold text-sm' : ''}>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 4: Hỗ trợ */}
                <div className="space-y-6">
                    <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                        <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                        Hỗ trợ khách hàng
                    </h4>
                    <ul className="space-y-3 text-zinc-400 text-[13px]">
                        {[
                            { icon: <ShieldCheck className="w-3.5 h-3.5" />, text: 'Hỗ trợ bảo hành sửa chữa' },
                            { icon: <CreditCard className="w-3.5 h-3.5" />, text: 'Hình thức thanh toán' },
                            { icon: <FileText className="w-3.5 h-3.5" />, text: 'Điều kiện điều khoản' },
                            { icon: <RotateCcw className="w-3.5 h-3.5" />, text: 'Chính sách hoàn trả' },
                            { icon: <Truck className="w-3.5 h-3.5" />, text: 'Giao nhận và lắp đặt' },
                        ].map((item, i) => (
                            <li key={i} className="hover:text-white cursor-pointer transition-all flex items-center gap-2.5 group">
                                <span className="text-zinc-700 group-hover:text-brand-blue transition-colors">{item.icon}</span>
                                {item.text}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 5: Sản phẩm */}
                <div className="space-y-6">
                    <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                        <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                        Sản phẩm chính
                    </h4>
                    <ul className="grid grid-cols-1 gap-2.5 text-zinc-400 text-xs">
                        {[
                            'Tủ Nấu Cơm Công Nghiệp', 'Bàn Lạnh – Bàn Đông', 'Tủ Sấy Bát Inox',
                            'Bếp Từ Công Nghiệp', 'Tủ Giữ Nóng Thức Ăn', 'Máy Làm Đá'
                        ].map(cat => (
                            <li key={cat} className="hover:text-white cursor-pointer transition-all flex items-center gap-2 group">
                                <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-brand-blue transition-all" />
                                {cat}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


        </div>
    </footer>
);

export default Footer;
