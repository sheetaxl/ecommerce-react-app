import React from 'react';

const products = [
  {
    name: 'Stylish Shirt',
    price: '₹999',
    image: 'https://via.placeholder.com/200',
  },
  {
    name: 'Elegant Dress',
    price: '₹1,499',
    image: 'https://via.placeholder.com/200',
  },
];

function ProductPreview() {
  return (
    <section className="py-10 px-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.name} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h3 className="mt-4 font-semibold">{product.name}</h3>
            <p className="text-blue-600">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductPreview;
