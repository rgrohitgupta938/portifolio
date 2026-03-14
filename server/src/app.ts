import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes";
import contactRoutes from "./routes/contactRoutes";
import projectAdminRoutes from "./routes/projectAdminRoutes";
import adminRoutes from "./routes/adminRoutes";
import contactAdminRoutes from "./routes/contactAdminRoutes";

const app = express();

const allowedOrigins = ["http://localhost:3000", process.env.CLIENT_URL].filter(
  Boolean,
) as string[];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: false,
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Portfolio API is running" });
});

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/projects", projectAdminRoutes);
app.use("/api/admin/messages", contactAdminRoutes);
app.use("/api/admin", adminRoutes);

export default app;
