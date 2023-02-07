import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import checkAuth from "./utils/checkAuth.js";
import {
  loginValidation,
  registerValidation,
} from "./validations/validations.js";
import { postCreateValidation } from "./validations/postCreatevalidation.js";
import * as UserControllers from "./controllers/UserController.js";
import * as PostControllers from "./controllers/PostController.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;
const PASSWORD = process.env.PASSWORD;
const USER_NAME = process.env.USER_NAME;
const LOCALHOST = process.env.LOCALHOST;
const DB = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.7supdix.mongodb.net/blog?retryWrites=true&w=majority`;

app.use(express.json());
app.use(cors());

app.post("/auth/login", loginValidation, UserControllers.login);

app.post("/auth/register", registerValidation, UserControllers.register);

app.get("/auth/me", checkAuth, UserControllers.getMe);

app.get("/posts", PostControllers.getAll);
app.post("/posts", checkAuth, postCreateValidation, (req, res) => {
  res.json({ message: "Done!" });
});
// app.get("/posts/:id", PostControllers.getOne);
// app.patch("/posts/:id", PostControllers.update);
// app.delete("/posts/:id", PostControllers.remove);

const startApp = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB connected!"))
      .catch((error) => console.log("Connection failed!", error));

    app.listen(PORT, LOCALHOST, (error) => {
      if (error) {
        console.log(error);
      }
      console.log(`Server started on ${PORT} port...`);
    });
  } catch (error) {
    console.log(error);
  }
};
startApp();

/* 
 const document = new UserSchema({
      passwordHash,
      email: req.body.email,
      fullName: req.body.fullName,
    });

    const user = await document.save();
    

    Метод save возвращает объект документа, сохраненный в базе данных.
    В приведенном примере, user содержит объект, сохраненный в базе данных,
    созданный с помощью модели UserSchema и содержащий данные passwordHash, email и fullName.
    */
