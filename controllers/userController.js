import activeDirectory from '../utils/activedirectory.js'
let ad = activeDirectory;

class UserController {

  name = "UserController"

  getUser = (req, res) => {
    ad.findUser(req.params.samaccountname, (err, user) => {
      if (err) res.status(500).json(err)
      if (!user) res.status(404).json({ 'code': res.statusCode, 'message': `Resource '${req.params.samaccountname}' not found` })
      else res.json(user)
    })
  }

  getMemberOf = (req, res) => {
    ad.getGroupMembershipForUser(req.params.samaccountname, (err, groups) => {
      if (err) res.status(500).json(err)
      if (!groups) res.status(404).json({ 'code': res.statusCode, 'message': `Resource '${req.params.samaccountname}' not found` })
      else res.json(groups)
    })
  }

  getAllUsers = (req, res) => {
    ad.findUsers('cn=*', (err, users) => {
      if (err) res.status(500).json(err)
      if (!users) res.status(404).json({ 'code': res.statusCode, 'message': `Resource '${req.params.samaccountname}' not found` })
      else res.json(users)
    })
  }

  queryUsers = (req, res) => {
    let query = `(&(objectClass=user)(${req.params.query}))`
    ad.findUsers(query, (err, groups) => {
      if (err) res.status(500).json(err)
      if (!groups) res.status(404).json({ 'code': res.statusCode, 'message': `Resource '${req.params.samaccountname}' not found` })
      else res.json(groups)
    })
  }

}

export default UserController
