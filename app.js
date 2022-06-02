"use strict";

import { fileURLToPath } from "url";
import { dirname } from "path";
import { env, chdir, cwd } from "process"; chdir(dirname(fileURLToPath(import.meta.url)));
import { config } from "dotenv"; config();
import express from "express";
import middlewares from "./src/providers/middleware.js";
import router from "./src/providers/router.js";
import os from "./src/providers/os.js";

const app = express();

middlewares.forEach(middleware => {
  app.use(middleware);
});

app
  .use("/", express.static("index.html"))
  .use("/api", router, (req, res, next) => {
    res.status(200).type("application/json");
    next();
  })
  .all("*", (req, res, next) => {
    res.status(418).json({ "code": res.statusCode, "message": "I'm a Teapot" });
    next();
  })
  .listen(env.NODE_PORT, env.NODE_IPV4, () => {
    if (env.NODE_ENV === "dev") {
      console.log(`${env.APP_NAME} is starting from ${cwd()}`);
      Object.entries(os.net.interfaces()).forEach(entry => {
        const [adapter, props] = entry;
        console.log(`  [interface] "${adapter}" is listening at http://${props[0].address}:${env.NODE_PORT}`);
      });
      console.log("\n");
    }
  });
