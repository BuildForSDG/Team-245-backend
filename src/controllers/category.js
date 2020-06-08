import wrapper from '../utils/wrapper';
import Category from '../models/category';
import validatorErr from '../utils/validatorErr';

/**  @route    GET api/v1/posts
 @desc     Get categories
 @access   Public
 */
export const fetchCategories = wrapper(async (_req, res) => {
  const categories = await Category.find();
  res.json({ data: categories });
});

/**  @route    POST api/v1/posts
 @desc     Create a category
 @access   Private
 */
export const createCategory = wrapper(async (req, res) => {
  const err = validatorErr(req, res);
  if (err !== null) return err.response;
  req.body = { name: req.body.name };
  let category = new Category(req.body);
  category = await category.save();
  return res.json({ data: category });
});

/**  @route    DELETE api/v1/posts/:id
 @desc     Delete a category
 @access   Private
 */
export const deleteCategory = wrapper(async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (category !== null) {
    return res.json({ data: { message: 'Category deleted successfully' } });
  }
  return res.status(404).json({ error: 'Category not found' });
});
