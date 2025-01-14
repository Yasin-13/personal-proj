import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border-amber-300 bg-white p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList className="flex gap-4 mb-4">
              <TabsTrigger
                value="orders"
                className="text-amber-800 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="text-amber-800 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                Address
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
