import { validationResult } from 'express-validator';

/** @desc   handles express validator errors
 * @returns null if error exists , otherwise returns response object
 */
export default (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return { response: res.status(422).json(errors.array()) };
  return null;
};
