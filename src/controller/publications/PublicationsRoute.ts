import { PublicationController } from "./PublicationController"
import { param } from "express-validator"


export const publicationRoutes = [{
    method: "get",
    route: "/publications",
    controller: PublicationController,
    action: "all",
    validation: []
}, {
    method: "delete",
    route: "/publications/:id",
    controller: PublicationController,
    action: "remove",
    validation: [
        param('id').isInt(),
    ]
}]