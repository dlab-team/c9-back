import { AppDataSource } from '../../data-source';
import { NextFunction, Request, Response } from 'express';
import { Publication } from '../../entity/Publication';
import { asDTO, asDTOs } from './PublicationDTO';

export class PublicationController {
  private publicationRepository = AppDataSource.getRepository(Publication);

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
      response.status(400).json({ message: "La publicación que se intenta buscar no existe" });
      return;
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
    try {
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
      return asDTOs(publications);
    } catch (error) {
      response.status(400).json({ message: "Ha ocurrido un error creando la Publicación", error: error.detail })
    }
  };

      /**
   * Crea y guarda una nueva publicación en la base de datos.
   * @param request - La solicitud HTTP que contiene los datos de la publicación.
   * @param response - La respuesta HTTP que se enviará al cliente.
   * @param next - La función que se llamará después de que se complete la operación.
   * @returns La publicación creada.
   */
  
  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, slug, initialContent, finalContent, category, images, user_id } = request.body;
      const publication = this.publicationRepository.create({
        name,
        slug,
        initialContent,
        finalContent,
        category,
        images,
        user: {
          id: user_id
        }
      });
      const result = await this.publicationRepository.save(publication);
      return result;
    } catch (error) {
      response.status(400).json({ message: "Ha ocurrido un error creando la Publicación", error: error.detail })
    }
  };
  


  /**
   * Actualiza una publicación existente en la base de datos.
   * @param request - La solicitud HTTP que se está procesando.
   * @param response - La respuesta HTTP que se enviará al cliente.
   * @param next - La función que se llamará después de que se complete la operación.
   * @returns La publicación actualizada.
   */
  
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const busquedaSlug = request.params.slug;
      const publication = await this.publicationRepository.findOne({
        where: { slug: busquedaSlug },
        relations: {
          user: true
        },
        select: {
          user: {
            id: true
          }
        }
      });
      if (!publication) {
        response.status(400).json({ message: "La publicación que se intenta actualizar no existe" });
        return;
      }
      const { name, slug, initialContent, finalContent, category, images, user_id } = request.body;
      publication.name = name;
      publication.slug = slug;
      publication.initialContent = initialContent;
      publication.finalContent = finalContent;
      publication.category = category;
      publication.images = images;
      publication.user.id = user_id;
      await this.publicationRepository.save(publication);
      return publication;
    } catch (error) {
      response.status(400).json({ message: "Ha ocurrido un error actualizando la Publicación", error: error.detail })
    }
  }

  /**
   * Elimina una publicación de la base de datos.
   * @param request - La solicitud HTTP que se está procesando.
   * @param response - La respuesta HTTP que se enviará al cliente.
   * @param next - La función que se llamará después de que se complete la operación.
   * @returns Un mensaje que indica si la publicación se eliminó correctamente o no.
   */
  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const slug = request.params.slug;
      const publicationToRemove = await this.publicationRepository.findOne({
        where: { slug },
      });
      if (!publicationToRemove) {
        response.status(400).json({ message: "La publicación que se intenta borrar no existe" });
        return;
      }
      await this.publicationRepository.remove(publicationToRemove);
      response.status(200).json({ message: 'La Publicación se ha borrado correctamente' })
    } catch (error) {
      response.status(400).json({ message: "Ha ocurrido un error eliminando una pregunta con su respuesta", error: error.detail })
    }
  };
}
