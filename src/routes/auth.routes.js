import express from "express";
import { register } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authenticate, (req, res) => {
  res.json({
    message: "Authenticated user",
    user: req.user,
  });
});

export default router;