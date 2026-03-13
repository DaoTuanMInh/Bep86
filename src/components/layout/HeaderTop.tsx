import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ShoppingCart, Search, X, Phone, MapPin } from 'lucide-react';
import { Product } from '../../types';

interface HeaderTopProps {
    cartCount: number;
    onOpenCart: () => void;
    onNavigate?: (page: string) => void;
    products?: Product[];
    onNavigateToCategory?: (category: string, subCategory?: string) => void;
    onOpenProduct?: (product: Product) => void;
}

const HeaderTop = ({ cartCount, onOpenCart, onNavigate, products = [], onNavigateToCategory, onOpenProduct }: HeaderTopProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Xử lý click ra ngoài để đóng popup tìm kiếm
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Lọc sản phẩm theo từ khóa
    const searchResults = useMemo(() => {
        if (!searchTerm.trim()) return [];
        const lowerTerm = searchTerm.toLowerCase();
        return products.filter(p =>
            p.name.toLowerCase().includes(lowerTerm) ||
            p.category.toLowerCase().includes(lowerTerm) ||
            p.subCategory?.toLowerCase().includes(lowerTerm)
        ).slice(0, 6); // Lấy tối đa 6 kết quả
    }, [searchTerm, products]);

    const handleSearchSelect = (product: Product) => {
        setSearchTerm('');
        setIsFocused(false);
        if (onOpenProduct) {
            onOpenProduct(product);
        } else if (onNavigateToCategory) {
            onNavigateToCategory(product.category, product.subCategory || '');
        }
    };

    return (
        <div className="header-gradient text-white py-3 px-6 relative z-[200]">
            <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => onNavigate ? onNavigate('home') : window.location.href = '/'}>
                    <img src="/logo_new.jpg" alt="Logo Bếp 86" className="h-12 md:h-16 rounded-lg shadow-sm" />
                </div>

                {/* Thanh tìm kiếm */}
                <div className="flex-1 max-w-2xl relative" ref={searchRef}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            className="w-full bg-white/20 border border-white/30 rounded-md py-2 md:py-2.5 px-3 md:px-4 pr-10 outline-none placeholder:text-white/70 focus:bg-white focus:text-zinc-900 focus:placeholder:text-zinc-400 transition-colors text-sm"
                        />
                        {searchTerm ? (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                <X className="w-5 h-5 text-zinc-400 hover:text-red-500 transition-colors" />
                            </button>
                        ) : (
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Search className={`w-5 h-5 ${isFocused ? 'text-brand-blue' : 'text-zinc-400'}`} />
                            </button>
                        )}
                    </div>

                    {/* Popup Gợi ý tìm kiếm */}
                    {isFocused && searchTerm.trim() !== '' && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-zinc-200 overflow-hidden z-[100]">
                            {searchResults.length > 0 ? (
                                <ul className="max-h-[400px] overflow-y-auto">
                                    <li className="px-4 py-2 bg-zinc-50 border-b border-zinc-100 text-xs font-bold uppercase text-zinc-500">
                                        Sản phẩm gợi ý
                                    </li>
                                    {searchResults.map(product => (
                                        <li
                                            key={product.id}
                                            onClick={() => handleSearchSelect(product)}
                                            className="px-4 py-3 flex items-center gap-4 hover:bg-brand-blue/5 cursor-pointer border-b border-zinc-100 last:border-b-0 transition-colors"
                                        >
                                            <div className="w-12 h-12 flex-shrink-0 border border-zinc-200 p-0.5 bg-white">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-zinc-800 line-clamp-1 group-hover:text-brand-blue">{product.name}</h4>
                                                <p className="text-xs text-zinc-500 mt-0.5">{product.category}</p>
                                            </div>
                                            <div className="font-bold text-brand-red text-sm flex-shrink-0">
                                                {product.price.toLocaleString('vi-VN')}đ
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="px-4 py-8 text-center text-zinc-500">
                                    <Search className="w-8 h-8 mx-auto text-zinc-300 mb-2" />
                                    <p className="text-sm">Không tìm thấy sản phẩm <span className="font-bold text-zinc-700">"{searchTerm}"</span></p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Các nút Header Right */}
                <div className="flex items-center gap-3 md:gap-6 flex-shrink-0 ml-2">
                    {/* Phone - Ẩn trên mobile nhỏ */}
                    <div className="hidden lg:flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                            <Phone className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span data-cms-key="header-phone-label" className="text-[10px] uppercase tracking-wider text-white/80 font-bold">Gọi mua hàng</span>
                            <a href="tel:0985700057" data-cms-link="header-phone-link" data-cms-key="header-phone-val" className="font-black text-sm hover:text-yellow-400 transition-colors">0985.700.057</a>
                        </div>
                    </div>

                    {/* Stores - Ẩn trên mobile nhỏ */}
                    <button
                        onClick={() => onNavigate && onNavigate('contact')}
                        className="hidden md:flex items-center gap-2 hover:text-yellow-400 transition-colors group"
                    >
                        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <MapPin className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] uppercase tracking-wider text-white/80 font-bold">Hệ thống</span>
                            <span className="font-black text-sm">Cửa hàng</span>
                        </div>
                    </button>

                    {/* Giỏ hàng */}
                    <button
                        onClick={() => onNavigate ? onNavigate('checkout') : onOpenCart()}
                        className="flex items-center gap-2 border border-white/30 rounded-md py-2 px-3 md:px-4 hover:bg-white/10 transition-all"
                    >
                        <div className="relative">
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        <span className="font-bold text-xs hidden sm:inline-block">Giỏ hàng</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;
