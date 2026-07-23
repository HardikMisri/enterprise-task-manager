import express from "express";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
const app = express();

const PORT = 3000;

app.use(express.json());


app.get("/", (req, res) => {
  res.send(`
    <h2>Welcome to Enterprise Task Manager 🚀</h2>
    <p>Served by: ${process.env.HOSTNAME}</p>
  `);
});


// res.status(200).json({
//     status: "DOWN",
//     service: "enterprise-task-manager",
//     timestamp: new Date().toISOString(),
//   });

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "enterprise-task-manager",
    timestamp: new Date().toISOString(),
  });
});



app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

export default app;