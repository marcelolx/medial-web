// @material-ui/icons
import People from "@material-ui/icons/People";
import Home from "@material-ui/icons/Home";
import Settings from "@material-ui/icons/Settings";
import Bookmark from "@material-ui/icons/Bookmark";
import HomePage from "../scenes/Home/HomePage"
import Mediacao from "./../scenes/Register/Mediacao"
import ListUsers from "./../scenes/ListUsers"
import Profile from "./../scenes/Profile"


var dashRoutes = [
  {
    path: "/dashboard",
    name: "Início",
    icon: Home,
    component: HomePage,
    nivel:[1,4,99]
  },
  {
    collapse: true,
    path: "/mediacao",
    name: "Mediação",
    state: "openComponents",
    icon: Bookmark,
    nivel:[1,4,99],
    views: [
      {
        path: "/mediacao/nova",
        name: "Nova Mediação",
        mini: "NM",
        nivel:[1,4,99],
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
    nivel:[1,4,99],
    icon: Settings,
    views: [
      {
        path: "/administrador/usuario/todos",
        name: "Usuários",
        mini: "Us",
        nivel:[1,4,99],
        component: ListUsers
      },
      {
        path: "/administrador/configuracao",
        name: "Configuração",
        mini: "C",
        nivel:[1,4,99],
        component: ListUsers
      }
    ]
  },
  { 
    path: "/profile",
    name: "Meu perfil",
    icon: People,
    nivel:[1,4,99],
    component: Profile
  },
  { redirect: true, path: "/",   nivel:[1,4,99], pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;



// WEBPACK FOOTER //
// ./src/routes/dashboard.jsx