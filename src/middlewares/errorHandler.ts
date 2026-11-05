import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction
): void{
    logger.error({err},"Unhandled error")

    res.status(500).json({
        success: false,
        message: "Internal Server error"
    })
}