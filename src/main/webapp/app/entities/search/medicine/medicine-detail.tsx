import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './medicine.reducer';
import { IMedicine } from 'app/shared/model/search/medicine.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMedicineDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MedicineDetail extends React.Component<IMedicineDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { medicineEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="dhomoniApp.searchMedicine.detail.title">Medicine</Translate> [<b>{medicineEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="tradeName">
                <Translate contentKey="dhomoniApp.searchMedicine.tradeName">Trade Name</Translate>
              </span>
            </dt>
            <dd>{medicineEntity.tradeName}</dd>
            <dt>
              <span id="unitQuantity">
                <Translate contentKey="dhomoniApp.searchMedicine.unitQuantity">Unit Quantity</Translate>
              </span>
            </dt>
            <dd>{medicineEntity.unitQuantity}</dd>
            <dt>
              <span id="genericName">
                <Translate contentKey="dhomoniApp.searchMedicine.genericName">Generic Name</Translate>
              </span>
            </dt>
            <dd>{medicineEntity.genericName}</dd>
            <dt>
              <span id="chemicalName">
                <Translate contentKey="dhomoniApp.searchMedicine.chemicalName">Chemical Name</Translate>
              </span>
            </dt>
            <dd>{medicineEntity.chemicalName}</dd>
            <dt>
              <span id="formulation">
                <Translate contentKey="dhomoniApp.searchMedicine.formulation">Formulation</Translate>
              </span>
            </dt>
            <dd>{medicineEntity.formulation}</dd>
            <dt>
              <span id="manufacturer">
                <Translate contentKey="dhomoniApp.searchMedicine.manufacturer">Manufacturer</Translate>
              </span>
            </dt>
            <dd>{medicineEntity.manufacturer}</dd>
            <dt>
              <span id="mrp">
                <Translate contentKey="dhomoniApp.searchMedicine.mrp">Mrp</Translate>
              </span>
            </dt>
            <dd>{medicineEntity.mrp}</dd>
            <dt>
              <span id="doseAndAdmin">
                <Translate contentKey="dhomoniApp.searchMedicine.doseAndAdmin">Dose And Admin</Translate>
              </span>
            </dt>
            <dd>{medicineEntity.doseAndAdmin}</dd>
            <dt>
              <span id="preparation">
                <Translate contentKey="dhomoniApp.searchMedicine.preparation">Preparation</Translate>
              </span>
            </dt>
            <dd>{medicineEntity.preparation}</dd>
            <dt>
              <span id="productUrl">
                <Translate contentKey="dhomoniApp.searchMedicine.productUrl">Product Url</Translate>
              </span>
            </dt>
            <dd>{medicineEntity.productUrl}</dd>
            <dt>
              <span id="active">
                <Translate contentKey="dhomoniApp.searchMedicine.active">Active</Translate>
              </span>
            </dt>
            <dd>{medicineEntity.active ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="dhomoniApp.searchMedicine.indications">Indications</Translate>
            </dt>
            <dd>
              {medicineEntity.indications
                ? medicineEntity.indications.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === medicineEntity.indications.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/medicine" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/medicine/${medicineEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ medicine }: IRootState) => ({
  medicineEntity: medicine.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicineDetail);
