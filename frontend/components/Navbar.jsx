import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Ana Sayfa Linki */}
        <Link to="/" className="text-white text-xl font-bold">
          YouGuide
        </Link>
        
        {/* Menü Linkleri */}
        <div className="space-x-4">
          <Link to="/" className="text-white hover:underline">Ana Sayfa</Link>
          <Link to="/map" className="text-white hover:underline">Harita</Link>
          <Link to="/favorites" className="text-white hover:underline">Favorilerim</Link>
          <Link to="/routes" className="text-white hover:underline">Rotalarım</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
