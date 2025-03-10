import React from "react";
import { Link } from "react-router-dom";  

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-4xl font-extrabold mb-4">Welcome to YouGuide!</h1>
      <p className="text-xl mb-8">Your personal guide to amazing places</p>
      <Link
        to="/map"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
      >
        Go to Map
      </Link>
    </div>
  );
};

export default Home;
