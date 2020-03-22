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
import Form_glicemia from "views/forms/Form_glicemia.jsx";
import Pacientes from "views/Pacientes.jsx";
import Form_create_paciente from "views/forms/Form_create_paciente.jsx";
import InfoPaciente from "views/InfoPaciente.jsx";
import PainelPaciente from "views/PainelPaciente.jsx";

var routes = [
  
  {
    path: "/PainelPaciente",
    name: "Informações paciente",
    component: PainelPaciente,
    layout: "/admin",
    hideSidebar: true
  },
  {
    path: "/Form_glicemia",
    name: "Coleta da glicemia",
    component: Form_glicemia,
    layout: "/admin",
    hideSidebar: true
  },
  {
    path: "/form_create_paciente",
    name: "Cadastro de paciente",
    component: Form_create_paciente,
    layout: "/admin",
    hideSidebar: true
  },{
    path: "/",
    name: "Pacientes",
    icon: "tim-icons icon-chart-pie-36",
    component: Pacientes,
    layout: "/admin",
  },
  
];
export default routes;
