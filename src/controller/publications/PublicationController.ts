import { AppDataSource } from '../../data-source';
import { NextFunction, Request, Response } from 'express';
import { Publication } from '../../entity/Publication';
import { asDTO, asDTOs } from './PublicationDTO';

export class PublicationController {
  private publicationRepository = AppDataSource.getRepository(Publication);

  /**
   * Crea y guarda una nueva publicación en la base de datos.
   * @param request - La solicitud HTTP que contiene los datos de la publicación.
   * @param response - La respuesta HTTP que se enviará al cliente.
   * @param next - La función que se llamará después de que se complete la operación.
   * @returns La publicación creada.
   */
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

  /**
   *
   * @param request - La solicitud HTTP que contiene el slug de la publicación.
   * @param response - La respuesta HTTP que se enviará al cliente.
   * @param next - La función que se llamará después de que se complete la operación.
   * @returns - La publicación con el slug especificado.
   */
  async one(request: Request, response: Response, next: NextFunction) {
    const slug = request.params.slug;
    const publication = await this.publicationRepository.findOne({
      where: { slug },
      relations: {
        user: true,
        questions: true,
      },
      select: {
        user: {
          name: true,
        },
      },
    });
    if (!publication) {
      return 'No se consiguió la publicación';
    }
    const publicationDTO = asDTO(publication);
    return publicationDTO;
  }

  /**
   * Obtiene todas las publicaciones de la base de datos.
   * @param request - La solicitud HTTP que se está procesando.
   * @param response - La respuesta HTTP que se enviará al cliente.
   * @param next - La función que se llamará después de que se complete la operación.
   * @returns Un arreglo de objetos DTO que representan las publicaciones.
   */
  async all(request: Request, response: Response, next: NextFunction) {
    const publications = await this.publicationRepository.find({
      relations: {
        user: true,
        questions: true,
      },
      select: {
        user: {
          name: true,
        },
        questions: {
          question: true,
          answer: true,
        },
      },
    });
    return asDTOs(publications);
  }

  /**
   * Elimina una publicación de la base de datos.
   * @param request - La solicitud HTTP que se está procesando.
   * @param response - La respuesta HTTP que se enviará al cliente.
   * @param next - La función que se llamará después de que se complete la operación.
   * @returns Un mensaje que indica si la publicación se eliminó correctamente o no.
   */
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

  /**
   * Actualiza una publicación existente en la base de datos.
   * @param request - La solicitud HTTP que se está procesando.
   * @param response - La respuesta HTTP que se enviará al cliente.
   * @param next - La función que se llamará después de que se complete la operación.
   * @returns La publicación actualizada.
   */
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
