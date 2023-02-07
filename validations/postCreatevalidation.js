import { body } from "express-validator";

export const postCreateValidation = [
  body("content", "Введите текст статьи.").isLength({ min: 3 }),
  body("title", "Введите заголовок статьи.").isLength({ min: 3 }).isString,
  body("imageUrl", "Неверная ссылка на изображение.").optional().isString(),
  body("tags", "Неверны формат тегов (укажите массив).").optional().isString(),
];
