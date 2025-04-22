
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const CategoryGrid = () => {
  return (
    <section className="py-16 bg-sport-lightGray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Shop By Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative overflow-hidden rounded-lg aspect-square shadow-md transition-all duration-300 hover:shadow-xl card-hover"
            >
              {/* Image with overlay */}
              <div className="absolute inset-0">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70" />
              </div>
              
              {/* Category name */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <span className="inline-flex items-center text-sm font-medium">
                  Shop Now
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
