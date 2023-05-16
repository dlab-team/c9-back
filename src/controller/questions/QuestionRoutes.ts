import { body, param } from "express-validator";
import { QuestionController } from "./QuestionController";

/**
 * Preguntas
 * @swagger
 * /questions/{id}:
 *    get:
 *      tags:
 *        - preguntas
 *      summary: Obtener una pregunta por su ID
 *      description: Este endpoint se utiliza para obtener los detalles de una pregunta específica utilizando su ID como parámetro.
 *      operationId: getQuestion
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: ID de la pregunta
 *          minimum: 1
 *      responses:
 *        '200':
 *          description: Retorna la pregunta correspondiente al ID proporcionado.
 *        '404':
 *          description: Pregunta no encontrada.
 *
 * /questions:
 *    get:
 *      tags:
 *        - preguntas
 *      summary: Obtener todas las preguntas
 *      description: Este endpoint se utiliza para obtener todas las preguntas disponibles.
 *      responses:
 *        '200':
 *          description: Retorna todas las preguntas existentes.
 *
 *    post:
 *      tags:
 *        - preguntas
 *      summary: Crear una nueva pregunta
 *      description: Este endpoint se utiliza para crear una nueva pregunta.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *                $ref: "#/components/schemas/Questions"
 *      responses:
 *        '200':
 *          description: La pregunta ha sido creada exitosamente.
 *        '422':
 *          description: Error de validación.
 *
 *    put:
 *      tags:
 *        - preguntas
 *      summary: Actualizar una pregunta existente
 *      description: Este endpoint se utiliza para actualizar una pregunta existente utilizando su ID como parámetro.
 *      operationId: updateQuestion
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: ID de la pregunta
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *                $ref: "#/components/schemas/QuestionsUpdate"
 *      responses:
 *        '200':
 *          description: La pregunta ha sido actualizada exitosamente.
 *        '404':
 *          description: Pregunta no encontrada.
 *        '422':
 *          description: Error de validación.
 *
 *    delete:
 *      tags:
 *        - preguntas
 *      summary: Eliminar una pregunta existente
 *      description: Este endpoint se utiliza para eliminar una pregunta existente utilizando su ID como parámetro.
 *      operationId: deleteQuestion
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: ID de la pregunta
 *          minimum: 1
 *      responses:
 *        '200':
 *          description: La pregunta ha sido eliminada exitosamente.
 *        '404':
 *          description: Pregunta no encontrada.
 */

export const questionRoutes = [
  {
    method: "get",
    route: "/questions/:id",
    controller: QuestionController,
    action: "one",
    validation: [param("id").isInt()],
  },
  {
    method: "get",
    route: "/questions",
    controller: QuestionController,
    action: "all",
    validation: [],
  },
  {
    method: "post",
    route: "/questions",
    controller: QuestionController,
    action: "save",
    validation: [
      body("question").isString(),
      body("answer").isString(),
      body("publication_id")
        .isInt({ min: 1 })
        .withMessage("The minimum id must be positive integer"),
    ],
  },
  {
    method: "delete",
    route: "/questions/:id",
    controller: QuestionController,
    action: "remove",
    validation: [
      param("id")
        .isInt({ min: 1 })
        .withMessage("The minimum id must be positive integer"),
    ],
  },
  {
    method: "put",
    route: "/questions/:id",
    controller: QuestionController,
    action: "update",
    validation: [
      param("id").isInt(),
      body("question").isString(),
      body("answer").isString(),
    ],
  },
];
