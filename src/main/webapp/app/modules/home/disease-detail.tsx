import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { searchEntity } from './disease.reducer';
import { IDisease } from 'app/shared/model/search/disease.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDiseaseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DiseaseDetail extends React.Component<IDiseaseDetailProps> {
  componentDidMount() {
    this.props.searchEntity(this.props.match.params.id);
  }

  render() {
    const { diseaseEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="dhomoniApp.searchDisease.detail.title">Disease</Translate>
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
              <Translate contentKey="dhomoniApp.searchDisease.symptoms">Symptoms</Translate>
            </dt>
            <dd>
              {diseaseEntity.symptoms
                ? diseaseEntity.symptoms.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === diseaseEntity.symptoms.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="dhomoniApp.searchDisease.medicalDepartment">Medical Department</Translate>
            </dt>
            <dd>{diseaseEntity.medicalDepartment ? diseaseEntity.medicalDepartment.name : ''}</dd>
          </dl>
          <Button onClick={this.props.history.goBack} replace color="info">
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

const mapStateToProps = ({ searchDisease }: IRootState) => ({
  diseaseEntity: searchDisease.entity
});

const mapDispatchToProps = { searchEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiseaseDetail);
