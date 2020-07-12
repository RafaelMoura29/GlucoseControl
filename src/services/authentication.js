const checkAuthentication = (history) => {
  const TOKEN = localStorage.getItem("TOKEN");
  const paginaAtual = history.location.pathname;
  const paginaLogin = "/authentication/login";

  if (TOKEN === null && paginaAtual !== paginaLogin) {
    if (
      paginaAtual === "/authentication/recoverPassword" ||
      paginaAtual.includes("/authentication/changePassword")
    )
      return;
    history.push("/");
  } else if (TOKEN !== null && paginaAtual === paginaLogin) {
    history.push("/admin/pacientes");
  }
};

export default checkAuthentication;
