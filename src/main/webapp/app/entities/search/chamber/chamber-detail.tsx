import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './chamber.reducer';
import { IChamber } from 'app/shared/model/search/chamber.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChamberDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ChamberDetail extends React.Component<IChamberDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { chamberEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="dhomoniApp.searchChamber.detail.title">Chamber</Translate> [<b>{chamberEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="address">
                <Translate contentKey="dhomoniApp.searchChamber.address">Address</Translate>
              </span>
            </dt>
            <dd>{chamberEntity.address}</dd>
            <dt>
              <span id="phone">
                <Translate contentKey="dhomoniApp.searchChamber.phone">Phone</Translate>
              </span>
            </dt>
            <dd>{chamberEntity.phone}</dd>
            <dt>
              <span id="fee">
                <Translate contentKey="dhomoniApp.searchChamber.fee">Fee</Translate>
              </span>
            </dt>
            <dd>{chamberEntity.fee}</dd>
            <dt>
              <span id="isSuspended">
                <Translate contentKey="dhomoniApp.searchChamber.isSuspended">Is Suspended</Translate>
              </span>
            </dt>
            <dd>{chamberEntity.isSuspended ? 'true' : 'false'}</dd>
            <dt>
              <span id="notice">
                <Translate contentKey="dhomoniApp.searchChamber.notice">Notice</Translate>
              </span>
            </dt>
            <dd>{chamberEntity.notice}</dd>
            <dt>
              <span id="appointmentLimit">
                <Translate contentKey="dhomoniApp.searchChamber.appointmentLimit">Appointment Limit</Translate>
              </span>
            </dt>
            <dd>{chamberEntity.appointmentLimit}</dd>
            <dt>
              <span id="adviceDurationInMinute">
                <Translate contentKey="dhomoniApp.searchChamber.adviceDurationInMinute">Advice Duration In Minute</Translate>
              </span>
            </dt>
            <dd>{chamberEntity.adviceDurationInMinute}</dd>
            <dt>
              <Translate contentKey="dhomoniApp.searchChamber.doctor">Doctor</Translate>
            </dt>
            <dd>{chamberEntity.doctor ? chamberEntity.doctor.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/chamber" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/chamber/${chamberEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ chamber }: IRootState) => ({
  chamberEntity: chamber.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChamberDetail);
