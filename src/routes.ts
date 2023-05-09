import { publicationRoutes } from './controller/publications/PublicationsRoute'
import { userRoutes } from "./controller/users/UsersRoute"

export const Routes = [...userRoutes, ...publicationRoutes]