"use strict";

import activeDirectory from "../utils/activedirectory.js";
let ad = activeDirectory;

class GroupController {

  name = "GroupController"

  getGroup = (req, res) => {
    ad.findGroup(req.params.cn, (err, group) => {
      if (err) res.status(500).json(err);
      if (!group) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.cn}' not found`, "params": req.params });
      else res.json(group);
    })
  }

  getGroupAttribute = (req, res) => {
    ad.findGroup(req.params.cn, (err, group) => {
      if (err) res.status(500).json(err);
      if (!group) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.cn}' not found`, "params": req.params });
      else
        if (req.params.attribute)
          if (!group[req.params.attribute]) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.attribute}' not found.`, "params": req.params });
          else res.json(group[req.params.attribute]);
    })
  }

  queryGroups = (req, res) => {
    ad.findGroups(req.params.query, (err, groups) => {
      if (err) res.status(500).json(err);
      if (!groups) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.query}' not found`, "params": req.params });
      else res.json(groups);
    })
  }

  getAllGroups = (req, res) => {
    ad.findGroups("cn=*", (err, groups) => {
      if (err) res.status(500).json(err);
      if (!groups) res.status(404).json({ "code": res.statusCode });
      else res.json(groups);
    })
  }

}

export default GroupController;
