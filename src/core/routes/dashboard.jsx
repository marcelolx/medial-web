// @material-ui/icons
import People from '@material-ui/icons/People';
import Home from '@material-ui/icons/Home';
import Settings from '@material-ui/icons/Settings';
import Bookmark from '@material-ui/icons/Bookmark';
import HomePage from '../../feature/home/HomePage';
import NovaMediacao from '../../feature/register/mediacao/NovaMediacao';
import Mediacao from '../../feature/admin/mediacao/Mediacao';
import ListUsers from '../../feature/admin/listusers/ListUsers';
import Profile from '../../feature/profile/Profile';
import Configurations from '../../feature/admin/configuration/Configurations';
import CadastroPendente from '../../feature/admin/cadastropendente/CadastroPendente';
import Negociador from '../../feature/dashboard/negociador/Negociador';

var dashRoutes = [
  {
    path: '/dashboard',
    name: 'Início',
    icon: Home,
    component: HomePage,
    nivel:[1,2,3,4,99]
  },
  {
    collapse: true,
    path: '/mediacao',
    name: 'Mediação',
    state: 'openComponents',
    icon: Bookmark,
    nivel:[1,2,3,4,99],
    views: [
      {
        path: '/mediacao/nova',
        name: 'Nova Mediação',
        mini: 'NM',
        nivel:[1,2,3,4,99],
        component: NovaMediacao
      },
      {
        path: '/mediacao/todas',
        name: 'Mediações',
        nivel:[1,2,3,4,99],
        mini: 'M',
        component: NovaMediacao
      }
    ]
  },
  {
    collapse: true,
    path: '/administrador',
    name: 'Administrador',
    state: 'openAdministrador',
    nivel:[1,2,3],
    icon: Settings,
    views: [
      {
        path: '/administrador/usuario/todos',
        name: 'Usuários',
        mini: 'Us',
        nivel:[1,2],
        component: ListUsers
      },
      {
        path: '/administrador/configuracao',
        name: 'Configuração',
        mini: 'C',
        nivel:[1,2],
        component: Configurations
      }
    ]
  },
  { 
    path: '/profile',
    name: 'Meu perfil',
    icon: People,
    nivel:[1,2,3,4,99],
    component: Profile
  },
  { 
    path: '/mediacao/cadastropendente',
    name: 'Cadastros Pendentes',
    icon: People,
    nivel:[1,2],
    naoExibe: true,
    component: CadastroPendente
  },
  {
    path: '/mediacao/protocolo',
    name: 'Mediação',
    icon: People,
    nivel: [1,2,3,4,5,6,99],
    naoExibe: true,
    component: Mediacao
  },
  { 
    path: '/negociadores',
    name: 'Negociadores',
    icon: People,
    nivel:[1,2],
    naoExibe: true,
    component: Negociador
  },
  { redirect: true, path: '/',   nivel:[1,2,3,4,99], pathTo: '/dashboard', name: 'Dashboard' },
  { redirect: true, path: '/',   nivel:[1,2,3,4,99], pathTo: '/dashboard', name: 'Dashboard' },
];
export default dashRoutes;



// WEBPACK FOOTER //
// ./src/routes/dashboard.jsx