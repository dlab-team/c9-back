import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from "express";
import { Publication } from '../entity/Publication';
export class PublicationController {

    private publicationRepository = AppDataSource.getRepository(Publication);

    async one(request: Request, response: Response, next: NextFunction) {
        const slug = request.params.slug;
        const publication = await this.publicationRepository.findOne({ where: { slug } });
        if (!publication) { return "no se consiguió la publicación"; }
        return publication;
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        const publication = await this.publicationRepository.findOne({ where: { id } });
        if (!publication) { return `No se encontró publicación con id ${id}`; }
        const { slug, initialContent, finalContent } = request.body;
        publication.slug = slug;
        publication.initialContent = initialContent;
        publication.finalContent = finalContent;
        await this.publicationRepository.update(id, publication);
        return publication;
    }
}