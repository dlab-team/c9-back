import { body, param } from "express-validator";
import validateReqSchema from "../middlewares/validations";
import { RegionController } from "./RegionController";
const express = require('express');
const regionRouter = express.Router();
const regionController = new RegionController();

regionRouter.get('/region', regionController.all);

regionRouter.get('/region/:id',
   validateReqSchema([
      param("id").isInt()
   ]),
   regionController.one);

regionRouter.post('/region',
   validateReqSchema([
      body("name").isString(),
      body("region").isInt()
   ]),
   regionController.save);

regionRouter.put('/region/:id',
   validateReqSchema([
      param("id").isInt(),
      body("name").isString(),
      body("region").isInt()
   ]),
   regionController.update);

regionRouter.delete('/region/:id',
   validateReqSchema([
      param("id").isInt()
   ]),
   regionController.remove);

export default regionRouter;
