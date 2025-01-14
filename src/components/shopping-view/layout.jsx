import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-200 via-amber-100 to-yellow-200 overflow-hidden">
      {/* Common Header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full flex-grow px-4 md:px-6 py-4">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
