import React from 'react';
import { ChevronLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { NewsPost } from '../data/news';
import Footer from '../components/layout/Footer';

interface NewsDetailPageProps {
    post: NewsPost;
    onBack: () => void;
    onNavigate: (page: string) => void;
}

const NewsDetailPage = ({ post, onBack, onNavigate }: NewsDetailPageProps) => {
    return (
        <div className="min-h-screen bg-white">
            {/* ── BREADCRUMB / NAVIGATION ── */}
            <div className="bg-zinc-50 border-b border-zinc-100">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-zinc-500 hover:text-brand-blue font-bold text-sm transition-colors group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Quay lại Tin Tức
                    </button>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-zinc-400 hover:text-brand-blue transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── ARTICLE HEADER ── */}
            <article className="max-w-4xl mx-auto px-6 py-12">
                <header className="mb-10">
                    <div className="flex items-center gap-2 text-zinc-400 text-xs mb-4">
                        <span className="hover:text-brand-blue cursor-pointer" onClick={() => onNavigate('home')}>Trang chủ</span>
                        <span>»</span>
                        <span className="hover:text-brand-blue cursor-pointer font-medium" onClick={onBack}>Tin tức</span>
                        <span>»</span>
                        <span className="text-zinc-500 font-medium truncate max-w-[200px] md:max-w-md">{post.title}</span>
                    </div>

                    <span className="inline-block bg-blue-50 text-brand-blue text-[10px] font-bold uppercase px-3 py-1 rounded-full mb-4 tracking-widest border border-blue-100">
                        {post.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-zinc-900 leading-tight mb-6 mt-2">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-zinc-400 text-sm border-y border-zinc-100 py-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-brand-blue" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-brand-blue" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-brand-blue" />
                            <span>{post.readTime} phút đọc</span>
                        </div>
                    </div>
                </header>

                {/* ── FEATURED IMAGE ── */}
                <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full aspect-video object-cover"
                        referrerPolicy="no-referrer"
                    />
                </div>

                {/* ── CONTENT ── */}
                <div className="prose prose-zinc max-w-none">
                    {/* Simple markdown-to-html transformation for display purposes */}
                    <div className="space-y-6 text-zinc-700 leading-relaxed text-lg">
                        {post.content.split('\n\n').map((block, idx) => {
                            if (block.startsWith('## ')) {
                                return <h2 key={idx} className="text-2xl font-bold text-zinc-900 pt-6 border-b border-zinc-100 pb-2">{block.replace('## ', '')}</h2>;
                            }
                            if (block.startsWith('### ')) {
                                return <h3 key={idx} className="text-xl font-bold text-zinc-900 pt-4">{block.replace('### ', '')}</h3>;
                            }
                            if (block.startsWith('- ')) {
                                return (
                                    <ul key={idx} className="list-disc pl-6 space-y-2">
                                        {block.split('\n').map((li, i) => (
                                            <li key={i}>{li.replace('- ', '')}</li>
                                        ))}
                                    </ul>
                                );
                            }
                            if (block.startsWith('| ')) {
                                // Simplified table rendering
                                const rows = block.trim().split('\n');
                                return (
                                    <div key={idx} className="overflow-x-auto my-8">
                                        <table className="w-full border-collapse border border-zinc-200">
                                            <tbody>
                                                {rows.map((row, rIdx) => (
                                                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-zinc-50' : 'bg-white'}>
                                                        {row.split('|').filter(c => c.trim()).map((cell, cIdx) => (
                                                            <td key={cIdx} className="border border-zinc-200 px-4 py-2 font-medium">{cell.trim()}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                );
                            }
                            // Simple bold text handling **text**
                            const parts = block.split(/(\*\*.*?\*\*)/);
                            return (
                                <p key={idx}>
                                    {parts.map((part, pIdx) => {
                                        if (part.startsWith('**') && part.endsWith('**')) {
                                            return <strong key={pIdx} className="font-bold text-zinc-900">{part.slice(2, -2)}</strong>;
                                        }
                                        return part;
                                    })}
                                </p>
                            );
                        })}
                    </div>
                </div>

                {/* ── COMPANY CONTACT INFO (SIMPLE) ── */}
                <div className="mt-12 pt-8 border-t border-zinc-100 space-y-6">
                    <h3 className="text-xl font-bold text-zinc-900 uppercase">
                        CÔNG TY CP ĐẦU TƯ XUẤT NHẬP KHẨU TRƯỜNG LINH PHÁT
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-zinc-900 text-base mb-2 uppercase">VĂN PHÒNG MIỀN BẮC:</h4>
                            <ul className="space-y-2 text-zinc-700 list-disc ml-5 text-sm md:text-base">
                                <li><strong>Địa chỉ:</strong> Cụm Công Nghiệp, Trường An, An Khánh, Hoài Đức, Hà Nội</li>
                                <li><strong>Điện thoại:</strong> – 0985.700.057 – 0862.662.022</li>
                                <li><strong>MST:</strong> 0109576264</li>
                                <li><strong>Email:</strong> truonglinhgroup@gmail.com</li>
                                <li><strong>Website:</strong> thietbibepcongnghieptl.com.vn</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-zinc-900 text-base mb-2 uppercase">VĂN PHÒNG MIỀN TRUNG:</h4>
                            <ul className="space-y-2 text-zinc-700 list-disc ml-5 text-sm md:text-base">
                                <li><strong>Địa chỉ:</strong> Số 18 Nguyễn Đức Cảnh, TP Vinh Nghệ An</li>
                                <li><strong>Điện thoại:</strong></li>
                                <li><strong>Hotline:</strong> 0985.700.057 – 0862.662.022</li>
                                <li><strong>Email:</strong> truonglinhgroup@gmail.com</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-6 italic text-zinc-500 border-t border-zinc-100">
                        "Cam kết cung cấp giải pháp thiết bị bếp công nghiệp toàn diện, bền bỉ và hiệu quả nhất cho mọi khách hàng."
                    </div>
                </div>
            </article>

            <Footer />
        </div>
    );
};

export default NewsDetailPage;
