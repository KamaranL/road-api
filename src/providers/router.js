"use strict";

import Debug from "./debug.js";
import UserRouter from "../http/routes/userRouter.js";
import GroupRouter from "../http/routes/groupRouter.js";
import ContactRouter from "../http/routes/contactRouter.js";
import ComputerRouter from "../http/routes/computerRouter.js";
import express from "express";

let router = express.Router({ mergeParams: true });

const
  debug = new Debug(),
  userRouter = new UserRouter(),
  groupRouter = new GroupRouter(),
  contactRouter = new ContactRouter(),
  computerRouter = new ComputerRouter();

router
  .use("/debug", debug.routes)
  .use("/user", userRouter.routes)
  .use("/group", groupRouter.routes)
  .use("/contact", contactRouter.routes)
  .use("/computer", computerRouter.routes);

export default router;
