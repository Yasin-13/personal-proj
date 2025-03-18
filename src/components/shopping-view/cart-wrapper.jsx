import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { ShoppingCart } from "lucide-react"; // Added cart icon

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md bg-gradient-to-b from-amber-200 via-amber-100 to-yellow-200 p-6 rounded-lg shadow-xl flex flex-col h-full border border-amber-300">
      {/* Header with cart icon */}
      <SheetHeader className="flex flex-col items-center">
        <ShoppingCart size={28} className="text-amber-900" />
        <SheetTitle className="text-amber-900 font-extrabold text-xl mt-2">
          Your Shopping Cart
        </SheetTitle>
        <p className="text-amber-700 text-sm">Everything you love, in one place!</p>
      </SheetHeader>

      {/* Item count */}
      {cartItems.length > 0 && (
        <p className="text-amber-800 text-center mt-3 font-semibold">
          You have {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
        </p>
      )}

      {/* Cart Items List with increased space */}
      <div className="flex-1 overflow-y-auto mt-4 space-y-4 max-h-[72vh] border-t border-amber-300 pt-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item.productId} cartItem={item} />
          ))
        ) : (
          <p className="text-amber-700 text-center italic">Your cart is empty. Add something awesome!</p>
        )}
      </div>

      {/* Cart Total with a Divider */}
      {cartItems.length > 0 && (
        <>
          <div className="mt-6 border-t border-amber-400 pt-4">
            <div className="flex justify-between text-amber-900 font-semibold text-lg">
              <span>Total Amount:</span>
              <span>₹{totalCartAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button with a Prompt */}
          <p className="text-amber-800 text-center text-sm mt-2">Ready to checkout?</p>
          <div className="mt-4">
            <Button
              onClick={() => {
                navigate("/shop/checkout");
                setOpenCartSheet(false);
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold py-2 rounded-lg hover:from-amber-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
            >
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </SheetContent>
  );
}

export default UserCartWrapper;
