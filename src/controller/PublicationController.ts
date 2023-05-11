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
        const slug = request.params.slug;
        const publication = await this.publicationRepository.findOne({ where: { slug } });
        if (!publication) { return "no se consiguió la publicación"; }
        const { name, initialContent, finalContent } = request.body;
        publication.name = name;
        publication.initialContent = initialContent;
        publication.finalContent = finalContent;
        return this.publicationRepository.save(publication);
    }
}