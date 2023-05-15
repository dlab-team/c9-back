import { PublicationController } from "./PublicationController";
import { body, param } from 'express-validator';


export const publicationRoutes = [{
    method: 'get',
    route: '/publications/:slug',
    controller: PublicationController,
    action: 'one',
    validation: [
        param('slug').isString()
    ],
  },
  {
    method: 'get',
    route: '/publications',
    controller: PublicationController,
    action: 'all',
    validation: [],
  },{
    method: 'post',
    route: '/publications',
    controller: PublicationController,
    action: 'save',
    validation: [
      body('name').isString(),
      body('slug').isString(),
      body('initialContent').isString(),
      body('finalContent').isString(),
      body('category').isString(),
      body('images').isString(),
      body('user_id').isInt({ min: 1 }).withMessage('The minimum user_id must be positive integer'),
    ],
  }, {
		method: 'put',
		route: '/publications/:slug',
		controller: PublicationController,
		action: 'update',
		validation: [
			param('slug').isString(),
			body('name').isString(),
      body('slug').isString(),
      body('initialContent').isString(),
      body('finalContent').isString(),
      body('category').isString(),
      body('images').isString(),
      body('user_id').isInt({ min: 1 }).withMessage('The minimum user_id must be positive integer'),
		],
	}, {
    method: 'delete',
    route: '/publications/:slug',
    controller: PublicationController,
    action: 'remove',
    validation: [
      param('slug').isString(),
    ],
  }]