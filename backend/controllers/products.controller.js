import mongoose from "mongoose";
import { Product } from "../models/product.model.js";

export const getProducts =  async(req, res)=> {
    try {
        const products = await Product.find();
        res.status(201).json({ success: true, data: products })
    } catch (error) {
        console.error(`Error fetching products from db: ${error.message}`);
        res.status(501).json({ success: false, message: "Server error" });

    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "All fields are mandatory" });
    }

    const newProduct = new Product(product);

    try {

        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });

    } catch (error) {

        console.error("Product creation failed", error.message);
        res.status(500).json({ success: false, message: "Server error"  });
    }
}

export const getProductById = async (req, res) => {
    const {pid} = req.params;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
        res.status(404).json({ success: false, message: `Product with ID ${pid} not found` })
    }

    try {
        const product = await Product.findById(pid);
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("Error fetching product from db:", error.message);
        res.status(500).json({ success: false, message: "Server error" })
    }
}

export const updateProduct = async(req, res)=> {
    const productInfo = req.body;
    const {pid} = req.params;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
        res.status(404).json({ success: false, message: `Product with ID ${pid} not found` })
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(pid, productInfo, {new: true});
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
       res.status(500).json({ success: false, message: "Server error" });

    }
}

export const deleteProduct = async (req,res)=> {
    const {pid} = req.params;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
        res.status(404).json({ success: false, message: `Product with ID ${pid} not found` })
    }
    try {
        await Product.findByIdAndDelete(pid);
        res.status(200).json({ success: true, message: `product with ID ${pid}, sucessfully deleted` })
    } catch (error) {
        console.error(`Error deleting product: ${error.message}`);
        res.status(500).json( { success: false, message: "Server error" })

    }
}
