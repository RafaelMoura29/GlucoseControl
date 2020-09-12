import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

import { Card, CardBody, Row, Col } from 'reactstrap'

class Ajuda extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <>
        <div className="content">
          <Card>
            <CardBody>
              <h1>AJUDA</h1>

              <Row>
                <Col className="pr-md-1" md="12">
                  <iframe
                    style={{ width: '98.6%', height: 380, scrolling: 'no' }}
                    src="https://www.youtube.com/embed/ZnlVTS9VCXQ"
                    title="GLYCON - Como Utilizar"
                  ></iframe>
                </Col>
              </Row>
            </CardBody>
            <Row style={{ marginBottom: 15, paddingLeft: 15 }}>
              <Col className="pr-md-1" md="2">
                <Link
                  style={{ color: '#ddd' }}
                  to={{}}
                  onClick={() => this.props.history.goBack()}
                >
                  {'<- Voltar'}
                </Link>
              </Col>
            </Row>
          </Card>
        </div>
      </>
    )
  }
}

export default Ajuda
