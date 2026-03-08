import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductSectionProps {
    title: string;
    products: Product[];
    onAddToCart: (p: Product) => void;
}

const ProductSection = ({ title, products, onAddToCart }: ProductSectionProps) => (
    <section className="mb-16">
        <div className="section-header-v2">
            <div className="section-title-v2">{title}</div>
            <a href="#" className="view-all-link">Xem tất cả</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    </section>
);

export default ProductSection;
