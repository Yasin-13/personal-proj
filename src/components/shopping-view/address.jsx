import { useEffect, useState } from "react"
import CommonForm from "../common/form"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { addressFormControls } from "@/config"
import { useDispatch, useSelector } from "react-redux"
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddresses } from "@/store/shop/address-slice"
import AddressCard from "./address-card"
import { useToast } from "../ui/use-toast"
import { MapPin, Plus, Edit } from "lucide-react"

const initialAddressFormData = {
  name:"",
  address: "",
  city: "",
  phone: "",
  pincode: "",
  email: "",
}

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData)
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { addressList } = useSelector((state) => state.shopAddress)
  const { toast } = useToast()

  function handleManageAddress(event) {
    event.preventDefault()

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData)
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      })

      return
    }

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          }),
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id))
            setCurrentEditedId(null)
            setFormData(initialAddressFormData)
            toast({
              title: "Address updated successfully",
            })
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          }),
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id))
            setFormData(initialAddressFormData)
            toast({
              title: "Address added successfully",
            })
          }
        })
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id))
        toast({
          title: "Address deleted successfully",
        })
      }
    })
  }

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id)
    setFormData({
      ...formData,
      name: getCuurentAddress?.name,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      email: getCuurentAddress?.email,
    })
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item)
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id))
  }, [dispatch])

  return (
    <Card className="border-amber-200 rounded-lg overflow-hidden shadow-lg bg-white">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-yellow-500 py-4">
        <CardTitle className="text-white flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Delivery Address
        </CardTitle>
      </CardHeader>

      {/* Address List */}
      {addressList && addressList.length > 0 && (
        <div className="p-4 grid grid-cols-1 gap-3 bg-amber-50">
          {addressList.map((singleAddressItem) => (
            <AddressCard
              key={singleAddressItem._id}
              selectedId={selectedId}
              handleDeleteAddress={handleDeleteAddress}
              addressInfo={singleAddressItem}
              handleEditAddress={handleEditAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Address Form */}
      <CardContent className="p-4 bg-white border-t border-amber-100">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
            {currentEditedId !== null ? (
              <>
                <Edit className="h-4 w-4" />
                Edit Address
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add New Address
              </>
            )}
          </h3>
          {currentEditedId !== null && (
            <button
              onClick={() => {
                setCurrentEditedId(null)
                setFormData(initialAddressFormData)
              }}
              className="ml-auto text-sm text-amber-600 hover:text-amber-800"
            >
              Cancel
            </button>
          )}
        </div>

        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Update Address" : "Add Address"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
          buttonClassName="bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium hover:from-amber-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
        />
      </CardContent>
    </Card>
  )
}

export default Address

