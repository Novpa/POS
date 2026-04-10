import "dotenv/config";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routers/auth.router";
import { globalErrorHandler } from "./middleware/error.middleware";

const app: Express = express();

const PORT = 8000;

// json middleware
app.use(express.json());

// cookie-parser middleware
app.use(cookieParser());

// cors middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Sesuaikan dengan URL Frontend kamu
    credentials: true, // WAJIB TRUE agar cookie bisa lewat
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Izinkan OPTIONS
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
// app.use(cors());

// auth endpoint
app.use("/api/auth", authRoute);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`🦄 Server is running in port ${PORT}`);
});
