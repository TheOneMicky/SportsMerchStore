
import React from 'react';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/Products/ProductCard';

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out our latest and most popular merchandise for the season.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
