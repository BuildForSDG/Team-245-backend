import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';

export default (req, res, next) => {
  const token = req.headers['team-245-auth-token'];
  try {
    const decoded = jwt.verify(token, config.JwtKey);
    const user = User.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ error: 'invalid token' });
    }
    req.user = decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Expired Token' });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
};
