import { publicationRoutes } from './controller/publications/PublicationRoutes';
import { questionRoutes } from './controller/questions/QuestionRoutes';
import { userRoutes } from './controller/users/UserRoutes';


export const Routes = [...userRoutes,...publicationRoutes,...questionRoutes];
