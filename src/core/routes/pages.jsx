
import Login from '../../feature/login/Login';
import User from '../../feature/register/user/RegisterUser';

// @material-ui/icons
import PersonAdd from '@material-ui/icons/PersonAdd';
import Launch from '@material-ui/icons/Launch';

const pagesRoutes = [

   {
    path: '/login',
    name: 'Login',
    short: 'Login',
    mini: 'Login',
    icon: Launch,
    component: Login
  },
  {
    path: '/register',
    name: 'Cadastre-se',
    short: 'Cadastre-se',
    mini: 'CA',
    icon: PersonAdd,
    component: User
  },// { redirect: true, path: '/dashboard', pathTo: '/login', name: 'Login', component: Login }
];

export default pagesRoutes;
