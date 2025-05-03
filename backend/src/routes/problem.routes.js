import express from "express";
import { createProblem, getAllProblems,getProblemById,updateproblem,deleteProblem,getAllSolvedProblemsUser } from "../controllers/problem.controller.js";
import { authMiddleware,checkAdmin } from "../middleware/auth.middleware.js";
const problemRoutes=express.Router();

problemRoutes.post("/create-problem",authMiddleware,checkAdmin,createProblem);
problemRoutes.get("/all-problems",authMiddleware,getAllProblems);
problemRoutes.get("/problem/:id",authMiddleware,getProblemById);
problemRoutes.get("/update-problem/:id",authMiddleware,checkAdmin,updateproblem);
problemRoutes.delete("/delete-problem/:id",authMiddleware,checkAdmin,deleteProblem);
problemRoutes.get("/get-solved-problems",authMiddleware,getAllSolvedProblemsUser);





export default problemRoutes