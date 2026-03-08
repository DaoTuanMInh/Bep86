import React from 'react';
import { Menu, ChevronRight } from 'lucide-react';
import { menuCategories } from '../../data/categories';

interface MainNavProps {
    onOpenAdmin: () => void;
    onNavigate: (page: string) => void;
    onNavigateToCategory: (category: string, subCategory?: string) => void;
    currentPage: string;
}

const MainNav = ({ onOpenAdmin, onNavigate, onNavigateToCategory, currentPage }: MainNavProps) => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [hoveredCat, setHoveredCat] = React.useState<string | null>(null);

    return (
        <nav className="header-gradient text-white px-6 sticky top-0 z-[100] shadow-md border-t border-white/10">
            <div className="max-w-7xl mx-auto flex items-center">

                {/* Trang chủ – nằm đầu tiên */}
                <span
                    onClick={() => onNavigate('home')}
                    className={`px-5 py-3 text-sm uppercase cursor-pointer transition-all border-r border-white/10 relative group ${currentPage === 'home' ? 'font-bold' : 'hover:text-yellow-300'}`}
                >
                    Trang chủ
                    <span className={`absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transition-transform origin-left ${currentPage === 'home' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </span>

                {/* Danh mục sản phẩm dropdown trigger */}
                <div
                    className="relative"
                    onMouseEnter={() => setMenuOpen(true)}
                    onMouseLeave={() => { setMenuOpen(false); setHoveredCat(null); }}
                >
                    <div className="bg-black/10 hover:bg-black/20 transition-all px-6 py-3 flex items-center gap-2 cursor-pointer border-r border-white/10 relative group">
                        <Menu className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase">Danh mục sản phẩm</span>
                    </div>

                    {/* Dropdown panel */}
                    {menuOpen && (
                        <div className="absolute top-full left-0 flex shadow-2xl z-50 min-w-[260px]">
                            {/* Main list */}
                            <ul className="header-gradient text-white w-64 py-2 shadow-2xl border-t border-white/10">
                                {menuCategories.map(cat => (
                                    <li
                                        key={cat.name}
                                        className="relative"
                                        onMouseEnter={() => setHoveredCat(cat.sub.length > 0 ? cat.name : null)}
                                        onMouseLeave={() => setHoveredCat(null)}
                                    >
                                        <a
                                            href="#"
                                            onClick={e => { e.preventDefault(); onNavigateToCategory(cat.name); setMenuOpen(false); }}
                                            className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-white/15 transition-colors"
                                        >
                                            <span className="font-medium group-hover:-translate-y-0.5 transition-transform">{cat.name}</span>
                                            {cat.sub.length > 0 && <ChevronRight className="w-4 h-4 text-white/60" />}
                                        </a>

                                        {/* Submenu */}
                                        {cat.sub.length > 0 && hoveredCat === cat.name && (
                                            <ul className="absolute left-full top-0 header-gradient text-white shadow-xl w-64 py-2 border-l border-white/20">
                                                {cat.sub.map(sub => (
                                                    <li key={sub}>
                                                        <a
                                                            href="#"
                                                            onClick={e => { e.preventDefault(); onNavigateToCategory(cat.name, sub); setMenuOpen(false); setHoveredCat(null); }}
                                                            className="block px-4 py-2.5 text-sm hover:bg-white/15 transition-colors font-medium"
                                                        >
                                                            {sub}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Các mục còn lại */}
                <ul className="flex items-center flex-1">
                    {[
                        { label: 'Giới thiệu', page: 'about' },
                        { label: 'Tin tức', page: 'news' },
                        { label: 'Video', page: 'video' },
                        { label: 'Liên hệ', page: 'contact' },
                    ].map(item => (
                        <li
                            key={item.label}
                            onClick={() => onNavigate(item.page)}
                            className={`px-5 py-3 text-sm uppercase cursor-pointer transition-all relative group ${item.page === currentPage ? 'font-bold' : 'hover:text-yellow-300'}`}
                        >
                            {item.label}
                            <span className={`absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transition-transform origin-left ${item.page === currentPage ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                        </li>
                    ))}
                </ul>

                <button
                    onClick={onOpenAdmin}
                    className="px-6 py-3 text-sm uppercase hover:bg-white/10 transition-all font-bold text-yellow-400"
                >
                    Admin
                </button>
            </div>
        </nav>
    );
};

export default MainNav;
