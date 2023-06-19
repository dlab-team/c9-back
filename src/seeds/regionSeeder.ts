import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Region } from "../entity/Region";

export class RegionSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const regionRepository = dataSource.getRepository(Region);

    const regionsData = [
      { id: 1, name: "Región del Biobío" },
      { id: 2, name: "Región de Valparaiso" },
      { id: 3, name: "Región metropolitana" },
    ];

    const regions = regionRepository.create(regionsData);
    await regionRepository.save(regions);
  }
}
