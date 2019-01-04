import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './patient.reducer';
import { IPatient } from 'app/shared/model/search/patient.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPatientUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPatientUpdateState {
  isNew: boolean;
}

export class PatientUpdate extends React.Component<IPatientUpdateProps, IPatientUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.birthTimestamp = new Date(values.birthTimestamp);

    if (errors.length === 0) {
      const { patientEntity } = this.props;
      const entity = {
        ...patientEntity,
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
    this.props.history.push('/entity/patient');
  };

  render() {
    const { patientEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { image, imageContentType } = patientEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="dhomoniApp.searchPatient.home.createOrEditLabel">
              <Translate contentKey="dhomoniApp.searchPatient.home.createOrEditLabel">Create or edit a Patient</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : patientEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="patient-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="registrationIdLabel" for="registrationId">
                    <Translate contentKey="dhomoniApp.searchPatient.registrationId">Registration Id</Translate>
                  </Label>
                  <AvField
                    id="patient-registrationId"
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
                    <Translate contentKey="dhomoniApp.searchPatient.firstName">First Name</Translate>
                  </Label>
                  <AvField id="patient-firstName" type="text" name="firstName" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="lastName">
                    <Translate contentKey="dhomoniApp.searchPatient.lastName">Last Name</Translate>
                  </Label>
                  <AvField id="patient-lastName" type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    <Translate contentKey="dhomoniApp.searchPatient.email">Email</Translate>
                  </Label>
                  <AvField id="patient-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="phone">
                    <Translate contentKey="dhomoniApp.searchPatient.phone">Phone</Translate>
                  </Label>
                  <AvField id="patient-phone" type="text" name="phone" />
                </AvGroup>
                <AvGroup>
                  <Label id="sexLabel">
                    <Translate contentKey="dhomoniApp.searchPatient.sex">Sex</Translate>
                  </Label>
                  <AvInput
                    id="patient-sex"
                    type="select"
                    className="form-control"
                    name="sex"
                    value={(!isNew && patientEntity.sex) || 'MALE'}
                  >
                    <option value="MALE">
                      <Translate contentKey="dhomoniApp.Sex.MALE" />
                    </option>
                    <option value="FEMALE">
                      <Translate contentKey="dhomoniApp.Sex.FEMALE" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="birthTimestampLabel" for="birthTimestamp">
                    <Translate contentKey="dhomoniApp.searchPatient.birthTimestamp">Birth Timestamp</Translate>
                  </Label>
                  <AvInput
                    id="patient-birthTimestamp"
                    type="datetime-local"
                    className="form-control"
                    name="birthTimestamp"
                    value={isNew ? null : convertDateTimeFromServer(this.props.patientEntity.birthTimestamp)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="bloodGroupLabel">
                    <Translate contentKey="dhomoniApp.searchPatient.bloodGroup">Blood Group</Translate>
                  </Label>
                  <AvInput
                    id="patient-bloodGroup"
                    type="select"
                    className="form-control"
                    name="bloodGroup"
                    value={(!isNew && patientEntity.bloodGroup) || 'A_POSITIVE'}
                  >
                    <option value="A_POSITIVE">
                      <Translate contentKey="dhomoniApp.BloodGroup.A_POSITIVE" />
                    </option>
                    <option value="A_NEGATIVE">
                      <Translate contentKey="dhomoniApp.BloodGroup.A_NEGATIVE" />
                    </option>
                    <option value="B_POSITIVE">
                      <Translate contentKey="dhomoniApp.BloodGroup.B_POSITIVE" />
                    </option>
                    <option value="B_NEGATIVE">
                      <Translate contentKey="dhomoniApp.BloodGroup.B_NEGATIVE" />
                    </option>
                    <option value="O_POSITIVE">
                      <Translate contentKey="dhomoniApp.BloodGroup.O_POSITIVE" />
                    </option>
                    <option value="O_NEGATIVE">
                      <Translate contentKey="dhomoniApp.BloodGroup.O_NEGATIVE" />
                    </option>
                    <option value="AB_POSITIVE">
                      <Translate contentKey="dhomoniApp.BloodGroup.AB_POSITIVE" />
                    </option>
                    <option value="AB_NEGATIVE">
                      <Translate contentKey="dhomoniApp.BloodGroup.AB_NEGATIVE" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="weightInKGLabel" for="weightInKG">
                    <Translate contentKey="dhomoniApp.searchPatient.weightInKG">Weight In KG</Translate>
                  </Label>
                  <AvField id="patient-weightInKG" type="string" className="form-control" name="weightInKG" />
                </AvGroup>
                <AvGroup>
                  <Label id="heightInInchLabel" for="heightInInch">
                    <Translate contentKey="dhomoniApp.searchPatient.heightInInch">Height In Inch</Translate>
                  </Label>
                  <AvField id="patient-heightInInch" type="string" className="form-control" name="heightInInch" />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLabel" for="address">
                    <Translate contentKey="dhomoniApp.searchPatient.address">Address</Translate>
                  </Label>
                  <AvField id="patient-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="imageLabel" for="image">
                      <Translate contentKey="dhomoniApp.searchPatient.image">Image</Translate>
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
                    <AvInput id="patient-activated" type="checkbox" className="form-control" name="activated" />
                    <Translate contentKey="dhomoniApp.searchPatient.activated">Activated</Translate>
                  </Label>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/patient" replace color="info">
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
  patientEntity: storeState.patient.entity,
  loading: storeState.patient.loading,
  updating: storeState.patient.updating,
  updateSuccess: storeState.patient.updateSuccess
});

const mapDispatchToProps = {
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
)(PatientUpdate);
