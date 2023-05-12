import { AppDataSource } from '../../data-source';
import { NextFunction, Request, Response } from 'express';
import { Publication } from '../../entity/Publication';

export class PublicationController {
  private publicationRepository = AppDataSource.getRepository(Publication);

  async save(request: Request, response: Response, next: NextFunction) {
    const { slug, name, initialContent, finalContent } = request.body;
    const publication = this.publicationRepository.create({
      name,
      slug,
      initialContent,
      finalContent,
    });

    const results = await this.publicationRepository.save(publication);
    return results;
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const slug = request.params.slug;

    const publicaction = await this.publicationRepository.findOne({
      where: { slug },
    });

    if (!publicaction) {
      return 'No se consiguió la publicación';
    }

    return publicaction;
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const publications = await this.publicationRepository.find({
      relations: {
        user: true,
        questions: true
      },
      select: {
        user: {
          name: true,
        },
        questions: {
          question: true,
          answer: true,
        }
      }
    });
    return publications
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const slug = request.params.slug;

    const publicationToRemove = await this.publicationRepository.findOne({
      where: { slug },
    });

    if (!publicationToRemove) {
      return 'La Publicación que se intenta borrar no existe';
    }

    await this.publicationRepository.remove(publicationToRemove);

    return 'La Publicación se ha borrado correctamente';
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const slug = request.params.slug;
    const publication = await this.publicationRepository.findOne({
      where: { slug },
    });
    if (!publication) {
      return `No se encontró publicación`;
    }
    const { name, initialContent, finalContent } = request.body;
    publication.name = name;
    publication.initialContent = initialContent;
    publication.finalContent = finalContent;
    await this.publicationRepository.save(publication);
    return publication;
  }
}
