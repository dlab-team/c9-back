import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "../entity/User";
require('dotenv').config()
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

const passHashUserUno = bcrypt.hashSync(String(process.env.PASSWORD_SEED_UNO), salt)
const passHashUserDos = bcrypt.hashSync(String(process.env.PASSWORD_SEED_DOS), salt)
const passHashUserTres = bcrypt.hashSync(String(process.env.PASSWORD_SEED_TRES), salt)
const passHashUserCuatro = bcrypt.hashSync(String(process.env.PASSWORD_SEED_CUATRO), salt)
const passHashUserCinco = bcrypt.hashSync(String(process.env.PASSWORD_SEED_CINCO), salt)

export class UserSeeder implements Seeder{
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const userRepository = dataSource.getRepository(User)

        const userData = [{
            email : 'email1@mail.com',
            name : 'Periodista1',
            password : passHashUserUno
        }, {
            email : 'email2@mail.com',
            name : 'Periodista2',
            password : passHashUserDos
        }, {
            email : 'email3@mail.com',
            name : 'Periodista3',
            password : passHashUserTres
        }, {
            email : 'email4@mail.com',
            name : 'Periodista4',
            password : passHashUserCuatro
        }, {
            email : 'email5@mail.com',
            name : 'Periodista5',
            password : passHashUserCinco
        }]

        const newUser = userRepository.create(userData)
        await userRepository.save(newUser)
    }
}