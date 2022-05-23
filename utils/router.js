"use strict";

import UserRouter from "../routes/userRouter.js";
import GroupRouter from "../routes/groupRouter.js";
import express from "express";

let appRouter = express.Router({ mergeParams: true });

const userRouter = new UserRouter(),
  groupRouter = new GroupRouter();

appRouter
  .use("/user", userRouter.routes)
  .use("/group", groupRouter.routes);

export default appRouter;
