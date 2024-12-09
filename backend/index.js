import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"; // Corrected the typo
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
dotenv.config({}); // Fixed the typo

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173', // Corrected CORS URL
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
// Example: http://localhost:3000/api/v1/user/register
// Example: http://localhost:3000/api/v1/user/login
// Example: http://localhost:3000/api/v1/user/profile/update

app.listen(PORT, () => {
  connectDB(); // Connect to the database
  console.log(`Server running at port ${PORT}`);
});
