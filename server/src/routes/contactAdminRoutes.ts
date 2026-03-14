import { Router } from "express";
import Contact from "../models/Contact";
import requireAdmin from "../middleware/requireAdmin";

const router = Router();

router.get("/", requireAdmin, async (_req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch messages",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.patch("/:id/handled", requireAdmin, async (req, res) => {
  try {
    const { handled } = req.body;

    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { handled: Boolean(handled) },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Message not found" });
    }

    return res.status(200).json({
      message: "Message status updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update message status",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Message not found" });
    }

    return res.status(200).json({
      message: "Message deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete message",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;