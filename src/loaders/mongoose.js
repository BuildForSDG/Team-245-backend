import mongoose from 'mongoose';
import logger from '../utils/logger';
import config from '../config/index';

export default {
  initializeDb: async () => {
    try {
      await mongoose.connect(config.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
      logger('Connected to db');
    } catch (error) {
      logger(error);
    }
  }
};
