import express from 'express';
import validator from '../validation/category';
import * as controllers from '../controllers/category';

const Router = express.Router();

/**  @route    GET api/v1/posts
 @desc     get categories
 @access   Public
 */
Router.get('/', controllers.fetchCategories);

/**  @route    POST api/v1/posts
 @desc     Create a category
 @access   Private
 */
Router.post('/', validator, controllers.createCategory);

/**  @route    DELETE api/v1/posts/:id
 @desc     delete a category
 @access   Private
 */
Router.delete('/:id', controllers.deleteCategory);

export default Router;
