import { AppDataSource } from '../../data-source';
import { NextFunction, Request, Response } from 'express';
import { Publication } from '../../entity/Publication';
import { asDTO, asDTOs, LocationFullInfo } from './PublicationDTO';
import { ImagesUploader } from '../../services/ImagesUploader';
import { Region } from '../../entity/Region';
import { City } from '../../entity/City';
import { Category } from '../../entity/Category';

export class PublicationController {
  private publicationRepository = AppDataSource.getRepository(Publication);

  public one = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const slug = request.params.slug;
      const publication = await this.publicationRepository.findOne({
        where: { slug },
        relations: {
          user: true,
          questions: true,
          category: true,
        },
        select: {
          user: {
            name: true,
          },
        },
      });
      if (!publication) {
        return response
          .status(404)
          .json({ message: 'La publicación que se intenta buscar no existe' });
      }

      let locationFullInfo: LocationFullInfo = null;
      if (publication.location) {
        const region = await AppDataSource.getRepository(Region).findOneBy({
          id: publication.location.regionId,
        });
        const city = publication.location.cityId
          ? await AppDataSource.getRepository(City).findOneBy({
              id: publication.location.cityId,
            })
          : null;
        locationFullInfo = { region, city };
      }

      // TODO: Agregar imágenes dummy si es que images es vacio
      if (publication.images.length === 0) {
        for (let i = 0; i < 3; i++) {
          const randomId = Math.floor(Math.random() * 1000) + 1;
          const imageUrl = `https://picsum.photos/1200/800?random=${randomId}`;
          publication.images.push(imageUrl);
        }
      }

