import swagger from '../../docs/swagger';
import { City } from '../../entity/City';
import { Region } from '../../entity/Region';

export interface LocationFullInfo {
  region: Region;
  city: City;
}

/**
 * Convierte una publicación de la base de datos en un objeto DTO.
 * @param response - La publicación de la base de datos.
 * @returns Un objeto DTO que representa la publicación.
 
@swagger
 * x-code-samples:
 *    - lang: typescript
 *      source: |
 *          const response =[]; // La respuesta de la base de datos
 *          const dto = asDTO(response);
 */
export function asDTO(response: any): { publication: any } {
  const {
    id,
    name,
    slug,
    initialContent,
    finalContent,
    images,
    published,
    category,
    createdAt,
    fecha_publicacion,
    featured,
    visits,
    user,
    questions,
    locationFullInfo,
    author,
    keywords,
  } = response;
  const date = new Date(
    response.fecha_publicacion ? response.fecha_publicacion : response.createdAt
  );
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Los meses en JavaScript comienzan en 0, por lo que debemos sumar 1
  const day = date.getDate();
  const publicationDate = `${year}/${month.toString().padStart(2, '0')}/${day
    .toString()
    .padStart(2, '0')}`;

  const location = response.locationFullInfo
    ? {
        region: {
          id: response.locationFullInfo.region.id,
          name: response.locationFullInfo.region.name,
        },
        city: response.locationFullInfo.city
          ? response.locationFullInfo.city
          : null,
      }
    : response.location;

  const publication = {
    id,
    name,
    slug,
    initialContent,
    finalContent,
    images: images ? images.map((image: string) => ({ url: image })) : null,
    published,
    publicationDate,
    featured,
    visits,
    category,
    location,
    keywords: keywords|| [],
    author: response.author
      ? { name: response.author.name, username: response.author.name }
      : { name: 'Sin Autor', username: 'Sin Autor' },
    questions: response.questions.map(
      (question: { question: string; answer: string }) => ({
        question: question.question,
        answer: question.answer,
      })
    ),
  };
  return { publication };
}

/**
 * Convierte un arreglo de publicaciones de la base de datos en un arreglo de objetos DTO.
 * @param response - El arreglo de publicaciones de la base de datos.
 * @returns Un objeto DTO que representa el arreglo de publicaciones.
   @swagger
 * x-code-samples:
 *    - lang: typescript
 *      source: |
 *          const response  // El arreglo de respuestas de la base de datos
 *          const dtos = asDTOs(response);
 */
export function asDTOs(response: any[]): { publications: any[] } {
  const publications = response.map((response) => asDTO(response).publication);
  return { publications };
}
