import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      {/* Replaced image with a professional heading */}
      <div className="bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200 text-amber-900 py-10 text-center rounded-b-lg shadow-md">
        <h1 className="text-3xl font-bold font-serif">Your Shopping Account</h1>
        <p className="text-amber-700 mt-2">Manage your orders and addresses easily</p>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border border-amber-300 bg-white p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList className="flex gap-4 mb-4 border-b border-amber-300 pb-2">
              <TabsTrigger
                value="orders"
                className="text-amber-800 font-semibold hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="text-amber-800 font-semibold hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
