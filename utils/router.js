"use strict";

import Debug from "./debug.js";
import UserRouter from "../routes/userRouter.js";
import GroupRouter from "../routes/groupRouter.js";
import ContactRouter from "../routes/contactRouter.js";
import ComputerRouter from "../routes/computerRouter.js";
import express from "express";

let appRouter = express.Router({ mergeParams: true });

const
  debug = new Debug(),
  userRouter = new UserRouter(),
  groupRouter = new GroupRouter(),
  contactRouter = new ContactRouter(),
  computerRouter = new ComputerRouter();

appRouter
  .use("/debug", debug.routes)
  .use("/user", userRouter.routes)
  .use("/group", groupRouter.routes)
  .use("/contact", contactRouter.routes)
  .use("/computer", computerRouter.routes);

export default appRouter;
