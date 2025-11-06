import mongoose from "mongoose";
import dotenv from "dotenv";

// Only load .env file in development, not in production
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const connectToDataBase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    console.log("MongoDB URI:", mongoUri ? "Present" : "Missing"); // Debug log
    
    if (!mongoUri) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
};

export { connectToDataBase };