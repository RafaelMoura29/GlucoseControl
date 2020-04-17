import React from "react";

import {
    Card,
    CardBody
} from "reactstrap";

class Contato extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                <div className="content">
                    <Card >
                        <CardBody>
                           <h1>Página contato</h1>
                        </CardBody>
                    </Card>
                </div>
            </>
        );
    }
}

export default Contato;
