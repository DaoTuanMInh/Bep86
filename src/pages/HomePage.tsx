import React from 'react';
import { Phone } from 'lucide-react';
import { Product, NewsPost } from '../types';
import Hero from '../components/home/Hero';
import CoreValues from '../components/home/CoreValues';
import VideoSection from '../components/home/VideoSection';
import BlogSection from '../components/home/BlogSection';
import ContactSection from '../components/home/ContactSection';
import ProductCard from '../components/product/ProductCard';
import ProductSection from '../components/product/ProductSection';
import Footer from '../components/layout/Footer';

interface HomePageProps {
    products: Product[];
    categories: string[];
    newsPosts: NewsPost[];
    activeCategory: string;
    onSetActiveCategory: (cat: string) => void;
    onAddToCart: (p: Product) => void;
    onNavigate: (page: string) => void;
    onOpenPost: (post: NewsPost) => void;
    onOpenProduct?: (product: Product) => void;
    onNavigateToCategory?: (cat: string, sub?: string) => void;
}

const HomePage = ({ products, categories, newsPosts, activeCategory, onSetActiveCategory, onAddToCart, onNavigate, onOpenPost, onOpenProduct, onNavigateToCategory }: HomePageProps) => {
    const filteredProducts = products.filter(p => 
        p.category === activeCategory || p.subCategory === activeCategory
    );

    return (
        <>
            <Hero />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <div data-cms-key="home-featured-products-title" className="trapezoid-title">SẢN PHẨM NỔI BẬT</div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-zinc-200 pb-4">
                    {categories.slice(0, 5).map((cat, index) => (
                        <button
                            key={`${cat}-${index}`}
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
                            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onOpenProduct={onOpenProduct} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-zinc-400">
                            Chưa có sản phẩm trong danh mục này.
                        </div>
                    )}
                </div>

                {/* Section layouts for all categories as requested */}
                <div className="space-y-16">
                    {categories.map((cat, index) => {
                        const catProducts = products.filter(p => p.category === cat);
                        if (catProducts.length === 0) return null;
                        
                        return (
                            <div key={`${cat}-${index}`}>
                                <ProductSection
                                    title={cat}
                                    category={cat}
                                    products={catProducts.slice(0, 6)}
                                    onAddToCart={onAddToCart}
                                    onOpenProduct={onOpenProduct}
                                    onNavigateToCategory={onNavigateToCategory}
                                />
                            </div>
                        );
                    })}
                </div>
            </main>

            <VideoSection onNavigate={onNavigate} />
            <CoreValues />
            <BlogSection newsPosts={newsPosts} onNavigate={onNavigate} onOpenPost={onOpenPost} />
            <ContactSection categories={categories} />

            <Footer />
        </>
    );
};

export default HomePage;
