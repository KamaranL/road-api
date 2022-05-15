import activeDirectory from '../utils/activedirectory.js'
let ad = activeDirectory;

class GroupController {

  name = "GroupController"

  getGroup = (req, res) => {
    ad.findGroup(req.params.cn, (err, group) => {
      if (err) res.status(500).json(err)
      if (!group) res.status(404).json({ 'code': res.statusCode, 'message': `Resource '${req.params.cn}' not found` })
      else res.json(group)
    })
  }

  getGroupMembers = (req, res) => {
    ad.getUsersForGroup(req.params.cn, (err, members) => {
      if (err) res.status(500).json(err)
      if (!members) res.status(404).json({ 'code': res.statusCode, 'message': `Resource '${req.params.cn}' not found` })
      else res.json(members)
    })
  }

  getAllGroups = (req, res) => {
    ad.findGroups('cn=*', (err, users) => {
      if (err) res.status(500).json(err)
      if (!users) res.status(404).json({ 'code': res.statusCode, 'message': `Resource '${req.params.samaccountname}' not found` })
      else res.json(users)
    })
  }

  queryGroups = (req, res) => {
    ad.findGroups(req.params.query, (err, groups) => {
      if (err) res.status(500).json(err)
      if (!groups) res.status(404).json({ 'code': res.statusCode, 'message': `Resource '${req.params.samaccountname}' not found` })
      else res.json(groups)
    })
  }

}

export default GroupController
