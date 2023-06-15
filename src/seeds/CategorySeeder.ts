import { DataSource } from "typeorm"
import { Seeder, SeederFactoryManager } from "typeorm-extension"
import { Category } from "../entity/Category"

export class CategorySeeder implements Seeder{
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const categoryRepository = dataSource.getRepository(Category)

        const categoriesData = [
            {name: 'tecnología' },
            {name: 'ciencia' },
            {name: 'entretenimiento'},
            {name: 'espacio'},
        ]

        const categories = categoryRepository.create(categoriesData)
        await categoryRepository.save(categories)
    }
}