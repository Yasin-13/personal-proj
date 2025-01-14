import { Link } from "react-router-dom"; // if using React Router

function UnauthPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-amber-100 text-amber-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg mb-4">You don't have access to view this page.</p>
        <Link
          to="/shop/home" // or any other page where users can log in
          className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold rounded-lg transition-all duration-200 hover:from-amber-600 hover:to-yellow-600"
        >
          Go to Login Page
        </Link>
      </div>
    </div>
  );
}

export default UnauthPage;
