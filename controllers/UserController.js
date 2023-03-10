import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import UserSchema from "../models/User.js";

export const login = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "Неверный логин или пароль." });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(400).json({ message: "Неверный логин или пароль." });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret12345",
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    res.status(500).json({ message: "Не удалось авторизоваться." });
  }
};

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const document = new UserSchema({
      passwordHash: hash,
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await document.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret12345",
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось зарегестрироваться.", error });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден." });
    }

    const { passwordHash, ...userData } = user._doc;
    res.json(userData);
  } catch (error) {
    console.log(">>>ERROR<<<", error);
    res.status(500).json({ message: "Нет доступа." });
  }
};
