import { PublicationController } from "./PublicationController";
import { body, param } from "express-validator";

/**
 * Publicaciones
 * @swagger
 * /publications/{slug}:
 *    get:
 *      tags:
 *        - publicaciones
 *      summary: Obtener una publicación por su slug
 *      description: Este endpoint se utiliza para obtener los detalles de una publicación específica utilizando su slug como parámetro.
 *      operationId: getPublication
 *      parameters:
 *        - in: path
 *          name: slug
 *          required: true
 *          schema:
 *            type: string
 *          description: Slug de la publicación
 *      responses:
 *        '200':
 *          description: Retorna la publicación correspondiente al slug proporcionado.
 *        '404':
 *          description: Publicación no encontrada.
 *
 * /publications:
 *    get:
 *      tags:
 *        - publicaciones
 *      summary: Obtener todas las publicaciones
 *      description: Este endpoint se utiliza para obtener todas las publicaciones disponibles.
 *      responses:
 *        '200':
 *          description: Retorna todas las publicaciones existentes.
 *
 *    post:
 *      tags:
 *        - publicaciones
 *      summary: Crear una nueva publicación
 *      description: Este endpoint se utiliza para crear una nueva publicación.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Publications"
 *      responses:
 *        '200':
 *          description: La publicación ha sido creada exitosamente.
 *        '422':
 *          description: Error de validación.
 *
 *    put:
 *      tags:
 *        - publicaciones
 *      summary: Actualizar una publicación existente
 *      description: Este endpoint se utiliza para actualizar una publicación existente utilizando su slug como parámetro.
 *      operationId: updatePublication
 *      parameters:
 *        - in: path
 *          name: slug
 *          required: true
 *          schema:
 *            type: string
 *          description: Slug de la publicación
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Publications"
 *      responses:
 *        '200':
 *          description: La publicación ha sido actualizada exitosamente.
 *        '404':
 *          description: Publicación no encontrada.
 *        '422':
 *          description: Error de validación.
 *
 *    delete:
 *      tags:
 *        - publicaciones
 *      summary: Eliminar una publicación existente
 *      description: Este endpoint se utiliza para eliminar una publicación existente utilizando su slug como parámetro.
 *      operationId: deletePublication
 *      parameters:
 *        - in: path
 *          name: slug
 *          required: true
 *          schema:
 *            type: string
 *          description: Slug de la publicación
 *      responses:
 *        '200':
 *          description: La publicación ha sido eliminada exitosamente.
 *        '404':
 *          description: Publicación no encontrada.
 */

export const publicationRoutes = [
  {
    method: "get",
    route: "/publications/:slug",
    controller: PublicationController,
    action: "one",
    validation: [param("slug").isString()],
  },
  {
    method: "get",
    route: "/publications",
    controller: PublicationController,
    action: "all",
    validation: [],
  },
  {
    method: "post",
    route: "/publications",
    controller: PublicationController,
    action: "save",
    validation: [
      body("name").isString(),
      body("slug").isString(),
      body("initialContent").isString(),
      body("finalContent").isString(),
      body("category").isString(),
      body("images").isString(),
      body("user_id")
        .isInt({ min: 1 })
        .withMessage("The minimum user_id must be positive integer"),
    ],
  },
  {
    method: "put",
    route: "/publications/:slug",
    controller: PublicationController,
    action: "update",
    validation: [
      param("slug").isString(),
      body("name").isString(),
      body("initialContent").isString(),
      body("finalContent").isString(),
      body("category").isString(),
      body("images").isString(),
      body("user_id")
        .isInt({ min: 1 })
        .withMessage("The minimum user_id must be positive integer"),
    ],
  },
  {
    method: "delete",
    route: "/publications/:slug",
    controller: PublicationController,
    action: "remove",
    validation: [param("slug").isString()],
  },
];
