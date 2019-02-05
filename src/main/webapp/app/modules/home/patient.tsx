import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { searchEntities, reset } from './patient.reducer';
import { IPatient } from 'app/shared/model/search/patient.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IParamProps {
  query: string;
  currentLocation: any;
  searchRadius: number;
  onRef: Function;
}

export interface IPatientProps extends StateProps, DispatchProps, IParamProps, RouteComponentProps<{ url: string }> {}

export type IPatientState = IPaginationBaseState;

export class Patient extends React.Component<IPatientProps, IPatientState> {
  state: IPatientState = {
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
    const { patientList, match } = this.props;
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
                  <Translate contentKey="dhomoniApp.searchPatient.image">Image</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchPatient.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchPatient.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchPatient.phone">Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchPatient.sex">Sex</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchPatient.birthTimestamp">Birth Timestamp</Translate>{' '}
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchPatient.bloodGroup">Blood Group</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchPatient.weightInKG">Weight In KG</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchPatient.heightInInch">Height In Inch</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchPatient.address">Address</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {patientList.map((patient, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    {patient.image ? (
                      <div>
                        <a onClick={openFile(patient.imageContentType, patient.image)}>
                          <img src={`data:${patient.imageContentType};base64,${patient.image}`} style={{ maxHeight: '30px' }} />
                          &nbsp;
                        </a>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>
                    <Translate contentKey={`dhomoniApp.Sex.${patient.sex}`} />
                  </td>
                  <td>
                    <TextFormat type="date" value={patient.birthTimestamp} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <Translate contentKey={`dhomoniApp.BloodGroup.${patient.bloodGroup}`} />
                  </td>
                  <td>{patient.weightInKG}</td>
                  <td>{patient.heightInInch}</td>
                  <td>{patient.address}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${patient.id}`} color="info" size="sm">
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

const mapStateToProps = ({ searchPatient }: IRootState) => ({
  patientList: searchPatient.entities,
  totalItems: searchPatient.totalItems,
  links: searchPatient.links
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
)(Patient);
