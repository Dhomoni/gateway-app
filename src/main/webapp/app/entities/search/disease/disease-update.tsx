import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISymptom } from 'app/shared/model/search/symptom.model';
import { getEntities as getSymptoms } from 'app/entities/search/symptom/symptom.reducer';
import { IMedicalDepartment } from 'app/shared/model/search/medical-department.model';
import { getEntities as getMedicalDepartments } from 'app/entities/search/medical-department/medical-department.reducer';
import { getEntity, updateEntity, createEntity, reset } from './disease.reducer';
import { IDisease } from 'app/shared/model/search/disease.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDiseaseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDiseaseUpdateState {
  isNew: boolean;
  idssymptoms: any[];
  medicalDepartmentId: string;
}

export class DiseaseUpdate extends React.Component<IDiseaseUpdateProps, IDiseaseUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idssymptoms: [],
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

    this.props.getSymptoms();
    this.props.getMedicalDepartments();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { diseaseEntity } = this.props;
      const entity = {
        ...diseaseEntity,
        ...values,
        symptoms: mapIdList(values.symptoms)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/disease');
  };

  render() {
    const { diseaseEntity, symptoms, medicalDepartments, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="dhomoniApp.searchDisease.home.createOrEditLabel">
              <Translate contentKey="dhomoniApp.searchDisease.home.createOrEditLabel">Create or edit a Disease</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : diseaseEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="disease-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="medicalNameLabel" for="medicalName">
                    <Translate contentKey="dhomoniApp.searchDisease.medicalName">Medical Name</Translate>
                  </Label>
                  <AvField
                    id="disease-medicalName"
                    type="text"
                    name="medicalName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="generalNameLabel" for="generalName">
                    <Translate contentKey="dhomoniApp.searchDisease.generalName">General Name</Translate>
                  </Label>
                  <AvField
                    id="disease-generalName"
                    type="text"
                    name="generalName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="symptoms">
                    <Translate contentKey="dhomoniApp.searchDisease.symptoms">Symptoms</Translate>
                  </Label>
                  <AvInput
                    id="disease-symptoms"
                    type="select"
                    multiple
                    className="form-control"
                    name="symptoms"
                    value={diseaseEntity.symptoms && diseaseEntity.symptoms.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {symptoms
                      ? symptoms.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="medicalDepartment.id">
                    <Translate contentKey="dhomoniApp.searchDisease.medicalDepartment">Medical Department</Translate>
                  </Label>
                  <AvInput id="disease-medicalDepartment" type="select" className="form-control" name="medicalDepartment.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/disease" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
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
  symptoms: storeState.symptom.entities,
  medicalDepartments: storeState.medicalDepartment.entities,
  diseaseEntity: storeState.disease.entity,
  loading: storeState.disease.loading,
  updating: storeState.disease.updating,
  updateSuccess: storeState.disease.updateSuccess
});

const mapDispatchToProps = {
  getSymptoms,
  getMedicalDepartments,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiseaseUpdate);
