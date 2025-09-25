import mongoose from "mongoose";
import dotenv from "dotenv";

import Product from "../models/products.model";
import Brand from "../models/brands.model";
import Category from "../models/categories.model";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/yourdb");
    console.log("✅ MongoDB Connected");

    // Clear old data
    await Product.deleteMany({});
    await Brand.deleteMany({});
    await Category.deleteMany({});

    // Insert Brands
    const brands = await Brand.insertMany([
      { name: "Nike", slug: "nike", description: "Sports brand" },
      { name: "Adidas", slug: "adidas", description: "Another sports brand" },
    ]);

    // Insert Categories
    const categories = await Category.insertMany([
      { name: "Shoes", slug: "shoes", description: "Footwear products" },
      { name: "Clothes", slug: "clothes", description: "Apparel products" },
    ]);

    // Insert Products
    const products = await Product.insertMany([
      {
        product_name: "Nike Air Zoom",
        category_id: categories[0]._id,
        brand_id: brands[0]._id,
        slug: "nike-air-zoom",
        sku: "NAZ001",
        price: 120,
        stock: 50,
        image_url: "https://example.com/nike-air-zoom.jpg",
        variant: ["red", "blue", "black"],
      },
      {
        product_name: "Adidas Ultraboost",
        category_id: categories[0]._id,
        brand_id: brands[1]._id,
        slug: "adidas-ultraboost",
        sku: "ADU001",
        price: 150,
        stock: 30,
        image_url: "https://example.com/adidas-ultraboost.jpg",
        variant: ["white", "black"],
      },
    ]);

    console.log("✅ Seed completed");
    console.log({ brands, categories, products });
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed", err);
    process.exit(1);
  }
}

seed();
