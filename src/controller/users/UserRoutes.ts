import { UserController } from "./UserController";
import { body, param } from "express-validator";

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
 */

export const userRoutes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    validation: [],
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    validation: [param("id").isInt()],
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
    validation: [
      body("firstName").isString(),
      body("lastName").isString(),
      body("age")
        .isInt({ min: 0 })
        .withMessage("The minimum age must be positive integer"),
    ],
  },
  {
    method: "post",
    route: "/users/auth",
    controller: UserController,
    action: "checkAuth",
    validation: [
      body("email").isString(),
      body("password").isString(),
    ],
  }
];
