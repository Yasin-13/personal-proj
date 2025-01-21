const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({ 
  cloud_name: 'dmspshpfs', 
  api_key: '727293229298291',
  api_secret: "XP04hUC8YaE6kYop3xDPAr1E110",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };