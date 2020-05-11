import Form_glicemia from "views/forms/Form_glicemia.jsx";
import Pacientes from "views/pacientes/Pacientes.jsx";
import Form_create_paciente from "views/forms/Form_create_paciente.jsx";
import PainelPaciente from "views/PainelPaciente.jsx";
import Ajuda from "views/Ajuda.jsx";
import Contato from "views/Contato.jsx";
import Sobre from "views/Sobre.jsx";

var routes = [
  {
    path: "/pacientes",
    name: "Pacientes",
    icon: "tim-icons icon-single-02",
    component: Pacientes,
    layout: "/admin",
  },
  {
    path: "/PainelPaciente/:_idPaciente",
    name: "Informações paciente",
    component: PainelPaciente,
    layout: "/admin",
    hideSidebar: true
  },
  {
    path: "/Form_glicemia/:_idPaciente",
    name: "Coleta da glicemia",
    component: Form_glicemia,
    layout: "/admin",
    hideSidebar: true
  },
  {
    path: "/form_create_paciente/:_idPaciente",
    name: "Cadastro paciente",
    component: Form_create_paciente,
    layout: "/admin",
    hideSidebar: true
  },
  {
    path: "/sobre",
    name: "Sobre",
    icon: "tim-icons icon-bulb-63",
    component: Sobre,
    layout: "/admin",
  },
  {
    path: "/contato",
    name: "Contato",
    icon: "tim-icons icon-chat-33",
    component: Contato,
    layout: "/admin",
  },
  {
    path: "/ajuda",
    name: "Ajuda",
    icon: "tim-icons icon-alert-circle-exc",
    component: Ajuda,
    layout: "/admin",
  },
  
];
export default routes;
