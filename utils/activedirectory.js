"use strict";

import { config } from "dotenv"; config();
import { env } from "process";
import fs from "node:fs";
import ActiveDirectory from "activedirectory2";

const activeDirectory = new ActiveDirectory({

  url: `${env.AD2_PROTOCOL}${env.AD2_HOST}:${env.AD2_PORT}`,
  baseDN: env.AD2_BASE,
  username: env.AD2_USER,
  password: env.AD2_PASS,
  tlsOptions: {
    key: fs.readFileSync(env.AD2_TLS_KEY),
    cert: fs.readFileSync(env.AD2_TLS_CERT),
    ca: [fs.readFileSync(env.AD2_TLS_CA)],
    rejectUnauthorized: true,
  },
  attributes: {
    user: [],
    group: ["dn", "cn", "description", "member", "distinguishedName", "objectCategory"],
  },

});

export default activeDirectory;
