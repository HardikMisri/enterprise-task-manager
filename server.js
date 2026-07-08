import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { env } from "./src/config/env.js";
import {redisClient} from "./src/redis/redis.js";

const startServer = async () => {
  await connectDB();
  await redisClient.connect();

  await redisClient.set("name", "Hardik");
  const value = await redisClient.get("name");
  console.log("Redis Value",value);
  
  
  app.listen(env.PORT || 3000, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
};

startServer();