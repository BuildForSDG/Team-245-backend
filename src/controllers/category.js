import wrapper from '../utils/wrapper';
import validatorErr from '../utils/validatorErr';

/**  @route    GET api/v1/posts
 @desc     Get categories
 @access   Public
 */
export const fetchCategories = wrapper(async () => {});

/**  @route    POST api/v1/posts
 @desc     Create a category
 @access   Private
 */
export const createCategory = wrapper(async (req, res) => {
  const err = validatorErr(req, res);
  if (err !== null) return err.response;
  //   code here
  return null;
});

/**  @route    DELETE api/v1/posts/:id
 @desc     Delete a category
 @access   Private
 */
export const deleteCategory = wrapper(async () => {});
