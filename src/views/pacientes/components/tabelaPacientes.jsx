import React from 'react'
import '../style.css'
import { Table } from 'reactstrap'

const TabelaPacientes = ({ pacientes, history, isLoading }) => (
  <Table>
    <thead>
      <tr>
        <th>Prontuário</th>
        <th>Nome</th>
        <th>Data Internação</th>
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
            </tr>
          ))}
        </>
      )}
    </tbody>
  </Table>
)

export default TabelaPacientes
