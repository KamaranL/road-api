"use strict";

import bodyParser from "body-parser";
import appRouter from "../utils/router.js";

const middlewares = [

  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  appRouter,

];

export default middlewares;
