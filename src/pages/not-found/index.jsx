import { Link } from "react-router-dom"; // if you're using React Router for navigation

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-amber-100 text-amber-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">The page you're looking for doesn't exist.</p>
        <Link
          to="/shop/home"
          className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold rounded-lg transition-all duration-200 hover:from-amber-600 hover:to-yellow-600"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
