import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './medicine.reducer';
import { IMedicine } from 'app/shared/model/search/medicine.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMedicineUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMedicineUpdateState {
  isNew: boolean;
}

export class MedicineUpdate extends React.Component<IMedicineUpdateProps, IMedicineUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { medicineEntity } = this.props;
      const entity = {
        ...medicineEntity,
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
    this.props.history.push('/entity/medicine');
  };

  render() {
    const { medicineEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="dhomoniApp.searchMedicine.home.createOrEditLabel">
              <Translate contentKey="dhomoniApp.searchMedicine.home.createOrEditLabel">Create or edit a Medicine</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : medicineEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="medicine-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tradeNameLabel" for="tradeName">
                    <Translate contentKey="dhomoniApp.searchMedicine.tradeName">Trade Name</Translate>
                  </Label>
                  <AvField
                    id="medicine-tradeName"
                    type="text"
                    name="tradeName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="unitQuantityLabel" for="unitQuantity">
                    <Translate contentKey="dhomoniApp.searchMedicine.unitQuantity">Unit Quantity</Translate>
                  </Label>
                  <AvField id="medicine-unitQuantity" type="text" name="unitQuantity" />
                </AvGroup>
                <AvGroup>
                  <Label id="genericNameLabel" for="genericName">
                    <Translate contentKey="dhomoniApp.searchMedicine.genericName">Generic Name</Translate>
                  </Label>
                  <AvField
                    id="medicine-genericName"
                    type="text"
                    name="genericName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="chemicalNameLabel" for="chemicalName">
                    <Translate contentKey="dhomoniApp.searchMedicine.chemicalName">Chemical Name</Translate>
                  </Label>
                  <AvField
                    id="medicine-chemicalName"
                    type="text"
                    name="chemicalName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel">
                    <Translate contentKey="dhomoniApp.searchMedicine.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="medicine-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && medicineEntity.type) || 'TABLET'}
                  >
                    <option value="TABLET">
                      <Translate contentKey="dhomoniApp.MedicineType.TABLET" />
                    </option>
                    <option value="CAPSULE">
                      <Translate contentKey="dhomoniApp.MedicineType.CAPSULE" />
                    </option>
                    <option value="SYRUP">
                      <Translate contentKey="dhomoniApp.MedicineType.SYRUP" />
                    </option>
                    <option value="INJECTION">
                      <Translate contentKey="dhomoniApp.MedicineType.INJECTION" />
                    </option>
                    <option value="INJECTION_IV">
                      <Translate contentKey="dhomoniApp.MedicineType.INJECTION_IV" />
                    </option>
                    <option value="SALINE">
                      <Translate contentKey="dhomoniApp.MedicineType.SALINE" />
                    </option>
                    <option value="ORAL_SALINE">
                      <Translate contentKey="dhomoniApp.MedicineType.ORAL_SALINE" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="manufacturerLabel" for="manufacturer">
                    <Translate contentKey="dhomoniApp.searchMedicine.manufacturer">Manufacturer</Translate>
                  </Label>
                  <AvField
                    id="medicine-manufacturer"
                    type="text"
                    name="manufacturer"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="mrpLabel" for="mrp">
                    <Translate contentKey="dhomoniApp.searchMedicine.mrp">Mrp</Translate>
                  </Label>
                  <AvField id="medicine-mrp" type="string" className="form-control" name="mrp" />
                </AvGroup>
                <AvGroup>
                  <Label id="indicationsLabel" for="indications">
                    <Translate contentKey="dhomoniApp.searchMedicine.indications">Indications</Translate>
                  </Label>
                  <AvField id="medicine-indications" type="text" name="indications" />
                </AvGroup>
                <AvGroup>
                  <Label id="doseAndAdminLabel" for="doseAndAdmin">
                    <Translate contentKey="dhomoniApp.searchMedicine.doseAndAdmin">Dose And Admin</Translate>
                  </Label>
                  <AvField id="medicine-doseAndAdmin" type="text" name="doseAndAdmin" />
                </AvGroup>
                <AvGroup>
                  <Label id="preparationLabel" for="preparation">
                    <Translate contentKey="dhomoniApp.searchMedicine.preparation">Preparation</Translate>
                  </Label>
                  <AvField id="medicine-preparation" type="text" name="preparation" />
                </AvGroup>
                <AvGroup>
                  <Label id="productUrlLabel" for="productUrl">
                    <Translate contentKey="dhomoniApp.searchMedicine.productUrl">Product Url</Translate>
                  </Label>
                  <AvField id="medicine-productUrl" type="text" name="productUrl" />
                </AvGroup>
                <AvGroup>
                  <Label id="activeLabel" check>
                    <AvInput id="medicine-active" type="checkbox" className="form-control" name="active" />
                    <Translate contentKey="dhomoniApp.searchMedicine.active">Active</Translate>
                  </Label>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/medicine" replace color="info">
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
  medicineEntity: storeState.medicine.entity,
  loading: storeState.medicine.loading,
  updating: storeState.medicine.updating,
  updateSuccess: storeState.medicine.updateSuccess
});

const mapDispatchToProps = {
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
)(MedicineUpdate);
