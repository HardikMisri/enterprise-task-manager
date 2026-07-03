import { createTaskSchema } from "../validators/task.validator.js";
import { createTask } from "../services/task.service.js";
import { getMyTasks } from "../services/task.service.js";
import { updateTask } from "../services/task.service.js";
import { deleteTask } from "../services/task.service.js";


export const create = async (req, res) => {
  const result = createTaskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues,
    });
  }

  try {
    const task = await createTask(result.data, req.user.id);

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get all tasks for the authenticated user

export const getAll = async (req, res) => {
  try {
    const tasks = await getMyTasks(req.user.id);

    return res.status(200).json({
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


// Update a task for the authenticated user

export const update = async (req, res) => {
  try {
    const task = await updateTask(
      req.params.id,
      req.user.id,
      req.body
    );

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    await deleteTask(req.params.id, req.user.id);

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};