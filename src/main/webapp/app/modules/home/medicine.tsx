import './medicine.scss';

import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { searchEntities, reset } from './medicine.reducer';
import { IMedicine } from 'app/shared/model/search/medicine.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IParamProps {
  query: string;
  currentLocation: any;
  searchRadius: number;
  onRef: Function;
}

export interface IMedicineProps extends StateProps, DispatchProps, IParamProps, RouteComponentProps<{ url: string }> {}

export type IMedicineState = IPaginationBaseState;

export class Medicine extends React.Component<IMedicineProps, IMedicineState> {
  state: IMedicineState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.props.onRef(this);
    this.reset();
  }

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => this.searchEntities());
  };

  handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      this.setState({ activePage: this.state.activePage + 1 }, () => this.searchEntities());
    }
  };

  searchEntities = () => {
    const { activePage, itemsPerPage } = this.state;
    const searchDTO = {
      query: this.props.query,
      location: this.props.currentLocation,
      radius: this.props.searchRadius
    };
    this.props.searchEntities(searchDTO, activePage - 1, itemsPerPage);
  };

  render() {
    const { medicineList, match } = this.props;
    return (
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
                <th>
                  <Translate contentKey="dhomoniApp.searchMedicine.tradeName">Trade Name</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchMedicine.unitQuantity">Unit Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchMedicine.genericName">Generic Name</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchMedicine.chemicalName">Chemical Name</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchMedicine.formulation">Formulation</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchMedicine.manufacturer">Manufacturer</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchMedicine.mrp">Mrp</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchMedicine.doseAndAdmin">Dose And Admin</Translate>{' '}
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchMedicine.preparation">Preparation</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchMedicine.productSite">Product Site</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {medicineList.map((medicine, i) => (
                <tr key={`entity-${i}`}>
                  <td>{medicine.tradeName}</td>
                  <td>{medicine.unitQuantity}</td>
                  <td>{medicine.genericName}</td>
                  <td>{medicine.chemicalName}</td>
                  <td>
                    <Translate contentKey={`dhomoniApp.Formulation.${medicine.formulation}`} />
                  </td>
                  <td>{medicine.manufacturer}</td>
                  <td>{medicine.mrp}</td>
                  <td>{medicine.doseAndAdmin}</td>
                  <td>{medicine.preparation}</td>
                  <td>
                    <div className="thumbnail-container" title="Thumbnail Image">
                      <div className="thumbnail">
                        <iframe src={medicine.productUrl} frameBorder="0" />
                      </div>
                    </div>
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/medicines/${medicine.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
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
    );
  }
}

const mapStateToProps = ({ searchMedicine }: IRootState) => ({
  medicineList: searchMedicine.entities,
  totalItems: searchMedicine.totalItems,
  links: searchMedicine.links
});

const mapDispatchToProps = {
  searchEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Medicine);
