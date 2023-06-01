import { AppDataSource } from "../../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../../entity/User";
import { validateLogin } from './UserAuth';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  public all = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const users = await this.userRepository.find({
        where: {isAdmin: false},
        relations: {
          publications: true
        },
        select: {
          name: true,
          email: true,
          enabled: true,
          publications: {
            name: true,
            published: true
          }
        }
      });
      return response.status(200).json(users);
    } catch (error) {
      console.log(error)
      return response.status(400).json({ message: 'Ha ocurrido un error obteniendo los Usuarios', error});
    }
  }

  public one = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = parseInt(request.params.id);
      const user = await this.userRepository.findOne({
        where: { id },
        select: {
          email: true,
          name: true,
          enabled: true
        }
      });
      if (!user) {
        return response.status(404).json({ message: 'El usuario que se intenta buscar no existe'})
      } if (user.isAdmin === true) {
        return response.status(401).json({ message: 'No esta autorizado a ver este usuario'})
      }
      return response.status(200).json(user)
    } catch (error) {
      return response.status(400).json({ message: 'Ha ocurrido un error obteniendo al Usuario', error: error.detail})
    }
  };

  public checkAuth = async (request: Request, response: Response, next: NextFunction) => {
    const email = request.body.email;
    const password = request.body.password;
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      return response.status(401).json({ message: 'Error, no esta autorizado'});
    }
    const result = await validateLogin(user, password);
    return response.status(200).json(result);
  }

  public save = async (request: Request, response: Response, next: NextFunction) => {
    const { firstName, lastName, age } = request.body;
    const user = Object.assign(new User(), {
      firstName,
      lastName,
      age,
    });
    if (!user) {
      return "you have to add firstName, lastName and age to create an User";
    }
    return this.userRepository.save(user);
  }

  public update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = parseInt(request.params.id);
      const user = await this.userRepository.findOne({
        where: { id },
        select: {
          id: true,
          name: true,
          enabled: true,
        }
      });
      if (!user) {
        return response.status(404).json({ message: 'El Usuario que se intenta actualizar no existe'})
      }
      const { name, enabled, } = request.body;
      user.name = name;
      user.enabled = enabled;
      await this.userRepository.save(user);
      return response.status(200).json(user)
    } catch (error) {
      return response.status(400).json({ message: 'Ha ocurrido un error actualizando el Usuario', error: error.detail })
    }
  }
}