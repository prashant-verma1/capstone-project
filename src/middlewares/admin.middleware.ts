

import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { verifyAccessTOken } from "../lib/jwt";


export function requireAdmin(
    req: Request,
    res: Response,
    next: NextFunction
): void{
    
    if(req.user?.role !=='Admin'){
        next(new AppError(403,'Admin access required. You do not have admin access'))
        return
    }
    next()
}