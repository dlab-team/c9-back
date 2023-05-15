import { body, param } from 'express-validator';
import { QuestionController } from "./QuestionController";


export const questionRoutes = [{
    method: 'get',
    route: '/questions/:id',
    controller: QuestionController,
    action: 'one',
    validation: [
        param('id').isInt()
    ],
  },{
    method: 'get',
    route: '/questions',
    controller: QuestionController,
    action: 'all',
    validation: [],
  }, {
    method: 'post',
    route: '/questions',
    controller: QuestionController,
    action: 'save',
    validation: [
      body('question').isString(),
      body('answer').isString(),
      body('publication_id').isInt({ min: 1 }).withMessage('The minimum id must be positive integer'),
    ],
  }, {
    method: 'delete',
    route: '/questions/:id',
    controller: QuestionController,
    action: 'remove',
    validation: [
        param('id').isInt({ min: 1 }).withMessage('The minimum id must be positive integer'),
    ],
  }, {
    method: 'put',
    route: '/questions/:id',
    controller: QuestionController,
    action: 'update',
    validation: [
        param('id').isInt(),
        body('question').isString(),
        body('answer').isString(),
      ],
  }]