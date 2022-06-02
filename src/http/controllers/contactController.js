"use strict";

import activeDirectory from "../../providers/activedirectory.js";
let ad = activeDirectory;

class ContactController {

  name = "ContactController"

  getContact = (req, res) => {
    let filter = `(&(objectClass=contact)(cn=${req.params.cn}))`;

    ad.find(filter, (err, results) => {
      if (err) res.status(500).json(err);
      if (!results) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.cn}' not found`, "params": req.params });
      else res.json(results.users[0]);
    })
  }

  getContactAttribute = (req, res) => {
    let filter = `(&(objectClass=contact)(cn=${req.params.cn}))`;

    ad.find(filter, (err, results) => {
      if (err) res.status(500).json(err);
      if (!results) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.cn}' not found`, "params": req.params });
      else
        if (req.params.attribute)
          if (!results.users[0][req.params.attribute]) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.attribute}' not found.`, "params": req.params });
          else res.json(results.users[0][req.params.attribute]);
    })
  }

  queryContacts = (req, res) => {
    let filter = `(&(objectClass=contact)(${req.params.query}))`;

    ad.findUsers(filter, (err, contacts) => {
      if (err) res.status(500).json(err);
      if (!contacts) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.query}' not found`, "params": req.params });
      else res.json(contacts);
    })
  }

  getAllContacts = (req, res) => {
    let filter = `(&(objectClass=contact)(cn=*))`;

    ad.findUsers(filter, (err, contacts) => {
      if (err) res.status(500).json(err);
      if (!contacts) res.status(404).json({ "code": res.statusCode });
      else res.json(contacts);
    })
  }

}

export default ContactController;
