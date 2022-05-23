"use strict";

import { config } from "dotenv"; config();
import { env } from "process";
import express from "express";
import middlewares from "./utils/middleware.js";
import appRouter from "./utils/router.js";
import os from "./utils/os.js";

const app = express();

middlewares.forEach(middleware => {
  app.use(middleware);
});

app
  .use("/api", appRouter, (req, res, next) => {
    res.status(200).type("application/json");
    next();
  })
  .all("*", (req, res, next) => {
    res.status(418).json({ "code": res.statusCode, "message": "I'm a Teapot" });
    next();
  })
  .listen(env.NODE_PORT, env.NODE_IPV4, () => {
    console.log(`${env.APP_NAME} is starting...`);
    Object.entries(os.net.interfaces()).forEach(entry => {
      const [adapter, props] = entry;
      console.log(`  [interface] "${adapter}" is listening at http://${props[0].address}:${env.NODE_PORT}`);
    });
    console.log("\n");
  });
