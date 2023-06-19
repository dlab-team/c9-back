export type JWTData = {
   username: string;
   email: string;
   isAdmin: boolean;
   iat: number;
   exp: number;
};

export interface UserConfirmationJWT {
   userId: number;
}