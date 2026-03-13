import React, { useState, useRef } from 'react';
import { ChevronLeft, Calendar, User, Clock, Share2, Save, Image as ImageIcon, Edit3, CheckCircle } from 'lucide-react';
import { NewsPost } from '../types';
import Footer from '../components/layout/Footer';
import { useAdmin } from '../context/AdminContext';
import ImageUploader from '../components/admin/ImageUploader';

interface NewsDetailPageProps {
    post: NewsPost;
    onBack: () => void;
    onNavigate: (page: string) => void;
}

const NewsDetailPage = ({ post, onBack, onNavigate }: NewsDetailPageProps) => {
    const { isAdmin } = useAdmin();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showImageEditor, setShowImageEditor] = useState(false);
    const [editImage, setEditImage] = useState(post.image);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleSave = async () => {
        setSaving(true);
        try {
            const content = contentRef.current?.innerHTML || post.content;
            await fetch(`/api/news/${post.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, image: editImage }),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch {
            alert('Lỗi khi lưu bài viết!');
        } finally {
            setSaving(false);
        }
    };

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
                        {isAdmin && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowImageEditor(v => !v)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${showImageEditor ? 'bg-brand-blue text-white border-brand-blue' : 'border-zinc-300 text-zinc-600 hover:border-brand-blue hover:text-brand-blue'}`}
                                >
                                    <ImageIcon className="w-3.5 h-3.5" />
                                    Đổi ảnh bìa
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold shadow transition-all ${saved ? 'bg-green-500 text-white' : 'bg-brand-blue text-white hover:opacity-90'}`}
                                >
                                    {saved ? (
                                        <><CheckCircle className="w-3.5 h-3.5" /> Đã lưu!</>
                                    ) : saving ? (
                                        <><div className="w-3 h-3 border-2 border-white/50 border-t-white rounded-full animate-spin" /> Đang lưu...</>
                                    ) : (
                                        <><Save className="w-3.5 h-3.5" /> Lưu bài viết</>
                                    )}
                                </button>
                            </div>
                        )}
                        <button className="p-2 text-zinc-400 hover:text-brand-blue transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── IMAGE EDITOR PANEL (admin only) ── */}
            {isAdmin && showImageEditor && (
                <div className="bg-blue-50 border-b border-blue-100">
                    <div className="max-w-4xl mx-auto px-6 py-4">
                        <p className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-3">Đổi ảnh bìa bài viết</p>
                        <ImageUploader
                            value={editImage}
                            onChange={url => setEditImage(url)}
                            label="Ảnh bìa"
                        />
                    </div>
                </div>
            )}

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
                        {isAdmin && (
                            <span className="ml-auto flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                <Edit3 className="w-3 h-3" /> Đang chỉnh sửa
                            </span>
                        )}
                    </div>
                </header>

                {/* ── FEATURED IMAGE ── */}
                <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl">
                    <img
                        src={editImage || post.image}
                        alt={post.title}
                        className="w-full aspect-video object-cover"
                        referrerPolicy="no-referrer"
                    />
                </div>

                {/* ── CONTENT (editable in admin mode) ── */}
                {isAdmin ? (
                    <div
                        ref={contentRef}
                        contentEditable
                        suppressContentEditableWarning
                        className="prose prose-zinc max-w-none outline-none min-h-[200px] rounded-xl border-2 border-dashed border-blue-200 p-6 focus:border-blue-400 focus:bg-blue-50/20 transition-all"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                        data-placeholder="Nhấp để bắt đầu chỉnh sửa nội dung bài viết..."
                    />
                ) : (
                    <div className="prose prose-zinc max-w-none">
                        <div
                            className="space-y-6 text-zinc-700 leading-relaxed text-lg"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                )}

                {isAdmin && (
                    <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-zinc-600 flex items-start gap-3">
                        <Edit3 className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-bold text-zinc-800">Hướng dẫn chỉnh sửa nội dung:</p>
                            <p className="mt-1">• Nhấp trực tiếp vào vùng nội dung phía trên để chỉnh sửa văn bản, tiêu đề, danh sách...</p>
                            <p>• Dùng nút <strong>"Đổi ảnh bìa"</strong> để thay đổi ảnh đầu bài viết (upload từ máy hoặc URL).</p>
                            <p>• Nhấn <strong>"Lưu bài viết"</strong> để lưu tất cả thay đổi vào cơ sở dữ liệu.</p>
                        </div>
                    </div>
                )}

                {/* ── COMPANY CONTACT INFO ── */}
                <div className="mt-12 pt-8 border-t border-zinc-100 space-y-6">
                    <h3 className="text-xl font-bold text-zinc-900 uppercase">
                        CÔNG TY CP ĐẦU TƯ XUẤT NHẬP KHẨU TRƯỜNG LINH PHÁT
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-zinc-900 text-base mb-2 uppercase">VĂN PHÒNG MIỀN BẮC:</h4>
                            <ul className="space-y-2 text-zinc-700 list-disc ml-5 text-sm md:text-base">
                                <li><strong>Địa chỉ:</strong> Cụm Công Nghiệp, Trường An, An Khánh, Hoài Đức, Hà Nội</li>
                                <li><strong>Điện thoại:</strong> 0985.700.057 – 0862.662.022</li>
                                <li><strong>MST:</strong> 0109576264</li>
                                <li><strong>Email:</strong> truonglinhgroup@gmail.com</li>
                                <li><strong>Website:</strong> thietbibepcongnghieptl.com.vn</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-zinc-900 text-base mb-2 uppercase">VĂN PHÒNG MIỀN TRUNG:</h4>
                            <ul className="space-y-2 text-zinc-700 list-disc ml-5 text-sm md:text-base">
                                <li><strong>Địa chỉ:</strong> Số 18 Nguyễn Đức Cảnh, TP Vinh, Nghệ An</li>
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
