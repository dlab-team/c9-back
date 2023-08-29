import publicationRouter from "./controller/publications/PublicationRoutes";
import questionRouter from "./controller/questions/QuestionRoutes";
import userRouter from "./controller/users/UserRoutes";
import cityRouter from './controller/cities/CityRoutes';
import regionRouter from "./controller/regions/RegionRoutes";
import authorRouter from "./controller/authors/AuthorRoutes";
import chatRouter from "./controller/chats/ChatRoutes";

export const Routes = [publicationRouter, questionRouter, userRouter, cityRouter, regionRouter, authorRouter , chatRouter]

export default function registerRouter (app: any) {
    Routes.map((router) => {app.use(router)})
}