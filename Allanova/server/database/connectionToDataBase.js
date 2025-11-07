import mongoose from "mongoose";

const connectToDataBase = async () => {
  try {
    // Support both MONGO_URI and MONGODB_URI variable names
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    console.log("=== DATABASE CONNECTION CHECK ===");
    console.log("MONGO_URI present:", process.env.MONGO_URI ? "Yes" : "No");
    console.log("MONGODB_URI present:", process.env.MONGODB_URI ? "Yes" : "No");
    console.log("Using URI:", mongoUri ? "Yes (hidden for security)" : "No");
    
    if (!mongoUri) {
      throw new Error("MONGO_URI or MONGODB_URI environment variable is not defined");
    }

    // Connect to MongoDB with recommended options
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("✅ Connected to MongoDB successfully");
    console.log("Database:", mongoose.connection.db.databaseName);
  } catch (error) {
    console.error("❌ Error connecting to database:", error.message);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

export { connectToDataBase };