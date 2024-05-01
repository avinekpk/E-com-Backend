import { newCollection } from "../../src/controllers/productController.js";
import { Products } from "../../src/models/userModel";

jest.mock("../../src/models/userModel");

describe("newCollection function", () => {
  it("should fetch latest 8 products", async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    const products = [
      { name: "Product 1" },
      { name: "Product 2" },
      // Add more sample products here...
    ];
    Products.find.mockResolvedValue(products);

    await newCollection(req, res);

    expect(Products.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(products.slice(-8));
  });
});
