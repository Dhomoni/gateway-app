import './doctor-card.scss';

import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Collapse,
  Col,
  Row,
  Container,
  Link,
  NavLink
} from 'reactstrap';
import DoctorChamber from './doctor-chamber';

export interface IDoctorCardProps {
  doctor: any;
}

export interface IDoctorCardState {
  collapse: boolean;
}

export default class DoctorCard extends React.Component<IDoctorCardProps, IDoctorCardState> {
  state: IDoctorCardState = {
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
    const { chambers } = this.props.doctor;
    return (
      <div>
        <Container clasName="doctorCard">
          <Row style={{ marginBottom: '1rem' }}>
            <Col xs="1">
              <CardImg src="https://placeholdit.imgix.net/~text?txtsize=12&txt=50%C3%9750&w=50&h=50" alt="Card image cap" />
            </Col>
            <Col xs="5">
              <CardSubtitle className="doctorCardTitle">
                {this.props.doctor.firstName} {this.props.doctor.lastName}
              </CardSubtitle>
              <CardSubtitle className="doctorCardDrgree">
                {this.props.doctor.medicalDepartment ? this.props.doctor.medicalDepartment.name : 'GGeneral practitioner'}
              </CardSubtitle>
              <CardSubtitle className="doctorCardDesignation">
                {this.props.doctor.designation}, National institute of cardiovascular dieseases
              </CardSubtitle>
            </Col>
          </Row>
          <Row style={{ marginBottom: '1rem' }}>
            <Col xs="1">
              <Button outline color="link" onClick={this.toggle} size="sm">
                Chambers
              </Button>
            </Col>
            <Col xs="2">
              <Button outline color="link" onClick={this.toggle} size="sm">
                Doctor's profile
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Collapse isOpen={!this.state.collapse}>
                <Card>
                  <Container>
                    {chambers.map((chamber, i) => (
                      <Row>
                        <Col xs="12">
                          <DoctorChamber chamber={chamber} />
                        </Col>
                      </Row>
                    ))}
                  </Container>
                </Card>
              </Collapse>
            </Col>
          </Row>
        </Container>

        <this.ColoredLine color="#000000" />
      </div>
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
