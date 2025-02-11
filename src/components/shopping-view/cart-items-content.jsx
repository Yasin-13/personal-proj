import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getTotalStock} quantity can be added for this item`,
              variant: "destructive",
            });
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  }

 return (
  <div className="flex items-center p-4 bg-gradient-to-r from-amber-100 via-yellow-50 to-yellow-200 rounded-lg shadow-md border border-amber-300 sm:space-x-4 space-x-2 flex-wrap sm:flex-nowrap">
    {/* Image Container */}
    <div className="w-16 sm:w-20 h-24 sm:h-32 overflow-hidden rounded border border-amber-300 bg-white">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Content */}
    <div className="flex-1 min-w-[50%] sm:min-w-[60%]">
      <h3 className="font-extrabold text-amber-900 text-sm sm:text-base">{cartItem?.title}</h3>
      <div className="flex items-center gap-2 mt-2">
        <Button
          variant="outline"
          className="h-8 w-8 sm:h-9 sm:w-9 rounded-md text-amber-700 border border-amber-400 hover:bg-amber-200 transition-all"
          size="icon"
          disabled={cartItem?.quantity === 1}
          onClick={() => handleUpdateQuantity(cartItem, "minus")}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="font-semibold text-amber-800 text-sm sm:text-base">{cartItem?.quantity}</span>
        <Button
          variant="outline"
          className="h-8 w-8 sm:h-9 sm:w-9 rounded-md text-amber-700 border border-amber-400 hover:bg-amber-200 transition-all"
          size="icon"
          onClick={() => handleUpdateQuantity(cartItem, "plus")}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>

    {/* Price & Delete */}
    <div className="flex flex-col items-end">
      <p className="font-semibold text-amber-900 text-sm sm:text-base">
        ₹{((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}
      </p>
      <Button
  variant="outline"
  className="h-10 w-10 sm:h-12 sm:w-12 rounded-md flex items-center justify-center text-amber-700 border border-amber-400 hover:bg-amber-200 transition-all mt-2 p-0"
  onClick={() => handleCartItemDelete(cartItem)}
>
  <Trash className="w-4 h-4" />
</Button>

    </div>
  </div>
);

  
}

export default UserCartItemsContent;
