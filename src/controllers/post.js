import wrapper from '../utils/wrapper';
import validatorErr from '../utils/validatorErr';

/**  @route    GET api/v1/posts
 @desc     GET all post
 @access   Public
*/
export const fetchPosts = wrapper(async () => {});

/**  @route    GET api/v1/posts/:id
 @desc     GET a post
 @access   Public
 */
export const fetchPost = wrapper(async () => {});

/**  @route    POST api/v1/posts
 @desc     Create a post
 @access   Private
 */
export const createPost = wrapper(async (req, res) => {
  const err = validatorErr(req, res);
  if (err !== null) return err.response;
  //   code here
  return null;
});

/**  @route    PATCh api/v1/posts/:id
 @desc     Patch a post
 @access   Private
*/
export const editPost = wrapper(async (req, res) => {
  const err = validatorErr(req, res);
  if (err !== null) return err.response;
  //   code here
  return null;
});

/**  @route    DELETE api/v1/posts/:id
 @desc     Delete a post
 @access   Private
*/
export const deletePost = wrapper(async () => {});
