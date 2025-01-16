import React from "react";

const FeaturesComponent = () => {
  const features = [
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-12 w-12 text-amber-200 mx-auto"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ),
      title: "ASSURED QUALITY",
      description: "Quality guaranteed with every product.",
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-12 w-12 text-amber-200 mx-auto"
        >
          <path d="M20 21V19C20 16.79 18.21 15 16 15H8C5.79 15 4 16.79 4 19V21" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      title: "MADE IN INDIA",
      description: "Crafted with pride in India.",
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-12 w-12 text-amber-200 mx-auto"
        >
          <rect x="1" y="3" width="22" height="14" rx="2" ry="2" />
          <path d="M1 9H23M16 21H8M12 17V21" />
        </svg>
      ),
      title: "SECURE PAYMENTS",
      description: "Secure payment methods for safe transactions.",
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-12 w-12 text-amber-200 mx-auto"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ),
      title: "SUPPORT LOCAL ARTISANS",
      description: "Empowering local artisans through fair trade.",
    },
  ];

  return (
    <div className="bg-amber-800 mt-5 text-amber-200 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 text-center p-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105"
            >
              <div className="flex justify-center mb-4">
                {feature.svg}
              </div>
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

export default FeaturesComponent;
