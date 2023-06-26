//import * as passport from "passport";
import { UserController } from "./UserController";
import { body, param } from "express-validator";
const express = require("express");
const userRouter = express.Router();
const userController = new UserController();
import validationReqSchema from "../middlewares/validations";
import * as passport from "passport";

/**
 * @swagger
 * path:
 * /users/{id}:
 *    get:
 *      tags:
 *        - usuarios
 *      summary: Obtener un usuario por su ID
 *      description: Este endpoint se utiliza para obtener los detalles de un usuario específico utilizando su ID como parámetro.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: ID del usuario
 *      responses:
 *        '200':
 *          description: Retorna el usuario correspondiente al ID proporcionado.
 *        '404':
 *          description: Usuario no encontrado.
 *
 * /users:
 *    get:
 *      tags:
 *        - usuarios
 *      summary: Obtener todos los usuarios
 *      description: Este endpoint se utiliza para obtener todos los usuarios registrados.
 *      responses:
 *        '200':
 *          description: Retorna todos los usuarios existentes.
 *
 *    post:
 *      tags:
 *        - usuarios
 *      summary: Crear un nuevo usuario
 *      description: Este endpoint se utiliza para crear un nuevo usuario.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Users"
 *      responses:
 *        '200':
 *          description: El usuario ha sido creado exitosamente.
 *        '422':
 *          description: Error de validación.
 *
 *    put:
 *      tags:
 *        - usuarios
 *      summary: Actualizar un usuario existente
 *      description: Este endpoint se utiliza para actualizar un usuario existente utilizando su ID como parámetro.
 *
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Users"
 *      responses:
 *        '200':
 *          description: El usuario ha sido actualizado exitosamente.
 *        '404':
 *          description: Usuario no encontrado.
 *        '422':
 *          description: Error de validación.
 *
 *    delete:
 *      tags:
 *        - usuarios
 *      summary: Eliminar un usuario existente
 *      description: Este endpoint se utiliza para eliminar un usuario existente utilizando su ID como parámetro.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: ID del usuario
 *      responses:
 *        '200':
 *          description: El usuario ha sido eliminado exitosamente.
 *        '404':
 *          description: Usuario no encontrado.
 * /users/auth:
 *    post:
 *      tags:
 *        - usuarios
 *      summary: Autentica un usuario
 *      description: Este endpoint se utiliza para autenticar un usuario contra la base de datos.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        '400':
 *          description: El usuario no existe en la base de datos.
 *        '422':
 *          description: Error de validación.
 *        '200':
 *          description: Devuelve un JWT con los datos del usuario.
 */

userRouter.get("/users", userController.all);
userRouter.get(
  "/users/:id",
  validationReqSchema([param("id").isInt()]),
  userController.one
);
userRouter.post(
  "/users",
  validationReqSchema([body("name").isString(), body("email").isString()]),
  userController.save
);
userRouter.post(
  "/users/auth",
  validationReqSchema([body("email").isString(), body("password").isString()]),
  userController.checkAuth
),
  userRouter.post(
    "/users/confirm",
    validationReqSchema([
      body("password").isString().withMessage("Password must be a string"),
      body("token").isString().withMessage("Token must be a string"),
    ]),
    userController.confirm
  ),
  userRouter.put(
    "/users/:id",
    validationReqSchema([body("name").isString(), body("enabled").isBoolean()]),
    userController.update
  );

export default userRouter;
