import "dotenv/config";
import express from "express";

import { Subscriber } from "./redis/index.js";
import appRoutes from "./routes.js";

(async function () {
  await Subscriber.getInstance();
  const app = express();

  app.disable("x-powered-by");

  app.use(express.json());
  app.use("/api/v1", appRoutes);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
})();
