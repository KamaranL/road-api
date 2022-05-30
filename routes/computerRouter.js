"use strict";

import ComputerController from "../controllers/computerController.js";
import logger from "../utils/logger.js";
import express from "express";

let router = express.Router({ mergeParams: true });

const computerController = new ComputerController();

class ComputerRouter {

  routes = router
    .use((req, res, next) => {
      logger.route({ computerController, req, res });
      next();
    })
    .get("/", computerController.getAllComputers)
    .get("/_query.:query", computerController.queryComputers)
    .get("/:cn.:attribute", computerController.getComputerAttribute)
    .get("/:cn", computerController.getComputer);

}

export default ComputerRouter;
