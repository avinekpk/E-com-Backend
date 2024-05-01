import { popularInWomen } from "../../src/controllers/productController.js";
import { Products } from "../../src/models/userModel";

jest.mock("../../src/models/userModel"); // Mocking the Products model

describe("popularInWomen function", () => {
  it("should fetch top 4 popular items in women category", async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    const products = [
      { name: "Product 1", category: "women" },
      { name: "Product 2", category: "women" },
      // Add more sample products here...
    ];
    Products.find.mockResolvedValue(products);

    await popularInWomen(req, res);

    expect(Products.find).toHaveBeenCalledWith({ category: "women" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(products.slice(0, 4));
  });
});
