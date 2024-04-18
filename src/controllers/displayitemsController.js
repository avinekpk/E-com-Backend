import { Products } from "../models/productModel.js";

export const newCollection = async (req, res) => {
  let products = await Products.find({});
  let newCollection = products.slice(1).slice(-8);

  console.log("New collection fetched");
  res.status(200).send(newCollection);
};
