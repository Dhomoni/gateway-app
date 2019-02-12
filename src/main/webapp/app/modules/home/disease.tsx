import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { searchEntities, reset } from './disease.reducer';
import { IDisease } from 'app/shared/model/search/disease.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IParamProps {
  query: string;
  currentLocation: any;
  searchRadius: number;
  onRef: Function;
}

export interface IDiseaseProps extends StateProps, DispatchProps, IParamProps, RouteComponentProps<{ url: string }> {}

export type IDiseaseState = IPaginationBaseState;

export class Disease extends React.Component<IDiseaseProps, IDiseaseState> {
  state: IDiseaseState = {
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
    const { diseaseList, match } = this.props;
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
                  <Translate contentKey="dhomoniApp.searchDisease.medicalName">Medical Name</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchDisease.generalName">General Name</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchDisease.medicalDepartment">Medical Department</Translate>{' '}
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {diseaseList.map((disease, i) => (
                <tr key={`entity-${i}`}>
                  <td>{disease.medicalName}</td>
                  <td>{disease.generalName}</td>
                  <td>{disease.medicalDepartment ? disease.medicalDepartment.name : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/diseases/${disease.id}`} color="info" size="sm">
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

const mapStateToProps = ({ searchDisease }: IRootState) => ({
  diseaseList: searchDisease.entities,
  totalItems: searchDisease.totalItems,
  links: searchDisease.links
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
)(Disease);
