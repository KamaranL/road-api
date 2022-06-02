"use strict";

import { config } from "dotenv"; config();
import { env } from "process";
import fs from "fs";

const logger = {

  log: {

    _console: env.NODE_LOG_CONSOLE,

    _directory: env.NODE_LOG_DIR,

    _file: env.NODE_LOG_FILE,

    datestamp: () => {

      let formatDate = date => {
        let
          year = date.getFullYear(),
          month = date.getMonth(),
          day = date.getDate();

        let
          yyyy = ((year < 10) ? "0" + year : year),
          MM = ((month < 10) ? "0" + month : month),
          dd = ((day < 10) ? "0" + day : day);

        return `${yyyy}-${MM}-${dd}`;
      }

      return formatDate(new Date());
    },

    timestamp: () => {

      let formatTime = date => {
        let
          hour = date.getHours(),
          minutes = date.getMinutes(),
          seconds = date.getSeconds(),
          milliseconds = date.getMilliseconds(),
          tz = `UTC-0${(date.getTimezoneOffset()/60)}.00`;

        let
          hh = ((hour < 10) ? "0" + hour : hour),
          mm = ((minutes < 10) ? "0" + minutes : minutes),
          ss = ((seconds < 10) ? "0" + seconds : seconds),
          ms = ("00" + milliseconds).slice(-3);

        return `[${hh}:${mm}:${ss}.${ms}](${tz})`;
      }

      return formatTime(new Date());
    },

    toConsole: function (payload) {
      if (this._console !== "false") {
        console.log(`${this.timestamp()} ${payload}`);
      }
    },

    toFile: function (content) {
      if (this._file !== "false") {
        let
          file = `${this.datestamp()}.log`,
          path = this._directory;

          fs.writeFile(path + file, `${this.timestamp()} ${content}\n`, { flag: "a+" }, err => {
            if (err) console.log(error);
          })
      }
    },

  },

  route: function (obj) {
    let controller, msg,
      req = obj.req,
      res = obj.res;
    const regExp = /Controller|controller/;

    Object.entries(obj).forEach(([key, value]) => {
      if (regExp.test(key) === true) controller = key;
    });

    msg = `${req.baseUrl} => ${controller} => ${req.method}(${req.url})`;

    this.log.toFile(msg);
    this.log.toConsole(msg);
  },

}

export default logger;
