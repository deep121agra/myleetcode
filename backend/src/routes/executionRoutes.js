import express  from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {executecode} from "../controllers/executecode.controller.js"


const executionRoutes=express.Router();
executionRoutes.post("/",authMiddleware,executecode)


export default executionRoutes;