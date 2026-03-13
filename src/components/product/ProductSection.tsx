import React from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductSectionProps {
    title: string;
    products: Product[];
    onAddToCart: (p: Product) => void;
    onOpenProduct?: (p: Product) => void;
    onNavigateToCategory?: (cat: string, sub?: string) => void;
    category?: string;
    subCategory?: string;
}

const ProductSection = ({ title, products, onAddToCart, onOpenProduct, onNavigateToCategory, category, subCategory }: ProductSectionProps) => (
    <section className="mb-16">
        <div className="section-header-v2">
            <div 
                data-cms-key={`section-title-${title.replace(/\s+/g, '-').toLowerCase()}`} 
                className="section-title-v2"
            >
                {title}
            </div>
            <a
                href="#products"
                data-cms-key={`view-all-text-${title.replace(/\s+/g, '-').toLowerCase()}`}
                data-cms-link={`view-all-link-${title.replace(/\s+/g, '-').toLowerCase()}`}
                className="view-all-link"
                onClick={(e) => {
                    e.preventDefault();
                    if (!window.isAdminModeActive) {
                        onNavigateToCategory?.(category || title, subCategory);
                    }
                }}
            >
                Xem tất cả
            </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onOpenProduct={onOpenProduct} />
            ))}
        </div>
    </section>
);

export default ProductSection;
