"use strict";

import { config } from "dotenv"; config();
import { env } from "process";
import fs from "fs";
import ActiveDirectory from "activedirectory2";

const tls = {

  enforce: env.AD2_TLS_ENFORCE !== "true" ? false : true,

  options: () => {
    if (env.AD2_TLS !== "true") return null;
    else {
      return {
        key: fs.readFileSync(env.AD2_TLS_KEY),
        cert: fs.readFileSync(env.AD2_TLS_CERT),
        ca: [fs.readFileSync(env.AD2_TLS_CA)],
        rejectUnauthorized: tls.enforce,
      };
    }
  },

  port: env.AD2_TLS !== "true" ? 389 : 636,

  protocol: env.AD2_TLS !== "true" ? "ldap" : "ldaps",

};

const activeDirectory = new ActiveDirectory({

  url: `${tls.protocol}://${env.AD2_HOST}:${tls.port}`,
  baseDN: env.AD2_BASE,
  username: env.AD2_USER,
  password: env.AD2_PASS,
  tlsOptions: tls.options(),
  attributes: {
    user: [],
    group: ["dn", "cn", "description", "member", "distinguishedName", "objectCategory"],
  },

});

export default activeDirectory;
