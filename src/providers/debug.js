"use strict";

import { config } from "dotenv"; config();
import { cwd, env } from "process";
import express from "express";

let router = express.Router({ mergeParams: true });

class Debug {

  routes = router
    // .use("/activedirectory", (req, res) => {
      // res.send(activeDirectory.authenticate())
    // })
    .get("/dotenv.:variable", (req, res) => {
      if (req.params.variable)
        if (!env[req.params.variable]) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.variable}' not found.`, "params": req.params });
        else res.json(env[req.params.variable]);
    })
    .get("/dotenv", (req, res) => {
      res.json(env);
    })
    .get("/router", (req, res) => {
      res.json({
        "request": {
          "baseUrl": req.baseUrl,
          "cookies": req.cookies,
          "hostname": req.hostname,
          "ip": req.ip,
          "method": req.method,
          "originalUrl": req.originalUrl,
          "params": req.params,
          "protocol": req.protocol,
          "query": req.query,
          "route": req.route,
          "secure": req.secure,
        },
        "response": {
          "headersSent": res.headersSent,
          "locals": res.locals,
        }
      });
    });

}

export default Debug;