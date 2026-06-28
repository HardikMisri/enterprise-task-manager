import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Enterprise Task Manager 🚀");
});


app.get("/healthy", (req,res)=>{
  res.send("Server is healthy")
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});