import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { CollegeRoutes } from '../modules/College/college.route';
import { AdmissionRoutes } from '../modules/Admission/admission.route';
import { MyCollegeRoutes } from '../modules/MyCollege/myCollege.route';

const router = Router();

const moduleRoute = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/colleges',
    route: CollegeRoutes,
  },
  {
    path: '/admissions',
    route: AdmissionRoutes,
  },
  {
    path: '/my-colleges',
    route: MyCollegeRoutes,
  },
];

// route loop
moduleRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
