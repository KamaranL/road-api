"use strict";

import activeDirectory from "../utils/activedirectory.js";
let ad = activeDirectory;

class ContactController {

  name = "ContactController"

  getContact = (req, res) => {
    ad.findUser(req.params.sAMAccountName, (err, user) => {
      if (err) res.status(500).json(err);
      if (!user) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.sAMAccountName}' not found`, "params": req.params });
      else res.json(user);
    })
  }

  getContactAttribute = (req, res) => {
    ad.findUser(req.params.sAMAccountName, (err, user) => {
      if (err) res.status(500).json(err);
      if (!user) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.sAMAccountName}' not found`, "params": req.params });
      else
        if (req.params.attribute)
          if (!user[req.params.attribute]) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.attribute}' not found.`, "params": req.params });
          else res.json(user[req.params.attribute]);
    })
  }

  queryContacts = (req, res) => {
    let query = `(&(objectClass=user)(${req.params.query}))`
    ad.findUsers(query, (err, users) => {
      if (err) res.status(500).json(err);
      if (!users) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.query}' not found`, "params": req.params });
      else res.json(users);
    })
  }

  getAllContacts = (req, res) => {
    ad.findUsers("cn=*", (err, users) => {
      if (err) res.status(500).json(err);
      if (!users) res.status(404).json({ "code": res.statusCode, "message": `'${req.params.sAMAccountName}' not found`, "params": req.params });
      else res.json(users);
    })
  }

}

export default ContactController;
