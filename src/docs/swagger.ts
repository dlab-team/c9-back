import * as swaggerJSDoc from "swagger-jsdoc";
import { OAS3Options, OAS3Definition } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "C9 API",
    version: "1.0.0",
    description: "C9 API",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  /* components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },}
*/
  schemas: {
    User: {
      type: "object",
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
    Publication: {
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
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes.ts"],
};

export default swaggerJSDoc(swaggerOptions);
