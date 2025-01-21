import { Button } from "@/components/ui/button";
import  SimpleSlider  from "@/pages/addonshome/SimpleSlider";
import  ReviewCarousel  from "@/pages/addonshome/ReviewCarousel";
import  Features  from "@/pages/addonshome/Features";
import  FeaturesComponent  from "@/pages/addonshome/FeaturesComponent";
import  KurtaPromo  from "@/pages/addonshome/KurtaPromo";
import  Footer  from "@/pages/addonshome/Footer";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';



  

// import bannerOne from "../../assets/banner-1.webp";
// import bannerTwo from "../../assets/banner-2.webp";
// import bannerThree from "../../assets/banner-3.webp";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast"; 
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";





function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
  <>
    <div className="flex flex-col min-h-screen">
      <div className="relative mb-5 w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-amber-100 focus:ring-amber-500 focus:outline-none"
        >
          <ChevronLeftIcon className="w-4 h-4 text-amber-500" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-amber-100 focus:ring-amber-500 focus:outline-none"
        >
          <ChevronRightIcon className="w-4 h-4 text-amber-500" />
        </Button>
      </div>

     
            <SimpleSlider/>
            <Features/>
            <KurtaPromo/>
            <ReviewCarousel/>
            <FeaturesComponent/>
           

    

     

            <section className="py-12 relative">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-serif text-center mb-8 text-amber-800">
      MOST LOVED
    </h2>
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },  // 1 item visible on small screens
        768: { slidesPerView: 2 },  // 2 items on tablets
        1024: { slidesPerView: 3 }, // 3 items on medium screens
        1280: { slidesPerView: 4 }, // 4 items on larger screens
      }}
      navigation={{
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom',
      }}
      modules={[Navigation]}
    >
      {productList && productList.length > 0 ? (
        productList.map((productItem, index) => (
          <SwiperSlide key={index}>
            <ShoppingProductTile
              handleGetProductDetails={handleGetProductDetails}
              product={productItem}
              handleAddtoCart={handleAddtoCart}
            />
          </SwiperSlide>
        ))
      ) : null}
    </Swiper>

    {/* Custom Navigation Buttons */}
    <div className="swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-amber-100 text-amber-600 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg shadow-md cursor-pointer hover:bg-amber-200">
      ❮
    </div>
    <div className="swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-amber-100 text-amber-600 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg shadow-md cursor-pointer hover:bg-amber-200">
      ❯
    </div>
  </div>
</section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
   
     </div>
      
      <Footer className="min-w-screen" />
  
  </>
  );
}

export default ShoppingHome;
