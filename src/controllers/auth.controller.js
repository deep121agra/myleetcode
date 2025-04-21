import bcrypt from "bcryptjs";
import {db} from "../libs/db.js"
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken"
export const register=async(req,res)=>{
  const {email,password,name}=req.body;
  try{
    const existingUser=await db.user.findUnique({
      where:{
        email
      }
    })
    if(existingUser){
      return res.staus(400).json({
       error :"User already exists"
      })
    }

    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=await db.user.create({
      data:{
        email,
        password:hashedPassword,
        name,
        role:UserRole.USER
      }
})
const token=jwt.sign({id:newUser.id},process.env.JWT_SECRET,{
  expiresIn:"7d"
})
res.cookie("jwt",token,{
  httpOnly:true,
  sameSite:"Strict",
  secure:process.env.NODE_ENV!=="development",
  maxAge:1000*60*60*24*7  // 7 days
})
res.status(201).json({
  message:"User created successfullt",
  user:{
    id:newUser.id,
    email:newUser.email,
    name:newUser.name,
    role:newUser.role,
    image:newUser.image
  }
})
}
catch(error){
  console.error("Error creating user",error);
  res.staus(500).json({
    error:"Error creating user"
  })
}

};
export const login=async(req,res)=>{
  const{email,password,name}=req.body;
  try{
     const user=await db.user.findUnique({
      where:{
        email
      }
     })
     if(!user){
      return res.staus(401).json({
        error:"User not found"
      })
     }
     const isMatch=await bcrypt.compare(password,user.password);
     if(!isMatch){
        return res.staus(400).json({
          error:"Password does not match"
        })
     }
     const token=JsonWebTokenError.sign({id:user.id},process.env.JWT_SECRET,{
      expiresIn:"7d"
     })
     res.cookie("jwt",token,{
      httpOnly:true,
      sameSite:"Strict",
      secure:process.env.NODE_ENV!=="development",
      maxAge:1000*60*60*24*7  // 7 days
    })

    res.status(201).json({
      message:"User created successfullt",
      user:{
        id:user.id,
        email:user.email,
        name:user.name,
        role:user.role,
        image:user.image
      }
    })


  }
  catch(error){
    console.error("Error creating user",error);
    res.staus(500).json({
      error:"Error creating user"
    })
  }

  }
;
export const logout=async(req,res)=>{
  try{
    res.clearCookie("jwt",token,{
      httpOnly:true,
      sameSite:"Strict",
      secure:process.env.NODE_ENV!=="development",
    })
    res.status(204).json({
      message:"user can be logged out succefffully"
    })
  }
  catch(error){
    console.error("Error creating user",error);
    res.staus(500).json({
      error:"Error logging out user"
    })
  }
};

export const check=async(req,res)=>{
  try {
    res.status(200).json({
        success:true,
        message:"User authenticated successfully",
        user:req.user
    });
} catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({
        error:"Error checking user"
    })
}
};