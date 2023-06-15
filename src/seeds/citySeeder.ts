import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { City } from "../entity/City";

export class CitySeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const cityRepository = dataSource.getRepository(City);

    const citiesData = [
      { name: "Santiago de Chile", region: { id: 3 } },
      { name: "Valparaiso", region: { id: 2 } },
      { name: "concepción", region: { id: 1 } },
    ];

    const cities = cityRepository.create(citiesData);
    await cityRepository.save(cities);
  }
}
