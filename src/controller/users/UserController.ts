import { AppDataSource } from "../../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../../entity/User";
import { validateLogin } from './UserAuth';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  async all(request: Request, response: Response, next: NextFunction) {
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
      return {
        statusCode: 200,
        data: users,
      }
    } catch (error) {
      return {
        statusCode: 400,
        data: {
          message: 'Ha ocurrido un error obteniendo los Usuarios',
          error: error.detail,
        },
      };
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) {
        return {
          statusCode: 404,
          data: { message: 'El usuario que se intenta buscar no existe' },
        }
      } if (user.isAdmin === true) {
        return {
          statusCode: 401,
          data: { message: 'No esta autorizado a ver este usuario' }
        }
      }
      return {
        statusCode: 200,
        data: user,
      }
    } catch (error) {
      return {
        statusCode: 400,
        data: {
          message: 'Ha ocurrido un error obteniendo al Usuario',
          error: error.detail,
        },
      };
    }


  }

  async checkAuth(request: Request, response: Response, next: NextFunction) {
    const email = request.body.email;
    const password = request.body.password;
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      return "Error: unregistered user";
    }
    const result = await validateLogin(user, password);
    return result;
  }

  async save(request: Request, response: Response, next: NextFunction) {
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

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) {
        return {
          statusCode: 400,
          data: {
            message: 'El Usuario que se intenta actualizar no existe',
          },
        };
      }
      const {
        name,
        enabled,
      } = request.body;
      user.name = name;
      user.enabled = enabled;
      await this.userRepository.save(user);
      return {
        statusCode: 200,
        data: user,
      };
    } catch (error) {
      return {
        statusCode: 400,
        data: {
          message: 'Ha ocurrido un error actualizando el Usuario',
          error: error.detail,
        },
      };
    }
  }
}
