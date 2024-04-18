import { Products } from "../models/productModel.js";

export const addProduct = async (req, res) => {
  let products = await Products.find({});
  let id;

  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Products({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");

  res.status(201).json({
    success: true,
    name: req.body.name,
  });
};

export const removeProduct = async (req, res) => {
  const removed = await Products.findOneAndDelete({ id: req.body.id });
  if (removed) {
    console.log("Removed: ", removed);

    res.status(200).json({
      success: true,
      message: "Product removed",
      name: req.body.name,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Product not found",
      name: req.body.name,
    });
  }
};

export const getAllProducts = async (req, res) => {
  let products = await Products.find({});

  if (products) {
    console.log("All products: ", products);

    res.status(200).send(products);
    // .json({
    //   success: true,
    //   message: "Products fetched",
    //   name: req.body.name,
    //   data: products,
    // });
  } else {
    res.status(404).json({
      success: false,
      message: "Products not found",
    });
  }
};
