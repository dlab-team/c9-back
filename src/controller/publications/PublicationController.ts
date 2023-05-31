import { AppDataSource } from '../../data-source';
import { NextFunction, Request, Response } from 'express';
import { Publication } from '../../entity/Publication';
import { asDTO, asDTOs } from './PublicationDTO';
import { ImagesUploader } from '../../services/ImagesUploader';

export class PublicationController {
  private publicationRepository = AppDataSource.getRepository(Publication);

  async one(request: Request, response: Response, next: NextFunction) {
    try {
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
        return {
          statusCode: 404,
          data: { message: 'La publicación que se intenta buscar no existe' },
        };
      }
      const publicationDTO = asDTO(publication);
      return {
        statusCode: 200,
        data: publicationDTO,
      };
    } catch (error) {
      return {
        statusCode: 400,
        data: {
          message: 'Ha ocurrido un error trayendo la publicación',
          error: error.detail,
        },
      };
    }
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
      const publicationDTOs = asDTOs(publications);
      return {
        statusCode: 200,
        data: publicationDTOs,
      };
    } catch (error) {
      return {
        statusCode: 400,
        data: {
          message: 'Ha ocurrido un error obteniendo las Publicaciones',
          error: error.detail,
        },
      };
    }
  }

  /**
   * Crea y guarda una nueva publicación en la base de datos.
   * @param request - La solicitud HTTP que contiene los datos de la publicación.
   * @param response - La respuesta HTTP que se enviará al cliente.
   * @param next - La función que se llamará después de que se complete la operación.
   * @returns La publicación creada.
   */
  async save(request: Request, response: Response, next: NextFunction) {
    const imagesUploaderService = new ImagesUploader();
    let imagesUrls: string[];
    if(request.files) {
      imagesUrls = await imagesUploaderService.uploadImages(request.files.images);
    }
    
    try {
      const {
        name,
        slug,
        initialContent,
        finalContent,
        category,
        user_id,
      } = request.body;
      const publication = this.publicationRepository.create({
        name,
        slug,
        initialContent,
        finalContent,
        category,
        images: imagesUrls,
        user: {
          id: user_id,
        },
      });
      const result = await this.publicationRepository.save(publication);
      return {
        statusCode: 201,
        data: result,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
        data: {
          message: 'Ha ocurrido un error creando una nueva Publicación',
          error: error.detail,
        }
      };
    }
  }

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
          user: true,
        },
        select: {
          user: {
            id: true,
          },
        },
      });
      if (!publication) {
        return {
          statusCode: 400,
          data: {
            message: 'La publicación que se intenta actualizar no existe',
          },
        };
      }
      const {
        name,
        slug,
        initialContent,
        finalContent,
        category,
        images,
        user_id,
      } = request.body;
      publication.name = name;
      publication.slug = slug;
      publication.initialContent = initialContent;
      publication.finalContent = finalContent;
      publication.category = category;
      publication.images = images;
      publication.user.id = user_id;
      await this.publicationRepository.save(publication);
      return {
        statusCode: 200,
        data: publication,
      };
    } catch (error) {
      return {
        statusCode: 400,
        data: {
          message: 'Ha ocurrido un error actualizando la Publicación',
          error: error.detail,
        },
      };
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
        relations: {
          questions: {
            publication: true,
          },
        },
      });
      console.log('slug', slug);
      console.log(publicationToRemove);
      if (!publicationToRemove) {
        return {
          statusCode: 404,
          data: { message: 'La publicación que se intenta borrar no existe' },
        };
      }
      await this.publicationRepository.remove(publicationToRemove);
      return {
        statusCode: 200,
        data: { message: 'La Publicación se ha borrado correctamente' },
      };
    } catch (error) {
      return {
        statusCode: 400,
        data: {
          message:
            'Ha ocurrido un error eliminando una pregunta con su respuesta',
          error: error.detail,
        },
      };
    }
  }
}
