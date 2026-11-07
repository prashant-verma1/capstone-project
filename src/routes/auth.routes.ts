import { Router } from "express";
import { registerUser } from "../services/auth.service";

export const authRouter = Router()

authRouter.post("/register", async(req,res,next) =>{
    try {
        const {email,password} = req.body
        //not write service logic
        await registerUser(email,password)
        res.status(201).json({
            success: true,
            message: "Registration successfull. Please login to continue"
        }) //201 for write/created successfully
        
    } catch (error) {
        next(error)
    }
})