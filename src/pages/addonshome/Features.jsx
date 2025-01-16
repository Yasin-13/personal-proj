"use client";

import React from "react";

const FeatureHighlights = () => {
  const features = [
    {
      id: 1,
      title: "Handcrafted Elegance",
      description: "Each kurta is tailored with precision.",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-12 h-12 text-yellow-200 mx-auto"
          fill="none"
        >
          <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" />
          <path
            d="M32 18 L40 30 L24 30 Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Premium Quality",
      description: "Made with authentic fabrics.",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-12 h-12 text-yellow-200 mx-auto"
          fill="none"
        >
          <rect
            x="12"
            y="12"
            width="40"
            height="40"
            rx="8"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            d="M20 32 H44"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Ethically Sourced",
      description: "Supporting skilled artisans.",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-12 h-12 text-yellow-200 mx-auto"
          fill="none"
        >
          <path
            d="M32 4 L4 32 L32 60 L60 32 Z"
            stroke="currentColor"
            strokeWidth="4"
          />
          <circle cx="32" cy="32" r="12" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Sustainability First",
      description: "Eco-friendly production methods.",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-12 h-12 text-yellow-200 mx-auto"
          fill="none"
        >
          <path
            d="M32 8 A24 24 0 1 1 8 32"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            d="M32 16 V48"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-amber-800 mb-5 text-yellow-200 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-8 text-yellow-200">
          Our Commitments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 text-center p-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105"
            >
              {feature.svg}
              <h3 className="mt-4 text-xl font-bold text-amber-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-amber-900">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlights;
