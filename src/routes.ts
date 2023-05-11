import { UserController } from './controller/UserController';
import { body, param } from 'express-validator';
import { PublicationController } from './controller/PublicationController';

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
		method: 'delete',
		route: '/users/:id',
		controller: UserController,
		action: 'remove',
		validation: [param('id').isInt()],
	},
	{
		method: 'put',
		route: '/publications/:id',
		controller: PublicationController,
		action: 'update',
		validation: [
			param('id').isInt(),
			body('name').isString(),
			body('slug').isString(),
			body('initialContent').isString(),
			body('finalContent').isString(),
		],
	},
];
