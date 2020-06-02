import express from 'express';
import validator from '../validation/category';
import * as controllers from '../controllers/user';

const Router = express.Router();

Router.get('/', controllers.fetchUsers);
Router.post('/', validator, controllers.createUser);
Router.post('/login', validator, controllers.login);
Router.get('/:id', controllers.fetchUser);
Router.delete('/:id', controllers.deleteUser);

export default Router;
