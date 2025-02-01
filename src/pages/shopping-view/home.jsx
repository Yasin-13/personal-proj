import { Button } from "@/components/ui/button";
import  SimpleSlider  from "@/pages/addonshome/SimpleSlider";
import  ReviewCarousel  from "@/pages/addonshome/ReviewCarousel";
import  Features  from "@/pages/addonshome/Features";
import  FeaturesComponent  from "@/pages/addonshome/FeaturesComponent";
import  KurtaPromo  from "@/pages/addonshome/KurtaPromo";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from "react-router-dom";
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
  const[currentSlide, setCurrentSlide] = useState(0);
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


  const bannerTexts = [
    "Timeless Elegance, Only at Nitin Readymade",
    "Discover Style, Embrace Comfort",
    "Luxury Kurtas & Sherwanis Await You",
    "Crafted for the Modern Man's Wardrobe",
    "Elegance in Every Stitch, Luxury in Every Design",
    "Explore the Finest Collection of Men's Kurtas",
    "Unmatched Comfort Meets Superior Style",
    "Where Tradition Meets Contemporary Fashion",
    "Your Destination for Premium Kurtas & Sherwanis",
    "Experience the Art of Tailoring at Its Best",
    "Step into Tradition with a Touch of Modernity",
    "Premium Fabric, Flawless Fit, Timeless Style",
    "Classic Styles for the Modern Gentleman",
    "Unveil Your Style with Our Exclusive Kurtas",
    "Celebrate Every Occasion with the Perfect Kurta",
    "Discover the Essence of Indian Craftsmanship",
    "Sophisticated Kurtas, Made for You",
    "From Traditional to Trendy, We've Got It All",
    "Wear Your Culture with Pride & Style",
    "Perfectly Tailored, Exceptionally Crafted",
    "Elevate Your Style with Our Designer Kurtas",
    "Where Fashion Meets Function in Every Stitch",
    "Step Out in Style with Our Signature Kurtas",
    "Luxury That Speaks of Tradition & Elegance",
    "Modern Kurtas with a Traditional Twist",
    "Be the Best-Dressed Man at Any Celebration",
  ];
  

  return (
  <>
    <div className="flex flex-col min-h-screen">
    <div className="relative mb-5 w-full h-[600px] overflow-hidden">
  {featureImageList && featureImageList.length > 0
    ? featureImageList.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide?.image} className="w-full h-full object-cover" alt="Banner" />
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center text-white px-6 font-serif drop-shadow-lg">
            <h1 className="font-playfair display font-bold tracking-wide drop-shadow-2xl text-3xl sm:text-4xl md:text-5xl lg:text-4xl">
              {bannerTexts[index % bannerTexts.length]}
            </h1>

            <p className="mt-1 text-white/80 font-cinzel italic tracking-wider drop-shadow-lg text-lg sm:text-xl md:text-2xl">
              Explore our latest collection and find your perfect fit.
            </p>

                    <Link to="/shop/listing">
                      <button
                        className="mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg shadow-lg hover:from-amber-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      >
                      Shop Now
                      </button>
                    </Link>
                    
          </div>
        </div>
      ))
    : null}

  <Button
    variant="outline"
    size="icon"
    onClick={() =>
      setCurrentSlide(
        (prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length
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
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
    }
    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-amber-100 focus:ring-amber-500 focus:outline-none"
  >
    <ChevronRightIcon className="w-4 h-4 text-amber-500" />
  </Button>
</div>


     
            <SimpleSlider/>
            <Features/>
            <KurtaPromo/>
            
            
           

    

     

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

     
     <ReviewCarousel/>
     <FeaturesComponent/>
  
  </>
  );
}

export default ShoppingHome;