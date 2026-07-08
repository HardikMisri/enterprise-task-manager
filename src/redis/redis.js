import { createClient} from "redis";
import {env} from "../config/env.js";
// console.log(env.REDIS_HOST);
// console.log(env.REDIS_PORT);
export const redisClient = createClient({
  socket: {
    host:env.REDIS_HOST,
    port:Number(env.REDIS_PORT),
  },

});

redisClient.on("connect", ()=>{
  console.log("Redis Client Connected");
});

redisClient.on("error",(err)=>{
  console.log("Redis Error",err.message);
});