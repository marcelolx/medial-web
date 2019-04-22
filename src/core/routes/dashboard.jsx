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
import { TipoUsuarioEnum } from '../../feature/admin/mediacao/utils/tipoUsuarioEnum';

var dashRoutes = [
  {
    path: '/dashboard',
    name: 'Início',
    icon: Home,
    component: HomePage,
    nivel:[
      TipoUsuarioEnum.ADMINISTRADOR,
      TipoUsuarioEnum.ADMINISTRADOR_NPJ,
      TipoUsuarioEnum.ADVOGADO,
      TipoUsuarioEnum.EMPRESA,
      TipoUsuarioEnum.MEDIADOR,
      TipoUsuarioEnum.NEGOCIADOR,
      TipoUsuarioEnum.USUARIO
    ]
  },
  {
    collapse: true,
    path: '/mediacao',
    name: 'Mediação',
    state: 'openComponents',
    icon: Bookmark,
    nivel:[      
      TipoUsuarioEnum.ADMINISTRADOR,
      TipoUsuarioEnum.ADMINISTRADOR_NPJ,
      TipoUsuarioEnum.ADVOGADO,
      TipoUsuarioEnum.EMPRESA,
      TipoUsuarioEnum.MEDIADOR,
      TipoUsuarioEnum.NEGOCIADOR,
      TipoUsuarioEnum.USUARIO
    ],
    views: [
      {
        path: '/mediacao/nova',
        name: 'Nova Mediação',
        mini: 'NM',
        nivel:[
          TipoUsuarioEnum.ADMINISTRADOR,
          TipoUsuarioEnum.ADMINISTRADOR_NPJ,
          TipoUsuarioEnum.ADVOGADO,
          TipoUsuarioEnum.EMPRESA,
          TipoUsuarioEnum.MEDIADOR,
          TipoUsuarioEnum.NEGOCIADOR,
          TipoUsuarioEnum.USUARIO
        ],
        component: NovaMediacao
      },
      {
        path: '/mediacao/todas',
        name: 'Mediações',
        nivel:[
          TipoUsuarioEnum.ADMINISTRADOR,
          TipoUsuarioEnum.ADMINISTRADOR_NPJ,
          //TipoUsuarioEnum.ADVOGADO,
          //TipoUsuarioEnum.EMPRESA,
          TipoUsuarioEnum.MEDIADOR,
          //TipoUsuarioEnum.NEGOCIADOR,
          //TipoUsuarioEnum.USUARIO
        ],
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
    nivel:[
      TipoUsuarioEnum.ADMINISTRADOR,
      TipoUsuarioEnum.ADMINISTRADOR_NPJ,
      TipoUsuarioEnum.MEDIADOR
    ],
    icon: Settings,
    views: [
      {
        path: '/administrador/usuario/todos',
        name: 'Usuários',
        mini: 'Us',
        nivel:[
          TipoUsuarioEnum.ADMINISTRADOR,
          TipoUsuarioEnum.ADMINISTRADOR_NPJ,
          TipoUsuarioEnum.MEDIADOR
        ],
        component: ListUsers
      },
      {
        path: '/administrador/configuracao',
        name: 'Configuração',
        mini: 'C',
        nivel:[
          TipoUsuarioEnum.ADMINISTRADOR,
          TipoUsuarioEnum.ADMINISTRADOR_NPJ,
          TipoUsuarioEnum.MEDIADOR
        ],
        component: Configurations
      }
    ]
  },
  { 
    path: '/profile',
    name: 'Meu perfil',
    icon: People,
    nivel:[
      TipoUsuarioEnum.ADMINISTRADOR,
      TipoUsuarioEnum.ADMINISTRADOR_NPJ,
      TipoUsuarioEnum.ADVOGADO,
      TipoUsuarioEnum.EMPRESA,
      TipoUsuarioEnum.MEDIADOR,
      TipoUsuarioEnum.NEGOCIADOR,
      TipoUsuarioEnum.USUARIO],
    component: Profile
  },
  { 
    path: '/mediacao/cadastropendente',
    name: 'Cadastros Pendentes',
    icon: People,
    nivel:[
      TipoUsuarioEnum.ADMINISTRADOR,
      TipoUsuarioEnum.ADMINISTRADOR_NPJ
    ],
    naoExibe: true,
    component: CadastroPendente
  },
  {
    path: '/mediacao/protocolo',
    name: 'Mediação',
    icon: People,
    nivel: [
      TipoUsuarioEnum.ADMINISTRADOR,
      TipoUsuarioEnum.ADMINISTRADOR_NPJ,
      TipoUsuarioEnum.ADVOGADO,
      TipoUsuarioEnum.EMPRESA,
      TipoUsuarioEnum.MEDIADOR,
      TipoUsuarioEnum.NEGOCIADOR,
      TipoUsuarioEnum.USUARIO
    ],
    naoExibe: true,
    component: Mediacao
  },
  { 
    path: '/negociadores',
    name: 'Negociadores',
    icon: People,
    nivel:[
      TipoUsuarioEnum.ADMINISTRADOR,
      TipoUsuarioEnum.ADMINISTRADOR_NPJ,
      TipoUsuarioEnum.ADVOGADO,
      TipoUsuarioEnum.EMPRESA,
    ],
    naoExibe: true,
    component: Negociador
  },
  { 
    redirect: true, 
    path: '/',   
    nivel:[
      TipoUsuarioEnum.ADMINISTRADOR,
      TipoUsuarioEnum.ADMINISTRADOR_NPJ,
      TipoUsuarioEnum.ADVOGADO,
      TipoUsuarioEnum.EMPRESA,
      TipoUsuarioEnum.MEDIADOR,
      TipoUsuarioEnum.NEGOCIADOR,
      TipoUsuarioEnum.USUARIO
    ], 
    pathTo: '/dashboard', 
    name: 'Dashboard' 
  },
];
export default dashRoutes;