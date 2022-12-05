import express from "express";
import { connectDB } from "./config/DB";
import authRouter from "./routes/aouthRouter";
import "dotenv/config";
import todoRouter from "./routes/todoRouter";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// database conection
connectDB();

// Routes
app.use(`/api/v1/user`, authRouter);
app.use(`/api/v1/todo`, todoRouter);

// port
const PORT = process.env.port || 5001;
app.listen(PORT, () => {
  console.log("server run on port : " + PORT);
});
