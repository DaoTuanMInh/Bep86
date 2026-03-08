export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subCategory?: string;
  stock: number;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}
