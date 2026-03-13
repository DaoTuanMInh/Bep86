import { Product, Order } from "../types";

const API_BASE = "/api";

export const api = {
  async getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/products`);
    return res.json();
  },

  async getProduct(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${id}`);
    return res.json();
  },

  async createProduct(product: Omit<Product, "id">): Promise<{ id: string }> {
    const res = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return res.json();
  },

  async updateProduct(id: string, product: Omit<Product, "id">): Promise<void> {
    await fetch(`${API_BASE}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
  },

  async deleteProduct(id: string): Promise<void> {
    await fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
    });
  },

  async getOrders(): Promise<Order[]> {
    const res = await fetch(`${API_BASE}/orders`);
    return res.json();
  },

  async placeOrder(order: {
    customer_name: string;
    customer_email: string;
    items: { id: string; quantity: number; price: number }[];
    total_amount: number;
  }): Promise<{ id: string }> {
    const res = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    return res.json();
  },

  // ── CMS Dynamic Data ──
  async getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    return res.json();
  },
  
  async getNews() {
    const res = await fetch(`${API_BASE}/news`);
    const data = await res.json();
    return Array.isArray(data) ? data.map((n: any) => ({ ...n, id: n._id?.toString() || n.id })) : data;
  },

  async getNewsBySlug(slug: string) {
    const res = await fetch(`${API_BASE}/news/${slug}`);
    return res.json();
  },
  
  async getCategoryContents() {
    const res = await fetch(`${API_BASE}/category-content`);
    return res.json();
  }
};
