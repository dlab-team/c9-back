import { body } from "express-validator";
import validateReqSchema from "../middlewares/validations";
import { MessagesController } from "./MessagesController";
const express = require('express');
const messageRouter = express.Router();
const messageController = new MessagesController();

messageRouter.post('/api/chat_message',
   validateReqSchema([
      body("message").isString(),
      body("publication_slug").isString(),
   ]),
   messageController.save);

export default messageRouter;
