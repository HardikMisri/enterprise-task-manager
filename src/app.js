import express from "express";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
const app = express();

const PORT = 3000;

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome to Enterprise Task Manager 🚀");
});


app.get("/healthy", (req,res)=>{
  res.send("Server is great")
});



app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

export default app;