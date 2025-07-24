import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className="bg-purple-500 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">My E-Store</h1>
      <div className="flex space-x-6 items-center text-lg">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/cart" className="relative">
          🛒
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
            {totalItems}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

