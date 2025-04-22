
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
  stockCount: number;
  colors?: string[];
  sizes?: string[];
  rating?: number;
  reviews?: number;
}

// Product Categories
export const categories = [
  {
    id: 'jerseys',
    name: 'Jerseys',
    image: 'https://images.unsplash.com/photo-1580087433295-ab2600c1030e?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'hats',
    name: 'Hats & Caps',
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'footwear',
    name: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1617606002806-94e279c22567?w=500&auto=format&fit=crop&q=60'
  }
];

// Product Data
export const products: Product[] = [
  {
    id: 'jersey-01',
    name: 'Official Home Team Jersey',
    description: 'Show your support with this authentic home team jersey, featuring moisture-wicking fabric and team logo.',
    price: 89.99,
    category: 'jerseys',
    featured: true,
    image: 'https://images.unsplash.com/photo-1580087433295-ab2600c1030e?w=500&auto=format&fit=crop&q=60',
    stockCount: 50,
    colors: ['Red', 'Blue', 'White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 124
  },
  {
    id: 'jersey-02',
    name: 'Away Team Jersey',
    description: 'Official away team jersey with premium stitching and breathable performance fabric.',
    price: 89.99,
    category: 'jerseys',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=500&auto=format&fit=crop&q=60',
    stockCount: 45,
    colors: ['Black', 'Gray', 'Green'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 98
  },
  {
    id: 'hat-01',
    name: 'Adjustable Team Cap',
    description: 'Classic adjustable cap with embroidered team logo on the front and breathable mesh back.',
    price: 29.99,
    category: 'hats',
    featured: true,
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&auto=format&fit=crop&q=60',
    stockCount: 100,
    colors: ['Red', 'Blue', 'Black'],
    sizes: ['One Size'],
    rating: 4.9,
    reviews: 215
  },
  {
    id: 'hat-02',
    name: 'Premium Fitted Cap',
    description: 'High-quality fitted cap with team logo and moisture-wicking sweatband.',
    price: 34.99,
    category: 'hats',
    image: 'https://images.unsplash.com/photo-1572307480813-ceb0e59d8326?w=500&auto=format&fit=crop&q=60',
    stockCount: 75,
    colors: ['Red', 'Blue', 'Black', 'Gray'],
    sizes: ['S/M', 'L/XL'],
    rating: 4.7,
    reviews: 87
  },
  {
    id: 'shoes-01',
    name: 'Limited Edition Team Sneakers',
    description: 'Exclusive team-branded sneakers with premium comfort and style.',
    price: 129.99,
    category: 'footwear',
    featured: true,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
    stockCount: 30,
    colors: ['White/Red', 'Black/Gold'],
    sizes: ['7', '8', '9', '10', '11', '12', '13'],
    rating: 4.9,
    reviews: 63
  },
  {
    id: 'shoes-02',
    name: 'Stadium Comfort Slides',
    description: 'Comfortable team slides perfect for game day or casual wear.',
    price: 39.99,
    category: 'footwear',
    image: 'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=500&auto=format&fit=crop&q=60',
    stockCount: 120,
    colors: ['Black', 'Red', 'Navy'],
    sizes: ['7', '8', '9', '10', '11', '12', '13'],
    rating: 4.5,
    reviews: 138
  },
  {
    id: 'accessory-01',
    name: 'Team Logo Wristband Set',
    description: 'Set of two athletic wristbands with embroidered team logo.',
    price: 14.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1617606002806-94e279c22567?w=500&auto=format&fit=crop&q=60',
    stockCount: 200,
    colors: ['Red', 'Blue', 'Black'],
    sizes: ['One Size'],
    rating: 4.6,
    reviews: 92
  },
  {
    id: 'accessory-02',
    name: 'Premium Team Backpack',
    description: 'Durable backpack with multiple compartments and embroidered team logo.',
    price: 64.99,
    category: 'accessories',
    featured: true,
    image: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500&auto=format&fit=crop&q=60',
    stockCount: 60,
    colors: ['Black', 'Navy'],
    sizes: ['One Size'],
    rating: 4.8,
    reviews: 75
  }
];

// Get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((product) => product.category === categoryId);
};

// Get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

// Get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

// Search products
export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
  );
};
