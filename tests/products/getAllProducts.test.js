import { getAllProducts } from "../../src/controllers/productController";
import { Products } from "../models/productModel";

jest.mock("../../src/models/productModel"); // Mocking the Products model

describe("getAllProducts function", () => {
  it("should fetch all products", async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    const products = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    Products.find.mockResolvedValue(products);

    await getAllProducts(req, res);

    expect(Products.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(products);
  });

  it("should return 404 if no products found", async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    Products.find.mockResolvedValue(null);

    await getAllProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Products not found",
    });
  });

  // Add more unit tests for other scenarios...
});
