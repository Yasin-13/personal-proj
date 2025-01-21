import { Outlet } from "react-router-dom";
import logo from "@/assets/logoNR.png";
import { Navbar } from "@/components/Navbar";

function AuthLayout() {
  return (
    (<div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <div className="flex flex-1">
        <div
          className="hidden lg:flex items-center justify-center bg-white w-1/3 px-12">
          <img src={logo} alt="NRlogo" className="max-w-full h-auto" />
        </div>
        <div
          className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </div>)
  );
}

export default AuthLayout;

