import { ShieldCheck } from "lucide-react"

export default function TermsOfService() {
  return (
    <div className="relative w-full bg-gradient-to-b from-amber-200 via-amber-100 to-yellow-200">
      {/* Header Section */}
      <div className="w-full h-48 bg-amber-800 flex items-center justify-center shadow-md">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white drop-shadow-lg uppercase tracking-wide text-center px-6 max-w-[90%]">
          Terms of Service 
        </h1>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto py-20 px-6 sm:px-12 lg:px-24 flex flex-col items-center space-y-14">
        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">1. Products and Services</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            Nitin Readymade offers a premium collection of men's kurtas. Our designs are crafted to elevate your style and provide high-quality garments suited to various occasions. We aim to offer products that meet the needs and expectations of our customers.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">2. Order Process</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            When you place an order with us, you confirm that all the information provided, including payment and shipping details, is accurate and correct. Once your order is placed, we will send you an order confirmation email. Please ensure that you provide valid contact details, as they are essential for processing and shipping your order.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">3. Pricing and Payments</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            All prices for the products listed on our website are in INR (Indian Rupees) and are exclusive of any applicable taxes or delivery charges. We reserve the right to change product prices at any time without prior notice. Payment must be made through the available online payment methods. Orders will only be processed once payment is successfully received.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">4. Shipping and Delivery</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            We ship our products to locations across India. Shipping charges will vary based on the delivery address. Delivery times may vary depending on the location, but we strive to dispatch your order as quickly as possible. Once shipped, you will receive a tracking number to monitor your order's progress. Please ensure your delivery address is correct, as we are not responsible for delays or incorrect deliveries due to inaccurate information.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">5. Returns and Exchanges</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            We want you to be fully satisfied with your purchase. If you receive a defective or damaged item, you can return or exchange it within 7 days from the date of delivery. The product should be in its original condition with tags intact. To initiate a return or exchange, contact our customer service team with your order details. Return shipping costs will be borne by the customer unless the return is due to our mistake.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">6. Contact Information</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            If you have any questions or concerns about your order, products, or services, please feel free to contact us at:
          </p>
          <ul className="space-y-4 mt-4">
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-amber-600" />
              <span className="text-lg sm:text-xl text-amber-700">Nitin S: +91 99672 62511</span>
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-amber-600" />
              <span className="text-lg sm:text-xl text-amber-700">Mayaram S: +91 98922 91782</span>
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-amber-600" />
              <span className="text-lg sm:text-xl text-amber-700">Email: nitinreadymade@gmail.com</span>
            </li>
          </ul>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">7. Address</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            You can visit our shop or reach us by post at: <br />
            Shop No. 13, Om Datta Co, Khambdev Nagar, Dharavi, Mumbai - 400017 Opposite Housing Society.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">8. Limitation of Liability</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            While we strive to provide the best products and services, we are not liable for any damages or losses resulting from the use of our products or services. Our total liability is limited to the amount paid for the product purchased. We do not accept responsibility for any indirect, incidental, or consequential damages.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">9. Privacy and Data Protection</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            Your privacy is of utmost importance to us. We collect personal information such as your name, contact details, and payment information to process your orders and improve our services. We do not sell or share your information with third parties without your consent, except as required by law or to provide our services. By using our services, you consent to the collection and use of your personal data as described in our privacy policy.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">10. Customer Obligations</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            As a customer, you agree to use the services and products provided by Nitin Readymade for lawful purposes only. You are responsible for ensuring that any information you provide is accurate, complete, and up-to-date. Any misuse of the website, such as fraudulent activities, may lead to the suspension of your account or services.
          </p>
        </section>

        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">11. Modifications to Terms of Service</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            Nitin Readymade reserves the right to modify, update, or change these Terms of Service at any time. Any changes will be communicated through our website. Continued use of our services after such updates will be deemed as your acceptance of the revised terms.
          </p>
        </section>
      </div>

      {/* Final CTA Section */}
      <div className="bg-amber-800 text-white text-center py-16 px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-3">
          Have Questions? We're here to help!
        </h2>
        <p className="text-lg sm:text-xl">
          If you have any questions regarding these Terms of Service, please contact us at <strong>nitinreadymade@gmail.com</strong>.
        </p>
      </div>
    </div>
  )
}
