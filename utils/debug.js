"use-strict";

import { config } from "dotenv"; config();
import { env } from "process";
import activeDirectory from "../utils/activedirectory.js";

const debug = {

  dotenv: (req, res) => {
    res.json(env)
  },

  util: {

    activedirectory: (req, res) => {
      activeDirectory.getRootDSE((err, result) => {
        if (err) res.json(err).status(500)
        else res.json(result).status(200)
      });
    },

    router: (req, res, next) => {
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
      })
    },

  }

};

export default debug;
