import { db } from "../db/index.js";
import { tasks } from "../db/schema/tasks.js";
import { eq, and } from "drizzle-orm";

export const createTask = async (taskData, userId) => {
  const { title, description } = taskData;

  const [task] = await db
    .insert(tasks)
    .values({
      title,
      description,
      userId,
    })
    .returning();

  return task;
};

export const getMyTasks = async (userId) => {
  const userTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, userId));

  return userTasks;
};

export const updateTask = async (taskId, userId, taskData) => {
  const [updatedTask] = await db
    .update(tasks)
    .set(taskData)
    .where(and(eq(tasks.id, Number(taskId)), eq(tasks.userId, userId)))
    .returning();

  if (!updatedTask) {
    throw new Error("Task not found");
  }

  return updatedTask;
};

export const deleteTask = async (taskId, userId) => {
  const [deletedTask] = await db
    .delete(tasks)
    .where(and(eq(tasks.id, Number(taskId)), eq(tasks.userId, userId)))
    .returning();

  if (!deletedTask) {
    throw new Error("Task not found");
  }

  return deletedTask;
};