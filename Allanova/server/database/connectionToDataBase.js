import mongoose from "mongoose";

const connectToDataBase = async () => {
  try {
    
    const mongoUri = process.env.MONGO_URI;
    
    console.log("MONGO_URI present:", mongoUri ? "Yes" : "No");
    console.log("All environment variables:", Object.keys(process.env));
    
    if (!mongoUri) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
};

export { connectToDataBase };