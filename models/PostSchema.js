import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    imageUrl: { type: String },
    tags: { type: Array, default: [] },
    viewCount: { type: Number, default: 0 },
    title: { type: String, required: true },
    content: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
