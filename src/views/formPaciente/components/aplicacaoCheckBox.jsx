import React from 'react'
import { Col, Label, Input } from 'reactstrap'

const AplicacaoCheckBox = ({ handleChange, name, checked, lbl }) => (
    <Col md="2">
        <Label className="form-check-label">
            <Input
                className="form-check-input checkPlano"
                type="checkbox"
                name={name}
                checked={checked}
                onChange={handleChange} />
                {lbl}
                <span className="form-check-sign">
                <span className="check"></span> 
            </span>
        </Label>
    </Col>
)

export default AplicacaoCheckBox