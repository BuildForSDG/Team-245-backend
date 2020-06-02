import { check } from 'express-validator';

export default [
  check('title')
    .trim()
    .isString()
    .isLength({
      min: 10
    })
    .withMessage('must be at least 10 chars long'),

  check('description')
    .trim()
    .isString()
    .isLength({
      min: 30
    })
    .withMessage('must be at least 30 chars long')
];
