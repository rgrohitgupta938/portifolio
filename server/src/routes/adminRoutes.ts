import { Router } from "express";
import requireAdmin from "../middleware/requireAdmin";
import Project from "../models/Project";
import Contact from "../models/Contact";

const router = Router();

router.get("/stats", requireAdmin, async (_req, res) => {
  try {
    const [projectCount, contactCount, featuredCount] = await Promise.all([
      Project.countDocuments(),
      Contact.countDocuments(),
      Project.countDocuments({ featured: true }),
    ]);

    return res.status(200).json({
      projectCount,
      contactCount,
      featuredCount,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch admin stats",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;