import Dashboard from "./../layouts/Dashboard.jsx";
import CadastroPendente from "../scenes/admin/mediacao/CadastroPendente.jsx";

var indexRoutes = [
  { path: "/", component: Dashboard },
  { path: '/mediacao/cadastropendente/:id', component: CadastroPendente }
];

export default indexRoutes;



// WEBPACK FOOTER //
// ./src/routes/index.jsx