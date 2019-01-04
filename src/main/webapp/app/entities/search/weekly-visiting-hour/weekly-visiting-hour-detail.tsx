import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './weekly-visiting-hour.reducer';
import { IWeeklyVisitingHour } from 'app/shared/model/search/weekly-visiting-hour.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWeeklyVisitingHourDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class WeeklyVisitingHourDetail extends React.Component<IWeeklyVisitingHourDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { weeklyVisitingHourEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.detail.title">WeeklyVisitingHour</Translate> [<b>
              {weeklyVisitingHourEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="weekDay">
                <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.weekDay">Week Day</Translate>
              </span>
            </dt>
            <dd>{weeklyVisitingHourEntity.weekDay}</dd>
            <dt>
              <span id="startHour">
                <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.startHour">Start Hour</Translate>
              </span>
            </dt>
            <dd>{weeklyVisitingHourEntity.startHour}</dd>
            <dt>
              <span id="startMinute">
                <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.startMinute">Start Minute</Translate>
              </span>
            </dt>
            <dd>{weeklyVisitingHourEntity.startMinute}</dd>
            <dt>
              <span id="endHour">
                <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.endHour">End Hour</Translate>
              </span>
            </dt>
            <dd>{weeklyVisitingHourEntity.endHour}</dd>
            <dt>
              <span id="endMinute">
                <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.endMinute">End Minute</Translate>
              </span>
            </dt>
            <dd>{weeklyVisitingHourEntity.endMinute}</dd>
            <dt>
              <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.chamber">Chamber</Translate>
            </dt>
            <dd>{weeklyVisitingHourEntity.chamber ? weeklyVisitingHourEntity.chamber.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/weekly-visiting-hour" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/weekly-visiting-hour/${weeklyVisitingHourEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ weeklyVisitingHour }: IRootState) => ({
  weeklyVisitingHourEntity: weeklyVisitingHour.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyVisitingHourDetail);
