import express from 'express';
import validator from '../validation/user';
import auth from '../middlewares/validateUser';
import adminAuth from '../middlewares/validateAdmin';
import * as controllers from '../controllers/user';

const Router = express.Router();

Router.get('/', auth, adminAuth, controllers.fetchUsers);
Router.get('/:id', auth, adminAuth, controllers.fetchUser);
Router.post('/', validator, controllers.createUser);
Router.post('/login', validator, controllers.login);
Router.delete('/:id', auth, adminAuth, controllers.deleteUser);

export default Router;
