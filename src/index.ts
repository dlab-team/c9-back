require("dotenv").config();
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import * as morgan from "morgan";
import * as swaggerUi from "swagger-ui-express";
import swaggerDoc from "./docs/swagger";
import fileUpload = require("express-fileupload");
import registerRouter from "./routes";


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
    app.use(fileUpload({ 
      createParentPath: true, 
      useTempFiles: true,
    }));
    //puede no ser necesario cuando Azure este disponible
    app.use("/public/images", express.static(`public/files/images`));

    app.get("/", function (req: Request, res: Response) {
      res.send({
        Proyect: "Innova XD",
        Development:
          "Incubadora Desafío Latam Célula c9 junto a Microsoft y El Mercurio",
      });
    });
    app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    app.use(handleError);
    registerRouter(app)
    app.listen(process.env.PORT);

    console.log(`Express server has started on port ${process.env.PORT}.`);
  })
  .catch((error) => console.log(error));