import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { CheckCircle } from "lucide-react"; // Selection tick icon

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={() => setCurrentSelectedAddress && setCurrentSelectedAddress(addressInfo)}
      className={`relative cursor-pointer border-2 rounded-xl p-6 transition-all font-serif shadow-md
      bg-gradient-to-br from-amber-100 via-amber-50 to-yellow-50
      ${
        isSelected
          ? "border-amber-700 ring-2 ring-amber-500 bg-gradient-to-br from-amber-200 via-amber-100 to-yellow-200 shadow-lg"
          : "border-amber-300 hover:shadow-lg"
      }`}
    >
      {/* Fixed Tickmark Inside Upper Right Corner */}
      {isSelected && (
        <span className="absolute top-3 right-3 text-amber-700 bg-white p-1 rounded-bl-lg shadow-sm border border-amber-500">
          <CheckCircle className="h-5 w-5" />
        </span>
      )}

      <CardContent className="grid gap-3 text-amber-900">
      <Label className="font-bold">
          Name: <span className="font-normal">{addressInfo?.name}</span>
        </Label>
        <Label className="font-bold">
          Address: <span className="font-normal">{addressInfo?.address}</span>
        </Label>
        <Label className="font-bold">
          City: <span className="font-normal">{addressInfo?.city}</span>
        </Label>
        <Label className="font-bold">
          Pincode: <span className="font-normal">{addressInfo?.pincode}</span>
        </Label>
        <Label className="font-bold">
          Phone: <span className="font-normal">{addressInfo?.phone}</span>
        </Label>
        {addressInfo?.email && (
          <Label className="font-bold">
            Email: <span className="font-normal">{addressInfo?.email}</span>
          </Label>
        )}
      </CardContent>

      <CardFooter className="flex justify-between gap-4">
        <Button
          onClick={() => handleEditAddress(addressInfo)}
          className="bg-amber-700 text-white font-semibold hover:bg-amber-800 transition-all duration-200 px-4 py-2 rounded-md shadow-md"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          className="bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-200 px-4 py-2 rounded-md shadow-md"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
