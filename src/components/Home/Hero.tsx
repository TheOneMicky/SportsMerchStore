
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative w-full h-[600px] sm:h-[700px] bg-sport-navy">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-sport-navy to-sport-darkBlue">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070')] bg-cover bg-center opacity-30"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Gear Up For <span className="text-sport-red">Game Day</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
            Authentic sports merchandise for the true fans. Jerseys, hats, and accessories to show your team spirit.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-sport-red hover:bg-red-700 text-white"
              asChild
            >
              <Link to="/products">
                Shop Now
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-sport-navy"
              asChild
            >
              <Link to="/products?category=jerseys">
                Featured Jerseys
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
