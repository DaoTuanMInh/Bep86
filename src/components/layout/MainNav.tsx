import React, { useState } from 'react';
import { Menu as MenuIcon, ChevronRight, X, Home, Info, Newspaper, Video, Phone as PhoneIcon, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuCategory } from '../../types';

interface MainNavProps {
    onOpenAdmin: () => void;
    onNavigate: (page: string) => void;
    onNavigateToCategory: (category: string, subCategory?: string) => void;
    currentPage: string;
    menuCategories: MenuCategory[];
}

const MainNav = ({ onOpenAdmin, onNavigate, onNavigateToCategory, currentPage, menuCategories }: MainNavProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredCat, setHoveredCat] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedMobileCat, setExpandedMobileCat] = useState<string | null>(null);

    const handleMobileNavigate = (page: string) => {
        onNavigate(page);
        setMobileMenuOpen(false);
    };

    const navItems = [
        { label: 'Trang chủ', page: 'home', icon: <Home className="w-5 h-5" /> },
        { label: 'Giới thiệu', page: 'about', icon: <Info className="w-5 h-5" /> },
        { label: 'Tin tức', page: 'news', icon: <Newspaper className="w-5 h-5" /> },
        { label: 'Video', page: 'video', icon: <Video className="w-5 h-5" /> },
        { label: 'Liên hệ', page: 'contact', icon: <PhoneIcon className="w-5 h-5" /> },
    ];

    return (
        <>
            <nav className="header-gradient text-white px-4 md:px-6 sticky top-0 z-[100] shadow-md border-t border-white/10">
                <div className="max-w-7xl mx-auto flex items-center h-12 md:h-auto">

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden p-2 -ml-2 hover:bg-white/10 transition-colors"
                    >
                        <MenuIcon className="w-6 h-6" />
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center w-full">
                        {/* Trang chủ */}
                        <span
                            onClick={() => onNavigate('home')}
                            className={`px-5 py-3 text-sm uppercase cursor-pointer transition-all border-r border-white/10 relative group ${currentPage === 'home' ? 'font-bold text-yellow-300' : 'hover:text-yellow-300'}`}
                        >
                            <span data-cms-key="nav-label-home">Trang chủ</span>
                            <span className={`absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transition-transform origin-left ${currentPage === 'home' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                        </span>

                        {/* Danh mục dropdown */}
                        <div
                            className="relative h-full"
                            onMouseEnter={() => setMenuOpen(true)}
                            onMouseLeave={() => { setMenuOpen(false); setHoveredCat(null); }}
                        >
                            <div className="bg-black/10 hover:bg-black/20 transition-all px-6 py-3 flex items-center gap-2 cursor-pointer border-r border-white/10 h-full">
                                <MenuIcon className="w-5 h-5" />
                                <span data-cms-key="nav-cat-label" className="font-bold text-sm uppercase tracking-tight">Danh mục sản phẩm</span>
                            </div>

                            {menuOpen && (
                                <div className="absolute top-full left-0 flex shadow-2xl z-50 min-w-[260px]">
                                    <ul className="bg-white text-zinc-900 w-64 py-2 shadow-2xl border-t-2 border-brand-blue">
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
                                                    className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-brand-blue hover:text-white transition-colors"
                                                >
                                                    <span className="font-medium">{cat.name}</span>
                                                    {cat.sub.length > 0 && <ChevronRight className="w-4 h-4 opacity-50" />}
                                                </a>

                                                {cat.sub.length > 0 && hoveredCat === cat.name && (
                                                    <ul className="absolute left-full top-0 bg-white text-zinc-900 shadow-xl w-64 py-2 border-l border-zinc-100">
                                                        {cat.sub.map(sub => (
                                                            <li key={sub}>
                                                                <a
                                                                    href="#"
                                                                    onClick={e => { e.preventDefault(); onNavigateToCategory(cat.name, sub); setMenuOpen(false); setHoveredCat(null); }}
                                                                    className="block px-4 py-2.5 text-sm hover:bg-brand-blue hover:text-white transition-colors font-medium text-zinc-700"
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

                        {/* Other Desktop Links */}
                        <ul className="flex items-center flex-1">
                            {navItems.slice(1).map(item => (
                                    <li
                                        key={item.label}
                                        onClick={() => onNavigate(item.page)}
                                        className={`px-5 py-3 text-sm uppercase cursor-pointer transition-all relative group ${item.page === currentPage ? 'font-bold text-yellow-300' : 'hover:text-yellow-300'}`}
                                    >
                                        <span data-cms-key={`nav-label-${item.page}`}>{item.label}</span>
                                        <span className={`absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transition-transform origin-left ${item.page === currentPage ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                                    </li>
                            ))}
                        </ul>

                        <button
                            onClick={onOpenAdmin}
                            className="px-6 py-3 text-sm uppercase hover:bg-white/10 transition-all font-bold text-yellow-400 flex items-center gap-2"
                        >
                            <User className="w-4 h-4" /> Admin
                        </button>
                    </div>

                    {/* Mobile Title / Logo Placeholder */}
                    <div data-cms-key="mobile-nav-title" className="md:hidden flex-1 text-center font-black uppercase tracking-widest text-xs opacity-80">
                        Hệ Thống Bếp Công Nghiệp
                    </div>

                    {/* Mobile Cart / Search shortcut would go here if needed */}
                </div>
            </nav>

            {/* Mobile Menu Sidebar */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-[280px] bg-zinc-900 z-[201] shadow-2xl flex flex-col"
                        >
                            <div className="header-gradient p-6 flex justify-between items-center border-b border-white/10">
                                <img src="/logo_new.jpg" className="h-10 rounded shadow-lg" alt="Logo" />
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 bg-white/10 rounded-full text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                <div className="p-4">
                                    <div data-cms-key="mobile-nav-header-nav" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 px-2">Điều hướng</div>
                                    <ul className="space-y-1">
                                        {navItems.map(item => (
                                            <li key={item.page}>
                                                <button
                                                    onClick={() => handleMobileNavigate(item.page)}
                                                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${currentPage === item.page ? 'bg-brand-red text-white' : 'text-zinc-400 hover:bg-zinc-800'}`}
                                                >
                                                    {item.icon}
                                                    <span data-cms-key={`mobile-nav-label-${item.page}`} className="font-bold text-sm">{item.label}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="h-px bg-zinc-800 my-6" />

                                    <div data-cms-key="mobile-nav-header-cat" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 px-2">Danh mục sản phẩm</div>
                                    <ul className="space-y-1">
                                        {menuCategories.map(cat => (
                                            <li key={cat.name}>
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => {
                                                            onNavigateToCategory(cat.name);
                                                            setMobileMenuOpen(false);
                                                        }}
                                                        className="flex-1 text-left px-4 py-3 text-zinc-400 font-bold text-sm hover:text-white transition-colors"
                                                    >
                                                        {cat.name}
                                                    </button>
                                                    {cat.sub.length > 0 && (
                                                        <button
                                                            onClick={() => setExpandedMobileCat(expandedMobileCat === cat.name ? null : cat.name)}
                                                            className="p-3 text-zinc-500"
                                                        >
                                                            <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobileCat === cat.name ? 'rotate-180' : ''}`} />
                                                        </button>
                                                    )}
                                                </div>

                                                {expandedMobileCat === cat.name && cat.sub.length > 0 && (
                                                    <ul className="bg-zinc-800/50 rounded-lg mx-2 mb-2 p-1">
                                                        {cat.sub.map(sub => (
                                                            <li key={sub}>
                                                                <button
                                                                    onClick={() => {
                                                                        onNavigateToCategory(cat.name, sub);
                                                                        setMobileMenuOpen(false);
                                                                    }}
                                                                    className="w-full text-left px-8 py-2.5 text-xs text-zinc-500 hover:text-white"
                                                                >
                                                                    — {sub}
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                                <button
                                    onClick={() => {
                                        onOpenAdmin();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full bg-zinc-800 text-yellow-400 py-3 rounded-lg font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                                >
                                    <User className="w-4 h-4" /> Bảng điều khiển Admin
                                </button>
                                <p className="text-[10px] text-zinc-600 text-center mt-4">© 2024 Bếp 86 Việt Nam</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default MainNav;
