
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/Cart/CartDrawer';
import { getProductById, products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Star, ChevronLeft, Truck, Package, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/Products/ProductCard';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState(productId ? getProductById(productId) : undefined);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  // Redirect if product not found
  useEffect(() => {
    if (!product) {
      navigate('/products');
    } else {
      // Initialize with first size and color if available
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
    }
  }, [product, navigate]);
  
  if (!product) {
    return null;
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center text-sm">
              <Link to="/" className="text-gray-500 hover:text-sport-navy">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link to="/products" className="text-gray-500 hover:text-sport-navy">Products</Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </div>
            <Link 
              to="/products" 
              className="flex items-center mt-3 text-sm font-medium text-sport-navy hover:text-sport-red transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to products
            </Link>
          </div>
          
          {/* Product details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {/* Product image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Product info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              {/* Price and rating */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                {product.rating && (
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">{product.rating}</span>
                    {product.reviews && (
                      <span className="text-sm text-gray-500 ml-1">
                        ({product.reviews} reviews)
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <Separator className="my-6" />
              
              {/* Size selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size:
                    {selectedSize && <span className="ml-2 font-normal text-gray-500">{selectedSize}</span>}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[3rem] py-2 px-3 rounded border text-sm font-medium transition-colors ${
                          selectedSize === size 
                            ? 'bg-sport-navy text-white border-sport-navy' 
                            : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Color selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color: 
                    {selectedColor && <span className="ml-2 font-normal text-gray-500">{selectedColor}</span>}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`py-2 px-3 rounded border text-sm font-medium transition-colors ${
                          selectedColor === color 
                            ? 'bg-sport-navy text-white border-sport-navy' 
                            : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity selector */}
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sport-navy focus:border-sport-navy"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              
              {/* Add to cart button */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button 
                  className="flex-1 bg-sport-navy hover:bg-sport-darkBlue"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Wishlist
                </Button>
              </div>
              
              {/* Extra info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-sport-navy" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-gray-500">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-sport-navy" />
                  <div>
                    <p className="text-sm font-medium">Easy Returns</p>
                    <p className="text-xs text-gray-500">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
};

export default ProductDetail;
