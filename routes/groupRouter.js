"use strict";

import GroupController from "../controllers/groupController.js";
import logger from "../utils/logger.js";
import express from "express";

let router = express.Router({ mergeParams: true });

const groupController = new GroupController();

class GroupRouter {

  routes = router
    .use((req, res, next) => {
      logger.route({ groupController, req, res });
      next();
    })
    .get("/", groupController.getAllGroups)
    .get("/_query.:query", groupController.queryGroups)
    .get("/:cn.:attribute", groupController.getGroupAttribute)
    .get("/:cn", groupController.getGroup);

}

export default GroupRouter;
