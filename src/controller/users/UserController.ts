import { AppDataSource } from '../../data-source';
require('dotenv').config();
import { NextFunction, Request, Response } from 'express';
import { User } from '../../entity/User';
import { validateLogin } from './UserAuth';
import sendEmail from '../../config/email';
import { sign, verify } from 'jsonwebtoken';
import { UserConfirmationJWT } from '../../types/JWTData';
const secretKey = process.env.JWT_SECRET;
const crypto = require('crypto');

export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  public all = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const users = await this.userRepository.find({
        where: { isAdmin: false },
        relations: {
          publications: true,
        },
        select: {
          name: true,
          email: true,
          enabled: true,
          publications: {
            name: true,
            published: true,
          },
        },
      });
      return response.status(200).json(users);
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        message: 'Ha ocurrido un error obteniendo los Usuarios',
        error,
      });
    }
  };

  createHash(data) {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  }

  public one = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = parseInt(request.params.id);
      const user = await this.userRepository.findOne({
        where: { id },
        select: {
          email: true,
          name: true,
          enabled: true,
        },
      });
      if (!user) {
        return response
          .status(404)
          .json({ message: 'El usuario que se intenta buscar no existe' });
      }
      if (user.isAdmin === true) {
        return response
          .status(401)
          .json({ message: 'No esta autorizado a ver este usuario' });
      }
      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({
        message: 'Ha ocurrido un error obteniendo al Usuario',
        error: error.detail,
      });
    }
  };

  public checkAuth = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const email = request.body.email;
    const password = request.body.password;
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      return response
        .status(401)
        .json({ message: 'Error, no esta autorizado' });
    }
    const result = await validateLogin(user, password);
    return response.status(200).json(result);
  };

  public save = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { name, email } = request.body;
    const user = Object.assign(new User(), {
      name,
      email,
      password: this.createHash(email),
    });
    if (!user) {
      return 'you have to add firstName, email lastName and age to create an User';
    }
    try {
      const savedUser = await this.userRepository.save(user);
      // genero token
      const token = sign({ userId: savedUser.id }, secretKey);
      // URL de confirmación con el token como parámetro
      const confirmationUrl = `${process.env.FRONT_URL}/confirm?token=${token}`;

      // guardo token en la base de datos
      savedUser.token = token;
      await this.userRepository.save(savedUser);
      const to = savedUser.email;
      const subject = 'Confirmación de registro';
      const content = `Hola ${savedUser.name}, ¡gracias por registrarte! Por favor, confirma tu cuenta haciendo click en el siguiente enlace: <a href="${confirmationUrl}">${confirmationUrl}</a>`; //envio email con el token de confirmacion
      await sendEmail(to, subject, content);
      const message = `Usuario ${savedUser.email} registrado exitosamente`;
      return response.status(200).json({ user: savedUser, token, message });
    } catch (error) {
      return response.status(400).json({
        message: 'Ha ocurrido un error creando el Usuario',
        error: error.detail,
      });
    }
  };
  public confirm = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { password, token } = request.body;
    try {
      //verifico token
      const decode = verify(token, secretKey) as UserConfirmationJWT;
      //obtengo el usuario basado en el ID del token
      const user = await this.userRepository.findOneBy({ id: decode.userId });
      //si no existe el usuario
      if (!user) {
        return response.status(404).json({ message: 'usuario no encontrado' });
      }
      // Actualizar el usuario con el password, cambiar el estado y eliminar el token
      user.password = password;
      user.enabled = true;
      user.token = null;
      await this.userRepository.save(user);

      return response
        .status(200)
        .json({ message: 'Usuario confirmado exitosamente' });
    } catch (error) {
      return response.status(400).json({
        message: 'Ha ocurrido un error al confirmar el usuario',
        error: error.message,
      });
    }
  };

  public update = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = parseInt(request.params.id);
      const user = await this.userRepository.findOne({
        where: { id },
        select: {
          id: true,
          name: true,
          enabled: true,
        },
      });
      if (!user) {
        return response
          .status(404)
          .json({ message: 'El Usuario que se intenta actualizar no existe' });
      }
      const { name, enabled } = request.body;
      user.name = name;
      user.enabled = enabled;
      await this.userRepository.save(user);
      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({
        message: 'Ha ocurrido un error actualizando el Usuario',
        error: error.detail,
      });
    }
  };
}
