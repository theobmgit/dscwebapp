import User from "../models/user.js";
import { sign } from "jsonwebtoken";
import { hash, compare } from "bcrypt";

async function hashPassword(password) {
  return await hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await compare(plainPassword, hashedPassword);
}

export async function signup(req, res, next) {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      post: {},
    });
    const accessToken = sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    newUser.accessToken = accessToken;
    await newUser.save();
    res.json({
      data: newUser,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
}

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return next(new Error("Username does not exist"));
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return next(new Error("Password is not correct"));
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await User.findByIdAndUpdate(user._id, { accessToken });
    res.status(200).json({
      data: { username: user.username, role: user.role },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
