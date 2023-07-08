import publicationRouter from "./controller/publications/PublicationRoutes";
import questionRouter from "./controller/questions/QuestionRoutes";
import userRouter from "./controller/users/UserRoutes";
import cityRouter from './controller/cities/CityRoutes';

export const Routes = [publicationRouter, questionRouter, userRouter, cityRouter ]

export default function registerRouter (app: any) {
    Routes.map((router) => {app.use(router)})
}