import React, { useState, useEffect } from 'react';
import { Product, Order, CartItem, NewsPost, MenuCategory } from './types';
import { api } from './services/api';

import HeaderTop from './components/layout/HeaderTop';
import MainNav from './components/layout/MainNav';
import CartDrawer from './components/cart/CartDrawer';
import AdminDashboard, { ProductModal } from './components/admin/AdminDashboard';
import AdminContentEditable from './components/admin/AdminContentEditable';
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
import ProductDetailPage from './pages/ProductDetailPage';
import { useAdmin } from './context/AdminContext';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [news, setNews] = useState<NewsPost[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Replace local isAdminOpen with Context + local dashboard toggle
  const { isAdmin, setIsAdmin } = useAdmin();
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [activeCategory, setActiveCategory] = useState('Tủ Nấu Cơm');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = menuCategories.map(c => c.name);

  useEffect(() => {
    loadData();

    // Browser Back/Forward functionality
    const handlePopState = async (e: PopStateEvent) => {
      if (e.state) {
        setCurrentPage(e.state.page || 'home');
        if (e.state.postId) {
          try {
            const allNews = await api.getNews();
            const post = allNews.find((p: any) => p.id === e.state.postId || p._id === e.state.postId) || null;
            setSelectedPost(post);
          } catch(err) {
            setSelectedPost(null);
          }
        } else {
          setSelectedPost(null);
        }
        if (e.state.productId) {
          api.getProducts().then(all => {
            const prod = all.find(p => p.id.toString() === e.state.productId.toString()) || null;
            setSelectedProduct(prod);
          });
        } else {
          setSelectedProduct(null);
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
    const [p, o, n, m] = await Promise.all([
      api.getProducts(),
      api.getOrders(),
      api.getNews(),
      api.getCategories()
    ]);
    setProducts(p);
    setOrders(o);
    setNews(n);
    setMenuCategories(m);
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

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
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

  const handleSaveProduct = async (data: { name: string; category: string; subCategory?: string; price: number; originalPrice?: number; image: string; stock: number; description: string }) => {
    if (editingProduct) {
      await api.updateProduct(editingProduct.id, data);
    } else {
      await api.createProduct(data);
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
    loadData();
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      await api.deleteProduct(id);
      loadData();
    }
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const refreshCmsAfterNav = () => {
    // Refresh CMS after navigation so new page content loads from DB
    setTimeout(() => {
      // Clear CMS loaded markers so the new page's elements get fresh keys + content
      document.querySelectorAll('[data-cms-loaded]').forEach(el => {
        el.removeAttribute('data-cms-loaded');
        el.removeAttribute('data-cms-key');
      });
      (window as any).refreshCMS?.();
    }, 300);
  };

  const handleNavigate = (page: string) => {
    setSelectedPost(null);
    setSelectedProduct(null);
    setSelectedCategory(null);
    setSelectedSubCategory('');
    setCurrentPage(page);
    window.history.pushState({ page, postId: null }, '', `#${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    refreshCmsAfterNav();
  };

  const handleNavigateToCategory = (category: string, subCategory = '') => {
    setSelectedCategory(category);
    setSelectedSubCategory(subCategory);
    setSelectedPost(null);
    setSelectedProduct(null);
    setCurrentPage('products');
    window.history.pushState({ page: 'products' }, '', '#products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    refreshCmsAfterNav();
  };

  const handleOpenPost = (post: NewsPost) => {
    if (selectedPost?.id === post.id) return;
    setSelectedPost(post);
    setCurrentPage('news');
    window.history.pushState({ page: 'news', postId: post.id }, '', `#news-${post.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    refreshCmsAfterNav();
  };

  const handleGoToNewsPost = async (slug: string) => {
    try {
      const res = await fetch(`/api/news/${slug}`);
      const post = await res.json();
      const normalized = { ...post, id: post._id?.toString() || post.id };
      setSelectedPost(normalized);
      setCurrentPage('news');
      setIsDashboardOpen(false);
      setIsAdmin(true);
      window.history.pushState({ page: 'news', postId: normalized.id }, '', `#news-${normalized.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      refreshCmsAfterNav();
    } catch {
      alert('Không tìm thấy bài viết!');
    }
  };

  const handleOpenProduct = (product: Product) => {
    if (selectedProduct?.id === product.id) return;
    setSelectedProduct(product);
    setCurrentPage('product');
    window.history.pushState({ page: 'product', productId: product.id }, '', `#product-${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    refreshCmsAfterNav();
  };

  return (
    <div className="min-h-screen">
      <HeaderTop
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        products={products}
        onNavigateToCategory={handleNavigateToCategory}
        onOpenProduct={handleOpenProduct}
      />
      <MainNav
        onOpenAdmin={() => setIsAdmin(true)}
        onNavigate={handleNavigate}
        onNavigateToCategory={handleNavigateToCategory}
        currentPage={currentPage}
        menuCategories={menuCategories}
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
            newsPosts={news}
            onOpenPost={handleOpenPost}
          />
        )
      ) : currentPage === 'video' ? (
        <VideoPage />
      ) : currentPage === 'contact' ? (
        <ContactPage products={categories} />
      ) : currentPage === 'products' ? (
        selectedCategory ? (
          <CategoryPage
            categoryName={selectedCategory}
            subCategoryName={selectedSubCategory}
            menuCategories={menuCategories}
            onAddToCart={addToCart}
            onNavigate={handleNavigate}
            onNavigateToCategory={handleNavigateToCategory}
            onOpenProduct={handleOpenProduct}
          />
        ) : (
          <ProductsPage
            initialCategory={selectedCategory}
            initialSubCategory={selectedSubCategory}
            menuCategories={menuCategories}
            onAddToCart={addToCart}
            onOpenProduct={handleOpenProduct}
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
      ) : currentPage === 'product' && selectedProduct ? (
        <ProductDetailPage
          product={selectedProduct}
          onAddToCart={addToCart}
          onBack={() => {
            setSelectedProduct(null);
            window.history.back();
          }}
          onNavigate={handleNavigate}
        />
      ) : (
        <HomePage
          products={products}
          categories={categories}
          newsPosts={news}
          activeCategory={activeCategory}
          onSetActiveCategory={setActiveCategory}
          onAddToCart={addToCart}
          onNavigate={handleNavigate}
          onOpenPost={handleOpenPost}
          onOpenProduct={handleOpenProduct}
          onNavigateToCategory={handleNavigateToCategory}
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

      {isDashboardOpen && (
        <div className="admin-ignore">
          <AdminDashboard
            products={products}
            orders={orders}
            categories={categories}
            menuCategories={menuCategories}
            onRefresh={loadData}
            onClose={() => setIsDashboardOpen(false)}
          onGoToProduct={(p) => {
              setIsDashboardOpen(false);
              handleOpenProduct(p);
              // Ensure admin mode stays on
              setIsAdmin(true);
            }}
            onGoToNewsPost={handleGoToNewsPost}
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
        </div>
      )}

      <div className="admin-ignore">
        <ProductModal
          isOpen={isProductModalOpen}
          editingProduct={editingProduct}
          categories={categories}
          menuCategories={menuCategories}
          activeCategory={activeCategory}
          onClose={() => setIsProductModalOpen(false)}
          onSave={handleSaveProduct}
        />
      </div>

      {isAdmin && !isDashboardOpen && (
        <div className="admin-ignore fixed top-0 left-0 right-0 z-[9999] bg-brand-blue/95 backdrop-blur-sm text-white px-4 py-2 flex items-center justify-between shadow-xl border-b border-brand-blue">
          <span className="font-bold text-sm tracking-wide flex items-center gap-2 select-none pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
            CHẾ ĐỘ BIÊN TẬP TRỰC TIẾP (Mọi thay đổi sẽ được tự động lưu)
          </span>
          <div className="flex gap-3 items-center">
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                if (document.activeElement instanceof HTMLElement) {
                  document.activeElement.blur();
                }
                alert('Tất cả nội dung đã được lưu vào Database!');
              }}
              className="px-4 py-1.5 bg-green-500 text-white rounded text-xs font-black shadow-lg hover:bg-green-600 transition-colors flex items-center gap-1 select-none"
            >
              💾 Lưu thay đổi
            </button>
            <div className="w-px h-5 bg-white/20 mx-1"></div>
            <button
              onMouseDown={(e) => { e.preventDefault(); setIsDashboardOpen(true); }}
              className="px-3 py-1.5 bg-white text-brand-blue rounded text-xs font-black shadow-sm hover:bg-gray-100 transition-colors select-none"
            >
              ⚙️ Quản trị Dữ liệu
            </button>
            <button
              onMouseDown={(e) => { e.preventDefault(); setIsAdmin(false); }}
              className="px-3 py-1.5 bg-red-500 text-white rounded text-xs font-black shadow-sm hover:bg-red-600 transition-colors select-none"
            >
              ✕ Thoát biên tập
            </button>
          </div>
        </div>
      )}

      {/* Zalo / Phone floating widgets */}
      <FloatingButtons />
      <AdminContentEditable />
    </div>
  );
}
