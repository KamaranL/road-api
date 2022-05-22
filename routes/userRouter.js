import UserController from '../controllers/userController.js'
import logger from '../utils/logger.js'
import express from 'express'

let router = express.Router({ mergeParams: true });

const userController = new UserController();

class UserRouter {

  routes = router
            .use((req, res, next) => {
              logger.route({ userController, req, res });
              next();
            })
            .get('/', userController.getAllUsers)
            .get('/_query.:query', userController.queryUsers)
            .get('/:sAMAccountName.:attribute', userController.getUserAttribute)
            .get('/:sAMAccountName', userController.getUser)

}

export default UserRouter
