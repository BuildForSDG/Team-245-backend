import app from './app';
import config from './config';
import logger from './utils/logger';
import loaders from './loaders/mongoose';

loaders.initializeDb();
const port = process.env.PORT || config.port;
if (config.NODE_ENV !== 'test') {
  app.listen(config.port, logger(`app running on port ${port}`));
}

export default app;
