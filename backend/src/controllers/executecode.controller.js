import { db } from "../libs/db.js";
import {
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

export  const  executecode=async(req,res)=>{

  try{
  const { source_code, language_id, stdin, expected_outputs, problemId } =
      req.body;
      const userId=req.user.id;
      // first validate the test in a format of array or not
      if (
        !Array.isArray(stdin) ||
        stdin.length === 0 ||
        !Array.isArray(expected_outputs) ||
        expected_outputs.length !== stdin.length
      ) {
        return res.status(400).json({ error: "Invalid or Missing test cases" });
      }

  // 2. Prepare each test cases for judge0 batch submission
    const submissions = stdin.map((input) => ({
      source_code,
      language_id,
      stdin: input,
    }));
  }
  catch(error){
    console.log(error)
  }
}