
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 card-hover overflow-hidden flex flex-col">
      {/* Image with quick add button */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        
        {/* Quick add button that appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button 
            className="w-full bg-sport-navy hover:bg-sport-darkBlue"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Quick Add
          </Button>
        </div>
        
        {/* Featured badge */}
        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-sport-red">
            Featured
          </Badge>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 flex-grow">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-medium line-clamp-1">{product.name}</h3>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{product.rating}</span>
              </div>
              {product.reviews && (
                <span className="text-xs text-gray-500 ml-1">
                  ({product.reviews} reviews)
                </span>
              )}
            </div>
          )}
          
          <div className="mt-2 text-lg font-semibold">${product.price.toFixed(2)}</div>
          
          {/* Available colors/sizes hint */}
          <div className="mt-1 flex flex-wrap gap-1">
            {product.colors && product.colors.length > 0 && (
              <span className="text-xs text-gray-500">
                {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
              </span>
            )}
            {product.sizes && product.sizes.length > 0 && (
              <span className="text-xs text-gray-500 ml-1">
                • {product.sizes.length} {product.sizes.length === 1 ? 'size' : 'sizes'}
              </span>
            )}
          </div>
        </Link>
      </div>
      
      {/* View details button */}
      <div className="p-4 pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/product/${product.id}`}>
            View Details
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
