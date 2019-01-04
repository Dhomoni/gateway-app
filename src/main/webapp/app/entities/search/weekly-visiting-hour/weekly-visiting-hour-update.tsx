import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IChamber } from 'app/shared/model/search/chamber.model';
import { getEntities as getChambers } from 'app/entities/search/chamber/chamber.reducer';
import { getEntity, updateEntity, createEntity, reset } from './weekly-visiting-hour.reducer';
import { IWeeklyVisitingHour } from 'app/shared/model/search/weekly-visiting-hour.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IWeeklyVisitingHourUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IWeeklyVisitingHourUpdateState {
  isNew: boolean;
  chamberId: string;
}

export class WeeklyVisitingHourUpdate extends React.Component<IWeeklyVisitingHourUpdateProps, IWeeklyVisitingHourUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      chamberId: '0',
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

    this.props.getChambers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { weeklyVisitingHourEntity } = this.props;
      const entity = {
        ...weeklyVisitingHourEntity,
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
    this.props.history.push('/entity/weekly-visiting-hour');
  };

  render() {
    const { weeklyVisitingHourEntity, chambers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="dhomoniApp.searchWeeklyVisitingHour.home.createOrEditLabel">
              <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.home.createOrEditLabel">
                Create or edit a WeeklyVisitingHour
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : weeklyVisitingHourEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="weekly-visiting-hour-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="weekDayLabel">
                    <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.weekDay">Week Day</Translate>
                  </Label>
                  <AvInput
                    id="weekly-visiting-hour-weekDay"
                    type="select"
                    className="form-control"
                    name="weekDay"
                    value={(!isNew && weeklyVisitingHourEntity.weekDay) || 'SUN'}
                  >
                    <option value="SUN">
                      <Translate contentKey="dhomoniApp.WeekDay.SUN" />
                    </option>
                    <option value="MON">
                      <Translate contentKey="dhomoniApp.WeekDay.MON" />
                    </option>
                    <option value="TUES">
                      <Translate contentKey="dhomoniApp.WeekDay.TUES" />
                    </option>
                    <option value="WED">
                      <Translate contentKey="dhomoniApp.WeekDay.WED" />
                    </option>
                    <option value="THURS">
                      <Translate contentKey="dhomoniApp.WeekDay.THURS" />
                    </option>
                    <option value="FRI">
                      <Translate contentKey="dhomoniApp.WeekDay.FRI" />
                    </option>
                    <option value="SAT">
                      <Translate contentKey="dhomoniApp.WeekDay.SAT" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="startHourLabel" for="startHour">
                    <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.startHour">Start Hour</Translate>
                  </Label>
                  <AvField
                    id="weekly-visiting-hour-startHour"
                    type="string"
                    className="form-control"
                    name="startHour"
                    validate={{
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      max: { value: 23, errorMessage: translate('entity.validation.max', { max: 23 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="startMinuteLabel" for="startMinute">
                    <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.startMinute">Start Minute</Translate>
                  </Label>
                  <AvField
                    id="weekly-visiting-hour-startMinute"
                    type="string"
                    className="form-control"
                    name="startMinute"
                    validate={{
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      max: { value: 59, errorMessage: translate('entity.validation.max', { max: 59 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endHourLabel" for="endHour">
                    <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.endHour">End Hour</Translate>
                  </Label>
                  <AvField
                    id="weekly-visiting-hour-endHour"
                    type="string"
                    className="form-control"
                    name="endHour"
                    validate={{
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      max: { value: 23, errorMessage: translate('entity.validation.max', { max: 23 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endMinuteLabel" for="endMinute">
                    <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.endMinute">End Minute</Translate>
                  </Label>
                  <AvField
                    id="weekly-visiting-hour-endMinute"
                    type="string"
                    className="form-control"
                    name="endMinute"
                    validate={{
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      max: { value: 59, errorMessage: translate('entity.validation.max', { max: 59 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="chamber.id">
                    <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.chamber">Chamber</Translate>
                  </Label>
                  <AvInput id="weekly-visiting-hour-chamber" type="select" className="form-control" name="chamber.id">
                    <option value="" key="0" />
                    {chambers
                      ? chambers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/weekly-visiting-hour" replace color="info">
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
  chambers: storeState.chamber.entities,
  weeklyVisitingHourEntity: storeState.weeklyVisitingHour.entity,
  loading: storeState.weeklyVisitingHour.loading,
  updating: storeState.weeklyVisitingHour.updating,
  updateSuccess: storeState.weeklyVisitingHour.updateSuccess
});

const mapDispatchToProps = {
  getChambers,
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
)(WeeklyVisitingHourUpdate);
