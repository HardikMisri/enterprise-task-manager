import express from "express";
import { create } from "../controllers/task.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { getAll } from "../controllers/task.controller.js";
import { update } from "../controllers/task.controller.js";
import { remove } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", authenticate, create);

router.get("/", authenticate, getAll);

router.put("/:id", authenticate, update);

router.delete("/:id", authenticate, remove);

export default router;