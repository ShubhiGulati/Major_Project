import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("thisismysecret"));
app.use(methodOverride("_method"));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`🌐 ${req.method} ${req.path}`);
  console.log('Headers:', req.headers['content-type']);
  console.log('Body:', req.body);
  next();
});

const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(
  cors({
    origin: [frontendURL, "http://localhost:5173", "http://localhost:5174", "https://major-project-xi-opal.vercel.app"],
    credentials: true,
  })
);

app.use("/api", (req, res, next) => {
  console.log(`🔥 API Route hit: ${req.method} ${req.path}`);
  next();
}, routes);
app.use(express.static("public"));
app.use(errorHandler);

// Start server - DB connection is optional for now
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Try to connect to DB, but don't fail if it's not available
  const dbConnected = await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    if (dbConnected !== false) {
      console.log("✅ Database: Connected to MongoDB Atlas");
    } else {
      console.log("⚠️  Database: Not connected (some features may not work)");
    }
  });
};

startServer();
