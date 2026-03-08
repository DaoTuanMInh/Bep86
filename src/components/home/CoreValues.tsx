const CoreValues = () => (
    <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-black text-brand-blue uppercase tracking-wide mb-2">
                    BẾP 86 – NÂNG TẦM GIÁ TRỊ VIỆT
                </h2>
                <p className="text-zinc-500 text-sm mb-3">Khách hàng là thượng đế – phải quan tâm đến trải nghiệm của khách hàng</p>
                <div className="flex justify-center gap-1">
                    <span className="w-8 h-0.5 bg-brand-blue rounded-full inline-block"></span>
                    <span className="w-3 h-0.5 bg-brand-red rounded-full inline-block"></span>
                    <span className="w-8 h-0.5 bg-brand-blue rounded-full inline-block"></span>
                </div>
            </div>

            {/* 3-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                {/* Left: 2 values */}
                <div className="flex flex-col gap-10">
                    {[
                        {
                            title: 'DỊCH VỤ UY TÍN',
                            desc: 'Cung cấp các dịch vụ uy tín đem đến cho khách hàng những lợi ích thiết thực và bền vững',
                            svg: (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-brand-blue">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                </svg>
                            )
                        },
                        {
                            title: 'HỖ TRỢ NHIỆT TÌNH',
                            desc: 'Với đội ngũ nhân viên có trình độ kỹ thuật và chuyên môn cao, sẽ nhiệt tình hỗ trợ quý khách trong mọi trường hợp.',
                            svg: (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-brand-blue">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            )
                        },
                    ].map(v => (
                        <div key={v.title} className="flex flex-col items-center text-center gap-3">
                            <div className="w-16 h-16 rounded-full border-2 border-dashed border-brand-blue flex items-center justify-center bg-blue-50">
                                {v.svg}
                            </div>
                            <h3 className="font-black text-sm text-zinc-800 uppercase tracking-wide">{v.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Center: product image */}
                <div className="flex items-center justify-center">
                    <img
                        src="/Untitled-1.png"
                        alt="Bếp 86 – Sản phẩm chất lượng"
                        className="w-full max-w-sm rounded-xl shadow-lg object-cover"
                    />
                </div>

                {/* Right: 2 values */}
                <div className="flex flex-col gap-10">
                    {[
                        {
                            title: 'SỬ DỤNG AN TOÀN',
                            desc: 'Sản phẩm từ Bếp 86 giúp bạn dễ dàng trong khâu bảo quản thực phẩm đơn giản và an toàn',
                            svg: (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-brand-blue">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                </svg>
                            )
                        },
                        {
                            title: 'SẢN PHẨM CHẤT LƯỢNG',
                            desc: 'Sản phẩm được sản xuất trên dây chuyền công nghệ đạt chuẩn ISO 9001:2015',
                            svg: (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-brand-blue">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                                </svg>
                            )
                        },
                    ].map(v => (
                        <div key={v.title} className="flex flex-col items-center text-center gap-3">
                            <div className="w-16 h-16 rounded-full border-2 border-dashed border-brand-blue flex items-center justify-center bg-blue-50">
                                {v.svg}
                            </div>
                            <h3 className="font-black text-sm text-zinc-800 uppercase tracking-wide">{v.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default CoreValues;
