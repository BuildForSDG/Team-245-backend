import express from 'express';
import validator from '../validation/category';
import * as controllers from '../controllers/category';

const Router = express.Router();

Router.get('/', controllers.fetchCategories);
Router.post('/', validator, controllers.createCategory);
Router.delete('/:id', controllers.deleteCategory);

export default Router;
