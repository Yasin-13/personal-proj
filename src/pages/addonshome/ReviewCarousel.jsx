'use client'

import React, { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'

function ReviewCarousel() {
  const scrollRef = useRef(null)

  const reviews = [
    {
      name: "Ravi Sharma",
      title: "Great Comfort",
      text: "The kurta feels really comfortable and looks elegant!",
      stars: 5,
    },
    {
      name: "Manish Patel",
      title: "Good Stitching",
      text: "Neat stitching and premium quality fabric. Loved it!",
      stars: 5,
    },
    {
      name: "Deepak Mehta",
      title: "Perfect for Festivals",
      text: "Looks stylish yet traditional. Wore it for Diwali!",
      stars: 5,
    },
    {
      name: "Suresh Yadav",
      title: "Right Fit",
      text: "The fit is exactly as described. No complaints!",
      stars: 5,
    },
    {
      name: "Arun Joshi",
      title: "Worth the Price",
      text: "Totally satisfied with the price and quality.",
      stars: 5,
    },
    {
      name: "Vinod Gupta",
      title: "Good Fabric Quality",
      text: "Soft fabric and good design. Happy with my purchase!",
      stars: 5,
    },
    {
      name: "Rakesh Kumar",
      title: "Looks Premium",
      text: "Got many compliments when I wore it. Feels premium!",
      stars: 5,
    },
    {
      name: "Pankaj Verma",
      title: "Stylish Yet Simple",
      text: "Nice combination of simple yet stylish. Will buy again.",
      stars: 5,
    },
    {
      name: "Amit Bansal",
      title: "Best for Weddings",
      text: "Wore it at a wedding, and it was super comfortable!",
      stars: 5,
    },
    {
      name: "Rahul Sen",
      title: "Classy and Traditional",
      text: "A kurta that blends tradition with modern style!",
      stars: 5,
    }
  ]

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let scrollAmount = 0

    const smoothScroll = () => {
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0
      } else {
        container.scrollLeft += 2  // Increased speed slightly for smoothness
      }
      scrollAmount = requestAnimationFrame(smoothScroll)
    }

    const timer = setTimeout(() => {
      scrollAmount = requestAnimationFrame(smoothScroll)
    }, 1000)

    return () => {
      cancelAnimationFrame(scrollAmount)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="bg-gradient-to-r mt-5 mb-5 from-amber-200 via-amber-100 to-yellow-200 py-16 border-t-4 border-b-4 border-amber-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-amber-800 mb-4 font-serif">
            Hear from Our Happy Customers
          </h2>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-xl text-amber-700 font-light">Real Reviews, Verified Customers</p>
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
