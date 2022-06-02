"use strict";

import ContactController from "../controllers/contactController.js";
import logger from "../../providers/logger.js";
import express from "express";

let router = express.Router({ mergeParams: true });

const contactController = new ContactController();

class ContactRouter {

  routes = router
    .use((req, res, next) => {
      logger.route({ contactController, req, res });
      next();
    })
    .get("/", contactController.getAllContacts)
    .get("/_query.:query", contactController.queryContacts)
    .get("/:cn.:attribute", contactController.getContactAttribute)
    .get("/:cn", contactController.getContact);

}

export default ContactRouter;
