import express from "express";
import { register,login,logout,check} from "../controllers/auth.controller.js"; 
import { authMiddleware } from "../middleware/auth.middleware.js"; 

const authrouters=express.Router();
authrouters.post("/register",register);
authrouters.post("/login",login);
authrouters.post("/logout",logout);
authrouters.get("/check",check);


export default authrouters
