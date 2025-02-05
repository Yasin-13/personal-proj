'use client'

import { ShieldCheck } from "lucide-react"

export default function AboutUs() {
  return (
    <div className="relative w-full bg-gradient-to-b from-amber-200 via-amber-100 to-yellow-200">
      {/* New Stylish Header Section */}
      <div className="w-full h-48 bg-amber-800 flex items-center justify-center shadow-md">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white drop-shadow-lg uppercase tracking-wide text-center px-6 max-w-[90%]">
          About Nitin Readymade
        </h1>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto py-20 px-6 sm:px-12 lg:px-24 flex flex-col items-center space-y-14">
        
        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Welcome to Nitin Readymade</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            Your premier destination for stylish and high-quality ethnic wear for men in India. We specialize in retail, wholesale, and manufacturing of traditional kurtas, blending rich heritage with modern fashion. Each outfit is designed for both elegance and comfort, making you stand out at every occasion. Our collections cater to all aspects of Indian festivals, weddings, and casual wear, with a perfect blend of traditional craftsmanship and contemporary design. We use only the finest fabrics, ensuring durability and luxury with every piece.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Our Story</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            Starting as a family-run business, Nitin Readymade has evolved into a trusted and respected brand for ethnic menswear in India. Over the years, with unwavering dedication, we have crafted a legacy of fine craftsmanship and superior quality. Our commitment to using premium materials ensures that every piece reflects the highest standards of comfort and style. We take great pride in our deep appreciation for Indian traditions, which is evident in the intricate details and authentic designs of our kurtas. Our passion drives us to constantly innovate, bringing you not only timeless classics but also modern styles that cater to evolving tastes. Every kurta we create is a perfect blend of tradition, elegance, and contemporary fashion.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">What Sets Us Apart</h2>
          <ul className="space-y-4">
            {["A diverse collection of kurtas for every occasion",
              "Premium-quality fabrics sourced from the best manufacturers",
              "A fusion of traditional aesthetics with contemporary designs",
              "Affordable pricing for both retail & wholesale customers",
              "Dedicated to supporting skilled artisans and ethical fashion"
            ].map((item, index) => (
              <li key={index} className="flex items-center justify-start gap-3">
                <ShieldCheck className="h-6 w-6 text-amber-600 drop-shadow-lg" />
                <span className="text-lg sm:text-xl text-amber-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Our Vision</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            We envision a world where men proudly embrace their cultural identity through the timeless elegance of premium ethnic wear. Our goal is to create garments that not only reflect traditional values but also exude confidence and charm. Through our kurtas, we aim to empower men to showcase their heritage in a modern yet meaningful way. Whether it’s for grand festivals, weddings, or casual gatherings, each piece is designed to make an unforgettable statement. Our vision is to redefine ethnic wear by combining the rich legacy of Indian craftsmanship with contemporary style, making it accessible and fashionable for men across all walks of life. We strive to inspire individuals to wear their identity with pride, comfort, and sophistication.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Our Commitment</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            At Nitin Readymade, we are committed to delivering exceptional craftsmanship and using top-tier fabrics from the finest manufacturers. Every piece reflects quality and durability, ensuring that our customers receive only the best. Our focus on customer satisfaction drives us to consistently exceed expectations in every interaction. We blend traditional techniques with modern designs to create timeless ethnic wear, while embracing ethical fashion practices. By supporting skilled artisans and promoting sustainable fashion, we strive to bring you unique kurtas that respect both tradition and contemporary trends.
          </p>
        </section>
      </div>

      {/* Final CTA Section */}
      <div className="bg-amber-800 text-white text-center py-16 px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-3">
          Join us in celebrating the grandeur of Indian ethnic wear.
        </h2>
        <p className="text-lg sm:text-xl">
          Explore our exclusive collection and find the perfect kurta that suits your personality and style.
        </p>
      </div>
    </div>
  )
}
