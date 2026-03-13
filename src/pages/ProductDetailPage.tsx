import React, { useState, useEffect } from 'react';
import { ShoppingCart, ChevronRight, CheckCircle, ShieldCheck, Truck, Clock, Star, MessageCircle, MapPin, Phone, MessageSquare, Gift, CreditCard, ShoppingBag, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { Product } from '../types';
import Footer from '../components/layout/Footer';

import { api } from '../services/api';

interface ProductDetailPageProps {
    product: Product;
    onAddToCart: (p: Product) => void;
    onBack: () => void;
    onNavigate?: (page: string) => void;
    onOpenProduct?: (product: Product) => void;
}

const ProductDetailPage = ({ product, onAddToCart, onBack, onNavigate, onOpenProduct }: ProductDetailPageProps) => {
    const [added, setAdded] = useState(false);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const [activeThumbnail, setActiveThumbnail] = useState(0);
    const [isDescExpanded, setIsDescExpanded] = useState(false);

    // Dùng chính ảnh cũ làm các thumbnail mô phỏng
    const thumbnails = [product.image, product.image, product.image, product.image];

    useEffect(() => {
        api.getProducts().then(all => {
            // Lấy ngẫu nhiên vài sản phẩm cùng danh mục
            const similar = all.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
            setSimilarProducts(similar);
        });
    }, [product]);

    const handleAdd = () => {
        onAddToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-xs text-zinc-500 font-medium overflow-x-auto whitespace-nowrap">
                    <span className="hover:text-brand-blue cursor-pointer transition-colors" onClick={() => onNavigate?.('home')}>Trang chủ</span>
                    <ChevronRight className="w-3 h-3 text-zinc-300" />
                    <span className="hover:text-brand-blue cursor-pointer transition-colors" onClick={onBack}>Sản phẩm</span>
                    <ChevronRight className="w-3 h-3 text-zinc-300" />
                    <span className="text-brand-blue">{product.name}</span>
                </div>
            </div>

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-8 pb-0">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* --- CỘT TRÁI: HÌNH ẢNH (lg:col-span-4) --- */}
                    <div className="lg:col-span-4 lg:sticky lg:top-4 self-start">
                        <div className="bg-white border border-gray-200 rounded-sm p-4 shadow-sm">
                            <div className="aspect-square bg-white relative overflow-hidden group mb-4">
                                <img
                                    data-cms-key={`product-img-${product.id}`}
                                    src={thumbnails[activeThumbnail]}
                                    alt={product.name}
                                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex gap-2 justify-center overflow-x-auto pb-2">
                                {thumbnails.map((img, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setActiveThumbnail(i)}
                                        className={`w-16 h-16 md:w-20 md:h-20 border-2 p-1 rounded-sm cursor-pointer transition-all ${i === activeThumbnail ? 'border-brand-blue shadow-md' : 'border-gray-100 hover:border-brand-blue/30'}`}
                                    >
                                        <img src={img} className="w-full h-full object-contain" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center gap-3 mt-4 text-[12px] text-zinc-400 font-medium">
                            <span>Thương hiệu: <span className="text-brand-blue font-bold">Trường Linh</span></span>
                            <span className="text-gray-300">|</span>
                            <span>Mã sản phẩm: <span className="text-brand-blue font-bold">{product.id.substring(0, 8)}</span></span>
                        </div>
                    </div>

                    {/* --- CỘT GIỮA: THÔNG TIN CHI TIẾT (lg:col-span-5) --- */}
                    <div className="lg:col-span-5 space-y-5">
                        <h1 className="text-xl md:text-2xl font-black text-zinc-900 leading-tight" data-no-edit>
                            {product.name}
                        </h1>

                        <div className="flex items-baseline gap-3" data-no-edit>
                            <span className="text-3xl font-black text-[#ff0000]">
                                {product.price.toLocaleString('vi-VN')}₫
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                                <>
                                    <span className="text-zinc-400 line-through text-base">
                                        {product.originalPrice.toLocaleString('vi-VN')}₫
                                    </span>
                                    <span className="bg-[#ff0000] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm">
                                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                    </span>
                                </>
                            )}
                        </div>
                        {product.originalPrice && product.originalPrice > product.price && (
                            <div className="text-[12px] text-zinc-500 italic -mt-4">
                                (Tiết kiệm: <span className="text-red-500 font-bold">{(product.originalPrice - product.price).toLocaleString('vi-VN')}₫</span>)
                            </div>
                        )}

                        {/* Khối khuyến mãi vàng */}
                        <div className="border border-yellow-400 rounded-md overflow-hidden bg-white shadow-sm ring-1 ring-yellow-400/20">
                            <div className="bg-[#f1c40f] px-4 py-2 flex items-center gap-2 admin-ignore">
                                <Gift className="w-4 h-4 text-white" />
                                <span className="text-white font-black text-xs uppercase tracking-wide">Mô tả - Khuyến mãi - Ưu đãi</span>
                            </div>
                            <ul className="p-4 space-y-3 text-[13px] text-zinc-800 font-medium leading-relaxed">
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0 inline-block"></span>
                                    <span>Thiết kế hiện đại, tinh tế.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0 inline-block"></span>
                                    <span>Toàn bộ bằng chất liệu inox cao cấp không gỉ.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0 inline-block"></span>
                                    <span>Độ bền cao, chịu nhiệt và va đập tốt.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0 inline-block"></span>
                                    <span>Tiết kiệm năng lượng, bảo hành 12 tháng.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Số lượng và CTA */}
                        <div className="space-y-4 pt-2" data-no-edit>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-zinc-600">Số lượng:</span>
                                <div className="flex border border-gray-300 rounded overflow-hidden shadow-sm">
                                    <button className="px-4 py-1.5 bg-gray-50 hover:bg-gray-100 border-r border-gray-300 transition-colors font-bold text-zinc-600">-</button>
                                    <input type="text" value="1" className="w-12 text-center text-sm font-black focus:outline-none" readOnly />
                                    <button className="px-4 py-1.5 bg-gray-50 hover:bg-gray-100 border-l border-gray-300 transition-colors font-bold text-zinc-600">+</button>
                                </div>
                            </div>

                            <button
                                onClick={handleAdd}
                                className="w-full bg-[#f44336] hover:bg-red-700 text-white p-4 rounded-md shadow-lg shadow-red-500/10 transition-all group active:scale-[0.98]"
                            >
                                <div className="font-black text-[18px] uppercase tracking-wide group-hover:scale-105 transition-transform">Mua ngay</div>
                                <div className="text-[11px] opacity-90 font-medium">Giao hàng tận nơi hoặc nhận tại cửa hàng</div>
                            </button>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="border-2 border-[#f44336] text-[#f44336] py-3 rounded-md font-black text-xs uppercase hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                                    Thêm vào giỏ
                                </button>
                                <button className="border-2 border-[#1f73b7] text-[#1f73b7] py-2.5 rounded-md font-black text-xs uppercase hover:bg-blue-50 transition-all flex flex-col items-center justify-center leading-none">
                                    <span className="mb-1">Mua trả góp</span>
                                    <span className="text-[9px] font-normal lowercase opacity-80 italic">Duyệt hồ sơ trong 5 phút</span>
                                </button>
                            </div>

                            <div className="text-center pt-2">
                                <p className="text-[13px] text-zinc-600">
                                    <span data-cms-key="product-cta-label">Gọi đặt mua:</span> <a href="tel:0985700057" data-cms-link="product-cta-link" data-cms-key="product-cta-val" className="text-orange-500 font-black text-xl hover:underline">0985.700.057</a> <span data-cms-key="product-cta-hours" className="text-zinc-400 font-normal italic">(8:00 - 22:00)</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- CỘT PHẢI: CHÍNH SÁCH & CHAT (lg:col-span-3) --- */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-6">
                            <div className="flex items-start gap-4">
                                <Truck className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <p className="text-[12px] leading-relaxed text-zinc-700 font-medium">
                                    <strong className="text-zinc-900">Giao hàng miễn phí</strong> trong 24h (chỉ áp dụng khu vực nội thành Hà Nội và Tp Hồ Chí Minh)
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <ShoppingBag className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <p className="text-[12px] leading-relaxed text-zinc-700 font-medium">
                                    <strong className="text-zinc-900">Đặt hàng và mua hàng</strong> nhanh chóng, thuận lợi qua Hotline.
                                </p>
                            </div>

                            <div className="flex items-start gap-4">
                                <ShieldCheck className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <p className="text-[12px] leading-relaxed text-zinc-700 font-medium">
                                    <strong className="text-zinc-900">Bảo hành 12 tháng</strong>, bảo trì trọn đời sản phẩm.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <div className="bg-gray-50/80 border-b border-gray-100 px-4 py-3">
                                <h4 className="text-[12px] font-black uppercase text-zinc-800 tracking-wider text-center">Chat với chúng tôi</h4>
                            </div>
                            <div className="p-4 space-y-3">
                                <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-[#0084ff] hover:bg-blue-100 transition-colors rounded-md text-[13px] font-bold shadow-sm">
                                    <MessageCircle className="w-4 h-4" />
                                    Chat Zalo
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-brand-blue hover:bg-blue-100 transition-colors rounded-md text-[13px] font-bold shadow-sm">
                                    <Send className="w-4 h-4 rotate-[-20deg]" />
                                    Nhắn tin trực tiếp
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1 space-y-4">
                            {/* 2. Phần Mô tả chi tiết */}
                            <div className="bg-white border border-gray-200 mt-2 mb-2 shadow-sm">
                                <div className="flex">
                                    <div className="bg-[#1f73b7] text-white px-6 py-3.5 font-bold uppercase tracking-wide inline-block text-[15px]">
                                        THÔNG TIN SẢN PHẨM
                                    </div>
                                </div>
                                <div className="border-t-2 border-[#1f73b7] w-full"></div>
                                <div className="p-6 md:p-8 relative">
                                    <div className={`relative ${!isDescExpanded ? 'max-h-[600px] overflow-hidden' : ''}`}>
                                        {product.description ? (
                                            <div
                                                className="prose prose-sm max-w-none text-zinc-700 leading-relaxed font-medium"
                                                dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br />') }}
                                            />
                                        ) : (
                                            <p className="italic text-zinc-400 text-sm">
                                                Bấm vào đây để sửa mô tả sản phẩm. Thông tin này sẽ được lưu tự động.
                                            </p>
                                        )}
                                        {/* Gradient fade when collapsed */}
                                        {!isDescExpanded && (
                                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                                        )}
                                    </div>
                                    <div className="mt-4 flex justify-center">
                                        <button
                                            onClick={() => setIsDescExpanded(!isDescExpanded)}
                                            className="flex items-center gap-2 px-6 py-2.5 border border-[#1f73b7] text-[#1f73b7] rounded-md font-bold text-sm hover:bg-blue-50 transition-colors"
                                        >
                                            {isDescExpanded ? (
                                                <>Thu gọn nội dung <ChevronUp className="w-4 h-4" /></>
                                            ) : (
                                                <>Xem thêm nội dung <ChevronDown className="w-4 h-4" /></>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Phần Đánh giá, lọc đánh giá */}
                            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-sm shadow-sm mt-2">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                                    <h2 className="text-lg font-black text-zinc-800 uppercase tracking-wide">
                                        Đánh giá & nhận xét {product.name}
                                    </h2>
                                </div>

                                {/* Khu vực đánh giá tổng quan */}
                                <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-8 border border-gray-100 p-6 rounded-lg bg-gray-50/50">
                                    <div className="text-center">
                                        <div className="text-5xl font-black text-brand-red mb-2">0.0<span className="text-2xl text-zinc-400">/5</span></div>
                                        <div className="flex items-center justify-center gap-1 text-zinc-300 mb-2">
                                            <Star className="w-5 h-5 fill-current" />
                                            <Star className="w-5 h-5 fill-current" />
                                            <Star className="w-5 h-5 fill-current" />
                                            <Star className="w-5 h-5 fill-current" />
                                            <Star className="w-5 h-5 fill-current" />
                                        </div>
                                        <div className="text-xs text-zinc-500 font-medium whitespace-nowrap">0 đánh giá và nhận xét</div>
                                    </div>

                                    <div className="w-px h-24 bg-gray-200 hidden md:block"></div>

                                    <div className="flex-1 w-full max-w-sm space-y-2">
                                        {[5, 4, 3, 2, 1].map(num => (
                                            <div key={num} className="flex items-center gap-3 text-xs">
                                                <div className="flex items-center gap-1 font-bold text-zinc-700 w-10">
                                                    {num} <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                </div>
                                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-brand-red" style={{ width: '0%' }}></div>
                                                </div>
                                                <div className="text-zinc-500 font-medium w-6 text-right">0</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bộ lọc */}
                                <div className="flex items-center gap-3 mb-6 text-sm font-medium border-b border-gray-100 pb-4 overflow-x-auto whitespace-nowrap">
                                    <span className="text-zinc-600 font-bold mr-2">Lọc theo:</span>
                                    {['Tất cả', 'Có hình ảnh', 'Đã mua hàng', '5 sao', '4 sao', '3 sao', '2 sao', '1 sao'].map(filter => (
                                        <button key={filter} className={`px-4 py-1.5 rounded-full border text-xs transition-colors ${filter === 'Tất cả' ? 'border-brand-red text-brand-red bg-red-50' : 'border-gray-200 text-zinc-600 hover:border-gray-300 hover:bg-gray-50'}`}>
                                            {filter}
                                        </button>
                                    ))}
                                </div>

                                {/* Form Chưa có đánh giá */}
                                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200 mb-6 flex flex-col items-center">
                                    <MessageCircle className="w-12 h-12 text-zinc-300 mb-3" />
                                    <p className="text-zinc-500 text-sm font-medium mb-1">Hiện chưa có đánh giá nào.</p>
                                    <p className="text-zinc-700 text-sm font-bold mb-5">Bạn sẽ là người đầu tiên đánh giá sản phẩm này chứ?</p>
                                    <button className="bg-brand-red text-white font-bold text-sm px-8 py-2.5 rounded hover:bg-red-700 transition">
                                        Đánh giá ngay
                                    </button>
                                </div>

                                {/* Khu vực nhập review */}
                                <div className="bg-white border border-gray-200 p-5 rounded">
                                    <h3 className="text-sm font-black mb-4">Đánh giá chung</h3>
                                    <div className="flex gap-4 mb-4 text-xs font-bold text-zinc-500 uppercase justify-center sm:justify-start">
                                        {['Rất Tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'].map((lv, i) => (
                                            <div key={lv} className="flex flex-col items-center gap-1 cursor-pointer hover:text-yellow-500 transition-colors">
                                                <Star className="w-6 h-6 text-gray-300" />
                                                <span className="text-[10px] mt-1">{lv}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-3">
                                        <textarea
                                            className="w-full border border-gray-300 rounded p-3 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition"
                                            rows={3}
                                            placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm (nhập tối thiểu 15 kí tự)"
                                        ></textarea>
                                        <div className="flex justify-between items-center mt-2">
                                            <button className="text-brand-blue text-sm font-medium border border-blue-200 px-4 py-1.5 rounded bg-blue-50 flex items-center gap-2 hover:bg-blue-100 transition">
                                                + Thêm hình ảnh
                                            </button>
                                            <button className="bg-zinc-800 text-white font-bold text-sm px-6 py-2 rounded hover:bg-black transition">
                                                Gửi Đánh Giá
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 4. Phần Hỏi và Đáp */}
                            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-sm shadow-sm mt-2">
                                <h2 className="text-lg font-black text-zinc-800 uppercase tracking-wide border-b border-gray-100 pb-4 mb-6 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-brand-blue" />
                                    Hỏi & Đáp
                                </h2>
                                <div className="bg-blue-50/50 p-4 border border-blue-100 rounded text-sm text-zinc-700 mb-6 flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 border border-blue-200 shadow-sm text-brand-blue relative">
                                        <span className="font-black text-[10px] tracking-tighter leading-none text-center">Bếp<br />86</span>
                                    </div>
                                    <div className="pt-1">
                                        <p className="font-bold text-base mb-1 text-zinc-800">Hãy đặt câu hỏi cho chúng tôi</p>
                                        <p className="leading-relaxed mb-1">
                                            Trường Linh Phát sẽ phản hồi trong vòng 1 giờ. Nếu Quý khách gửi câu hỏi sau 22h, chúng tôi sẽ trả lời vào sáng hôm sau.
                                        </p>
                                        <p className="text-xs italic text-zinc-500">
                                            Thông tin có thể thay đổi theo thời gian, vui lòng đặt câu hỏi để nhận được cập nhật mới nhất!
                                        </p>
                                    </div>
                                </div>

                                <div className="relative">
                                    <textarea
                                        className="w-full border border-gray-300 rounded p-4 pb-14 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition resize-none min-h-[100px]"
                                        placeholder="Viết câu hỏi của bạn tại đây..."
                                    ></textarea>
                                    <button className="absolute right-3 bottom-3 bg-brand-blue text-white font-bold text-xs px-5 py-2.5 rounded shadow-sm hover:bg-blue-700 transition">
                                        Gửi câu hỏi
                                    </button>
                                </div>
                            </div>

                            {/* 5. Sản phẩm khác */}
                            {similarProducts.length > 0 && (
                                <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-sm shadow-sm mt-2">
                                    <h2 className="text-lg font-black text-zinc-800 uppercase tracking-wide border-b border-gray-100 pb-3 mb-6 block">
                                        Sản phẩm khác
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {similarProducts.map(p => (
                                            <div
                                                key={p.id}
                                                className="group border border-gray-200 hover:border-brand-blue hover:shadow-lg transition cursor-pointer flex flex-col bg-white"
                                                onClick={() => onOpenProduct && onOpenProduct(p)}
                                            >
                                                <div className="aspect-square bg-white p-3 overflow-hidden relative border-b border-gray-100 mb-2 mt-2 mx-2">
                                                    <img src={p.image} className="w-full h-full object-contain group-hover:scale-105 transition duration-500" />
                                                </div>
                                                <div className="p-3 pt-0 flex flex-col flex-1">
                                                    <h3 className="text-xs font-bold text-zinc-800 line-clamp-2 leading-snug mb-2 group-hover:text-brand-blue transition flex-1">{p.name}</h3>
                                                    <div className="font-black text-brand-red text-sm">
                                                        {p.price.toLocaleString('vi-VN')}₫
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetailPage;
