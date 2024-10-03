import { Router } from "express";
import { createProduct, getProducts, updateProduct, deleteProduct, getProductById } from "../controllers/products.controller.js";

export const productsRouter = Router();

productsRouter.get("/", getProducts);

productsRouter.post("/", createProduct);

productsRouter.get("/:pid", getProductById)

productsRouter.put("/:pid", updateProduct)

productsRouter.delete("/:pid", deleteProduct)

