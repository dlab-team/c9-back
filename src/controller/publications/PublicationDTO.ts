export function asDTO(response: any): { publication: any; } {
   const publication: { [key: string]: any; } = {
      id: response.id,
      name: response.name,
      slug: response.slug,
      initialContent: response.initialContent,
      finalContent: response.finalContent,
      images: response.images.map((image: string) => ({ url: image })),
      publicationDate: "2023/04/18", // TODO: Add publication date to publication
      category: response.category,
      region: "Metropolitana", // TODO: Add region to publication
      city: "Santiago", // TODO: Add city to publication
      author: response.user.name,
      questions: response.questions.map((question: { question: string, answer: string; }) => ({
         question: question.question,
         answer: question.answer
      }))
   };
   return { publication };
}

export function asDTOs(response: any[]): { publications: any[]; } {
   const publications = response.map((response) => asDTO(response).publication);
   return { publications };
}
