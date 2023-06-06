import * as swaggerJSDoc from "swagger-jsdoc";
import { OAS3Options, OAS3Definition } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "PROYECTO C9-INCUBADORA DESAFIO LATAM",
    version: "1.0.0",
    description: "C9 API",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  components: {
    /* {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },}
*/
    schemas: {
      Users: {
        type: "object",
        required: ["firstName", "lastName", "age"],
        properties: {
          id: {
            type: "integer",
            format: "int64",
          },
          firstName: {
            type: "string",
          },
          lastName: {
            type: "string",
          },
          age: {
            type: "integer",
            format: "int32",
          },
        },
      },
      Publications: {
        type: "object",
        required: ["name", "initialContent", "finalContent", "slug"],
        properties: {
          id: {
            type: "integer",
            format: "int64",
          },
          name: {
            type: "string",
          },
          slug: {
            type: "string",
          },
          initialContent: {
            type: "string",
          },
          finalContent: {
            type: "string",
          },
          category: {
            type: "string",
          },
          images: {
            type: "array",
          },
          user_id: {
            type: "integer",
            format: "int64",
          },
          published: {
            type: "boolean",
          },
        },
      },
      Questions: {
        type: "object",
        required: ["question", "answer", "publication_id"],
        properties: {
          id: {
            type: "integer",
            format: "int64",
          },
          question: {
            type: "string",
          },
          answer: {
            type: "string",
          },
          publication_id: {
            type: "integer",
            format: "int64",
          },
        },
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: [
    "./src/controller/publications/*.ts",
    "./src/controller/users/*.ts",
    "./src/controller/questions/*.ts",
  ],
};

export default swaggerJSDoc(swaggerOptions);
