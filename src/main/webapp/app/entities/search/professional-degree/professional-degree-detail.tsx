import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './professional-degree.reducer';
import { IProfessionalDegree } from 'app/shared/model/search/professional-degree.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfessionalDegreeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfessionalDegreeDetail extends React.Component<IProfessionalDegreeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { professionalDegreeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="dhomoniApp.searchProfessionalDegree.detail.title">ProfessionalDegree</Translate> [<b>
              {professionalDegreeEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="dhomoniApp.searchProfessionalDegree.name">Name</Translate>
              </span>
            </dt>
            <dd>{professionalDegreeEntity.name}</dd>
            <dt>
              <span id="institute">
                <Translate contentKey="dhomoniApp.searchProfessionalDegree.institute">Institute</Translate>
              </span>
            </dt>
            <dd>{professionalDegreeEntity.institute}</dd>
            <dt>
              <span id="country">
                <Translate contentKey="dhomoniApp.searchProfessionalDegree.country">Country</Translate>
              </span>
            </dt>
            <dd>{professionalDegreeEntity.country}</dd>
            <dt>
              <span id="enrollmentYear">
                <Translate contentKey="dhomoniApp.searchProfessionalDegree.enrollmentYear">Enrollment Year</Translate>
              </span>
            </dt>
            <dd>{professionalDegreeEntity.enrollmentYear}</dd>
            <dt>
              <span id="passingYear">
                <Translate contentKey="dhomoniApp.searchProfessionalDegree.passingYear">Passing Year</Translate>
              </span>
            </dt>
            <dd>{professionalDegreeEntity.passingYear}</dd>
            <dt>
              <Translate contentKey="dhomoniApp.searchProfessionalDegree.doctor">Doctor</Translate>
            </dt>
            <dd>{professionalDegreeEntity.doctor ? professionalDegreeEntity.doctor.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/professional-degree" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/professional-degree/${professionalDegreeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ professionalDegree }: IRootState) => ({
  professionalDegreeEntity: professionalDegree.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionalDegreeDetail);
