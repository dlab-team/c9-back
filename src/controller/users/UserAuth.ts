const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

type JWTData = {
   username: string;
   iat: number;
   exp: number;
};

const JWT_EXPIRATION_TIME = '30m';
const JWT_SECRET = process.env.JWT_SECRET;

function comparePasswords(userPassword: string, hashedPassword: string): boolean {
   return bcrypt.compare(userPassword, hashedPassword)
      .then(result => {
         console.log("Result: ", result);
         return result;
      })
      .catch(err => {
         console.log(err);
      });
}

function generateJWT(username: string): string {
   const currentDate = new Date();
   const expirationDate = new Date(
      currentDate.getTime() + Number(JWT_EXPIRATION_TIME.replace('m', '')) * 60000
   );
   const data: JWTData = {
      username,
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
      return "error: not a valid token";
   }
}

export async function validateLogin(username: string, password: string, hashedPassword: string): Promise<string | undefined> {
   const isEqual = await comparePasswords(password, hashedPassword);
   if (!isEqual) {
      return "passwords do not match";
   }
   const token = generateJWT(username);
   return token;
}
