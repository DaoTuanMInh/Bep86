import { Phone } from 'lucide-react';
import { Product } from '../types';
import { categories } from '../data/categories';
import Hero from '../components/home/Hero';
import CoreValues from '../components/home/CoreValues';
import VideoSection from '../components/home/VideoSection';
import BlogSection from '../components/home/BlogSection';
import ContactSection from '../components/home/ContactSection';
import ProductCard from '../components/product/ProductCard';
import ProductSection from '../components/product/ProductSection';
import Footer from '../components/layout/Footer';

import { NewsPost } from '../data/news';

interface HomePageProps {
    products: Product[];
    activeCategory: string;
    onSetActiveCategory: (cat: string) => void;
    onAddToCart: (p: Product) => void;
    onNavigate: (page: string) => void;
    onOpenPost: (post: NewsPost) => void;
}

const HomePage = ({ products, activeCategory, onSetActiveCategory, onAddToCart, onNavigate, onOpenPost }: HomePageProps) => {
    const filteredProducts = products.filter(p => p.category === activeCategory);

    return (
        <>
            <Hero />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <div className="trapezoid-title">SẢN PHẨM NỔI BẬT</div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-zinc-200 pb-4">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => onSetActiveCategory(cat)}
                            className={`px-4 py-2 text-sm font-bold transition-all ${activeCategory === cat
                                ? 'text-brand-blue border-b-2 border-brand-blue'
                                : 'text-zinc-500 hover:text-brand-blue'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-zinc-400">
                            Chưa có sản phẩm trong danh mục này.
                        </div>
                    )}
                </div>

                {/* Section layouts by category */}
                <ProductSection
                    title="Tủ Nấu Cơm"
                    products={products.filter(p => p.category === 'Tủ Nấu Cơm')}
                    onAddToCart={onAddToCart}
                />
                <ProductSection
                    title="Tủ Lạnh Công Nghiệp"
                    products={products.filter(p => p.category === 'Tủ Lạnh Công Nghiệp')}
                    onAddToCart={onAddToCart}
                />
            </main>

            <VideoSection onNavigate={onNavigate} />
            <CoreValues />
            <BlogSection onNavigate={onNavigate} onOpenPost={onOpenPost} />
            <ContactSection />



            <Footer />
        </>
    );
};

export default HomePage;
