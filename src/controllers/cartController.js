import { Users } from "../models/userModel.js";

export const addToCart = async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });

  userData.cartData[req.body.itemId] += 1;

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData },
  );

  console.log("Added:", req.body.itemId);

  res.send("Added to Cart");
};

export const removeFromCart = async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });

  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData },
  );

  console.log("Removed:", req.body.itemId);

  res.send("Removed from Cart");
};

export const getCart = async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
};
