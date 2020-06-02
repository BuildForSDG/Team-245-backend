import express from 'express';
import validator from '../validation/post';
import * as controllers from '../controllers/post';

const Router = express.Router();

Router.get('/', controllers.fetchPosts);
Router.get('/:id', controllers.fetchPost);
Router.post('/', validator, controllers.createPost);
Router.patch('/:id', validator, controllers.editPost);
Router.delete('/:id', controllers.deletePost);

export default Router;
