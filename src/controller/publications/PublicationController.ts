import { AppDataSource } from '../../data-source'
import { NextFunction, Request, Response } from "express"
import { Publication } from '../../entity/Publication'

export class PublicationController {

    private publicationRepository = AppDataSource.getRepository(Publication)

    async all(request: Request, response: Response, next: NextFunction) {
        const publications = await this.publicationRepository.find()
        return publications
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const publicationToRemove = await this.publicationRepository.findOneBy({ id })

        if (!publicationToRemove) {
            return "La Publicación que se intenta eliminar no existe"
        }

        await this.publicationRepository.remove(publicationToRemove)

        return "La Publicación se ha borrado correctamente"
    }
}