import React from "react";

import {
    Card,
    CardBody
} from "reactstrap";

class Sobre extends React.Component {

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
                           <h1>Página sobre</h1>
                        </CardBody>
                    </Card>
                </div>
            </>
        );
    }
}

export default Sobre;