      const publicationDTO = asDTO({ ...publication, locationFullInfo });
      return response.status(200).json(publicationDTO);
    } catch (error) {
      return response.status(400).json({
        message: 'Ha ocurrido un error trayendo la publicación',
        error: error.detail,
      });
    }
  };

  /**
   * Obtiene todas las publicaciones de la base de datos.
   * @param request - La solicitud HTTP que se está procesando.
   * @param response - La respuesta HTTP que se enviará al cliente.
   * @param next - La función que se llamará después de que se complete la operación.
   * @returns Un arreglo de objetos DTO que representan las publicaciones.
   */
  public all = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const publications = await this.publicationRepository.find({
        where: { user: true || false },
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
        order: {
          createdAt: 'DESC',
        },
      });
      const publicationDTOs = asDTOs(publications);
      return response.status(200).json(publicationDTOs);
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        message: 'Ha ocurrido un error obteniendo las Publicaciones',
        error: error.detail,
      });
    }
  };

  public allPublished = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const publications = await this.publicationRepository.find({
        where: { user: true || false, published: true },
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
      return response.status(200).json(publicationDTOs);
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        message: 'Ha ocurrido un error obteniendo las Publicaciones',
        error: error.detail,
      });
    }
  };

  /**
   * Crea y guarda una nueva publicación en la base de datos.
   * @param request - La solicitud HTTP que contiene los datos de la publicación.
   * @param response - La respuesta HTTP que se enviará al cliente.
   * @param next - La función que se llamará después de que se complete la operación.
   * @returns La publicación creada.
   */
  public save = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const imagesUploaderService = new ImagesUploader();
    let imagesUrls: string[];
    if (request.files) {
      imagesUrls = await imagesUploaderService.uploadImages(
        request.files.images
      );
    }
    try {
      const { name, slug, initialContent, finalContent, published, user_id } =
        request.body;
      const locationParse =
        request.body.location && request.body.location.region.id != null
          ? JSON.parse(request.body.location)
          : undefined;
      const location = locationParse
        ? {
            regionId: locationParse.region.id,
            cityId: locationParse.city?.id || null,
          }
        : undefined;
      const category = request.body.category
        ? JSON.parse(request.body.category)
        : undefined;
      const user = user_id ? { id: user_id } : { id: null };

      const publication = this.publicationRepository.create({
        name,
        slug,
        initialContent,
        finalContent,
        category,
        location,
        published: published ? JSON.parse(published) : undefined,
        images: imagesUrls,
        user,
      });

      const result = await this.publicationRepository.save(publication);

      // guardar preguntas asociadas
      const preQuestions = JSON.parse(request.body.questions);
      const questions = preQuestions.map((question: any) => {
        return {
          question: question.question,
          answer: question.answer,
          publication: {
            id: result.id,
          },
        };
      });

      // insertarlos nuevamente
      await AppDataSource.getRepository('Question').save(questions);

      return response.status(201).json(result);
    } catch (error) {
      return response.status(400).json({
        message: 'Ha ocurrido un error creando una nueva Publicación',
        error: error.detail,
      });
    }
  };

  /**
   * Actualiza una publicación existente en la base de datos.
   * @param request - La solicitud HTTP que se está procesando.
   * @param response - La respuesta HTTP que se enviará al cliente.
   * @param next - La función que se llamará después de que se complete la operación.
   * @returns La publicación actualizada.
   */
  public update = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const busquedaSlug = request.params.slug;
      const publication = await this.publicationRepository.findOne({
        where: { slug: busquedaSlug },
        relations: {
          user: true,
          questions: true,
          category: true,
        },
        select: {
          user: {
            id: true,
          },
        },
      });
      if (!publication) {
        return response.status(400).json({
          message: 'La publicación que se intenta actualizar no existe',
        });
      }
      const { name, slug, initialContent, finalContent } = request.body;
      const userId = request.body.user_id
        ? Number(request.body.user_id)
        : undefined;
      const published = request.body.published
        ? JSON.parse(request.body.published)
        : undefined;

      const locationParse = request.body.location
        ? JSON.parse(request.body.location)
        : undefined;

      // TODO: corregir la función, al parecer no toma bien los valores que vienen desde el front
      let location = null;
      if (locationParse && locationParse.region.id !== null) {
        location = {
          regionId: locationParse.region.id,
          cityId: locationParse.city?.id || null,
        };
      }

      const category = request.body.category
        ? JSON.parse(request.body.category)
        : undefined;

      let imagesUrls: string[];
      if (request.files) {
        const imagesUploaderService = new ImagesUploader();
        imagesUrls = await imagesUploaderService.uploadImages(
          request.files.images
        );
      }

      this.publicationRepository.merge(publication, {
        name,
        slug,
        initialContent,
        finalContent,
        category,
        location,
        images: imagesUrls,
        published,
        // user: { id: userId },
      });

      await this.publicationRepository.save(publication);

      // guardar preguntas asociadas
      const preQuestions = JSON.parse(request.body.questions);
      const questions = preQuestions.map((question: any) => {
        return {
          question: question.question,
          answer: question.answer,
          publication: {
            id: publication.id,
          },
        };
      });

      // eliminar anteriores
      await AppDataSource.getRepository('Question').delete({
        publication: {
          id: publication.id,
        },
      });

      // insertarlos nuevamente
      await AppDataSource.getRepository('Question').save(questions);

      return response.status(200).json(publication);
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        message: 'Ha ocurrido un error actualizando la Publicación',
        error: error.detail,
      });
    }
  };

  /**
   * Elimina una publicación de la base de datos.
   * @param request - La solicitud HTTP que se está procesando.
   * @param response - La respuesta HTTP que se enviará al cliente.
   * @param next - La función que se llamará después de que se complete la operación.
   * @returns Un mensaje que indica si la publicación se eliminó correctamente o no.
   */
  public remove = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
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
      if (!publicationToRemove) {
        return response
          .status(404)
          .json({ message: 'La publicación que se intenta borrar no existe' });
      }
      await this.publicationRepository.remove(publicationToRemove);
      return response
        .status(200)
        .json({ message: 'La Publicación se ha borrado correctamente' });
    } catch (error) {
      return response.status(400).json({
        message:
          'Ha ocurrido un error eliminando una pregunta con su respuesta',
        error: error.detail,
      });
    }
  };

  public publishOrUnpublish = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const publicationsIds: number[] = request.body.publicationsIdsToUpdate;
    const isPublished = request.body.isPublished;
    try {
      await this.publicationRepository.update(publicationsIds, {
        published: isPublished,
      });
      return response.status(200).json({
        message: 'Las publicaciones se han actualizado correctamente',
      });
    } catch (error) {
      return response.status(400).json({
        message: 'Ha ocurrido un error actualizando las publicaciones',
        error: error.detail,
      });
    }
  };
  /**
   * Obtiene todas las categorías.
   * @param request - La solicitud HTTP que se está procesando.
   * @param response - La respuesta HTTP que se enviará al cliente.
   * @param next - La función que se llamará después de que se complete la operación.
   * @returns Un arreglo de objetos que representan las categorías.
   */
  public getAllCategories = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      const categories = await categoryRepository.find();
      return response.status(200).json(categories);
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        message: 'Ha ocurrido un error obteniendo las categorías',
        error: error.detail,
      });
    }
  };

  /**
   * Obtiene todas las regiones y sus comunas.
   * @param request - La solicitud HTTP que se está procesando.
   * @param response - La respuesta HTTP que se enviará al cliente.
   * @param next - La función que se llamará después de que se complete la operación.
   * @returns Un arreglo de objetos que representan las regiones y sus comunas.
   */
  public getAllRegions = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const regionRepository = AppDataSource.getRepository(Region);
      const regions = await regionRepository.find({
        relations: { cities: true },
        select: { id: true, name: true },
      });
      return response.status(200).json(regions);
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        message: 'Ha ocurrido un error obteniendo las regiones',
        error: error.detail,
      });
    }
  };
}
