//step-1
// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import path from "path";
// databaseConnection();

// dotenv.config({
//     path:".env"
// })
dotenv.config({ path: ".env" });
databaseConnection();


const app = express();
// const _dirname=path.resolve();
//middlewares 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    // origin:'https://netflix2-0-3w08.onrender.com',
    origin:"http://localhost:3000",
    credentials:true
}
app.use(cors(corsOptions));
 
// api
app.use("/api/v1/user", userRoute);

app.use(express.static(path.join(_dirname,"/netflix/build")));
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"netflix","build","index.html"));
})
app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
});