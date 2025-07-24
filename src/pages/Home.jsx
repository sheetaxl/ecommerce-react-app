import React from 'react';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import ProductPreview from '../components/ProductPreview';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="bg-gray-100 text-gray-900">
      {/* Hero section with banner + latest arrivals */}
      <Hero />

      {/* Static Featured Collections section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-bold text-center mb-8">Our Collections</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link
            to="/men"
            className="group relative overflow-hidden rounded-lg shadow hover:shadow-lg"
          >
            <img
              src="/images/men.jpg"
              alt="Men"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white text-xl font-semibold">Men</span>
            </div>
          </Link>

          <Link
            to="/women"
            className="group relative overflow-hidden rounded-lg shadow hover:shadow-lg"
          >
            <img
              src="/images/women.jpg"
              alt="Women"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white text-xl font-semibold">Women</span>
            </div>
          </Link>

          <Link
            to="/kids"
            className="group relative overflow-hidden rounded-lg shadow hover:shadow-lg"
          >
            <img
              src="/images/kids.jpg"
              alt="Kids"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white text-xl font-semibold">Kids</span>
            </div>
          </Link>

          <Link
            to="/accessories"
            className="group relative overflow-hidden rounded-lg shadow hover:shadow-lg"
          >
            <img
              src="/images/accessories.jpg"
              alt="Accessories"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white text-xl font-semibold">Accessories</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Dynamic category grid section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CategoryGrid />
      </section>

      {/* Optional future ProductPreview section */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ProductPreview />
      </section> */}
    </main>
  );
}
