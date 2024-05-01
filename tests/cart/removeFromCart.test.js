import { removeFromCart } from "../../src/controllers/cartController.js";
import { Users } from "../../src/models/userModel.js";

jest.mock("../../src/models/userModel");

describe("removeFromCart function", () => {
  it("should remove item from user cart if quantity is greater than 0", async () => {
    const req = { user: { id: "user_id" }, body: { itemId: "item_id" } };
    const res = { send: jest.fn() };

    const userData = { cartData: { item_id: 1 } };
    Users.findOne.mockResolvedValue(userData);
    Users.findOneAndUpdate.mockResolvedValue(userData);

    await removeFromCart(req, res);

    expect(Users.findOne).toHaveBeenCalledWith({ _id: "user_id" });
    expect(Users.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "user_id" },
      { cartData: { item_id: 0 } },
    );
    expect(res.send).toHaveBeenCalledWith("Removed from Cart");
  });

  it("should not remove item from user cart if quantity is already 0", async () => {
    const req = { user: { id: "user_id" }, body: { itemId: "item_id" } };
    const res = { send: jest.fn() };

    const userData = { cartData: { item_id: 0 } };
    Users.findOne.mockResolvedValue(userData);

    await removeFromCart(req, res);

    expect(Users.findOneAndUpdate).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith("Removed from Cart");
  });
});
