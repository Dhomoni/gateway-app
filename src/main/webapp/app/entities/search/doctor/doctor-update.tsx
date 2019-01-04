import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMedicalDepartment } from 'app/shared/model/search/medical-department.model';
import { getEntities as getMedicalDepartments } from 'app/entities/search/medical-department/medical-department.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './doctor.reducer';
import { IDoctor } from 'app/shared/model/search/doctor.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDoctorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDoctorUpdateState {
  isNew: boolean;
  medicalDepartmentId: string;
}

export class DoctorUpdate extends React.Component<IDoctorUpdateProps, IDoctorUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      medicalDepartmentId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getMedicalDepartments();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { doctorEntity } = this.props;
      const entity = {
        ...doctorEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/doctor');
  };

  render() {
    const { doctorEntity, medicalDepartments, loading, updating } = this.props;
    const { isNew } = this.state;

    const { description, image, imageContentType } = doctorEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="dhomoniApp.searchDoctor.home.createOrEditLabel">
              <Translate contentKey="dhomoniApp.searchDoctor.home.createOrEditLabel">Create or edit a Doctor</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : doctorEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="doctor-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="registrationIdLabel" for="registrationId">
                    <Translate contentKey="dhomoniApp.searchDoctor.registrationId">Registration Id</Translate>
                  </Label>
                  <AvField
                    id="doctor-registrationId"
                    type="string"
                    className="form-control"
                    name="registrationId"
                    validate={{
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="firstNameLabel" for="firstName">
                    <Translate contentKey="dhomoniApp.searchDoctor.firstName">First Name</Translate>
                  </Label>
                  <AvField id="doctor-firstName" type="text" name="firstName" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="lastName">
                    <Translate contentKey="dhomoniApp.searchDoctor.lastName">Last Name</Translate>
                  </Label>
                  <AvField id="doctor-lastName" type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    <Translate contentKey="dhomoniApp.searchDoctor.email">Email</Translate>
                  </Label>
                  <AvField id="doctor-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="phone">
                    <Translate contentKey="dhomoniApp.searchDoctor.phone">Phone</Translate>
                  </Label>
                  <AvField id="doctor-phone" type="text" name="phone" />
                </AvGroup>
                <AvGroup>
                  <Label id="licenceNumberLabel" for="licenceNumber">
                    <Translate contentKey="dhomoniApp.searchDoctor.licenceNumber">Licence Number</Translate>
                  </Label>
                  <AvField
                    id="doctor-licenceNumber"
                    type="text"
                    name="licenceNumber"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nationalIdLabel" for="nationalId">
                    <Translate contentKey="dhomoniApp.searchDoctor.nationalId">National Id</Translate>
                  </Label>
                  <AvField id="doctor-nationalId" type="text" name="nationalId" />
                </AvGroup>
                <AvGroup>
                  <Label id="passportNoLabel" for="passportNo">
                    <Translate contentKey="dhomoniApp.searchDoctor.passportNo">Passport No</Translate>
                  </Label>
                  <AvField id="doctor-passportNo" type="text" name="passportNo" />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel">
                    <Translate contentKey="dhomoniApp.searchDoctor.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="doctor-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && doctorEntity.type) || 'PHYSICIAN'}
                  >
                    <option value="PHYSICIAN">
                      <Translate contentKey="dhomoniApp.DoctorType.PHYSICIAN" />
                    </option>
                    <option value="SURGEON">
                      <Translate contentKey="dhomoniApp.DoctorType.SURGEON" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="designationLabel" for="designation">
                    <Translate contentKey="dhomoniApp.searchDoctor.designation">Designation</Translate>
                  </Label>
                  <AvField id="doctor-designation" type="text" name="designation" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="dhomoniApp.searchDoctor.description">Description</Translate>
                  </Label>
                  <AvInput id="doctor-description" type="textarea" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLabel" for="address">
                    <Translate contentKey="dhomoniApp.searchDoctor.address">Address</Translate>
                  </Label>
                  <AvField id="doctor-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="imageLabel" for="image">
                      <Translate contentKey="dhomoniApp.searchDoctor.image">Image</Translate>
                    </Label>
                    <br />
                    {image ? (
                      <div>
                        <a onClick={openFile(imageContentType, image)}>
                          <img src={`data:${imageContentType};base64,${image}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {imageContentType}, {byteSize(image)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('image')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_image" type="file" onChange={this.onBlobChange(true, 'image')} accept="image/*" />
                    <AvInput type="hidden" name="image" value={image} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="activatedLabel" check>
                    <AvInput id="doctor-activated" type="checkbox" className="form-control" name="activated" />
                    <Translate contentKey="dhomoniApp.searchDoctor.activated">Activated</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="medicalDepartment.id">
                    <Translate contentKey="dhomoniApp.searchDoctor.medicalDepartment">Medical Department</Translate>
                  </Label>
                  <AvInput id="doctor-medicalDepartment" type="select" className="form-control" name="medicalDepartment.id">
                    <option value="" key="0" />
                    {medicalDepartments
                      ? medicalDepartments.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/doctor" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  medicalDepartments: storeState.medicalDepartment.entities,
  doctorEntity: storeState.doctor.entity,
  loading: storeState.doctor.loading,
  updating: storeState.doctor.updating,
  updateSuccess: storeState.doctor.updateSuccess
});

const mapDispatchToProps = {
  getMedicalDepartments,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorUpdate);
