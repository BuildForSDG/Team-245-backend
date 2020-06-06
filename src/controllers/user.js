import _ from 'lodash';
import bcrypt from 'bcrypt';
import wrapper from '../utils/wrapper';
import User from '../models/user';
import validatorErr from '../utils/validatorErr';

/**  @route    GET api/v1/user/:id
 @desc     Get a user
 @access   Private
 */
export const fetchUser = wrapper(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user !== null) {
    return res.json(user);
  }
  return res.status(404).json({ error: 'User not found' });
});

/**  @route    GET api/v1/user/
 @desc     Get users
 @access   Private
 */
export const fetchUsers = wrapper(async (_req, res) => {
  const users = await User.find();
  res.json({ data: { users } });
});

/**  @route    POST api/v1/user
 @desc     Create a user
 @access   Public
 */
export const createUser = wrapper(async (req, res) => {
  const err = validatorErr(req, res);
  if (err !== null) return err.response;
  req.body = _.pick(req.body, 'email', 'password');
  req.body.password = await bcrypt.hash(req.body.password, 10);
  let user = await User.findOne({ email: req.body.email });
  if (user !== null) {
    return res.status(400).json({ error: 'An account with this email already exists' });
  }
  user = new User(req.body);
  const newUser = await user.save();
  const token = newUser.generateAuthToken();
  return res.header('auth-x-token', token).status(200).json({ data: { token } });
});

/**  @route    POST api/v1/user/login
 @desc     Login user
 @access   Public
 */
export const login = wrapper(async (req, res) => {
  const err = validatorErr(req, res);
  if (err !== null) return err.response;
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // const errObj = {}
  if (user === null) {
    return res.status(400).json({ error: 'Account with the email exist does not exist' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).send({ error: 'Incorrect password' });
  }
  const token = user.generateAuthToken();
  return res.header('auth-x-token', token).send({
    data: { token }
  });
});

/**  @route    DELETE api/v1/user/:id
 @desc     Delete a user
 @access   Private
 */
export const deleteUser = wrapper(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (user === null) {
    return res.status(404).json({ error: 'user does not exist' });
  }
  return res.json({ data: { message: 'user deleted successfully' } });
});
