import { body } from "express-validator";

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать минимум 5 символов").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать минимум 5 символов").isLength({
    min: 5,
  }),
  body(
    "fullName",
    "Имя пользователя должно содержать минимум 3 символа"
  ).isLength({ min: 3 }),
  body("avatarUrl", "Не верная ссылка на аватарку").optional().isURL(),
];
