import ProductImageUpload from "@/components/admin-view/image-upload";
import ProductImageUpload2 from "@/components/admin-view/image-upload2";
import ProductImageUpload3 from "@/components/admin-view/image-upload3";
import ProductImageUpload4 from "@/components/admin-view/image-upload4";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image1: null,
  image2: null,
  image3: null,
  image4: null,
  title: "",
  description: "",
  category: "",
  price: "",
  salePrice: "",
  totalStock: "",
  sizes: [],
  averageReview: 0,
};


function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  // Image 1 States
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  
  // Image 2 States
  const [imageFile2, setImageFile2] = useState(null);
  const [uploadedImageUrl2, setUploadedImageUrl2] = useState("");
  const [imageLoadingState2, setImageLoadingState2] = useState(false);
  
  // Image 3 States
  const [imageFile3, setImageFile3] = useState(null);
  const [uploadedImageUrl3, setUploadedImageUrl3] = useState("");
  const [imageLoadingState3, setImageLoadingState3] = useState(false);
  
  // Image 4 States
  const [imageFile4, setImageFile4] = useState(null);
  const [uploadedImageUrl4, setUploadedImageUrl4] = useState("");
  const [imageLoadingState4, setImageLoadingState4] = useState(false);

  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    const payload = {
      ...formData,
      image1: uploadedImageUrl,
      image2: uploadedImageUrl2,
      image3: uploadedImageUrl3,
      image4: uploadedImageUrl4,
    };

    if (currentEditedId !== null) {
      dispatch(editProduct({ id: currentEditedId, formData: payload })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          resetForm();
          toast({
            title: "Product updated successfully",
            description: "Your product changes have been saved.",
          });
        }
      });
    } else {
      dispatch(addNewProduct(payload)).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          resetForm();
          toast({
            title: "Product added successfully",
            description: "Your product has been added to the inventory.",
          });
        }
      });
    }
  }


  function resetForm() {
    setFormData(initialFormData);
    // Reset all image states
    setImageFile(null);
    setImageFile2(null);
    setImageFile3(null);
    setImageFile4(null);
    setUploadedImageUrl("");
    setUploadedImageUrl2("");
    setUploadedImageUrl3("");
    setUploadedImageUrl4("");
    setImageLoadingState(false);
    setImageLoadingState2(false);
    setImageLoadingState3(false);
    setImageLoadingState4(false);
    setOpenCreateProductsDialog(false);
    setCurrentEditedId(null);
  }
  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    const isSizesValid =
      formData.sizes.length > 0 &&
      formData.sizes.every(
        (size) => size.size && size.stock && Number(size.stock) > 0
      );

    return (
      Object.keys(formData)
        .filter(
          (key) => !["averageReview", "sizes"].includes(key)
        )
        .map((key) => formData[key] !== "")
        .every((item) => item) && isSizesValid
    );
  }

  function handleSizeChange(index, field, value) {
    const updatedSizes = [...formData.sizes];
    updatedSizes[index][field] = value;
    setFormData((prev) => ({ ...prev, sizes: updatedSizes }));
  }

  function addNewSize() {
    setFormData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { size: "", stock: "" }],
    }));
  }

  function removeSize(index) {
    const updatedSizes = formData.sizes.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, sizes: updatedSizes }));
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-6 w-full flex justify-end">
        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <AdminProductTile
              key={productItem.id}
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              product={productItem}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-center text-amber-600 col-span-full">
            No products available.
          </p>
        )}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          resetForm();
        }}
      >
        <SheetContent
          side="right"
          className="overflow-auto bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200"
        >
          <SheetHeader>
            <SheetTitle className="text-amber-800">
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
           {/* Image Upload Components */}
<ProductImageUpload
  imageFile={imageFile}
  setImageFile={setImageFile}
  uploadedImageUrl={uploadedImageUrl}
  setUploadedImageUrl={setUploadedImageUrl}
  setImageLoadingState={setImageLoadingState}
  imageLoadingState={imageLoadingState}
  isEditMode={currentEditedId !== null}
  uniqueKey="image1"
/>

<ProductImageUpload2
  imageFile2={imageFile2}
  setImageFile2={setImageFile2}
  uploadedImageUrl2={uploadedImageUrl2}
  setUploadedImageUrl2={setUploadedImageUrl2}
  setImageLoadingState2={setImageLoadingState2}
  imageLoadingState2={imageLoadingState2}
  isEditMode={currentEditedId !== null}
  uniqueKey="image2"
/>

<ProductImageUpload3
  imageFile3={imageFile3}
  setImageFile3={setImageFile3}
  uploadedImageUrl3={uploadedImageUrl3}
  setUploadedImageUrl3={setUploadedImageUrl3}
  setImageLoadingState3={setImageLoadingState3}
  imageLoadingState3={imageLoadingState3}
  isEditMode={currentEditedId !== null}
  uniqueKey="image3"
/>

<ProductImageUpload4
  imageFile4={imageFile4}
  setImageFile4={setImageFile4}
  uploadedImageUrl4={uploadedImageUrl4}
  setUploadedImageUrl4={setUploadedImageUrl4}
  setImageLoadingState4={setImageLoadingState4}
  imageLoadingState4={imageLoadingState4}
  isEditMode={currentEditedId !== null}
  uniqueKey="image4"
/>
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
            {/* Dynamic size and stock input */}
            <div className="mt-6">
              <h4 className="text-lg font-bold text-amber-800 mb-4">
                Sizes and Stock
              </h4>
              {formData.sizes.map((size, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Size (e.g., S, M, L)"
                    value={size.size}
                    onChange={(e) =>
                      handleSizeChange(index, "size", e.target.value)
                    }
                    className="border border-amber-500 rounded px-4 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={size.stock}
                    onChange={(e) =>
                      handleSizeChange(index, "stock", e.target.value)
                    }
                    className="border border-amber-500 rounded px-4 py-2"
                  />
                  <Button
                    onClick={() => removeSize(index)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={addNewSize}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Add Size
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
