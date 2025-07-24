import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Dialog } from '@headlessui/react';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const REVIEWS_PER_PAGE = 2;
  const dummyReviews = [
    { name: "Sheetal", content: "Great quality!" },
    { name: "Riya", content: "Looks amazing!" },
    { name: "Tina", content: "Comfortable and stylish." },
    { name: "Sneha", content: "Worth the price!" }
  ];

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.images?.[0]);
      });
  }, [id]);

  if (!product) return <div className="p-10">Loading...</div>;

  const paginatedReviews = dummyReviews.slice((currentPage - 1) * REVIEWS_PER_PAGE, currentPage * REVIEWS_PER_PAGE);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50">
      {/* Image & Info */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {product.images?.slice(0, 4).map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => {
                  setSelectedImage(img);
                  setIsOpen(true);
                }}
                className="cursor-pointer w-full h-40 object-cover rounded shadow"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-lg text-gray-700 mb-2">${product.price}</p>
          <p className="text-sm text-gray-600 mb-4">{product.description}</p>

          {/* Color selector */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Color</p>
            <div className="flex gap-2">
              {['bg-orange-400', 'bg-black'].map((c, i) => (
                <span key={i} className={`w-6 h-6 rounded-full ${c} border`} />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Size</p>
            <div className="flex gap-2 flex-wrap">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'].map((size) => (
                <button key={size} className="border px-3 py-1 text-sm rounded hover:bg-gray-200">{size}</button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex border rounded">
              <button
                className="px-3 py-1"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >-</button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                className="px-3 py-1"
                onClick={() => setQuantity((q) => q + 1)}
              >+</button>
            </div>
            <button
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
              onClick={() => addToCart({ ...product, quantity })}
            >
              Add to Cart – ${product.price * quantity}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
        <div className="space-y-4">
          {paginatedReviews.map((r, i) => (
            <div key={i} className="bg-white p-4 rounded shadow">
              <p className="font-semibold">{r.name}</p>
              <p className="text-sm text-gray-600">{r.content}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            className="text-sm px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </button>
          <button
            className="text-sm px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage * REVIEWS_PER_PAGE >= dummyReviews.length}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Fullscreen Image Dialog */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <Dialog.Panel>
            <img src={selectedImage} alt="zoom" className="max-h-[90vh] max-w-full rounded" />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
