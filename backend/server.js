import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from 'dns';
import colors from 'colors'
import bookingRouter from "./routes/bookingRoute.js";
import orderRouter from './routes/orderRoute.js';

// change DNS

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();


// middleware
app.use(cors());
app.use(express.json());



app.use("/api/order", orderRouter);
app.use("/api/booking", bookingRouter);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// connect DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
// server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});