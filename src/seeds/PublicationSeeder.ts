import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Publication } from "../entity/Publication";


export class PublicationSeeder implements Seeder{
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const publicationRepository = dataSource.getRepository(Publication)

        const publicationData = [{
            name: 'Titular de noticia de Innova',
            slug: 'titular-de-noticia-de-innova',
            initialContent: 'Contenido inicial para la noticia de innova en el Diario El Mercurio',
            finalContent: 'Contenido final para la noticia de innova en el Diario El Mercurio pensada para niños'
        },{
            name: 'Titular de noticia de Innova2',
            slug: 'titular-de-noticia-de-innova2',
            initialContent: 'Contenido inicial para la noticia de innova en el Diario El Mercurio2',
            finalContent: 'Contenido final para la noticia de innova en el Diario El Mercurio pensada para niños2'
        }]

        const newPublication = publicationRepository.create(publicationData)
        await publicationRepository.save(newPublication)
    }
}