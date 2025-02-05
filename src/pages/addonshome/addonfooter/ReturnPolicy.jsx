'use client'

import { ShieldCheck } from "lucide-react"

export default function ReturnPolicy() {
  return (
    <div className="relative w-full bg-gradient-to-b from-amber-200 via-amber-100 to-yellow-200">
      {/* New Stylish Header Section */}
      <div className="w-full h-48 bg-amber-800 flex items-center justify-center shadow-md">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white drop-shadow-lg uppercase tracking-wide text-center px-6 max-w-[90%]">
          Return Policy
        </h1>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto py-20 px-6 sm:px-12 lg:px-24 flex flex-col items-center space-y-14">
        
        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">7-Day Return Policy</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            We offer a 7-day return policy on selected items. Please ShieldCheck the product description to confirm whether your item is eligible for return or not. Returns must be initiated within 7 days of receiving the product.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">How to Initiate a Return</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            To initiate a return, please contact us via email at <strong> nitinreadymade@gmail.com</strong> or call us with your order ID and a brief description of the issue. 
            Please note there is no specific option to initiate a return from the order section of our website.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Return Instructions</h2>
          <ul className="space-y-4">
            {[
              "Do not remove tags or the bag/box",
              "Record a video of handing the parcel to the delivery agent",
              "Ensure the parcel is sealed by the delivery agent",
              "Provide the return video if requested",
              "A reverse shipment fee of Rs 100 will be deducted"
            ].map((item, index) => (
              <li key={index} className="flex items-center justify-start gap-3">
                <ShieldCheck className="h-6 w-6 text-amber-600 drop-shadow-lg" />
                <span className="text-lg sm:text-xl text-amber-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Refund Process</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            Refunds are processed after receiving and inspecting the returned item. The reverse shipment fee of Rs 100 will be deducted from your refund.
            Refunds can take up to 7 days to reflect in your account from the date of receiving the returned parcel. Fast delivery charges will not be refunded.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Exchanges</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            We do not offer refunds for some products. However, size exchanges are allowed. Once an exchange is made, no further actions such as another exchange or refund will be processed.
            For exchanges, please follow the same procedure as the return process.
          </p>
        </section>
      </div>

      {/* Final CTA Section */}
      <div className="bg-amber-800 text-white text-center py-16 px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-3">
          Have Questions? We're here to help!
        </h2>
        <p className="text-lg sm:text-xl">
          If you have any questions regarding returns or exchanges, please contact us at <strong>nitinreadymade@gmail.com</strong>.
        </p>
      </div>
    </div>
  )
}
