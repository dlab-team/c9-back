import publicationRouter from "./controller/publications/PublicationRoutes";
import questionRouter from "./controller/questions/QuestionRoutes";
import userRouter from "./controller/users/UserRoutes";

export const Routes = [publicationRouter, questionRouter, userRouter]

export default function registerRouter (app: any) {
    Routes.map((router) => {app.use(router)})
}