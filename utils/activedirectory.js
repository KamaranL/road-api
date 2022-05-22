import { config } from "dotenv"; config()
import { env } from "process"
import ActiveDirectory from "activedirectory2";

const activeDirectory = new ActiveDirectory({

  url: `ldap://${env.AD2_HOST}`,
  baseDN: env.AD2_BASE,
  username: env.AD2_USER,
  password: env.AD2_PASS,
  attributes: {
    user: [],
  },

});

export default activeDirectory
