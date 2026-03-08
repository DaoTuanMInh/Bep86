import React, { useState, useEffect } from 'react';
import { Product, Order, CartItem } from './types';
import { api } from './services/api';
import { categories } from './data/categories';

import HeaderTop from './components/layout/HeaderTop';
import MainNav from './components/layout/MainNav';
import CartDrawer from './components/cart/CartDrawer';
import AdminDashboard, { ProductModal } from './components/admin/AdminDashboard';
import FloatingButtons from './components/common/FloatingButtons';
import GioiThieuPage from './pages/GioiThieuPage';
import HomePage from './pages/HomePage';
import TinTucPage from './pages/TinTucPage';
import NewsDetailPage from './pages/NewsDetailPage';
import VideoPage from './pages/VideoPage';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';
import { NewsPost, newsPosts } from './data/news';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [activeCategory, setActiveCategory] = useState('Tủ Nấu Cơm');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);

  useEffect(() => {
    loadData();

    // Browser Back/Forward functionality
    const handlePopState = (e: PopStateEvent) => {
      if (e.state) {
        setCurrentPage(e.state.page || 'home');
        if (e.state.postId) {
          const post = newsPosts.find((p: NewsPost) => p.id === e.state.postId) || null;
          setSelectedPost(post);
        } else {
          setSelectedPost(null);
        }
      } else {
        // Fallback or initial state
        setCurrentPage('home');
        setSelectedPost(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    if (!window.history.state) {
      window.history.replaceState({ page: 'home', postId: null }, '', '#home');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const loadData = async () => {
    const [p, o] = await Promise.all([api.getProducts(), api.getOrders()]);
    setProducts(p);
    setOrders(o);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    handleNavigate('checkout');
  };

  const handlePlaceOrder = async (name: string, email: string, phone: string, address: string) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await api.placeOrder({
      customer_name: name,
      customer_email: `${email} | ${phone} | ${address}`,
      items: cart.map(i => ({ id: i.id, quantity: i.quantity, price: i.price })),
      total_amount: total,
    });
    setCart([]);
    loadData();
  };

  const handleSaveProduct = async (data: { name: string; category: string; subCategory?: string; price: number; image: string; stock: number; description: string }) => {
    if (editingProduct) {
      await api.updateProduct(editingProduct.id, data);
    } else {
      await api.createProduct(data);
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
    loadData();
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      await api.deleteProduct(id);
      loadData();
    }
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleNavigate = (page: string) => {
    setSelectedPost(null);
    setSelectedCategory(null);
    setSelectedSubCategory('');
    setCurrentPage(page);
    window.history.pushState({ page, postId: null }, '', `#${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCategory = (category: string, subCategory = '') => {
    setSelectedCategory(category);
    setSelectedSubCategory(subCategory);
    setSelectedPost(null);
    setCurrentPage('products');
    window.history.pushState({ page: 'products' }, '', '#products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPost = (post: NewsPost) => {
    if (selectedPost?.id === post.id) return;
    setSelectedPost(post);
    setCurrentPage('news');
    window.history.pushState({ page: 'news', postId: post.id }, '', `#news-${post.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <HeaderTop
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        products={products}
        onNavigateToCategory={handleNavigateToCategory}
      />
      <MainNav
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigate={handleNavigate}
        onNavigateToCategory={handleNavigateToCategory}
        currentPage={currentPage}
      />

      {currentPage === 'about' ? (
        <GioiThieuPage />
      ) : currentPage === 'news' ? (
        selectedPost ? (
          <NewsDetailPage
            post={selectedPost}
            onBack={() => {
              setSelectedPost(null);
              window.history.pushState({ page: 'news', postId: null }, '', '#news');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigate={handleNavigate}
          />
        ) : (
          <TinTucPage
            onOpenPost={handleOpenPost}
          />
        )
      ) : currentPage === 'video' ? (
        <VideoPage />
      ) : currentPage === 'contact' ? (
        <ContactPage />
      ) : currentPage === 'products' ? (
        selectedCategory ? (
          <CategoryPage
            categoryName={selectedCategory}
            subCategoryName={selectedSubCategory}
            onAddToCart={addToCart}
            onNavigate={handleNavigate}
            onNavigateToCategory={handleNavigateToCategory}
          />
        ) : (
          <ProductsPage
            initialCategory={selectedCategory}
            initialSubCategory={selectedSubCategory}
            onAddToCart={addToCart}
          />
        )
      ) : currentPage === 'checkout' ? (
        <CheckoutPage
          cart={cart}
          onUpdateQuantity={updateCartQuantity}
          onRemove={removeFromCart}
          onPlaceOrder={handlePlaceOrder}
          onNavigate={handleNavigate}
        />
      ) : (
        <HomePage
          products={products}
          activeCategory={activeCategory}
          onSetActiveCategory={setActiveCategory}
          onAddToCart={addToCart}
          onNavigate={handleNavigate}
          onOpenPost={handleOpenPost}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      {isAdminOpen && (
        <AdminDashboard
          products={products}
          orders={orders}
          onClose={() => setIsAdminOpen(false)}
          onAddProduct={() => {
            setEditingProduct(null);
            setIsProductModalOpen(true);
          }}
          onEditProduct={(p) => {
            setEditingProduct(p);
            setIsProductModalOpen(true);
          }}
          onDeleteProduct={handleDeleteProduct}
        />
      )}

      <ProductModal
        isOpen={isProductModalOpen}
        editingProduct={editingProduct}
        categories={categories}
        activeCategory={activeCategory}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
      />

      {/* Zalo / Phone floating widgets */}
      <FloatingButtons />
    </div>
  );
}
