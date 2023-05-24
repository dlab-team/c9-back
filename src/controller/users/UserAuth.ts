import { User } from "../../entity/User";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

type JWTData = {
   username: string;
   // role: string;
   iat: number;
   exp: number;
};

const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;
const JWT_SECRET = process.env.JWT_SECRET;

function comparePasswords(userPassword: string, hashedPassword: string): boolean {
   return bcrypt.compare(userPassword, hashedPassword)
      .then(result => {
         return result;
      })
      .catch(err => {
         console.log(err);
      });
}

function generateJWT(user: User): string {
   const currentDate = new Date();
   const expirationDate = new Date(
      currentDate.getTime() + Number(JWT_EXPIRATION_TIME.replace('m', '')) * 60000
   );
   const data: JWTData = {
      username: user.name,
      // role: user.role,
      iat: currentDate.getTime(),
      exp: expirationDate.getTime(),
   };
   return jwt.sign(data, JWT_SECRET);
}

export function decodeJWT(token: string): JWTData| string{
   try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTData;
      return decoded;
   } catch (err) {
      console.log(err);
      return "Error: invalid token";
   }
}

export async function validateLogin(user: User, password: string): Promise<string | undefined> {
   const isEqual = await comparePasswords(password, user.password);
   if (!isEqual) {
      return "Error: passwords do not match";
   }
   const token = generateJWT(user);
   console.log(decodeJWT(token));
   return token;
}
