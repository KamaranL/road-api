"use strict";

import UserRouter from "../routes/userRouter.js";
import GroupRouter from "../routes/groupRouter.js";
import ContactRouter from "../routes/contactRouter.js";
import express from "express";

let appRouter = express.Router({ mergeParams: true });

const userRouter = new UserRouter(),
  groupRouter = new GroupRouter(),
  contactRouter = new ContactRouter();

appRouter
  .use("/user", userRouter.routes)
  .use("/group", groupRouter.routes)
  .use("/contact", contactRouter.routes);

export default appRouter;
