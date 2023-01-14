import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()

import { connectDB } from "./config/dbConnect.js";
import posts from "./routes/api/posts.js";

const app = express()
const PORT = 7070 || process.env.PORT

//connect database
connectDB()

app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', posts)

mongoose.connection.once('open', ()=> {
  console.log("Connected to MongoDB! 🚀🚀🚀🚀")
  app.listen(PORT, () => console.log(`Server running on port ${PORT} ⚡⚡⚡⚡`))
})
