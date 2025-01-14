import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer transition-all duration-200 ${
        selectedId?._id === addressInfo?._id
          ? "border-amber-500 shadow-lg"
          : "border-amber-300 hover:shadow-md"
      } rounded-lg bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200`}
    >
      <CardContent className="grid p-4 gap-4 text-amber-800">
        <Label className="font-semibold">
          Address: <span className="font-normal">{addressInfo?.address}</span>
        </Label>
        <Label className="font-semibold">
          City: <span className="font-normal">{addressInfo?.city}</span>
        </Label>
        <Label className="font-semibold">
          Pincode: <span className="font-normal">{addressInfo?.pincode}</span>
        </Label>
        <Label className="font-semibold">
          Phone: <span className="font-normal">{addressInfo?.phone}</span>
        </Label>
        <Label className="font-semibold">
          Notes: <span className="font-normal">{addressInfo?.notes}</span>
        </Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button
          onClick={() => handleEditAddress(addressInfo)}
          className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium hover:from-amber-600 hover:to-yellow-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium hover:from-amber-600 hover:to-yellow-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
