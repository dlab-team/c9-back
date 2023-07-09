import { body, param } from "express-validator";
import validateReqSchema from "../middlewares/validations";
import { CityController } from "./CityController";
const express = require('express');
const cityRouter = express.Router();
const cityController = new CityController();

cityRouter.get('/comunas', cityController.all);

cityRouter.get('/comunas/:id',
   validateReqSchema([
      param("id").isInt()
   ]),
   cityController.one);

cityRouter.post('/comunas',
   validateReqSchema([
      body("name").isString(),
      body("region").isInt()
   ]),
   cityController.save);

cityRouter.put('/comunas/:id',
   validateReqSchema([
      param("id").isInt(),
      body("name").isString(),
      body("region").isInt()
   ]),
   cityController.update);

cityRouter.delete('/comunas/:id',
   validateReqSchema([
      param("id").isInt()
   ]),
   cityController.remove);

export default cityRouter;
