import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { searchEntity } from './patient.reducer';
import { IPatient } from 'app/shared/model/search/patient.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPatientDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PatientDetail extends React.Component<IPatientDetailProps> {
  componentDidMount() {
    this.props.searchEntity(this.props.match.params.id);
  }

  render() {
    const { patientEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="dhomoniApp.searchPatient.detail.title">Patient</Translate>
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="registrationId">
                <Translate contentKey="dhomoniApp.searchPatient.registrationId">Registration Id</Translate>
              </span>
            </dt>
            <dd>{patientEntity.registrationId}</dd>
            <dt>
              <span id="firstName">
                <Translate contentKey="dhomoniApp.searchPatient.firstName">First Name</Translate>
              </span>
            </dt>
            <dd>{patientEntity.firstName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="dhomoniApp.searchPatient.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{patientEntity.lastName}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="dhomoniApp.searchPatient.email">Email</Translate>
              </span>
            </dt>
            <dd>{patientEntity.email}</dd>
            <dt>
              <span id="phone">
                <Translate contentKey="dhomoniApp.searchPatient.phone">Phone</Translate>
              </span>
            </dt>
            <dd>{patientEntity.phone}</dd>
            <dt>
              <span id="sex">
                <Translate contentKey="dhomoniApp.searchPatient.sex">Sex</Translate>
              </span>
            </dt>
            <dd>{patientEntity.sex}</dd>
            <dt>
              <span id="birthTimestamp">
                <Translate contentKey="dhomoniApp.searchPatient.birthTimestamp">Birth Timestamp</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={patientEntity.birthTimestamp} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="bloodGroup">
                <Translate contentKey="dhomoniApp.searchPatient.bloodGroup">Blood Group</Translate>
              </span>
            </dt>
            <dd>{patientEntity.bloodGroup}</dd>
            <dt>
              <span id="weightInKG">
                <Translate contentKey="dhomoniApp.searchPatient.weightInKG">Weight In KG</Translate>
              </span>
            </dt>
            <dd>{patientEntity.weightInKG}</dd>
            <dt>
              <span id="heightInInch">
                <Translate contentKey="dhomoniApp.searchPatient.heightInInch">Height In Inch</Translate>
              </span>
            </dt>
            <dd>{patientEntity.heightInInch}</dd>
            <dt>
              <span id="address">
                <Translate contentKey="dhomoniApp.searchPatient.address">Address</Translate>
              </span>
            </dt>
            <dd>{patientEntity.address}</dd>
            <dt>
              <span id="image">
                <Translate contentKey="dhomoniApp.searchPatient.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {patientEntity.image ? (
                <div>
                  <a onClick={openFile(patientEntity.imageContentType, patientEntity.image)}>
                    <img src={`data:${patientEntity.imageContentType};base64,${patientEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="activated">
                <Translate contentKey="dhomoniApp.searchPatient.activated">Activated</Translate>
              </span>
            </dt>
            <dd>{patientEntity.activated ? 'true' : 'false'}</dd>
          </dl>
          <Button tag={Link} to="/" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ searchPatient }: IRootState) => ({
  patientEntity: searchPatient.entity
});

const mapDispatchToProps = { searchEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientDetail);
