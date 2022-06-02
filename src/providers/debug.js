"use strict";

import { config } from "dotenv"; config();
import process, { env } from "process";
import express from "express";
import activeDirectory from "../providers/activedirectory.js"

let router = express.Router({ mergeParams: true });

class Debug {

  routes = router
    .use("/", (req, res) => {
      let results = [];
      router.stack.forEach(stackObj => {
        if (stackObj.route) results.push(stackObj.route.path)
      })
      res.send(results);
    })
    .get("/activedirectory", (req, res) => {
      res.json(activeDirectory.getRootDSE());
    })
    .get("/dotenv.:variable", (req, res) => {
      if (req.params.variable)
        if (!env[req.params.variable]) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.variable}' not found.`, "params": req.params });
        else res.json(env[req.params.variable]);
    })
    .get("/dotenv", (req, res) => {
      res.json(env);
    })
    .get("/process.:variable", (req, res) => {
      if (req.params.variable)
        if (!process[req.params.variable]) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.variable}' not found.`, "params": req.params });
        else res.json(process[req.params.variable]);
    })
    .get("/process", (req, res) => {
      res.json(process);
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
