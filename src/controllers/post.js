import _ from 'lodash';
import wrapper from '../utils/wrapper';
import Post from '../models/post';
import validatorErr from '../utils/validatorErr';

/**  @route    GET api/v1/posts
 @desc     GET all post
 @access   Public
*/
export const fetchPosts = wrapper(async (_req, res) => {
  const posts = await Post.find();
  return res.json({ data: posts });
});

/**  @route    GET api/v1/posts/:id
 @desc     GET a post
 @access   Public
 */
export const fetchPost = wrapper(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post === null) {
    return res.status(404).json({ error: 'Post not found' });
  }
  return res.json({ data: post });
});

/**  @route    POST api/v1/posts
 @desc     Create a post
 @access   Private
 */
export const createPost = wrapper(async (req, res) => {
  const err = validatorErr(req, res);
  if (err !== null) return err.response;
  req.body = _.pick(req.body, 'title, description', 'category');
  let post = new Post(req.body);
  post = await post.save();
  return res.json({ data: post });
});

/**  @route    PATCh api/v1/posts/:id
 @desc     Patch a post
 @access   Private
*/
export const editPost = wrapper(async (req, res) => {
  const err = validatorErr(req, res);
  if (err !== null) return err.response;
  let post = await Post.findById(req.params.id);
  if (post === null) {
    return res.status(404).json({ error: 'Post not found' });
  }
  req.body = _.pick(req.body, 'title', 'description', 'category');
  if (req.body.title) {
    post.title = req.body.title;
  }
  if (req.body.description) {
    post.description = req.body.description;
  }
  if (req.body.category) {
    post.category = req.body.category;
  }
  post = await post.save();
  return res.json({ data: post });
});

/**  @route    DELETE api/v1/posts/:id
 @desc     Delete a post
 @access   Private
*/
export const deletePost = wrapper(async (req, res) => {
  const post = await Post.findByIdAndRemove(req.params.id);
  if (post !== null) {
    return res.json({ data: { message: 'Post deleted successfully' } });
  }
  return res.status(404).json({ error: 'Post not found' });
});
