import { addProduct } from "../../src/controllers/productController";
import { Products } from "../../src/models/productModel";

jest.mock("../../src/models/productModel"); // Mocking the Products model

describe("addProduct function", () => {
  it("should add a new product", async () => {
    const req = {
      body: {
        name: "Test Product",
        image: "test_image.jpg",
        category: "test_category",
        new_price: 10,
        old_price: 20,
      },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const products = [{ id: 1 }];
    Products.find.mockResolvedValue(products);
    Products.prototype.save.mockResolvedValue();

    await addProduct(req, res);

    expect(Products.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      name: "Test Product",
    });
  });

  // Add more unit tests for other scenarios...
});
