import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/database.js";
import userRouter from "./routes/users.js";
import bodyParser from "body-parser";
import todoRouter from "./routes/todos.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import Redis from "ioredis";

const app = express();
// const redisClient = new Redis();

dotenv.config();

connectDb();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5174", // Allow only your frontend origin
    credentials: true, // Allow credentials (cookies, auth headers, etc.)
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// call the route
app.use("/api/v1/user", userRouter);
app.use(cookieParser());
app.use("/api/v1/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
