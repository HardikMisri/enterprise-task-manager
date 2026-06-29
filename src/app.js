import express from "express";
import authRoutes from "./routes/auth.routes.js";
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

export default app;