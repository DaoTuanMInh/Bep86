import { ChevronRight, Award, Target, Zap, Heart, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import Footer from '../components/layout/Footer';

const GioiThieuPage = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8 }
    };

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">

            {/* ── HERO ── */}
            <div className="relative overflow-hidden min-h-[450px] md:min-h-[550px] flex items-center justify-center">
                {/* Background Image with Overlay */}
                <motion.div
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    data-cms-key="hero-about-bg"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000")',
                    }}
                />
                <div className="absolute inset-0 z-1 bg-black/60 pointer-events-none" />

                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-white/5 z-2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 z-2" style={{ background: 'radial-gradient(circle, #00b4d8, transparent)' }} />

                <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-32 text-center text-white pointer-events-none">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-4xl md:text-7xl font-black leading-tight mb-8 drop-shadow-2xl pointer-events-auto"
                        data-cms-key="about-hero-title"
                    >
                        Giới Thiệu <span className="text-yellow-400">Công Ty</span>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="space-y-4 pointer-events-auto"
                    >
                        <p data-cms-key="about-hero-sub1" className="text-white/80 text-lg md:text-2xl font-bold uppercase tracking-[0.4em] drop-shadow-md">
                            CÔNG TY CỔ PHẦN ĐẦU TƯ XUẤT NHẬP KHẨU
                        </p>
                        <p data-cms-key="about-hero-sub2" className="text-white text-3xl md:text-5xl font-black tracking-tighter drop-shadow-2xl">
                            TRƯỜNG LINH PHÁT
                        </p>
                    </motion.div>
                </div>
            </div>


            {/* ── GIỚI THIỆU CÔNG TY ── */}
            <section className="py-24 px-6 relative">
                <motion.div
                    {...fadeIn}
                    className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
                >
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-black text-zinc-800 uppercase mb-8 leading-tight border-l-4 border-brand-blue pl-6">
                            CÔNG TY CỔ PHẦN ĐẦU TƯ<br />XUẤT NHẬP KHẨU TRƯỜNG LINH PHÁT
                        </h2>
                        <div className="space-y-6 text-zinc-600 text-base leading-relaxed">
                            <p data-cms-key="about-info-p1">
                                Công ty chúng tôi chuyên <strong className="text-brand-blue">sản xuất, cung cấp và lắp đặt hệ thống bếp công nghiệp, bếp ăn tập thể</strong> cho nhà hàng, khách sạn, trường học, bệnh viện, khu công nghiệp…
                            </p>
                            <p data-cms-key="about-info-p2">
                                Ngoài ra, chúng tôi còn kinh doanh các thiết bị máy móc phục vụ trong ngành chế biến thực phẩm, thiết bị lạnh, thiết bị siêu thị có xuất xứ từ <strong className="text-zinc-800">Tây Ban Nha, ITALY, Trung Quốc, Việt Nam</strong>…
                            </p>
                            <p data-cms-key="about-info-p3">
                                Với đội ngũ kỹ thuật giàu kinh nghiệm và hệ thống kho bãi hiện đại, chúng tôi cam kết mang đến cho khách hàng những thiết bị chất lượng, được kiểm định nghiêm ngặt, lắp đặt đúng kỹ thuật và bảo hành đầy đủ.
                            </p>
                            <p data-cms-key="about-info-p4">
                                Qua nhiều năm hoạt động và phát triển, Trường Linh Phát đã xây dựng được lòng tin vững chắc với hàng trăm khách hàng là các nhà hàng, khách sạn, trường học và bệnh viện trên toàn quốc.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-10">
                            {['ISO 9001:2015', 'Sản xuất tại VN', 'Bảo hành chính hãng', 'Lắp đặt tận nơi', 'Tư vấn miễn phí'].map(tag => (
                                <span key={tag} className="bg-blue-50 text-brand-blue text-xs font-bold px-4 py-2 rounded-full border border-blue-100 shadow-sm">{tag}</span>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="w-full h-full min-h-[450px] relative z-10"
                    >
                        <img src="/Untitled-1.png" alt="Thiết bị bếp công nghiệp" className="w-full h-full object-cover shadow-2xl rounded-lg" />
                    </motion.div>
                </motion.div>
            </section>


            {/* ── TẦM NHÌN & SỨ MỆNH (Redesigned) ── */}
            <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-100/50 skew-x-12 translate-x-20 pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div {...fadeIn} className="text-center mb-20">
                        <span data-cms-key="gioithieu-tag-1" className="inline-block text-xs font-bold uppercase tracking-[0.4em] text-brand-blue mb-4">Định Hướng Phát Triển</span>
                        <h2 data-cms-key="gioithieu-title-1" className="text-4xl md:text-6xl font-black text-zinc-900 uppercase">Tầm Nhìn & Sứ Mệnh</h2>
                        <div className="w-24 h-1.5 bg-brand-blue mx-auto mt-6 rounded-full" />
                    </motion.div>

                    {/* Vision Block */}
                    <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 space-y-8"
                        >
                            <div className="inline-flex items-center gap-4 text-brand-blue font-black tracking-widest uppercase text-sm">
                                <span className="w-12 h-px bg-brand-blue" />
                                <span data-cms-key="gioithieu-vision-tag">The Vision</span>
                            </div>
                            <h3 data-cms-key="gioithieu-vision-title" className="text-3xl md:text-5xl font-black text-zinc-900 leading-tight">
                                TẦM NHÌN <br/><span className="text-brand-blue font-outline text-transparent" style={{ WebkitTextStroke: '1.5px #0056b3' }}>CHIẾN LƯỢC</span>
                            </h3>
                            <p data-cms-key="gioithieu-vision-desc" className="text-zinc-600 text-lg leading-relaxed border-l-4 border-brand-blue pl-8 italic">
                                Trở thành thương hiệu hàng đầu Việt Nam trong lĩnh vực cung cấp thiết bị bếp công nghiệp chất lượng cao, được khách hàng trong nước và quốc tế tin tưởng lựa chọn.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {['Mạng lưới toàn quốc', 'Hợp tác quốc tế', 'Công nghệ quản lý', 'Tiêu chuẩn hàng đầu'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-zinc-700 font-bold group">
                                        <div className="w-2 h-2 rounded-full bg-brand-blue group-hover:scale-150 transition-transform" />
                                        <span data-cms-key={`vision-item-${i}`}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex-1 relative"
                        >
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                                <img src="/api/file-view/modern_kitchen_equipment_factory" className="w-full h-[500px] object-cover hover:scale-110 transition-transform duration-1000" alt="Factory" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Modern Facility</p>
                                    <p className="text-2xl font-black">Nhà máy sản xuất hiện đại</p>
                                </div>
                            </div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl" />
                        </motion.div>
                    </div>

                    {/* Mission Block */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 space-y-8 text-right"
                        >
                            <div className="inline-flex items-center gap-4 text-brand-blue font-black tracking-widest uppercase text-sm justify-end">
                                <span data-cms-key="gioithieu-mission-tag">The Mission</span>
                                <span className="w-12 h-px bg-brand-blue" />
                            </div>
                            <h3 data-cms-key="gioithieu-mission-title" className="text-3xl md:text-5xl font-black text-zinc-900 leading-tight">
                                SỨ MỆNH <br/><span className="text-brand-blue font-outline text-transparent" style={{ WebkitTextStroke: '1.5px #0056b3' }}>TẬN TÂM</span>
                            </h3>
                            <p data-cms-key="gioithieu-mission-desc" className="text-zinc-600 text-lg leading-relaxed border-r-4 border-brand-blue pr-8 italic">
                                Mang đến cho khách hàng những giải pháp thiết bị bếp tối ưu, hiệu quả và tiết kiệm chi phí – giúp nâng cao năng suất vận hành và chất lượng bữa ăn cho hàng triệu người.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-end">
                                {['Tư vấn chuyên sâu', 'Cung cấp giải pháp', 'Hỗ trợ lắp đặt', 'Bảo trì trọn đời'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-zinc-700 font-bold group flex-row-reverse text-right">
                                        <div className="w-2 h-2 rounded-full bg-brand-blue group-hover:scale-150 transition-transform" />
                                        <span data-cms-key={`mission-item-${i}`}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex-1 relative"
                        >
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                                <img src="/api/file-view/quality_control_worker_kitchen" className="w-full h-[500px] object-cover hover:scale-110 transition-transform duration-1000" alt="Mission" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-10 left-10 text-white text-left">
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Quality Control</p>
                                    <p className="text-2xl font-black">Tiêu chuẩn chất lượng khắt khe</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── GIÁ TRỊ CỐT LÕI (Redesigned) ── */}
            <section className="py-24 px-6 bg-white relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-20 items-stretch">
                        <div className="lg:w-1/3">
                            <div className="sticky top-32 space-y-8">
                                <div data-cms-key="core-val-prefix" className="text-brand-blue font-black uppercase tracking-widest text-sm flex items-center gap-4">
                                    <span className="w-10 h-[2px] bg-brand-blue" /> Core Values
                                </div>
                                <h2 data-cms-key="core-val-title" className="text-4xl md:text-5xl font-black text-zinc-900 uppercase leading-tight">Giá Trị Cốt Lõi</h2>
                                <p data-cms-key="core-val-desc" className="text-zinc-500 text-lg leading-relaxed">
                                    Những giá trị nền tảng định hướng mọi chiến lược phát triển và hành động thực thi của chúng tôi trong suốt hành trình phục vụ khách hàng.
                                </p>
                                <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <p className="text-4xl font-black text-brand-blue mb-2">12+</p>
                                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Năm kinh nghiệm trong ngành</p>
                                    </div>
                                    <Award className="absolute -right-4 -bottom-4 w-32 h-32 text-brand-blue opacity-[0.03] group-hover:scale-125 transition-transform duration-500" />
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    num: '01', title: 'Uy Tín', subtitle: 'Foundation',
                                    desc: 'Chúng tôi đặt chữ Tín lên hàng đầu. Từng hợp đồng được thực hiện đúng cam kết, đúng tiến độ, đúng chất lượng – không có ngoại lệ.',
                                    color: '#0057b8', icon: Award
                                },
                                {
                                    num: '02', title: 'Chất Lượng', subtitle: 'Standard',
                                    desc: 'Mọi sản phẩm trước khi xuất xưởng đều được kiểm tra nghiêm ngặt theo tiêu chuẩn ISO 9001:2015. Nguyên liệu có nguồn gốc rõ ràng.',
                                    color: '#1a5276', icon: ShieldCheck
                                },
                                {
                                    num: '03', title: 'Đổi Mới', subtitle: 'Innovation',
                                    desc: 'Thị trường không ngừng thay đổi – chúng tôi không ngừng cập nhật công nghệ mới, những giải pháp hiệu quả và tiết kiệm hơn.',
                                    color: '#0d6efd', icon: Zap
                                },
                                {
                                    num: '04', title: 'Tận Tâm', subtitle: 'Customer First',
                                    desc: 'Đội ngũ kỹ thuật chuyên môn cao sẵn sàng hỗ trợ khách hàng từ khâu tư vấn, lắp đặt cho đến bảo trì sau bán hàng.',
                                    color: '#117a65', icon: Heart
                                },
                            ].map((v) => (
                                <motion.div
                                    key={v.title}
                                    {...fadeIn}
                                    className="p-8 border border-zinc-100 rounded-[2.5rem] bg-zinc-50/50 hover:bg-white hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col group h-full"
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                                            <v.icon className="w-7 h-7" />
                                        </div>
                                        <span className="text-4xl font-black text-zinc-200 group-hover:text-brand-blue/10 transition-colors" style={{ fontFamily: 'serif' }}>{v.num}</span>
                                    </div>
                                    <div className="space-y-4 flex-grow">
                                        <h3 data-cms-key={`core-val-title-${v.num}`} className="text-2xl font-black text-zinc-900 uppercase">
                                            {v.title}
                                        </h3>
                                        <div className="w-10 h-1 bg-brand-blue/30 group-hover:w-20 transition-all duration-500 rounded-full" />
                                        <p data-cms-key={`core-val-desc-${v.num}`} className="text-zinc-500 leading-relaxed text-sm">
                                            {v.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── HỆ THỐNG VĂN PHÒNG ── */}
            <section className="py-24 px-6 bg-zinc-50">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeIn} className="mb-16 border-l-6 border-brand-blue pl-6">
                        <h2 className="text-3xl font-black text-zinc-800 uppercase tracking-wide">Hệ Thống Văn Phòng</h2>
                        <p className="text-zinc-500 text-lg mt-2">Liên hệ với chúng tôi để được tư vấn và hỗ trợ</p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Miền Bắc */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className="bg-brand-blue px-8 py-5 flex items-center justify-between">
                                <h3 className="text-white font-black text-lg uppercase tracking-wider">Văn Phòng Miền Bắc</h3>
                                <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm">Trụ sở chính</span>
                            </div>
                            <div className="p-8">
                                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6 border-b border-zinc-100 pb-4">CÔNG TY CP ĐẦU TƯ XUẤT NHẬP KHẨU TRƯỜNG LINH PHÁT</p>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Địa chỉ', val: 'Cụm Công Nghiệp, Trường An, An Khánh, Hoài Đức, Hà Nội' },
                                        { label: 'Điện thoại', val: '0985.700.057 – 0383.833.666', highlight: true },
                                        { label: 'BIDV – Từ Liêm', val: '21710000372586' },
                                        { label: 'Website', val: 'thietbibepcongnghieptl.com.vn' },
                                    ].map((row, i) => (
                                        <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 border-b border-zinc-50 pb-3 last:border-0 hover:bg-zinc-50/50 p-2 rounded transition-all">
                                            <span className="text-xs font-bold text-zinc-400 uppercase w-32 shrink-0">{row.label}</span>
                                            <span className={`text-sm ${row.highlight ? 'text-brand-blue font-bold' : 'text-zinc-700'}`}>{row.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Miền Trung */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className="bg-[#1a5276] px-8 py-5 flex items-center justify-between">
                                <h3 className="text-white font-black text-lg uppercase tracking-wider">Văn Phòng Miền Trung</h3>
                                <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm">Chi nhánh</span>
                            </div>
                            <div className="p-8">
                                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6 border-b border-zinc-100 pb-4">CÔNG TY CP ĐẦU TƯ XUẤT NHẬP KHẨU TRƯỜNG LINH PHÁT</p>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Địa chỉ', val: 'Số 18 Nguyễn Đức Cảnh, TP Vinh, Nghệ An' },
                                        { label: 'Hotline', val: '0985.700.057 – 0383.833.666', highlight: true },
                                        { label: 'Email', val: 'truonglinhgroup@gmail.com' },
                                    ].map((row, i) => (
                                        <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 border-b border-zinc-50 pb-3 last:border-0 hover:bg-zinc-50/50 p-2 rounded transition-all">
                                            <span className="text-xs font-bold text-zinc-400 uppercase w-32 shrink-0">{row.label}</span>
                                            <span className={`text-sm ${row.highlight ? 'text-brand-blue font-bold' : 'text-zinc-700'}`}>{row.val}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default GioiThieuPage;
