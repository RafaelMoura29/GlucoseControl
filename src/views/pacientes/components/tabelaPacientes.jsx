import React from 'react'
import '../style.css'
import { Table } from 'reactstrap'

const TabelaPacientes = ({ pacientes, history, isLoading }) => (
  <Table>
    <thead>
      <tr>
        <th>Prontuário</th>
        <th>Nome</th>
        <th>Internação</th>
        <th>Próx. Coleta</th>
        <th>Tratamento</th>
      </tr>
    </thead>
    <tbody id="tableBody">
      {isLoading ? (
        <>
          <tr>
            <td colSpan={3} style={{ textAlign: 'center' }}>
              <i className="fa fa-spinner fa-spin" /> Carregando
            </td>
          </tr>
        </>
      ) : (
          <>
            {pacientes.map(paciente => (
              <tr
                key={paciente._id}
                className="trListPaciente"
                onClick={() =>
                  history.push('/admin/PainelPaciente/' + paciente._id)
                }
              >
                <td>{paciente.prontuario}</td>
                <td>{paciente.nome}</td>
                <td>{paciente.dataInternacao}</td>
                <td>{paciente.monitoramento}</td>
                <td className="td-recomendacao">
                  <p className="p-recomendacao" style={{borderColor: paciente.tratamento.color, color:paciente.tratamento.color}}>
                    {paciente.tratamento !== undefined ? paciente.tratamento.text : "Paciente não possui recomendação"}
                  </p>
                </td>
              </tr>
            ))}
          </>
        )}
    </tbody>
  </Table>
)

export default TabelaPacientes
