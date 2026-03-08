import { ChevronRight } from 'lucide-react';
import Footer from '../components/layout/Footer';

const GioiThieuPage = () => (
    <div className="min-h-screen bg-gray-50">

        {/* ── HERO ── */}
        <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f4c75 0%, #1b262c 60%, #16213e 100%)', minHeight: 320 }}>
            {/* Decorative rings */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-white/10" />
            <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full border border-white/10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #00b4d8, transparent)' }} />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 text-center md:text-left">

                    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                        Giới Thiệu<br />
                        <span className="text-yellow-400">Công Ty</span>
                    </h1>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg">
                        CÔNG TY CỔ PHẦN ĐẦU TƯ XUẤT NHẬP KHẨU<br />
                        <strong className="text-white">TRƯỜNG LINH PHÁT</strong>
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <div className="w-80 h-56 md:w-[500px] md:h-[350px] rounded-lg overflow-hidden shadow-2xl border-2 border-white/20">
                        <img src="/slide.png" alt="Bếp 86 Việt Nam" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>


        {/* ── GIỚI THIỆU CÔNG TY ── */}
        <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div>
                    <h2 className="text-2xl font-black text-zinc-800 uppercase mb-6 leading-tight border-l-4 border-brand-blue pl-4">
                        CÔNG TY CỔ PHẦN ĐẦU TƯ<br />XUẤT NHẬP KHẨU TRƯỜNG LINH PHÁT
                    </h2>
                    <div className="space-y-4 text-zinc-600 text-sm leading-relaxed">
                        <p>
                            Công ty chúng tôi chuyên <strong className="text-brand-blue">sản xuất, cung cấp và lắp đặt hệ thống bếp công nghiệp, bếp ăn tập thể</strong> cho nhà hàng, khách sạn, trường học, bệnh viện, khu công nghiệp…
                        </p>
                        <p>
                            Ngoài ra, chúng tôi còn kinh doanh các thiết bị máy móc phục vụ trong ngành chế biến thực phẩm, thiết bị lạnh, thiết bị siêu thị có xuất xứ từ <strong className="text-zinc-800">Tây Ban Nha, ITALY, Trung Quốc, Việt Nam</strong>…
                        </p>
                        <p>
                            Với đội ngũ kỹ thuật giàu kinh nghiệm và hệ thống kho bãi hiện đại, chúng tôi cam kết mang đến cho khách hàng những thiết bị chất lượng, được kiểm định nghiêm ngặt, lắp đặt đúng kỹ thuật và bảo hành đầy đủ.
                        </p>
                        <p>
                            Qua nhiều năm hoạt động và phát triển, Trường Linh Phát đã xây dựng được lòng tin vững chắc với hàng trăm khách hàng là các nhà hàng, khách sạn, trường học và bệnh viện trên toàn quốc.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-6">
                        {['ISO 9001:2015', 'Sản xuất tại VN', 'Bảo hành chính hãng', 'Lắp đặt tận nơi', 'Tư vấn miễn phí'].map(tag => (
                            <span key={tag} className="bg-blue-50 text-brand-blue text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100">{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="rounded-lg overflow-hidden shadow-xl">
                    <img src="/Untitled-1.png" alt="Thiết bị bếp công nghiệp" className="w-full h-72 object-cover" />
                    <img src="/slide.png" alt="Sản phẩm Bếp 86" className="w-full h-48 object-cover border-t-2 border-white" />
                </div>
            </div>
        </section>


        {/* ── TẦM NHÌN / SỨ MỆNH / CAM KẾT ── */}
        <section style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #0f3460 100%)' }}>
            <div className="text-center pt-16 pb-10 px-6">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-yellow-400 bg-yellow-400/10 px-4 py-1.5 rounded border border-yellow-400/30 mb-4">Định Hướng Phát Triển</span>
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide">Tầm Nhìn &amp; Sứ Mệnh</h2>
            </div>

            <div className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-8 md:gap-0">
                {/* Vision */}
                <div className="md:pr-12 flex flex-col gap-5">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded border border-cyan-400/60 flex items-center justify-center flex-shrink-0 bg-cyan-400/10">
                            <span className="text-cyan-400 font-black text-xs tracking-widest">I</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 mb-0.5">Vision</p>
                            <h3 className="text-lg font-black text-white uppercase">Tầm Nhìn</h3>
                        </div>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        Trở thành <strong className="text-cyan-300">thương hiệu hàng đầu Việt Nam</strong> trong lĩnh vực cung cấp thiết bị bếp công nghiệp chất lượng cao, được khách hàng trong nước và quốc tế tin tưởng lựa chọn.
                    </p>
                    <ul className="space-y-2 border-l-2 border-cyan-400/30 pl-4">
                        {['Mở rộng mạng lưới phân phối toàn quốc', 'Hợp tác với các thương hiệu quốc tế uy tín', 'Ứng dụng công nghệ vào quản lý vận hành'].map(item => (
                            <li key={item} className="text-xs text-slate-400 leading-relaxed">{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="hidden md:block bg-white/10" />

                {/* Mission */}
                <div className="md:pl-12 flex flex-col gap-5">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded border border-orange-400/60 flex items-center justify-center flex-shrink-0 bg-orange-400/10">
                            <span className="text-orange-400 font-black text-xs tracking-widest">II</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400 mb-0.5">Mission</p>
                            <h3 className="text-lg font-black text-white uppercase">Sứ Mệnh</h3>
                        </div>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        Mang đến cho khách hàng những <strong className="text-orange-300">giải pháp thiết bị bếp tối ưu</strong>, hiệu quả và tiết kiệm chi phí – giúp nâng cao năng suất vận hành và chất lượng bữa ăn cho hàng triệu người.
                    </p>
                    <ul className="space-y-2 border-l-2 border-orange-400/30 pl-4">
                        {['Tư vấn giải pháp bếp phù hợp từng quy mô', 'Đảm bảo chất lượng – đúng hạn – đúng cam kết', 'Hỗ trợ lắp đặt, bảo trì và sửa chữa tận nơi'].map(item => (
                            <li key={item} className="text-xs text-slate-400 leading-relaxed">{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Cam kết */}
            <div className="border-t border-white/10">
                <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                    {[
                        { code: 'CL', title: 'Chất Lượng', desc: 'Sản phẩm đạt chuẩn ISO 9001:2015', color: '#00b4d8' },
                        { code: 'TĐ', title: 'Tốc Độ', desc: 'Giao hàng đúng hạn, lắp đặt nhanh chóng', color: '#f77f00' },
                        { code: 'BH', title: 'Bảo Hành', desc: 'Cam kết bảo hành chính hãng, hỗ trợ sau bán', color: '#2ec4b6' },
                        { code: 'TV', title: 'Tư Vấn', desc: 'Đội ngũ chuyên gia tư vấn tận tâm 24/7', color: '#ffd60a' },
                    ].map(c => (
                        <div key={c.title} className="px-6 py-5">
                            <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: c.color }}>{c.code}</div>
                            <div className="text-white font-bold text-sm mb-1">{c.title}</div>
                            <div className="text-slate-400 text-[11px] leading-relaxed">{c.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── GIÁ TRỊ CỐT LÕI ── */}
        <section className="py-16 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-2xl font-black text-zinc-800 uppercase tracking-wide border-l-4 border-brand-blue pl-4 mb-2">Giá Trị Cốt Lõi</h2>
                    <p className="text-zinc-500 text-sm ml-5">Những giá trị nền tảng định hướng mọi hoạt động của chúng tôi</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-zinc-200 rounded-xl overflow-hidden">
                    {[
                        {
                            num: '01', title: 'Uy Tín', subtitle: 'Cam kết là nền tảng',
                            desc: 'Chúng tôi đặt chữ Tín lên hàng đầu trong mọi giao dịch. Từng hợp đồng được thực hiện đúng cam kết, đúng tiến độ, đúng chất lượng – không có ngoại lệ.',
                            points: ['Giao hàng đúng hạn theo hợp đồng', 'Thông tin sản phẩm minh bạch, rõ ràng', 'Giải quyết khiếu nại nhanh chóng, chu đáo'],
                            color: '#0057b8',
                        },
                        {
                            num: '02', title: 'Chất Lượng', subtitle: 'Tiêu chuẩn không thoả hiệp',
                            desc: 'Mọi sản phẩm trước khi xuất xưởng đều được kiểm tra nghưỡm theo tiêu chuẩn ISO 9001:2015. Nguyên liệu đầu vào có nguồn gốc rõ ràng, xuất xứ minh bạch.',
                            points: ['Kiểm định đầu vào và đầu ra 100%', 'Vật liệu inox cao cấp, chống gỉ, bền bỉ', 'Dây chuyền sản xuất hiện đại, đạt chuẩn'],
                            color: '#1a5276',
                        },
                        {
                            num: '03', title: 'Đổi Mới', subtitle: 'Luôn đi trước xu hướng',
                            desc: 'Thị trường không ngừng thay đổi – chúng tôi không ngừng cập nhật công nghệ mới, đưa vào quy trình sản xuất những giải pháp hiệu quả hơn, tiết kiệm hơn cho khách hàng.',
                            points: ['Cập nhật danh mục sản phẩm thường xuyên', 'Ứng dụng công nghệ tiết kiệm năng lượng', 'Hợp tác với các đối tác công nghệ quốc tế'],
                            color: '#0d6efd',
                        },
                        {
                            num: '04', title: 'Tận Tâm', subtitle: 'Khách hàng là trung tâm',
                            desc: 'Đội ngũ nhân viên kỹ thuật có chuyên môn cao luôn sẵn sàng hỗ trợ khách hàng từ khâu tư vấn, lắp đặt cho đến bảo trì, sửa chữa sau bán hàng.',
                            points: ['Tư vấn mọi lúc, mọi nơi qua điện thoại', 'Bảo hành tận nơi, không phát sinh phí', 'Chăm sóc khách hàng sau mua hàng', 'Hỗ trợ sửa chữa kịp thời, hạn chế gián đoạn'],
                            color: '#117a65',
                        },
                    ].map((v, idx) => (
                        <div key={v.title} className={`p-6 ${idx === 0 ? 'border-b border-r border-zinc-200' : idx === 1 ? 'border-b border-zinc-200' : idx === 2 ? 'border-r border-zinc-200' : ''}`}>
                            <div className="flex items-start gap-4 mb-4">
                                <span className="text-3xl font-black leading-none" style={{ color: v.color, opacity: 0.25, fontFamily: 'serif' }}>{v.num}</span>
                                <div>
                                    <h3 className="font-black text-sm text-zinc-800 uppercase tracking-wide mb-0.5" style={{ borderLeft: `3px solid ${v.color}`, paddingLeft: 8 }}>{v.title}</h3>
                                    <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider ml-3">{v.subtitle}</p>
                                </div>
                            </div>
                            <p className="text-zinc-600 text-xs leading-relaxed mb-4">{v.desc}</p>
                            <ul className="space-y-1.5">
                                {v.points.map(pt => (
                                    <li key={pt} className="flex items-start gap-2 text-xs text-zinc-500">
                                        <span className="flex-shrink-0 mt-0.5 font-bold" style={{ color: v.color }}>–</span>
                                        {pt}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── HỆ THỐNG VĂN PHÒNG ── */}
        <section className="py-16 px-6" style={{ background: '#f4f6f9' }}>
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 border-l-4 border-brand-blue pl-4">
                    <h2 className="text-2xl font-black text-zinc-800 uppercase tracking-wide">Hệ Thống Văn Phòng</h2>
                    <p className="text-zinc-400 text-sm mt-1">Liên hệ với chúng tôi để được tư vấn và hỗ trợ</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Miền Bắc */}
                    <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                        <div className="bg-brand-blue px-5 py-3 flex items-center justify-between">
                            <div>
                                <span className="text-white font-black text-sm uppercase tracking-wider">Văn Phòng Miền Bắc</span>
                                <span className="text-blue-200 text-xs ml-2">· Hà Nội</span>
                            </div>
                            <span className="text-xs text-blue-200 border border-blue-300/40 px-2 py-0.5 rounded">Trụ sở chính</span>
                        </div>
                        <div className="bg-zinc-50 border-b border-zinc-200 px-5 py-2">
                            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">CÔNG TY CP ĐẦU TƯ XUẤT NHẬP KHẨU TRƯỜNG LINH PHÁT</p>
                        </div>
                        <table className="w-full text-sm">
                            <tbody>
                                {[
                                    { label: 'Địa chỉ', val: 'Cụm Công Nghiệp, Trường An, An Khánh, Hoài Đức, Hà Nội' },
                                    { label: 'Điện thoại', val: '0985.700.057 – 0383.833.666', highlight: true },
                                    { label: 'Mã số thuế', val: '0109576264' },
                                    { label: 'BIDV – Từ Liêm', val: '21710000372586' },
                                    { label: 'Tài khoản MB', val: '1598686898888 (Đao Công Sức)' },
                                    { label: 'Email', val: 'truonglinhgroup@gmail.com' },
                                    { label: 'Website', val: 'thietbibepcongnghieptl.com.vn' },
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}>
                                        <td className="px-5 py-2.5 text-zinc-400 font-semibold text-xs uppercase tracking-wide w-36 border-r border-zinc-100 whitespace-nowrap">{row.label}</td>
                                        <td className={`px-5 py-2.5 ${(row as any).highlight ? 'text-brand-blue font-bold' : 'text-zinc-700'}`}>{row.val}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Miền Trung */}
                    <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                        <div className="px-5 py-3 flex items-center justify-between" style={{ background: '#1a5276' }}>
                            <div>
                                <span className="text-white font-black text-sm uppercase tracking-wider">Văn Phòng Miền Trung</span>
                                <span className="text-blue-200 text-xs ml-2">· Nghệ An</span>
                            </div>
                            <span className="text-xs text-blue-200 border border-blue-300/40 px-2 py-0.5 rounded">Chi nhánh</span>
                        </div>
                        <div className="bg-zinc-50 border-b border-zinc-200 px-5 py-2">
                            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">CÔNG TY CP ĐẦU TƯ XUẤT NHẬP KHẨU TRƯỜNG LINH PHÁT</p>
                        </div>
                        <table className="w-full text-sm">
                            <tbody>
                                {[
                                    { label: 'Địa chỉ', val: 'Số 18 Nguyễn Đức Cảnh, TP Vinh, Nghệ An' },
                                    { label: 'Hotline', val: '0985.700.057 – 0383.833.666', highlight: true },
                                    { label: 'Email', val: 'truonglinhgroup@gmail.com' },
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}>
                                        <td className="px-5 py-2.5 text-zinc-400 font-semibold text-xs uppercase tracking-wide w-36 border-r border-zinc-100 whitespace-nowrap">{row.label}</td>
                                        <td className={`px-5 py-2.5 ${(row as any).highlight ? 'text-brand-blue font-bold' : 'text-zinc-700'}`}>{row.val}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="border-t border-zinc-100 bg-zinc-50 h-44 flex items-center justify-center">
                            <div className="text-center">
                                <svg className="w-10 h-10 mx-auto text-zinc-300 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <p className="text-xs font-semibold text-zinc-400">Số 18 Nguyễn Đức Cảnh, TP Vinh, Nghệ An</p>
                                <a href="#" className="text-xs text-brand-blue hover:underline mt-1 inline-block font-semibold">Xem trên Google Maps →</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <Footer />
    </div>
);

export default GioiThieuPage;
