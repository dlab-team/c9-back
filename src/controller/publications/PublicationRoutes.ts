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
  },
	{
		method: 'put',
		route: '/publications/:slug',
		controller: PublicationController,
		action: 'update',
		validation: [
			param('slug').isString(),
			body('name').isString(),
			body('initialContent').isString(),
			body('finalContent').isString(),
		],
	}]