import { Facebook, Instagram } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Include custom font using @import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');
        `}
      </style>

      <div className="bg-amber-900 text-amber-100 py-5">
        <div className="container mx-auto px-4">
          {/* Top Middle Text */}
          <div className="text-center mb-5">
            <p className="text-white text-sm md:text-base">
              ।। जय गुरुजी सदा सहाय ।।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Logo and Quote Section */}
            <div className="col-span-1 lg:col-span-6 space-y-4">
              {/* NR Text Only */}
              <div className="flex items-center space-x-3">

                {/* Brand Name Text */}
                <div className="flex flex-col items-start">
                  <h1 className="text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 leading-none pb-2">
                    <span className="font-wedding text-7xl">Nitin</span>
                    <span className="text-4xl"> Readymade</span>
                  </h1>
                </div>
              </div>

              <p className="text-amber-200 mt-4 text-sm md:text-base">
                "Elevate your style with our premium collection of men's kurtas. Where tradition meets contemporary elegance."
              </p>

              {/* Contact Section */}
              <div className="mt-6 space-y-2">
                <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 font-semibold mb-2">
                  Contact Us
                </h3>
                <p className="text-sm">
                  <a href="tel:+919967262511" className="text-sm hover:text-amber-300 transition-colors">
                    Nitin S: +91 99672 62511
                  </a>
                </p>
                <p className="text-sm">
                  <a href="tel:+919892291782" className="text-sm hover:text-amber-300 transition-colors">
                    Mayaram S: +91 98922 91782
                  </a>
                </p>
                <p className="text-sm">
                  <a
                    href="mailto:nitinreadymade@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-amber-300 transition-colors"
                  >
                    Email: nitinreadymade@gmail.com
                  </a>
                </p>

                <div className="flex space-x-4 mt-5">
                  <a
                    target="_blank"
                    href="https://www.instagram.com/nitin_.readymade/"
                    className="text-amber-200 hover:text-amber-400 transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/nitin_.readymade/"
                    className="text-amber-200 hover:text-amber-400 transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links Columns */}
            <div className="col-span-1 lg:col-span-3 space-y-4">
              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 font-semibold">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/shop/home" className="text-sm hover:text-amber-300 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about-us" className="text-sm hover:text-amber-300 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-sm hover:text-amber-300 transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm hover:text-amber-300 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information Columns */}
            <div className="col-span-1 lg:col-span-3 space-y-4">
              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 font-semibold">
                Information
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/shipping-policy" className="text-sm hover:text-amber-300 transition-colors">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link to="/return-policy" className="text-sm hover:text-amber-300 transition-colors">
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-sm hover:text-amber-300 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-sm hover:text-amber-300 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Credits */}
      <div className="bg-amber-900 text-amber-100 py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>
            Developed by{" "}
            <a
              href="https://www.trivinsai.com"
              className="text-amber-200 hover:text-amber-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Team Trivinsai
            </a>
          </p>
        </div>
      </div>

      {/* Copyright Strip */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-900 py-3">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Nitin Readymade. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
