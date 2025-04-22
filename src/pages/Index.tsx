
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/Home/Hero';
import FeaturedProducts from '@/components/Home/FeaturedProducts';
import CategoryGrid from '@/components/Home/CategoryGrid';
import CartDrawer from '@/components/Cart/CartDrawer';

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16"> {/* Offset for fixed navbar */}
        <Hero />
        <FeaturedProducts />
        <CategoryGrid />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Sign up for our newsletter to receive exclusive offers, latest news, and early access to new merchandise drops.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 border border-gray-300 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-sport-navy"
              />
              <button
                type="button"
                className="bg-sport-navy hover:bg-sport-darkBlue text-white font-medium px-6 py-3 rounded-md transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
};

export default Index;
