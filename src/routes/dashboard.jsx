// @material-ui/icons
import People from "@material-ui/icons/People";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Apps from "@material-ui/icons/Apps";
import Home from "./../scenes/Home"
import Mediacao from "./../scenes/Register/Mediacao"
import ListUsers from "./../scenes/ListUsers"
import Profile from "./../scenes/Profile"


var dashRoutes = [
  {
    path: "/dashboard",
    name: "Início",
    icon: DashboardIcon,
    component: Home
  },
  {
    collapse: true,
    path: "/mediacao",
    name: "Components",
    state: "openComponents",
    icon: Apps,
    views: [
      {
        path: "/mediacao/nova",
        name: "Nova Mediação",
        mini: "NM",
        component: Mediacao
      },
      {
        path: "/mediacao/todas",
        name: "Mediações",
        mini: "M",
        component: Mediacao
      }
    ]
  },
  {
    collapse: true,
    path: "/administrador",
    name: "Administrador",
    state: "openAdministrador",
    icon: Apps,
    views: [
      {
        path: "/administrador/usuario/todos",
        name: "Usuários",
        mini: "Us",
        component: ListUsers
      },
      {
        path: "/administrador/configuracao",
        name: "Configuração",
        mini: "C",
        component: ListUsers
      }
    ]
  },
  { 
    path: "/profile",
    name: "Meu perfil",
    icon: People,
    component: Profile
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;



// WEBPACK FOOTER //
// ./src/routes/dashboard.jsx