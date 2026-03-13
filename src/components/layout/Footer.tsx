import { ChevronRight } from 'lucide-react';

// Professional SVG icon helpers
const IconMapPin = () => (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);
const IconPhone = () => (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
);
const IconMail = () => (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);
const IconGlobe = () => (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);
const IconTag = () => (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
);
const IconShield = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
);
const IconCreditCard = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
);
const IconDoc = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);
const IconReturn = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
    </svg>
);
const IconTruck = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
);

const Footer = () => (
    <footer className="bg-[#0a0f18] text-white pt-20 pb-10 mt-4 border-t border-white/5 relative overflow-hidden">
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
                        <span data-cms-key="footer-title-north">Văn phòng Miền Bắc</span>
                    </h4>
                    <ul className="space-y-4 text-zinc-400 text-[13px] leading-relaxed">
                        <li className="flex gap-3 group">
                            <span className="text-zinc-600 group-hover:text-brand-blue transition-colors"><IconMapPin /></span>
                            <span data-cms-key="footer-north-addr">Cụm Công Nghiệp, Trường An, An Khánh, Hoài Đức, Hà Nội</span>
                        </li>
                        <li className="flex gap-3 group">
                            <span className="text-zinc-600 group-hover:text-brand-blue transition-colors"><IconPhone /></span>
                            <a href="tel:0985700057" data-cms-link="footer-north-phone-link" data-cms-key="footer-north-phone" className="text-zinc-200 font-semibold text-sm hover:underline">0985.700.057 – 0862.662.022</a>
                        </li>
                        <li className="flex gap-3 group">
                            <span className="text-zinc-600 group-hover:text-brand-blue transition-colors"><IconTag /></span>
                            <span data-cms-key="footer-north-mst">MST: 0109576264</span>
                        </li>
                        <li className="flex gap-3 group">
                            <span className="text-zinc-600 group-hover:text-brand-blue transition-colors"><IconMail /></span>
                            <a href="mailto:truonglinhgroup@gmail.com" data-cms-link="footer-north-mail-link" data-cms-key="footer-north-email" className="text-zinc-400 text-sm hover:text-brand-blue break-all">truonglinhgroup@gmail.com</a>
                        </li>
                        <li className="flex gap-3 group">
                            <span className="text-zinc-600 group-hover:text-brand-blue transition-colors"><IconGlobe /></span>
                            <a href="https://thietbibepcongnghieptl.com.vn" data-cms-link="footer-north-web-link" data-cms-key="footer-north-web" className="text-brand-blue text-sm hover:underline break-all">thietbibepcongnghieptl.com.vn</a>
                        </li>
                    </ul>
                </div>

                {/* Column 2: Miền Trung */}
                <div className="space-y-6">
                    <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                        <span data-cms-key="footer-title-mid">Văn phòng Miền Trung</span>
                    </h4>
                    <ul className="space-y-4 text-zinc-400 text-[13px] leading-relaxed">
                        <li className="flex gap-3 group">
                            <span className="text-zinc-600 group-hover:text-yellow-400 transition-colors"><IconMapPin /></span>
                            <span data-cms-key="footer-mid-addr">Số 18 Nguyễn Đức Cảnh, TP Vinh Nghệ An</span>
                        </li>
                        <li className="flex gap-3 group">
                            <span className="text-zinc-600 group-hover:text-yellow-400 transition-colors"><IconPhone /></span>
                            <a href="tel:0985700057" data-cms-link="footer-mid-phone-link" data-cms-key="footer-mid-phone" className="text-zinc-200 font-semibold text-sm hover:underline">0985.700.057 – 0862.662.022</a>
                        </li>
                        <li className="flex gap-3 group">
                            <span className="text-zinc-600 group-hover:text-yellow-400 transition-colors"><IconMail /></span>
                            <a href="mailto:truonglinhgroup@gmail.com" data-cms-link="footer-mid-mail-link" data-cms-key="footer-mid-email" className="text-zinc-400 text-sm hover:text-yellow-400 break-all">truonglinhgroup@gmail.com</a>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Miền Nam */}
                <div className="space-y-6">
                    <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                        <span data-cms-key="footer-title-south">Văn phòng Miền Nam</span>
                    </h4>
                    <ul className="space-y-4 text-zinc-400 text-[13px] leading-relaxed">
                        <li className="flex gap-3 group">
                            <span className="text-zinc-600 group-hover:text-brand-blue transition-colors"><IconMapPin /></span>
                            <span data-cms-key="footer-south-addr1">518 Hương Lộ 2, Bình Tân, TP.HCM</span>
                        </li>
                        <li className="flex gap-3 group">
                            <span className="text-zinc-600 group-hover:text-brand-blue transition-colors"><IconMapPin /></span>
                            <span data-cms-key="footer-south-addr2">Tân Phước Khánh, Tân Uyên, Bình Dương</span>
                        </li>
                        <li className="flex gap-3 group">
                            <span className="text-zinc-600 group-hover:text-brand-blue transition-colors"><IconPhone /></span>
                            <a href="tel:0969150790" data-cms-link="footer-south-phone-link" data-cms-key="footer-south-phone" className="text-zinc-200 font-semibold text-sm hover:underline">0969.150.790 – 0383.833.666</a>
                        </li>
                        <li className="flex gap-3 group">
                            <span className="text-zinc-600 group-hover:text-brand-blue transition-colors"><IconMapPin /></span>
                            <span data-cms-key="footer-south-addr3">13 Phạm Văn Bạch, Tân Bình, TP.HCM</span>
                        </li>
                    </ul>
                </div>

                {/* Column 4: Hỗ trợ */}
                <div className="space-y-6">
                    <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                        <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                        <span data-cms-key="footer-title-support">Hỗ trợ khách hàng</span>
                    </h4>
                    <ul className="space-y-3 text-zinc-400 text-[13px]">
                        <li className="hover:text-white cursor-pointer transition-all flex items-center gap-2.5 group">
                            <span className="text-zinc-600 group-hover:text-brand-blue transition-colors flex-shrink-0"><IconShield /></span>
                            <span data-cms-key="footer-support-1">Hỗ trợ bảo hành sửa chữa</span>
                        </li>
                        <li className="hover:text-white cursor-pointer transition-all flex items-center gap-2.5 group">
                            <span className="text-zinc-600 group-hover:text-brand-blue transition-colors flex-shrink-0"><IconCreditCard /></span>
                            <span data-cms-key="footer-support-2">Hình thức thanh toán</span>
                        </li>
                        <li className="hover:text-white cursor-pointer transition-all flex items-center gap-2.5 group">
                            <span className="text-zinc-600 group-hover:text-brand-blue transition-colors flex-shrink-0"><IconDoc /></span>
                            <span data-cms-key="footer-support-3">Điều kiện điều khoản</span>
                        </li>
                        <li className="hover:text-white cursor-pointer transition-all flex items-center gap-2.5 group">
                            <span className="text-zinc-600 group-hover:text-brand-blue transition-colors flex-shrink-0"><IconReturn /></span>
                            <span data-cms-key="footer-support-4">Chính sách hoàn trả</span>
                        </li>
                        <li className="hover:text-white cursor-pointer transition-all flex items-center gap-2.5 group">
                            <span className="text-zinc-600 group-hover:text-brand-blue transition-colors flex-shrink-0"><IconTruck /></span>
                            <span data-cms-key="footer-support-5">Giao nhận và lắp đặt</span>
                        </li>
                    </ul>
                </div>

                {/* Column 5: Sản phẩm */}
                <div className="space-y-6">
                    <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                        <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                        <span data-cms-key="footer-title-products">Sản phẩm chính</span>
                    </h4>
                    <ul className="grid grid-cols-1 gap-2.5 text-zinc-400 text-xs">
                        <li className="hover:text-white cursor-pointer transition-all flex items-center gap-2 group">
                            <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-brand-blue transition-all flex-shrink-0" />
                            <span data-cms-key="footer-cat-1">Tủ Nấu Cơm Công Nghiệp</span>
                        </li>
                        <li className="hover:text-white cursor-pointer transition-all flex items-center gap-2 group">
                            <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-brand-blue transition-all flex-shrink-0" />
                            <span data-cms-key="footer-cat-2">Bàn Lạnh – Bàn Đông</span>
                        </li>
                        <li className="hover:text-white cursor-pointer transition-all flex items-center gap-2 group">
                            <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-brand-blue transition-all flex-shrink-0" />
                            <span data-cms-key="footer-cat-3">Tủ Sấy Bát Inox</span>
                        </li>
                        <li className="hover:text-white cursor-pointer transition-all flex items-center gap-2 group">
                            <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-brand-blue transition-all flex-shrink-0" />
                            <span data-cms-key="footer-cat-4">Bếp Từ Công Nghiệp</span>
                        </li>
                        <li className="hover:text-white cursor-pointer transition-all flex items-center gap-2 group">
                            <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-brand-blue transition-all flex-shrink-0" />
                            <span data-cms-key="footer-cat-5">Tủ Giữ Nóng Thức Ăn</span>
                        </li>
                        <li className="hover:text-white cursor-pointer transition-all flex items-center gap-2 group">
                            <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-brand-blue transition-all flex-shrink-0" />
                            <span data-cms-key="footer-cat-6">Máy Làm Đá</span>
                        </li>
                    </ul>
                </div>
            </div>


        </div>
    </footer>
);

export default Footer;
