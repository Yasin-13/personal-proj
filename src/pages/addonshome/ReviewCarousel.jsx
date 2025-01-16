'use client'

import React, { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'

function ReviewCarousel() {
  const scrollRef = useRef(null)
  
  const reviews = [
    {
      name: "Rajesh Kumar",
      title: "Regal Comfort",
      text: "The kurta exudes elegance. Perfect for formal occasions!",
      stars: 5,
    },
    {
      name: "Amit Patel",
      title: "Impeccable Craftsmanship",
      text: "The attention to detail in stitching is remarkable.",
      stars: 5,
    },
    {
      name: "Vikram Singh",
      title: "Modern Meets Traditional",
      text: "Love how it blends contemporary style with classic design.",
      stars: 5,
    },
    {
      name: "Sanjay Gupta",
      title: "Perfect Fit",
      text: "The sizing guide was spot on. Fits like a dream!",
      stars: 5,
    },
    {
      name: "Arjun Reddy",
      title: "Versatile Elegance",
      text: "From festivals to casual outings, this kurta is my go-to choice.",
      stars: 5,
    },
    {
      name: "Karan Malhotra",
      title: "Premium Quality",
      text: "The fabric quality is exceptional. Worth every penny!",
      stars: 5,
    },
    {
      name: "Rahul Sharma",
      title: "Comfortable All Day",
      text: "Wore it for a wedding. Comfortable even after hours of festivities.",
      stars: 5,
    },
    {
      name: "Nikhil Verma",
      title: "Stylish and Sophisticated",
      text: "Received numerous compliments. A true head-turner!",
      stars: 5,
    },
    {
      name: "Aditya Chopra",
      title: "Excellent Color Options",
      text: "The range of colors is impressive. Bought three different shades!",
      stars: 5,
    },
    {
      name: "Prateek Joshi",
      title: "Timeless Appeal",
      text: "A kurta that never goes out of style. Highly recommended!",
      stars: 5,
    }
  ]

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const scroll = () => {
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0
      } else {
        container.scrollLeft += 1
      }
    }

    const timer = setInterval(scroll, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-r mt-5 mb-5 from-amber-200 mt-5 via-amber-100 to-yellow-200 py-16 border-t-4 border-b-4 border-amber-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
        <h2 className="text-4xl  text-amber-800 mb-4 font-serif">
            Royal Impressions from Our Esteemed Patrons
          </h2>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-xl text-amber-700 font-light">Verified Customers</p>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scroll-smooth hide-scrollbar pb-6"
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex-none w-[300px] bg-white rounded-xl shadow-lg p-6 border border-amber-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <h3 className="text-xl font-semibold text-amber-800 mb-2">
                {review.title}
              </h3>
              
              <p className="text-amber-600 mb-4 text-sm leading-relaxed">
                {review.text}
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-sm">
                  {review.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="font-medium text-amber-700 text-sm">
                  {review.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default ReviewCarousel

