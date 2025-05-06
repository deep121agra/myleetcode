import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import authrouters from "./routes/auth.routers.js";
import problemRoutes from "./routes/problem.routes.js";
import executionRoutes from "./routes/executionRoutes.js";
import submissionRoute from "./routes/submission.routes.js";

dotenv.config(); // Load environment variables from .env file

const port = process.env.PORT || 3000; // Fallback to port 3000 if PORT is not defined

const app = express();
app.use(express.json())
app.use(cookieParser()) // Middleware to parse cookies from the request

// Define a route
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!"); // Send a response back to the client
});
app.use("/api/v1/auth" , authrouters)
app.use("/api/v1/problems",problemRoutes)
app.use("/api/v1/execution",executionRoutes)
app.use("/api/v1/submission",submissionRoute)

// Start the server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});