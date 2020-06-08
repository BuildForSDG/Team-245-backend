import express from 'express';
import validator from '../validation/category';
import auth from '../middlewares/validateUser';
import adminAuth from '../middlewares/validateAdmin';
import * as controllers from '../controllers/category';

const Router = express.Router();

Router.get('/', controllers.fetchCategories);
Router.post('/', auth, adminAuth, validator, controllers.createCategory);
Router.delete('/:id', auth, adminAuth, controllers.deleteCategory);

export default Router;
