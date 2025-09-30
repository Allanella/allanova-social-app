import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // No returning passwords by default
    },

    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    profilePicture: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    bio: {
      type: String,
      maxlength: 500,
      default: "",
    },
    title: {
      type: String, // e.g., "Full Stack Developer"
      default: "",
    },
    skills: [
      {
        type: String,
      },
    ],
    experience: {
      type: String, // e.g., "3 years"
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    githubUsername: {
      type: String,
      default: "",
    },
    portfolio: {
      type: String,
      default: "",
    },
    openToWork: {
      type: Boolean,
      default: false,
    },
    hiring: {
      type: Boolean,
      default: false,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async (next) => {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePasswords = async (userPassword) => {
    return await bcrypt.compare(userPassword, this.password)
}

export const user = ("user", userSchema);