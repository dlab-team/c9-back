/**
 * Convierte una publicación de la base de datos en un objeto DTO.
 * @param response - La publicación de la base de datos.
 * @returns Un objeto DTO que representa la publicación.
 */
export function asDTO(response: any): { publication: any } {
  const {
    id,
    name,
    slug,
    initialContent,
    finalContent,
    images,
    category,
    createdAt,
    user,
    questions,
  } = response;

  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Los meses en JavaScript comienzan en 0, por lo que debemos sumar 1
  const day = date.getDate();
  const publicationDate = `${year}/${month.toString().padStart(2, '0')}/${day
    .toString()
    .padStart(2, '0')}`;

  const publication = {
    id,
    name,
    slug,
    initialContent,
    finalContent,
    images: images.map((image: string) => ({ url: image })),
    publicationDate,
    category,
    region: 'Metropolitana', // TODO: Add region to publication
    city: 'Santiago', // TODO: Add city to publication
    author: user.name,
    questions: questions.map(
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
 */
export function asDTOs(response: any[]): { publications: any[] } {
  const publications = response.map((response) => asDTO(response).publication);
  return { publications };
}
