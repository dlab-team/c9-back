require("dotenv").config();
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { User } from "./entity/User";
import * as morgan from "morgan";
import { validationResult } from "express-validator";
import * as swaggerUi from "swagger-ui-express";
import swaggerDoc from "./docs/swagger";

function handleError(err, req, res, next) {
  res.status(err.statusCode || 500).send({ message: err.message });
}

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(cors());
    app.use(morgan("tiny"));
    app.use(bodyParser.json());

    app.get("/", function (req: Request, res: Response) {
      res.send({
        Proyect: "Innova XD",
        Development:
          "Incubadora Desafío Latam Célula c9 junto a Microsoft y El Mercurio",
      });
    });

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        ...route.validation,
        async (req: Request, res: Response, next: Function) => {
          try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            const result = await new (route.controller as any)()[route.action](
              req,
              res,
              next
            );
            if (result.statusCode && result.data) {
              const { statusCode, data } = result;
              return res.status(statusCode).json(data);
            }
            return res.tatus(200).json(result)
          } catch (error) {
            next(error);
          }
        }
      );
    }); // start express server

    app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    app.use(handleError);
    app.listen(process.env.PORT);

    console.log(`Express server has started on port ${process.env.PORT}.`);
  })
  .catch((error) => console.log(error));
