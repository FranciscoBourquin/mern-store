import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 3000;

const __dirname = path.resolve();

const app = express();
app.use(express.json());

//Routes
app.use("/api/products", productsRouter);

if (NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res)=> {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`);
});

//DB connection
connectDB();
