import React from "react";
import '../style.css'
import { CardFooter, Button } from "reactstrap";

const FormFooter = ({
  salvarAplicacao, toggleCancelar
}) => (
    <CardFooter>
      <Button
        className="btn-fill"
        color="info"
        type="submit"
        onClick={salvarAplicacao}
      >
        SALVAR
      </Button>

      <Button
        className="btn-fill"
        color="danger"
        onClick={toggleCancelar}
      >
        CANCELAR
      </Button>
    </CardFooter>
  )

export default FormFooter;
