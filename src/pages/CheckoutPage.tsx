import React, { useState } from 'react';
import { Trash2, ShoppingCart, ArrowLeft, Home, ChevronRight, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutPageProps {
    cart: CartItem[];
    onUpdateQuantity: (id: string, delta: number) => void;
    onRemove: (id: string) => void;
    onPlaceOrder: (name: string, email: string, phone: string, address: string) => void;
    onNavigate: (page: string) => void;
}

const CheckoutPage = ({ cart, onUpdateQuantity, onRemove, onPlaceOrder, onNavigate }: CheckoutPageProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onPlaceOrder(name, email, phone, address);
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isSuccess) {
        return (
            <div className="bg-white py-20 min-h-[60vh] flex items-center justify-center px-6">
                <div className="max-w-lg w-full p-10 text-center border border-zinc-200">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-zinc-900 mb-4 uppercase">Đặt Hàng Thành Công!</h2>
                    <p className="text-zinc-600 mb-8 leading-relaxed text-sm">
                        Cảm ơn bạn đã tin tưởng và mua hàng tại Bếp 86. Chúng tôi sẽ liên hệ trong thời gian sớm nhất để xác nhận đơn hàng và cập nhật tình trạng giao hàng.
                    </p>
                    <button
                        onClick={() => onNavigate('home')}
                        className="bg-brand-red text-white px-8 py-3 text-sm font-bold uppercase hover:bg-red-700 transition-colors w-full"
                    >
                        Trở về trang chủ
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Breadcrumb */}
            <div className="bg-zinc-100 text-zinc-600 py-3 px-6 text-xs uppercase font-medium">
                <div className="max-w-7xl mx-auto flex items-center gap-2">
                    <button onClick={() => onNavigate('home')} className="hover:text-brand-blue flex items-center gap-1 transition-colors">
                        <Home className="w-3.5 h-3.5" /> Trang chủ
                    </button>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-zinc-900">Thanh toán</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-10">
                <h1 className="text-2xl font-bold text-zinc-900 mb-8 uppercase border-b border-zinc-200 pb-4">Thanh Toán Đơn Hàng</h1>

                {cart.length === 0 ? (
                    <div className="border border-zinc-200 p-16 text-center">
                        <ShoppingCart className="w-16 h-16 text-zinc-200 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-zinc-800 mb-2 uppercase">Giỏ hàng trống</h2>
                        <p className="text-sm text-zinc-500 mb-6">Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
                        <button
                            onClick={() => onNavigate('products')}
                            className="bg-brand-blue text-white px-6 py-2.5 text-sm font-bold uppercase hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" /> Bắt đầu mua sắm
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Cart Items List */}
                        <div className="lg:col-span-7">
                            <h2 className="text-lg font-bold text-zinc-900 mb-4 uppercase">Sản phẩm trong giỏ</h2>
                            <div className="border border-zinc-200">
                                {cart.map(item => (
                                    <div key={item.id} className="p-5 border-b border-zinc-200 last:border-b-0 flex gap-5 items-center bg-white hover:bg-zinc-50 transition-colors">
                                        <div className="w-20 h-20 border border-zinc-200 flex-shrink-0 bg-white p-1">
                                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} referrerPolicy="no-referrer" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-zinc-800 mb-1 text-sm">{item.name}</h4>
                                            <p className="text-brand-red font-bold text-sm">{item.price.toLocaleString('vi-VN')}đ</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-3">
                                            <div className="flex items-center border border-zinc-300 bg-white h-8">
                                                <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-3 hover:bg-zinc-100 text-zinc-600 font-bold h-full border-r border-zinc-300 transition-colors">-</button>
                                                <span className="w-10 text-center text-sm font-bold text-zinc-800">{item.quantity}</span>
                                                <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-3 hover:bg-zinc-100 text-zinc-600 font-bold h-full border-l border-zinc-300 transition-colors">+</button>
                                            </div>
                                            <button onClick={() => onRemove(item.id)} className="text-xs text-zinc-500 hover:text-red-600 transition-colors flex items-center gap-1 uppercase font-bold">
                                                <Trash2 className="w-3.5 h-3.5" /> Xóa
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="p-4 bg-zinc-50 border-t border-zinc-200 text-right">
                                    <button
                                        onClick={() => onNavigate('products')}
                                        className="text-sm text-brand-blue font-bold uppercase hover:underline transition-all"
                                    >
                                        + Thêm sản phẩm khác
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Order Form & Summary */}
                        <div className="lg:col-span-5 sticky top-32">
                            <h2 className="text-lg font-bold text-zinc-900 mb-4 uppercase">Thông tin giao hàng</h2>
                            <div className="border border-zinc-200 bg-white p-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-zinc-600 mb-1.5">Họ và tên *</label>
                                            <input required value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Nguyễn Văn A" className="w-full px-3 py-2 border border-zinc-300 focus:border-zinc-800 outline-none transition-colors text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-zinc-600 mb-1.5">Số điện thoại *</label>
                                            <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="0985xxx" className="w-full px-3 py-2 border border-zinc-300 focus:border-zinc-800 outline-none transition-colors text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-zinc-600 mb-1.5">Email *</label>
                                        <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email@example.com" className="w-full px-3 py-2 border border-zinc-300 focus:border-zinc-800 outline-none transition-colors text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-zinc-600 mb-1.5">Địa chỉ *</label>
                                        <textarea required value={address} onChange={e => setAddress(e.target.value)} rows={2} placeholder="Số nhà, đường, phường/xã, quận/huyện..." className="w-full px-3 py-2 border border-zinc-300 focus:border-zinc-800 outline-none transition-colors text-sm resize-none" />
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-zinc-200 space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-zinc-600">Tạm tính:</span>
                                            <span className="font-bold text-zinc-900">{total.toLocaleString('vi-VN')}đ</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-zinc-600">Phí giao hàng:</span>
                                            <span className="text-zinc-900 font-bold uppercase text-xs">Liên hệ báo giá</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-3 mt-3 border-t border-zinc-200">
                                            <span className="text-zinc-900 font-bold uppercase">Tổng cộng:</span>
                                            <span className="font-black text-2xl text-brand-red">{total.toLocaleString('vi-VN')}đ</span>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-zinc-900 text-white py-3.5 mt-6 font-bold uppercase tracking-wider hover:bg-brand-red transition-colors text-sm"
                                    >
                                        Xác Nhận Đặt Hàng
                                    </button>
                                    <p className="text-xs text-center text-zinc-500 mt-3">
                                        Bằng cách đặt hàng, bạn đồng ý với Điều khoản của Bếp 86.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
