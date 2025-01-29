import { Outlet } from "react-router-dom"; 
import ShoppingHeader from "./header";
import ShoppingFooter from "@/pages/addonshome/Footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-200 via-amber-100 to-yellow-200 overflow-hidden">
      {/* Common Header */}
      <ShoppingHeader />

      {/* Increase top padding to prevent content from going under the navbar */}
      <main className="flex flex-col w-full flex-grow px-4 md:px-6 py-4 pt-28">
        <Outlet />
      </main>

      {/* Common Footer */}
      <ShoppingFooter />
    </div>
  );
}

export default ShoppingLayout;
