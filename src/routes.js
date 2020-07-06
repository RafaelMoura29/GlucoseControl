import Form_glicemia from "views/formColeta";
import Pacientes from "views/pacientes";
import Form_create_paciente from "views/formPaciente";
import PainelPaciente from "views/painelPaciente";
import Ajuda from "views/ajuda";
import Contato from "views/contato";
import Sobre from "views/sobre";
import FormAplicacao from "views/formAplicacao";
import Authentication from 'views/authentication'
import FormUsuario from 'views/formUsuario'

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
    path: "/FormAplicacao/:_idPaciente",
    name: "FormAplicacao",
    icon: "tim-icons icon-alert-circle-exc",
    component: FormAplicacao,
    layout: "/admin",
    hideSidebar: true
  },
  {
    path: "/authentication",
    name: "authentication",
    icon: "tim-icons icon-alert-circle-exc",
    component: Authentication,
    layout: "none",
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
  {
    path: '/formUsuario',
    name: 'formUsuario',
    icon: 'tim-icons icon-alert-circle-exc',
    component: FormUsuario,
    layout: '/admin'
  }
  
];
export default routes;
