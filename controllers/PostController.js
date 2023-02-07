import PostSchema from "../models/PostSchema.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostSchema.find();

    res.json(posts);
  } catch (error) {
    console.log(">>>", error, "<<<<");
    res.status(500).json({ message: "Не удалось создать статью." });
  }
};

export const create = async (req, res) => {
  try {
    console.log("saasasasa");

    const document = new PostSchema({
      user: req.userId,
      tags: req.body.tags,
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
    });

    const post = await document.save();
    res.json(post);
  } catch (error) {
    console.log(">>>", error, "<<<<");
    res.status(500).json({ message: "Не удалось создать статью." });
  }
};
