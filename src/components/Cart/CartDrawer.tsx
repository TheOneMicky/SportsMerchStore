
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Trash, Plus, Minus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    clearCart 
  } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Your Cart
            <span className="ml-2 text-sm text-muted-foreground">
              ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <SheetClose asChild>
                <Button asChild className="bg-sport-navy hover:bg-sport-darkBlue">
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </SheetClose>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div 
                    key={`${item.product.id}-${item.size}-${item.color}`} 
                    className="flex gap-4 py-3 border-b"
                  >
                    <div className="w-20 h-20 rounded bg-muted relative overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-red-500"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      
                      {item.size && <p className="text-sm text-muted-foreground mt-1">Size: {item.size}</p>}
                      {item.color && <p className="text-sm text-muted-foreground">Color: {item.color}</p>}
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-md">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Summary */}
              <div className="space-y-4 pt-4">
                <div className="flex justify-between text-base font-medium">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Action buttons */}
              <SheetFooter className="flex-col gap-3 sm:flex-row">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
                <SheetClose asChild>
                  <Button className="w-full bg-sport-navy hover:bg-sport-darkBlue">
                    Checkout
                  </Button>
                </SheetClose>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
