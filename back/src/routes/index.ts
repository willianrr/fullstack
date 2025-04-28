import { Router } from "express";

import users from "./users.route";

const appRouter = Router();

const appRoutes = [
 
  {
    path: "/users",
    router: users,
  },
];

appRoutes.forEach(route => {
  appRouter.use(route.path, route.router);
});

export default appRouter;