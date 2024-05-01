import { addToCart } from "../../src/controllers/cartController.js";
import { Users } from "../../src/models/userModel";

jest.mock("../../src/models/userModel"); // Mocking the User model

describe("addToCart function", () => {
  it("should add item to user cart", async () => {
    const req = { user: { id: "user_id" }, body: { itemId: "item_id" } };
    const res = { send: jest.fn() };

    const userData = { cartData: { item_id: 0 } };
    Users.findOne.mockResolvedValue(userData);
    Users.findOneAndUpdate.mockResolvedValue(userData);

    await addToCart(req, res);

    expect(Users.findOne).toHaveBeenCalledWith({ _id: "user_id" });
    expect(Users.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "user_id" },
      { cartData: { item_id: 1 } },
    );
    expect(res.send).toHaveBeenCalledWith("Added to Cart");
  });

});
