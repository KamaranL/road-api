"use strict";

import { config } from "dotenv"; config();
import { env } from "process";
import fs from "node:fs";
import ActiveDirectory from "activedirectory2";

const activeDirectory = new ActiveDirectory({

  tls: {

    enforce: () => {
      if (env.AD2_TLS_ENFORCE === "true") return true;
      else if (env.AD2_TLS_ENFORCE === "false") return false;
      else return null;
    },

    options: () => {
      if (env.AD2_TLS !== "false") {
        return {
          cert: fs.readFileSync(env.AD2_TLS_CERT),
          key: fs.readFileSync(env.AD2_TLS_KEY),
          ca: [fs.readFileSync(env.AD2_TLS_CA)],
          rejectUnauthorized: this.enforce(),
        }
      }
    },

    port: env.AD2_TLS !== "false" ? 636 : 389,

    protocol: env.AD2_TLS !== "false" ? "ldaps://" : "ldap://",

  },

  url: `ldap://${env.AD2_HOST}:389`,
  baseDN: env.AD2_BASE,
  username: env.AD2_USER,
  password: env.AD2_PASS,
  // tlsOptions: ,
  attributes: {
    user: [],
    group: ["dn", "cn", "description", "member", "distinguishedName", "objectCategory"],
  },

});

export default activeDirectory;
