import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { IDoctor } from 'app/shared/model/search/doctor.model';
import { searchEntity, reset } from './home.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDoctorDetailProps extends StateProps , DispatchProps, RouteComponentProps<{ id: string }> {}

export class DoctorDetail extends React.Component<IDoctorDetailProps> {
  componentDidMount() {
    this.props.searchEntity(this.props.match.params.id);
  }

  render() {
    const { doctorEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="dhomoniApp.searchDoctor.detail.title">Doctor</Translate> [<b>{doctorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="registrationId">
                <Translate contentKey="dhomoniApp.searchDoctor.registrationId">Registration Id</Translate>
              </span>
            </dt>
            <dd>{doctorEntity.registrationId}</dd>
            <dt>
              <span id="firstName">
                <Translate contentKey="dhomoniApp.searchDoctor.firstName">First Name</Translate>
              </span>
            </dt>
            <dd>{doctorEntity.firstName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="dhomoniApp.searchDoctor.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{doctorEntity.lastName}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="dhomoniApp.searchDoctor.email">Email</Translate>
              </span>
            </dt>
            <dd>{doctorEntity.email}</dd>
            <dt>
              <span id="phone">
                <Translate contentKey="dhomoniApp.searchDoctor.phone">Phone</Translate>
              </span>
            </dt>
            <dd>{doctorEntity.phone}</dd>
            <dt>
              <span id="licenceNumber">
                <Translate contentKey="dhomoniApp.searchDoctor.licenceNumber">Licence Number</Translate>
              </span>
            </dt>
            <dd>{doctorEntity.licenceNumber}</dd>
            <dt>
              <span id="nationalId">
                <Translate contentKey="dhomoniApp.searchDoctor.nationalId">National Id</Translate>
              </span>
            </dt>
            <dd>{doctorEntity.nationalId}</dd>
            <dt>
              <span id="passportNo">
                <Translate contentKey="dhomoniApp.searchDoctor.passportNo">Passport No</Translate>
              </span>
            </dt>
            <dd>{doctorEntity.passportNo}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="dhomoniApp.searchDoctor.type">Type</Translate>
              </span>
            </dt>
            <dd>{doctorEntity.type}</dd>
            <dt>
              <span id="designation">
                <Translate contentKey="dhomoniApp.searchDoctor.designation">Designation</Translate>
              </span>
            </dt>
            <dd>{doctorEntity.designation}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="dhomoniApp.searchDoctor.description">Description</Translate>
              </span>
            </dt>
            <dd>{doctorEntity.description}</dd>
            <dt>
              <span id="address">
                <Translate contentKey="dhomoniApp.searchDoctor.address">Address</Translate>
              </span>
            </dt>
            <dd>{doctorEntity.address}</dd>
            <dt>
              <span id="image">
                <Translate contentKey="dhomoniApp.searchDoctor.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {doctorEntity.image ? (
                <div>
                  <a onClick={openFile(doctorEntity.imageContentType, doctorEntity.image)}>
                    <img src={`data:${doctorEntity.imageContentType};base64,${doctorEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {doctorEntity.imageContentType}, {byteSize(doctorEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="activated">
                <Translate contentKey="dhomoniApp.searchDoctor.activated">Activated</Translate>
              </span>
            </dt>
            <dd>{doctorEntity.activated ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="dhomoniApp.searchDoctor.medicalDepartment">Medical Department</Translate>
            </dt>
            <dd>{doctorEntity.medicalDepartment ? doctorEntity.medicalDepartment.id : ''}</dd>
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

const mapStateToProps = ({ home }: IRootState) => ({
  doctorEntity: home.entity
});

const mapDispatchToProps = { searchEntity, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorDetail);
