
import Login from "./../scenes/Login";
import User from "./../scenes/Register/User";

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Launch from "@material-ui/icons/Launch";

const pagesRoutes = [
  {
    path: "/login",
    name: "Login",
    short: "Login",
    mini: "Login",
    icon: Launch,
    component: Login
  },
  {
    path: "/register",
    name: "Cadastre-se",
    short: "Cadastre",
    mini: "CA",
    icon: PersonAdd,
    component: User
  },//{ redirect: true, path: "/pages", pathTo: "/login", name: "Dashboard" }
];

export default pagesRoutes;



// WEBPACK FOOTER //
// ./src/routes/pages.jsx