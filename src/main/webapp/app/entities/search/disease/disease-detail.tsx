import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './disease.reducer';
import { IDisease } from 'app/shared/model/search/disease.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDiseaseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DiseaseDetail extends React.Component<IDiseaseDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { diseaseEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="dhomoniApp.searchDisease.detail.title">Disease</Translate> [<b>{diseaseEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="medicalName">
                <Translate contentKey="dhomoniApp.searchDisease.medicalName">Medical Name</Translate>
              </span>
            </dt>
            <dd>{diseaseEntity.medicalName}</dd>
            <dt>
              <span id="generalName">
                <Translate contentKey="dhomoniApp.searchDisease.generalName">General Name</Translate>
              </span>
            </dt>
            <dd>{diseaseEntity.generalName}</dd>
            <dt>
              <span id="symptoms">
                <Translate contentKey="dhomoniApp.searchDisease.symptoms">Symptoms</Translate>
              </span>
            </dt>
            <dd>{diseaseEntity.symptoms}</dd>
            <dt>
              <Translate contentKey="dhomoniApp.searchDisease.dept">Dept</Translate>
            </dt>
            <dd>{diseaseEntity.dept ? diseaseEntity.dept.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/disease" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/disease/${diseaseEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ disease }: IRootState) => ({
  diseaseEntity: disease.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiseaseDetail);
