import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeFromCart, decrementItem, addToCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return <div className="p-6 text-center">Your cart is empty.</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 p-4 bg-white rounded shadow"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>
              <p>₹{item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => decrementItem(item.id)}
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <span>{item.qty}</span>
              <button
                onClick={() => addToCart(item)}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-red-500 hover:underline text-sm"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Clear Cart
        </button>
        <div className="text-xl font-bold">Total: ₹{totalPrice.toFixed(2)}</div>
      </div>
    </div>
  );
}
