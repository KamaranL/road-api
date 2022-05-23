"use strict";

import { networkInterfaces } from "os";

const os = {

  net: {

    interfaces: () => {
      let nets = networkInterfaces(),
        results = Object.create(null);

      for (let name of Object.keys(nets)) {
        for (let net of nets[name]) {
          if (net.family === "IPv4") {
            if (!results[name]) {
              results[name] = [];
            }
            results[name].push(net);
          }
        }
      }
      return results;
    },

  },

};

export default os;
