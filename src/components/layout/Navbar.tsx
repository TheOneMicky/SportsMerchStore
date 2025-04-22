
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, ShoppingCart } from 'lucide-react';
import CartIcon from '@/components/Cart/CartIcon';
import { Input } from '@/components/ui/input';
import { searchProducts } from '@/data/products';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-sport-navy">
              <span className="text-sport-red">Sport</span>Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-sport-navy hover:text-sport-red font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-sport-navy hover:text-sport-red font-medium transition-colors">
              Shop
            </Link>
            <Link to="/products?category=jerseys" className="text-sport-navy hover:text-sport-red font-medium transition-colors">
              Jerseys
            </Link>
            <Link to="/products?category=accessories" className="text-sport-navy hover:text-sport-red font-medium transition-colors">
              Accessories
            </Link>
          </nav>

          {/* Right-aligned items */}
          <div className="flex items-center space-x-4">
            {/* Search button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="text-sport-navy hover:text-sport-red"
              onClick={toggleSearch}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart Icon */}
            <CartIcon />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-sport-navy hover:text-sport-red"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Search overlay */}
        {isSearchOpen && (
          <div className="absolute top-16 sm:top-20 left-0 w-full bg-white shadow-md p-4 animate-fade-in">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <Button type="submit">Search</Button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md animate-fade-in">
            <div className="px-4 py-2 space-y-2">
              <Link 
                to="/"
                className="block py-3 text-sport-navy hover:text-sport-red font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products"
                className="block py-3 text-sport-navy hover:text-sport-red font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/products?category=jerseys"
                className="block py-3 text-sport-navy hover:text-sport-red font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Jerseys
              </Link>
              <Link 
                to="/products?category=accessories"
                className="block py-3 text-sport-navy hover:text-sport-red font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accessories
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
