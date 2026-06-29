import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { env } from "./src/config/env.js";

const startServer = async () => {
  await connectDB();

  app.listen(env.PORT || 3000, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
};

startServer();