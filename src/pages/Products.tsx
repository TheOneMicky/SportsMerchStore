
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/Products/ProductCard';
import CartDrawer from '@/components/Cart/CartDrawer';
import { products, getProductsByCategory, searchProducts, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  
  // Filter products based on URL parameters
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
      setFilteredProducts(getProductsByCategory(categoryParam));
    } else if (searchQuery) {
      setActiveCategory(null);
      setFilteredProducts(searchProducts(searchQuery));
    } else {
      setActiveCategory(null);
      setFilteredProducts(products);
    }
  }, [categoryParam, searchQuery]);
  
  // Handle category filter click
  const handleCategoryFilter = (categoryId: string) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
      setFilteredProducts(products);
    } else {
      setActiveCategory(categoryId);
      setFilteredProducts(getProductsByCategory(categoryId));
    }
  };
  
  // Get current category name
  const getCurrentCategoryName = () => {
    if (!activeCategory) return null;
    
    const category = categories.find(cat => cat.id === activeCategory);
    return category ? category.name : null;
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">
              {searchQuery 
                ? `Search results for "${searchQuery}"` 
                : activeCategory 
                  ? getCurrentCategoryName() 
                  : 'All Products'
              }
            </h1>
            <p className="text-gray-600 mt-2">
              {filteredProducts.length} products found
            </p>
          </div>
          
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={activeCategory === category.id ? "bg-sport-navy" : ""}
                onClick={() => handleCategoryFilter(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          
          <Separator className="mb-8" />
          
          {/* Products grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setActiveCategory(null);
                  setFilteredProducts(products);
                }}
              >
                View all products
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
};

export default Products;
