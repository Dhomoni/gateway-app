import './doctor-chamber.scss';

import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Collapse, Col, Row, Container } from 'reactstrap';

export interface IDoctorChamberProps {
  chamber: any;
}

export interface IDoctorChamberState {
  collapse: boolean;
}

export default class DoctorChamber extends React.Component<IDoctorChamberProps, IDoctorChamberState> {
  state: IDoctorChamberState = {
    collapse: true
  };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  ColoredLine = ({ color }) => (
    <hr
      style={{
        color: '{color}',
        backgroundColor: '{color}',
        height: 1
      }}
    />
  );

  render() {
    return (
      <Container style={{ marginBottom: '1rem' }}>
        <Row className="chamberAddress">
          <Col xs="7" className="chamberAddress">
            {this.props.chamber.address}
          </Col>
          <Col xs="2">Call: {this.props.chamber.phone}</Col>
          <Col xs="2">View Map</Col>
        </Row>
        <Row className="weekDay">
          <Col xs={{ size: 1, offset: 1 }} className="weekDay">
            Sunday
          </Col>
          <Col xs={{ size: 3, offset: 1 }}>4:00 PM - 8:30 PM</Col>
          <Col xs={{ size: 2, offset: 1 }}>Set apointment</Col>
        </Row>
        <Row className="weekDay">
          <Col xs={{ size: 1, offset: 1 }}>Tuesday</Col>
          <Col xs={{ size: 3, offset: 1 }}>10:00 AM - 12:30 PM, 4:00 PM - 8:30 PM</Col>
          <Col xs={{ size: 2, offset: 1 }}>Set apointment</Col>
        </Row>
      </Container>
    );
  }

  /*render() {
        return (
           <div>
                <Card className="doctorCard">
                  <CardImg top width="50%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=100&h=100" alt="Card image cap" />
                  <CardBody>
                    <CardTitle>{this.props.doctor.firstName} {this.props.doctor.lastName}</CardTitle>
                    <CardSubtitle>{this.props.doctor.medicalDepartment ? this.props.doctor.medicalDepartment.name : 'GGeneral practitioner'}</CardSubtitle>
                    <CardText>{this.props.doctor.designation}</CardText>
                    <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Show Chambers</Button>
                  </CardBody>
                </Card>
                <Collapse isOpen={!this.state.collapse}>
                 <Card>
                      <CardBody>
                      Anim pariatur cliche reprehenderit,
                       enim eiusmod high life accusamus terry richardson ad squid. Nihil
                       anim keffiyeh helvetica, craft beer labore wes anderson cred
                       nesciunt sapiente ea proident.
                      </CardBody>
                    </Card>
                  </Collapse>
                       <this.ColoredLine color="light-grey" />
            </div>

        );
    }*/
}
