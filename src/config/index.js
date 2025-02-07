export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "kurta", label: "Kurta" },
      { id: "payjama", label: "Payjama" },
      { id: "sherwani", label: "Sherwani" },
      { id: "pagdi", label: "Pagdi" },
      { id: "topi", label: "Topi" },
      { id: "dhoti", label: "Dhoti" },
      { id: "bandhgala", label: "Bandhgala" },
      { id: "achkan", label: "Achkan" },
      { id: "pathani", label: "Pathani" },
      { id: "jodhpuri", label: "Jodhpuri" },
      { id: "nehrutop", label: "Nehru Top" },
      { id: "kurtaSet", label: "Kurta Set" },
      { id: "indowestern", label: "Indo-Western" },
      { id: "tunic", label: "Tunic" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nitinReadymade", label: "Nitin Readymade" },
    ],
    required: true,
  },
  {
    label: "Material",
    name: "material",
    componentType: "select",
    options: [
      { id: "premiumCotton", label: "Premium Quality Cotton" },
      { id: "silk", label: "Silk" },
      { id: "linen", label: "Linen" },
      { id: "rayon", label: "Rayon" },
      { id: "polyester", label: "Polyester" },
    ],
  },
  {
    label: "Sleeve Length",
    name: "sleeveLength",
    componentType: "select",
    options: [
      { id: "long", label: "Long" },
      { id: "short", label: "Short" },
      { id: "threeQuarter", label: "Three Quarter" },
    ],
  },
  {
    label: "Neck",
    name: "neck",
    componentType: "select",
    options: [
      { id: "mandarin", label: "Mandarin" },
      { id: "round", label: "Round" },
      { id: "collared", label: "Collared" },
      { id: "vNeck", label: "V-Neck" },
    ],
  },
  {
    label: "Length",
    name: "length",
    componentType: "select",
    options: [
      { id: "kneeLength", label: "Knee Length" },
      { id: "midThigh", label: "Mid Thigh" },
      { id: "ankleLength", label: "Ankle Length" },
    ],
  },
  {
    label: "Occasion",
    name: "occasion",
    componentType: "select",
    options: [
      { id: "traditional", label: "Traditional and Festive Events" },
      { id: "casual", label: "Casual" },
      { id: "formal", label: "Formal" },
      { id: "party", label: "Party Wear" },
    ],
  },
  {
    label: "Technique",
    name: "technique",
    componentType: "select",
    options: [
      { id: "screenPrinting", label: "Screen Printing" },
      { id: "embroidery", label: "Embroidery" },
      { id: "blockPrinting", label: "Block Printing" },
      { id: "handPainted", label: "Hand Painted" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
  {
    label: "Sizes and Stock",
    name: "sizes",
    componentType: "dynamic",
    fields: [
      {
        label: "Size",
        name: "size",
        componentType: "input",
        type: "text",
        placeholder: "Enter size (e.g., S, M, L, XL)",
      },
      {
        label: "Stock for Size",
        name: "stock",
        componentType: "input",
        type: "number",
        placeholder: "Enter stock for this size",
      },
    ],
  },
];




export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  kurta: "Kurta",
  payjama: "Payjama",
  sherwani: "Sherwani",
  pagdi: "Pagdi",
  topi: "Topi",
  dhoti: "Dhoti",
  bandhgala: "Bandhgala",
  achkan: "Achkan",
  pathani: "Pathani",
  jodhpuri: "Jodhpuri",
  nehrutop: "Nehru Top",
  kurtaSet: "Kurta Set",
  indowestern: "Indo-Western",
  tunic: "Tunic",
};


export const brandOptionsMap = {
  nitinReadymade: "Nitin Readymade",
};

export const filterOptions = {
  category: [
    { id: "kurta", label: "Kurta" },
    { id: "payjama", label: "Payjama" },
    { id: "sherwani", label: "Sherwani" },
    { id: "pagdi", label: "Pagdi" },
    { id: "topi", label: "Topi" },
    { id: "dhoti", label: "Dhoti" },
    { id: "bandhgala", label: "Bandhgala" },
    { id: "achkan", label: "Achkan" },
    { id: "pathani", label: "Pathani" },
    { id: "jodhpuri", label: "Jodhpuri" },
    { id: "nehrutop", label: "Nehru Top" },
    { id: "kurtaSet", label: "Kurta Set" },
    { id: "indowestern", label: "Indo-Western" },
    { id: "tunic", label: "Tunic" },
  ],
  brand: [
    { id: "nitinReadymade", label: "Nitin Readymade" },
  ],
};


export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
