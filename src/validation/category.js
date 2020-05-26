import { check } from 'express-validator';

export default [
  check('name')
    .trim()
    .isLength({
      min: 1
    })
    .withMessage('min of a char')
];
