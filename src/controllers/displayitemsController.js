import { Products } from "../models/productModel.js";

export const newCollection = async (req, res) => {
  let products = await Products.find({});
  let newCollection = products.slice(-8);

  console.log("New collection fetched");
  res.status(200).send(newCollection);
};

export const popularInWomen = async (req, res) => {
  let products = await Products.find({ category: "women" });
  let popularItems = products.slice(0, 4);

  console.log("Popular in women fetched");
  res.status(200).send(popularItems);
};
