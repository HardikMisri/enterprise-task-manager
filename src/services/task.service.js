import { db } from "../db/index.js";
import { tasks } from "../db/schema/tasks.js";
import { eq, and } from "drizzle-orm";
import { redisClient} from "../redis/redis.js";




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

  await redisClient.del(`tasks:${userId}`);
  console.log("🗑 Cache Invalidated");

  return task;
};

//Make sure for redis choose cache key
// Here we will use userID as cache key - defines on key per user
export const getMyTasks = async (userId) => {
  
  
  const cacheKey = `tasks:${userId}`;

  //1.Check redis is containing the data 
  const cachedTasks = await redisClient.get(cacheKey);

  if (cachedTasks){
    console.log("Cache Hit");
    return JSON.parse(cachedTasks);
  }

  console.log("Cache Miss");
  //2.Query the postgres sql 
  const userTasks = await db 
    .select()
    .from(tasks)
    .where(eq(tasks.userId,userId));
  
  console.log("Data from Postgres", userTasks);
  //3.) Save data into Redis

  await redisClient.set(cacheKey,JSON.stringify(userTasks),{
    EX:60,
  });

  //4.) Return the data 
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

  await redisClient.del(`tasks:${userId}`);

  console.log("🗑 Cache Invalidated");

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

  await redisClient.del(`tasks:${userId}`);
  console.log("🗑 Cache Invalidated");
  return deletedTask;
};