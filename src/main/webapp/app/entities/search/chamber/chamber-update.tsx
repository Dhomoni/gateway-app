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
import { getEntity, updateEntity, createEntity, reset } from './chamber.reducer';
import { IChamber } from 'app/shared/model/search/chamber.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChamberUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IChamberUpdateState {
  isNew: boolean;
  doctorId: string;
}

export class ChamberUpdate extends React.Component<IChamberUpdateProps, IChamberUpdateState> {
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
      const { chamberEntity } = this.props;
      const entity = {
        ...chamberEntity,
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
    this.props.history.push('/entity/chamber');
  };

  render() {
    const { chamberEntity, doctors, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="dhomoniApp.searchChamber.home.createOrEditLabel">
              <Translate contentKey="dhomoniApp.searchChamber.home.createOrEditLabel">Create or edit a Chamber</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : chamberEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="chamber-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="addressLabel" for="address">
                    <Translate contentKey="dhomoniApp.searchChamber.address">Address</Translate>
                  </Label>
                  <AvField id="chamber-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="phone">
                    <Translate contentKey="dhomoniApp.searchChamber.phone">Phone</Translate>
                  </Label>
                  <AvField id="chamber-phone" type="text" name="phone" />
                </AvGroup>
                <AvGroup>
                  <Label id="feeLabel" for="fee">
                    <Translate contentKey="dhomoniApp.searchChamber.fee">Fee</Translate>
                  </Label>
                  <AvField id="chamber-fee" type="string" className="form-control" name="fee" />
                </AvGroup>
                <AvGroup>
                  <Label for="doctor.id">
                    <Translate contentKey="dhomoniApp.searchChamber.doctor">Doctor</Translate>
                  </Label>
                  <AvInput id="chamber-doctor" type="select" className="form-control" name="doctor.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/chamber" replace color="info">
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
  chamberEntity: storeState.chamber.entity,
  loading: storeState.chamber.loading,
  updating: storeState.chamber.updating,
  updateSuccess: storeState.chamber.updateSuccess
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
)(ChamberUpdate);
