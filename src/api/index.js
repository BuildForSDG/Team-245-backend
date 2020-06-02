import userRouter from './user';
import postRouter from './post';
import categoryRouter from './category';

const baseUrl = '/api/v1';
export default (app) => {
  app.use(`${baseUrl}/user`, userRouter);
  app.use(`${baseUrl}/posts`, postRouter);
  app.use(`${baseUrl}/category`, categoryRouter);
};
