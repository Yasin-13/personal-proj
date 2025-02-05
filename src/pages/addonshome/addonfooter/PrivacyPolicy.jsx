
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="relative w-full bg-gradient-to-b from-amber-200 via-amber-100 to-yellow-200">
      {/* Header Section */}
      <div className="w-full h-48 bg-amber-800 flex items-center justify-center shadow-md">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white drop-shadow-lg uppercase tracking-wide text-center px-6 max-w-[90%]">
          Privacy Policy
        </h1>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto py-20 px-6 sm:px-12 lg:px-24 flex flex-col items-center space-y-14">
        
        {/* Effective Date */}
        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Effective Date</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">[06-02-2025]</p>
        </section>

        {/* Introduction */}
        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Introduction</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            Nitin Readymade is committed to protecting your privacy and ensuring that your personal information is handled with care and security. This Privacy Policy explains how we collect, use, and protect your data when you interact with our store or website. By using our services, you agree to the terms of this policy.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Information We Collect</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            When you visit our store or browse our website, we may collect certain personal information such as your name, phone number, email address, shipping details, and payment information. Additionally, we may collect transaction details, order history, and preferences to improve your shopping experience. To enhance our website’s functionality, we may also gather technical data such as your device type, IP address, and browsing behavior using cookies and similar tracking technologies. These help us understand your preferences and improve our services.
          </p>
        </section>

        {/* How We Use Your Information */}
        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">How We Use Your Information</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            We use the collected information to process and fulfill orders, send order confirmations and updates, provide customer support, and improve our products and services. Your contact details may also be used to inform you about new arrivals, special discounts, and promotional offers. If you wish to opt out of marketing communications, you can do so at any time by contacting us.
          </p>
        </section>

        {/* Data Sharing */}
        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Data Sharing</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            Nitin Readymade does not sell or rent your personal information to third parties. However, we may share necessary details with trusted partners such as delivery services, payment processors, and IT support providers to ensure smooth business operations. In compliance with legal requirements, we may also disclose personal information to law enforcement or regulatory authorities if required.
          </p>
        </section>

        {/* Data Security */}
        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Data Security</h2>
          <ul className="space-y-4">
            {[
              "SSL encryption for secure transactions", 
              "Restricted access to sensitive data", 
              "Encouraging strong customer passwords"
            ].map((item, index) => (
              <li key={index} className="flex items-center justify-start gap-3">
                <ShieldCheck className="h-6 w-6 text-amber-600 drop-shadow-lg" />
                <span className="text-lg sm:text-xl text-amber-700">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed mt-5">
            We prioritize the security of your data and implement strict measures to protect it from unauthorized access, theft, or misuse. Our website uses Secure Socket Layer (SSL) encryption for transactions, and access to sensitive data is restricted to authorized personnel only. While we take all reasonable precautions to safeguard your information, we encourage customers to use strong passwords and avoid sharing personal details on public networks.
          </p>
        </section>

        {/* Your Rights */}
        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Your Rights</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            As a customer, you have the right to access, modify, or request the deletion of your personal data. If you wish to review the information we hold about you or update your details, you can contact us directly. You may also request the removal of your data, subject to legal or business obligations that require its retention.
          </p>
        </section>

        {/* Cookies and Third-Party Links */}
        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Cookies and Third-Party Links</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            Our website may use cookies to enhance your browsing experience by remembering your preferences and improving website performance. You can manage or disable cookies through your browser settings, but doing so may affect certain website features. Additionally, our website may contain links to third-party websites for convenience. However, we do not control these external sites and are not responsible for their privacy practices. We recommend reviewing their policies before providing any personal information.
          </p>
        </section>

        {/* Policy Updates */}
        <section className="w-full mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-5">Policy Updates</h2>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed">
            This Privacy Policy may be updated periodically to reflect changes in business operations or legal requirements. Any updates will be posted on this page with a revised effective date. We encourage users to review this policy regularly to stay informed about how their data is handled.
          </p>
        </section>
      </div>

      {/* Contact Information */}
      <div className="bg-amber-800 text-white text-center py-16 px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-3">
          Have Questions? We're here to help!
        </h2>
        <p className="text-lg sm:text-xl mb-3">
          Contact us at <strong>nitinreadymade@gmail.com</strong> for any privacy-related inquiries.
        </p>
        <p className="text-lg sm:text-xl">
          <strong>Shop Address:</strong> Shop No. 13, Om Datta Co, Khambdev Nagar, Dharavi, Mumbai - 400017, Opposite Hsg. Society
        </p>
        <p className="text-lg sm:text-xl">
          <strong>Contact:</strong> Nitin S: +91 99672 62511 | Mayaram S: +91 98922 91782
        </p>
      </div>
    </div>
  );
}