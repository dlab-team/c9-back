import { AppDataSource } from '../../data-source';
import { Request, Response } from 'express';
import { Region } from '../../entity/Region';

// TODO: Add Swagger documentation
export class RegionController {
  private regionRepository = AppDataSource.getRepository(Region);

  public all = async (request: Request, response: Response) => {
    try {
      const regions = await this.regionRepository.find({
        order: { id: 'ASC' },
      });

      if (!regions) {
        return response.status(404).json({ message: 'No hay regiones.' });
      }
      return response.status(200).json(regions);
    } catch (error) {
      return response.status(500).json({
        message: 'Ha ocurrido un error obteniendo todas las Regiones: ',
        error: error.detail,
      });
    }
  };

  public one = async (request: Request, response: Response) => {
    try {
      const id = parseInt(request.params.id, 10);
      const region = await this.regionRepository.findOne({ where: { id } });
      if (region) {
        return response.status(200).json(region);
      }
      return response.status(200).json('No se ha encontrado la Región');
    } catch (error) {
      return response.status(500).json({
        message: 'Ocurrió un error obteniendo una Región: ',
        error: error.message,
      });
    }
  };

  public save = async (request: Request, response: Response) => {
    try {
      const region = new Region();
      region.name = request.body.name;
      await this.regionRepository.save(region);
      return response.status(201).json(region);
    } catch (error) {
      return response.status(500).json({
        message: 'Ocurrió un error guardando una Región: ',
        error: error.message,
      });
    }
  };

  public remove = async (request: Request, response: Response) => {
    try {
      const id = parseInt(request.params.id, 10);
      const region = await this.regionRepository.findOne({
        where: { id },
        relations: ['cities'],
      });

      if (!region) {
        return response
          .status(404)
          .json({ message: 'No se ha encontrado la Región a eliminar' });
      }

      // si hay comunas asociadas indicar en mensaje de error que no puede ser eliminada la region
      if (region.cities.length > 0) {
        return response.status(404).json({
          message:
            'No se puede eliminar la Región porque tiene comunas asociadas',
        });
      }

      await this.regionRepository.remove(region);
      return response
        .status(200)
        .json({ message: 'La Región ha sido eliminada: ', region });
    } catch (error) {
      console.log('error: ', error);
      return response.status(500).json({
        message: 'Ocurrió un error eliminando una Región: ',
        error: error.message,
      });
    }
  };

  public update = async (request: Request, response: Response) => {
    console.log('request.body: ', request.body);
    try {
      const id = parseInt(request.params.id, 10);
      const region = await this.regionRepository.findOne({ where: { id } });
      if (!region) {
        return response
          .status(404)
          .json({ message: 'No se ha encontrado la Región a actualizar' });
      }
      region.name = request.body.name;
      await this.regionRepository.save(region);
      return response.status(200).json(region);
    } catch (error) {
      return response.status(500).json({
        message: 'Ocurrió un error actualizando una Región: ',
        error: error.message,
      });
    }
  };
}
