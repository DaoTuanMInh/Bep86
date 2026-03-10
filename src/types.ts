export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subCategory?: string;
  stock: number;
}

export interface Order {
  id: string;
  customer_name: string;
  customerName?: string;
  customer_email: string;
  customerEmail?: string;
  total_amount: number;
  totalAmount?: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  createdAt?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
