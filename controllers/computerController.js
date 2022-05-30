"use strict";

import activeDirectory from "../utils/activedirectory.js";
let ad = activeDirectory;

class ComputerController {

  name = "ComputerController"

  getComputer = (req, res) => {
    let filter = `(&(objectClass=computer)(cn=${req.params.cn}))`;
    ad.find(filter, (err, results) => {
      if (err) res.status(500).json(err);
      if (!results) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.cn}' not found`, "params": req.params });
      else res.json(results.other[0]);
    })
  }

  getComputerAttribute = (req, res) => {
    let filter = `(&(objectClass=computer)(cn=${req.params.cn}))`;
    ad.find(filter, (err, results) => {
      if (err) res.status(500).json(err);
      if (!results) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.cn}' not found`, "params": req.params });
      else
        if (req.params.attribute)
          if (!results.other[0][req.params.attribute]) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.attribute}' not found.`, "params": req.params });
          else res.json(results.other[0][req.params.attribute]);
    })
  }

  queryComputers = (req, res) => {
    let filter = `(&(objectClass=computer)(${req.params.query}))`;
    ad.find(filter, (err, results) => {
      if (err) res.status(500).json(err);
      if (!results) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.query}' not found`, "params": req.params });
      else res.json(results.other);
    })
  }

  getAllComputers = (req, res) => {
    let filter = `(&(objectClass=computer)(cn=*))`;
    ad.find(filter, (err, results) => {
      if (err) res.status(500).json(err);
      if (!results) res.status(404).json({ "code": res.statusCode });
      else res.json(results.other);
    })
  }

}

export default ComputerController;
