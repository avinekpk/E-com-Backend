import { getCart } from "../../src/controllers/cartController.js";
import { Users } from "../models/userModel";

jest.mock("../../src/models/userModel");

describe("getCart function", () => {
  it("should return user cart data", async () => {
    const req = { user: { id: "user_id" } };
    const res = { json: jest.fn() };

    const userData = { cartData: { item_id: 1, another_item_id: 2 } };
    Users.findOne.mockResolvedValue(userData);

    await getCart(req, res);

    expect(Users.findOne).toHaveBeenCalledWith({ _id: "user_id" });
    expect(res.json).toHaveBeenCalledWith(userData.cartData);
  });
});
