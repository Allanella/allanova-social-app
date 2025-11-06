import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    content: {
      type: String,
      required: [true, 'Content is required'],
      maxlength: 5000,
    },

    codeSnippet: {
      code: String,
      language: String,
    },

    images: [{ type: String }],

    tags: [{ type: String, lowercase: true }],

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    commentCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Improve performance when querying posts
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ createdAt: -1 });

export const Post = mongoose.model('Post', postSchema);
export default Post;
