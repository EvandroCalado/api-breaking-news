import express from "express";
import mongoose from "mongoose";
import connectDatabase from "./src/database/db.js";
import userRoute from "./src/routes/user.route.js";
import dotenv from "dotenv"

const port = process.env.PORT || 3000;
const app = express();
dotenv.config()

mongoose.set("strictQuery", false);
connectDatabase();
app.use(express.json());
app.use("/user", userRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
