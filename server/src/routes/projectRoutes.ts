import { Router } from "express";
import Project from "../models/Project";
import { sampleProjects } from "../data";
import requireAdmin from "../middleware/requireAdmin";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    console.log("GET /api/projects hit");

    const projects = await Project.find().sort({ createdAt: -1 });
    console.log("Projects found:", projects.length);

    if (projects.length > 0) {
      return res.status(200).json(projects);
    }

    if (sampleProjects.length > 0) {
      return res.status(200).json(sampleProjects);
    }

    return res.status(200).json([]);
  } catch (error) {
    console.error("GET /api/projects error:", error);

    return res.status(500).json({
      message: "Failed to fetch projects",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.get("/seed", async (_req, res) => {
  try {
    console.log("GET /api/projects/seed hit");

    const existing = await Project.countDocuments();
    console.log("Existing project count:", existing);

    if (existing > 0) {
      return res.status(200).json({
        message: "Projects already exist in database",
        count: existing,
      });
    }

    const inserted = await Project.insertMany(sampleProjects);

    return res.status(201).json({
      message: "Projects seeded successfully",
      count: inserted.length,
      data: inserted,
    });
  } catch (error) {
    console.error("GET /api/projects/seed error:", error);

    return res.status(500).json({
      message: "Failed to seed projects",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.post("/", requireAdmin, async (req, res) => {
  try {
    const project = await Project.create(req.body);

    return res.status(201).json({
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create project",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({
      message: "Project updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update project",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});


router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete project",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
