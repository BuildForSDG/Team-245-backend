import express from 'express';
import validator from '../validation/post';
import auth from '../middlewares/validateUser';
import * as controllers from '../controllers/post';

const Router = express.Router();

Router.get('/', controllers.fetchPosts);
Router.get('/:id', controllers.fetchPost);
Router.post('/', validator, auth, controllers.createPost);
Router.patch('/:id', validator, auth, controllers.editPost);
Router.delete('/:id', auth, controllers.deletePost);

export default Router;
