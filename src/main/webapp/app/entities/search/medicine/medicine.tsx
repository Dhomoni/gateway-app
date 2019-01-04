import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './medicine.reducer';
import { IMedicine } from 'app/shared/model/search/medicine.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IMedicineProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IMedicineState = IPaginationBaseState;

export class Medicine extends React.Component<IMedicineProps, IMedicineState> {
  state: IMedicineState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate() {
    if (this.props.updateSuccess) {
      this.reset();
    }
  }

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => {
      this.getEntities();
    });
  };

  handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
    }
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => {
        this.reset();
      }
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { medicineList, match } = this.props;
    return (
      <div>
        <h2 id="medicine-heading">
          <Translate contentKey="dhomoniApp.searchMedicine.home.title">Medicines</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="dhomoniApp.searchMedicine.home.createLabel">Create new Medicine</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={this.state.activePage}
            loadMore={this.handleLoadMore}
            hasMore={this.state.activePage - 1 < this.props.links.next}
            loader={<div className="loader">Loading ...</div>}
            threshold={0}
            initialLoad={false}
          >
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('tradeName')}>
                    <Translate contentKey="dhomoniApp.searchMedicine.tradeName">Trade Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('unitQuantity')}>
                    <Translate contentKey="dhomoniApp.searchMedicine.unitQuantity">Unit Quantity</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('genericName')}>
                    <Translate contentKey="dhomoniApp.searchMedicine.genericName">Generic Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('chemicalName')}>
                    <Translate contentKey="dhomoniApp.searchMedicine.chemicalName">Chemical Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('type')}>
                    <Translate contentKey="dhomoniApp.searchMedicine.type">Type</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('manufacturer')}>
                    <Translate contentKey="dhomoniApp.searchMedicine.manufacturer">Manufacturer</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('mrp')}>
                    <Translate contentKey="dhomoniApp.searchMedicine.mrp">Mrp</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('indications')}>
                    <Translate contentKey="dhomoniApp.searchMedicine.indications">Indications</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('doseAndAdmin')}>
                    <Translate contentKey="dhomoniApp.searchMedicine.doseAndAdmin">Dose And Admin</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('preparation')}>
                    <Translate contentKey="dhomoniApp.searchMedicine.preparation">Preparation</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('productUrl')}>
                    <Translate contentKey="dhomoniApp.searchMedicine.productUrl">Product Url</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('active')}>
                    <Translate contentKey="dhomoniApp.searchMedicine.active">Active</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {medicineList.map((medicine, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${medicine.id}`} color="link" size="sm">
                        {medicine.id}
                      </Button>
                    </td>
                    <td>{medicine.tradeName}</td>
                    <td>{medicine.unitQuantity}</td>
                    <td>{medicine.genericName}</td>
                    <td>{medicine.chemicalName}</td>
                    <td>
                      <Translate contentKey={`dhomoniApp.MedicineType.${medicine.type}`} />
                    </td>
                    <td>{medicine.manufacturer}</td>
                    <td>{medicine.mrp}</td>
                    <td>{medicine.indications}</td>
                    <td>{medicine.doseAndAdmin}</td>
                    <td>{medicine.preparation}</td>
                    <td>{medicine.productUrl}</td>
                    <td>{medicine.active ? 'true' : 'false'}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${medicine.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${medicine.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${medicine.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ medicine }: IRootState) => ({
  medicineList: medicine.entities,
  totalItems: medicine.totalItems,
  links: medicine.links,
  entity: medicine.entity,
  updateSuccess: medicine.updateSuccess
});

const mapDispatchToProps = {
  getEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Medicine);
