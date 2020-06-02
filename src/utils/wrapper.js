/** @desc wraps middleware in try catch block to prevent repition of code */
export default (request) => async (req, res, next) => {
  try {
    request(req, res);
  } catch (error) {
    next(error);
  }
};
