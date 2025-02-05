'use client'


export default function ShippingPolicy() {
  return (
    <div className="relative w-full bg-gradient-to-b from-amber-200 via-amber-100 to-yellow-200">
      {/* New Stylish Header Section */}
      <div className="w-full h-48 bg-amber-800 flex items-center justify-center shadow-md">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white drop-shadow-lg uppercase tracking-wide text-center px-6 max-w-[90%]">
          Shipping Policy
        </h1>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto py-20 px-6 sm:px-12 lg:px-24 flex flex-col items-center space-y-14">
        
        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Free Shipping</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            We are pleased to offer FREE SHIPPING on all orders across India. Enjoy hassle-free shopping from the comfort of your home with no additional shipping charges.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Dispatch</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            All orders are dispatched within 3-7 business days from the time the order is placed. Orders placed after Friday noon will be dispatched the following Monday or the next working day.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Delivery Timeline</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            Depending on your location, delivery typically takes 7-9 business days. Please note that delivery times may vary, and we recommend not accepting packages that appear tampered with.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Order Tracking</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            Once your order leaves our warehouse, you will receive a tracking number via email. Track your package conveniently and keep an eye on its journey to you!
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">No COD Policy</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            We do not offer Cash on Delivery (COD) as a payment method. All orders must be prepaid through available online payment methods. This helps us ensure smooth processing and delivery of your orders.
          </p>
        </section>
      </div>

      {/* Final CTA Section */}
      <div className="bg-amber-800 text-white text-center py-16 px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-3">
          Shop with Confidence and Ease!
        </h2>
        <p className="text-lg sm:text-xl">
          Enjoy seamless shopping experience and fast delivery. Browse our exclusive collection and place your order today.
        </p>
      </div>
    </div>
  )
}
