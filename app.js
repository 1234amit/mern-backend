import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/database.js";
import userRouter from "./routes/users.js";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

connectDb();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// call the route
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
