import { AppDataSource } from "../../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../../entity/User";
import { validateLogin } from './UserAuth';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      return "unregistered user";
    }
    return user;
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

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const userToRemove = await this.userRepository.findOneBy({ id });
    if (!userToRemove) {
      return "this user not exist";
    }
    await this.userRepository.remove(userToRemove);
    return "user has been removed";
  }
}
