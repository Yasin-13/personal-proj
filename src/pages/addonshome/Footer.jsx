import { Facebook, Instagram } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full">
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

          {/* Main Layout with 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 1st Column - Nitin Readymade and Contact */}
            <div className="space-y-4 md:col-span-1">
  <div className="flex items-center space-x-4"> {/* Added space-x-4 for spacing */}
    {/* Brand Name Text */}
    <h1 className="text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 leading-none pb-2">
      <span className="font-wedding text-7xl inline-block">Nitin</span>
      <span className="text-4xl inline-block  ml-1.5">Readymade</span>
    </h1>
  </div>

              <p className="text-amber-200 text-xs md:text-sm">
                "Elevate your style with our premium collection of men's kurtas."
              </p>

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

            {/* 2nd Column - Map (Adjusted to the right) */}
            <div className="md:col-span-1 md:ml-10">
              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 font-semibold">
                Address
              </h3>
              <p className="text-sm text-amber-200">
              Shop No. 13, Om Datta Co, Khambdev Nagar, Dharavi, Mumbai - 400017 Opposite Hsg. Society
              </p>

              <div className="h-48 mt-4">
          <iframe
       title="Nitin Readymade Location"
       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.6890470592685!2d72.8564775!3d19.0465233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8d0e7910f59%3A0x4be7aa2f1c69f36a!2sKhamdev%20Nagar%20Rd%2C%20Dharavi%2C%20Mumbai%2C%20Maharashtra%20400017!5e0!3m2!1sen!2sin!4v1675259810537!5m2!1sen!2sin"
        width="100%"
        height="100%"
         style={{ border: 0 }}
         allowFullScreen=""
          loading="lazy"
           />
         </div>

            </div>

            {/* 3rd Column - Quick Links (Adjusted to the right) */}
            <div className="md:col-span-1 md:ml-20">
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
                  <Link to="/shop/aboutus" className="text-sm hover:text-amber-300 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/shop/listing" className="text-sm hover:text-amber-300 transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <a href="mailto:nitinreadymade@gmail.com" className="text-sm hover:text-amber-300 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* 4th Column - Information Links (Adjusted to the right) */}
            <div className="md:col-span-1 md:ml-20">
              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 font-semibold">
                Information
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/shop/shippingpolicy" className="text-sm hover:text-amber-300 transition-colors">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link to="/shop/returnpolicy" className="text-sm hover:text-amber-300 transition-colors">
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link to="/shop/termsofservice" className="text-sm hover:text-amber-300 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/shop/privacypolicy" className="text-sm hover:text-amber-300 transition-colors">
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
