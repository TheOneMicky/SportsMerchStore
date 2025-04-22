
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

const CartIcon = () => {
  const { toggleCart, cartCount } = useCart();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative text-sport-navy hover:text-sport-red"
      onClick={toggleCart}
    >
      <ShoppingCart className="h-5 w-5" />
      {cartCount > 0 && (
        <Badge 
          className="absolute -top-1 -right-1 bg-sport-red text-white text-xs h-5 w-5 flex items-center justify-center p-0 rounded-full animate-cart-pulse"
        >
          {cartCount}
        </Badge>
      )}
    </Button>
  );
};

export default CartIcon;
