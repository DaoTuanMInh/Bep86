import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../../types';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateQuantity: (id: number, delta: number) => void;
    onRemove: (id: number) => void;
    onCheckout: () => void;
}

const CartDrawer = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }: CartDrawerProps) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[120] shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                            <h2 className="text-2xl font-bold uppercase tracking-tight">Giỏ hàng</h2>
                            <button onClick={onClose} className="p-2 hover:bg-zinc-100 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-zinc-400">
                                    <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
                                    <p className="text-lg">Giỏ hàng trống</p>
                                </div>
                            ) : (
                                items.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-20 h-20 border border-zinc-200 p-1 flex-shrink-0 bg-white">
                                            <img src={item.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold mb-1 text-sm text-zinc-800">{item.name}</h4>
                                            <p className="text-brand-red font-bold text-sm mb-2">{item.price.toLocaleString('vi-VN')}đ</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center border border-zinc-200 bg-white overflow-hidden">
                                                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-zinc-100 transition-colors font-bold text-zinc-600">-</button>
                                                    <span className="w-8 text-center py-1 text-sm font-bold border-x border-zinc-200">{item.quantity}</span>
                                                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-zinc-100 transition-colors font-bold text-zinc-600">+</button>
                                                </div>
                                                <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-600 p-1">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 border-t border-zinc-100 bg-zinc-50">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-zinc-600 font-bold uppercase tracking-wider text-sm">Tổng cộng</span>
                                    <span className="text-2xl font-black text-brand-red tracking-tight">{total.toLocaleString('vi-VN')}đ</span>
                                </div>
                                <button
                                    onClick={onCheckout}
                                    className="w-full bg-zinc-900 text-white py-4 font-bold uppercase tracking-wider hover:bg-brand-red transition-colors text-sm"
                                >
                                    Thanh Toán
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
