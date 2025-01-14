import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="container mx-auto py-8 px-4 bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-amber-800 mb-6 text-center">
        Admin Dashboard
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md border border-amber-300">
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
        />
        <Button
          onClick={handleUploadFeatureImage}
          className="mt-5 w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 transition-all duration-200"
        >
          Upload Feature Image
        </Button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-amber-700 mb-4">
          Uploaded Feature Images
        </h2>
        {featureImageList && featureImageList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureImageList.map((featureImgItem) => (
              <div
                key={featureImgItem.id}
                className="relative border border-amber-300 rounded-lg shadow-md overflow-hidden bg-white"
              >
                <img
                  src={featureImgItem.image}
                  alt="Feature"
                  className="w-full h-[300px] object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-amber-600">
            No feature images uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
