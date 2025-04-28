import express from "express";
import dotenv from "dotenv";
import cookiePariser from "cookie-parser"
import authrouters from "./routes/auth.routers.js";

dotenv.config(); // Load environment variables from .env file

const port = process.env.PORT || 3000; // Fallback to port 3000 if PORT is not defined

const app = express();
app.use(express.json())

// Define a route
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!"); // Send a response back to the client
});
app.use("/api/vi.auth" , authrouters)
app.use("/api/v1/problems",problemRoutes)

// Start the server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});