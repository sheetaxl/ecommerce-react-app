import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [categoryImages, setCategoryImages] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const data = await res.json();
        if (Array.isArray(data)) {
          const stringCategories = data.filter(cat => typeof cat === 'string');
          setCategories(stringCategories.slice(0, 8));
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      await Promise.all(
        categories.map(async (category) => {
          try {
            const res = await fetch(`https://dummyjson.com/products/category/${category}`);
            const data = await res.json();
            if (data.products?.length > 0) {
              images[category] = data.products[0].thumbnail;
            }
          } catch (error) {
            console.error(`Failed to fetch image for category: ${category}`, error);
          }
        })
      );
      setCategoryImages(images);
    };

    if (categories.length > 0) fetchImages();
  }, [categories]);

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            to={`/category/${category}`}
            key={category}
            className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition"
          >
            <img
              src={categoryImages[category]}
              alt={category}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white text-xl font-semibold capitalize">
                {typeof category === 'string' ? category.replace(/-/g, ' ') : ''}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
