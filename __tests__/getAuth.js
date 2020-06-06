import User from '../src/models/user';

/**
 * @desc a fucntion that returns a token and its id
 * @param accepts a boolean to either gernerate an admin or a normal user
 */
export default async (admin) => {
  const randInt = Math.floor(Math.random() * 10000);
  let user = new User({ password: `abcde${randInt}`, email: `email${randInt}@gmail.com` });
  if (admin) {
    user.isAdmin = true;
  }
  user = await user.save();
  const token = user.generateAuthToken();

  // eslint-disable-next-line no-underscore-dangle
  const id = user._id;
  return { id, token };
};
