require("dotenv").config();
import * as passport from "passport";
import { AppDataSource } from "../data-source";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import * as express from "express";
const app = express();
import { User } from "../entity/User";
const userRouter = express.Router();

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_TU_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: (error: any, user?: any) => void
    ) => {
      try {
        const existingUser = await AppDataSource.getRepository(User).findOne({
          where: { email: profile.emails[0].value },
        });
        if (existingUser) {
          return done(null, existingUser);
        } else {
          const user = {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          };
          const savedUser = await AppDataSource.getRepository(User).save(user);
          return done(null, savedUser);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

userRouter.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/protected",
    failureRedirect: "/auth/linkedin/failure",
  })
);

userRouter.get("/protected", (req, res) => {
  res.send("Esta es una página protegida");
});
userRouter.get("/auth/linkedin/failure", (req, res) => {
  res.send("Error en la autenticación de LinkedIn");
});
