import { body, param } from "express-validator";
import validateReqSchema from "../middlewares/validations";
import { AuthorController } from "./AuthorController";
const express = require('express');
const authorRouter = express.Router();
const authorController = new AuthorController();

authorRouter.get('/author', authorController.all);

authorRouter.get('/author/:id',
   validateReqSchema([
      param("id").isInt()
   ]),
   authorController.one);

authorRouter.post('/author',
   validateReqSchema([
      body("name").isString(),
      body("email").isString(),
      body("description").isString(),
      body("photo").isString()
   ]),
   authorController.save);

authorRouter.put('/author/:id',
   validateReqSchema([
      param("id").isInt(),
      body("name").isString(),
      body("email").isString(),
      body("description").isString(),
      body("photo").isString()
   ]),
   authorController.update);

authorRouter.delete('/author/:id',
   validateReqSchema([
      param("id").isInt()
   ]),
   authorController.remove);

export default authorRouter;
