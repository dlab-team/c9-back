import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Publication } from "../entity/Publication";

export class PublicationController {
  private publicationRepository = AppDataSource.getRepository(Publication);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.publicationRepository.find();
  }
}
