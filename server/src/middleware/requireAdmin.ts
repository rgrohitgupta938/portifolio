import { Request, Response, NextFunction } from "express";

export default function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const adminSecret = process.env.ADMIN_SECRET || "";
  const providedKey = req.headers["x-admin-key"];

  if (!adminSecret) {
    return res.status(500).json({
      message: "ADMIN_SECRET is not configured on the server",
    });
  }

  if (!providedKey || providedKey !== adminSecret) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
}