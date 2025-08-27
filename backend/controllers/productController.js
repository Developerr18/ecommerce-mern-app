import { v2 as cloudinary } from "cloudinary";
import ProductModel from "../models/productModel.js";

// Controller function to add a new product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Extract uploaded images from req.files (multer stores them in arrays)
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // Upload images to Cloudinary and get their URLs
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: Boolean(bestseller === "true" ? true : false),
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    // Create and save a new product document in MongoDB
    const product = new ProductModel(productData);
    await product.save();
    res.json({ success: true, message: "Product Added" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

const getProducts = (req, res) => {};

const removeProduct = (req, res) => {};

const singleProduct = (req, res) => {};

export { addProduct, getProducts, removeProduct, singleProduct };
