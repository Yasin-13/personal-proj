import {LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import NRlogo1 from  '@/assets/NRLOGO1.jpg'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter menu items to include only specific buttons
  const filteredMenuItems = shoppingViewHeaderMenuItems.filter((item) =>
    ["home", "products", "search"].includes(item.id)
  );

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {filteredMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer text-amber-700 hover:text-amber-800 transition-all duration-200"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative text-amber-800 border-amber-300 hover:text-amber-700 focus:ring-amber-500"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm text-amber-600">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-amber-600">
            <AvatarFallback className="bg-amber-600 text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          className="w-56 bg-gradient-to-b from-amber-200 to-yellow-200"
        >
          <DropdownMenuLabel className="text-amber-900">
            Logged in as {user?.userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="border-amber-300" />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="hover:bg-amber-300 text-amber-800"
          >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator className="border-amber-300" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="hover:bg-amber-300 text-amber-800"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-b from-amber-200 via-amber-100 to-yellow-200">
      {/* Marquee Section */}
      <div className="w-full bg-amber-800 text-white text-sm py-2 overflow-hidden">
        <div className="marquee-content flex animate-marquee">
        <span className="mx-4">Flat 40% Off on Kurtas!</span>
    <span className="mx-4">Free Shipping on Orders Over ₹500!</span>
    <span className="mx-4">New Arrivals in Ethnic Wear!</span>
    <span className="mx-4">Shop Now and Get an Extra 10% Off!</span>
    <span className="mx-4">Limited Time Offer - Don't Miss Out!</span>
        </div>
      </div>

      {/* Navbar Section */}
      <div className="flex h-16 items-center justify-between px-4 md:px-6 border-b">
        {/* Logo Section */}
        <Link
          to="/shop/home"
          className="flex items-center text-amber-800"
        >
          <img
            src={NRlogo1}
            alt="Ecommerce Logo"
            className="h-auto w-auto max-w-[200px] max-h-[55px] object-contain mix-blend-multiply"
          />
        </Link>

        {/* Header Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6 text-amber-700" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* Right Section (Cart and Account) */}
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
