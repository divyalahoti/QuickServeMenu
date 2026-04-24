import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  isPopular: Boolean,
  tags: [String]
});

export default mongoose.model("Menu", menuSchema);