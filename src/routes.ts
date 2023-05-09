import { UserController } from './controller/UserController';
import { PublicationController } from './controller/PublicationController';
import { body, param } from 'express-validator';

export const Routes = [
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all',
    validation: [],
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one',
    validation: [param('id').isInt()],
  },
  {
    method: 'post',
    route: '/users',
    controller: UserController,
    action: 'save',
    validation: [
      body('firstName').isString(),
      body('lastName').isString(),
      body('age')
        .isInt({ min: 0 })
        .withMessage('The minimum age must be positive integer'),
    ],
  },
  {
    method: 'get',
    route: '/publications/:slug',
    controller: PublicationController,
    action: 'one',
    validation: [param('slug').isString()],
  },
  {
    method: 'get',
    route: '/publications',
    controller: PublicationController,
    action: 'all',
    validation: [],
  },
];
