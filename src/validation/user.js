import { check } from 'express-validator';

export default [
  check('email').isEmail().withMessage('Enter a valid email'),

  check('password')
    .trim()
    .isLength({
      min: 5
    })
    .withMessage('must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('must contain a number')
];
