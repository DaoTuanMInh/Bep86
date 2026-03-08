import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../../types';

interface ProductCardProps {
    product: Product;
    onAddToCart: (p: Product) => void;
    key?: React.Key;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="product-card-v2 group"
    >
        <div className="aspect-square overflow-hidden relative bg-white p-4">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
            />
            <button
                onClick={() => onAddToCart(product)}
                className="absolute bottom-2 right-2 bg-brand-blue text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg"
            >
                <ShoppingCart className="w-4 h-4" />
            </button>
        </div>
        <div className="product-info-v2">
            <p className="text-brand-red font-bold text-lg mb-1">{product.price.toLocaleString('vi-VN')}đ</p>
            <h3 className="font-medium text-sm text-zinc-700 line-clamp-2">{product.name}</h3>
        </div>
    </motion.div>
);

export default ProductCard;
