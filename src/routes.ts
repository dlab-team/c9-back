import { publicationRoutes } from './controller/publications/PublicationRoutes';
import { userRoutes } from './controller/users/UserRoutes';


export const Routes = [...userRoutes,...publicationRoutes];
