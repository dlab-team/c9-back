import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { Publication } from '../entity/Publication';

export class PublicationController {
  private publicationRepository = AppDataSource.getRepository(Publication);

  async one(request: Request, response: Response, next: NextFunction) {
    const slug = request.params.slug;

    const publicaction = await this.publicationRepository.findOne({
      where: { slug },
    });

    if (!publicaction) {
      return 'no se consiguió la publicación';
    }

    return publicaction;
  }

  async all(request: Request, response: Response, next: NextFunction) {
    return this.publicationRepository.find();
  }
}
