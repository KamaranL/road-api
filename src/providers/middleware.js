"use strict";

import bodyParser from "body-parser";
import router from "./router.js";

const middlewares = [

  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  router,

];

export default middlewares;
