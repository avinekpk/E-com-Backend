import { Users } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({
      success: false,
      errors: "Email, password, and username are required",
    });
  }

  let check = await Users.findOne({ email: email });

  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Existing email",
    });
  }

  let cart = {};

  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new Users({
    name: username,
    email,
    password: hashedPassword,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.status(201).json({ success: true, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      errors: "Email and password are required",
    });
  }

  const user = await Users.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, "secret_ecom");

    res.status(200).json({ success: true, token });
  } else {
    return res.status(401).json({
      errors: "Invalid email or password.",
      status: false,
    });
  }
};
