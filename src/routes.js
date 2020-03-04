/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import Leitos from "views/Leitos.jsx";
import Form_create_leito from "views/forms/Form_create_leito.jsx";
import Infos_leito from "views/Infos_leito.jsx";


var routes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/leitos",
    name: "Leitos",
    icon: "tim-icons icon-chart-pie-36",
    component: Leitos,
    layout: "/admin"
  },
  {
    path: "/form_create_leito",
    component: Form_create_leito,
    layout: "/admin"
  },
  {
    path: "/infos_leito",
    component: Infos_leito,
    layout: "/admin"
  },
];
export default routes;
