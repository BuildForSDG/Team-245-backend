import wrapper from '../utils/wrapper';
import validatorErr from '../utils/validatorErr';

/**  @route    GET api/v1/user/:id
 @desc     Get a user
 @access   Private
 */
export const fetchUser = wrapper(() => {});

/**  @route    GET api/v1/user/
 @desc     Get users
 @access   Private
 */
export const fetchUsers = wrapper(() => {});

/**  @route    POST api/v1/user
 @desc     Create a user
 @access   Public
 */
export const createUser = wrapper((req, res) => {
  const err = validatorErr(req, res);
  if (err !== null) return err.response;
  return null;
});

/**  @route    POST api/v1/user/login
 @desc     Login user
 @access   Public
 */
export const login = wrapper((req, res) => {
  const err = validatorErr(req, res);
  if (err !== null) return err.response;
  return null;
});

/**  @route    DELETE api/v1/user/:id
 @desc     Delete a user
 @access   Private
 */
export const deleteUser = wrapper(() => {});
