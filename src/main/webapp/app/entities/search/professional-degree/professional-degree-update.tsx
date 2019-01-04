import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDoctor } from 'app/shared/model/search/doctor.model';
import { getEntities as getDoctors } from 'app/entities/search/doctor/doctor.reducer';
import { getEntity, updateEntity, createEntity, reset } from './professional-degree.reducer';
import { IProfessionalDegree } from 'app/shared/model/search/professional-degree.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfessionalDegreeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProfessionalDegreeUpdateState {
  isNew: boolean;
  doctorId: string;
}

export class ProfessionalDegreeUpdate extends React.Component<IProfessionalDegreeUpdateProps, IProfessionalDegreeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: '0',
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

    this.props.getDoctors();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { professionalDegreeEntity } = this.props;
      const entity = {
        ...professionalDegreeEntity,
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
    this.props.history.push('/entity/professional-degree');
  };

  render() {
    const { professionalDegreeEntity, doctors, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="dhomoniApp.searchProfessionalDegree.home.createOrEditLabel">
              <Translate contentKey="dhomoniApp.searchProfessionalDegree.home.createOrEditLabel">
                Create or edit a ProfessionalDegree
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : professionalDegreeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="professional-degree-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="dhomoniApp.searchProfessionalDegree.name">Name</Translate>
                  </Label>
                  <AvField id="professional-degree-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="instituteLabel" for="institute">
                    <Translate contentKey="dhomoniApp.searchProfessionalDegree.institute">Institute</Translate>
                  </Label>
                  <AvField id="professional-degree-institute" type="text" name="institute" />
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="country">
                    <Translate contentKey="dhomoniApp.searchProfessionalDegree.country">Country</Translate>
                  </Label>
                  <AvField id="professional-degree-country" type="text" name="country" />
                </AvGroup>
                <AvGroup>
                  <Label id="enrollmentYearLabel" for="enrollmentYear">
                    <Translate contentKey="dhomoniApp.searchProfessionalDegree.enrollmentYear">Enrollment Year</Translate>
                  </Label>
                  <AvField id="professional-degree-enrollmentYear" type="string" className="form-control" name="enrollmentYear" />
                </AvGroup>
                <AvGroup>
                  <Label id="passingYearLabel" for="passingYear">
                    <Translate contentKey="dhomoniApp.searchProfessionalDegree.passingYear">Passing Year</Translate>
                  </Label>
                  <AvField id="professional-degree-passingYear" type="string" className="form-control" name="passingYear" />
                </AvGroup>
                <AvGroup>
                  <Label for="doctor.id">
                    <Translate contentKey="dhomoniApp.searchProfessionalDegree.doctor">Doctor</Translate>
                  </Label>
                  <AvInput id="professional-degree-doctor" type="select" className="form-control" name="doctor.id">
                    <option value="" key="0" />
                    {doctors
                      ? doctors.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/professional-degree" replace color="info">
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
  doctors: storeState.doctor.entities,
  professionalDegreeEntity: storeState.professionalDegree.entity,
  loading: storeState.professionalDegree.loading,
  updating: storeState.professionalDegree.updating,
  updateSuccess: storeState.professionalDegree.updateSuccess
});

const mapDispatchToProps = {
  getDoctors,
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
)(ProfessionalDegreeUpdate);
