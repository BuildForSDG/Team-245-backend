import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import createError from 'http-errors';
import morgan from 'morgan';
import cors from 'cors';
import routes from './api/index';

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
routes(app);

app.use((req, res, next) => {
  next(createError(404));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: 'error',
    message: err.message
  });
});

export default app;
