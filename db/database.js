import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const dbUri = process.env.databaseConnection;

    if (!dbUri) {
      throw new Error("Database connection string is missing in .env file.");
    }

    // Connect to MongoDB
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDb;
