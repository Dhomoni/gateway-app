import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate, translate, openFile, getSortState, IPaginationBaseState } from 'react-jhipster';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Alert,
  Button,
  Table,
  InputGroup,
  FormGroup,
  InputGroupAddon,
  Input,
  Form,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from 'reactstrap';

import { IRootState } from 'app/shared/reducers';

import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { searchEntities, reset } from './doctor.reducer';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import InfiniteScroll from 'react-infinite-scroller';

export interface IParamProps {
  query: string;
  currentLocation: any;
  searchRadius: number;
  onRef: Function;
}

export interface IDoctorProps extends StateProps, DispatchProps, IParamProps, RouteComponentProps<{ url: string }> {}

export type IDoctorState = IPaginationBaseState;

export class Doctor extends React.Component<IDoctorProps, IDoctorState> {
  state: IDoctorState = {
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
    const { doctorList, match } = this.props;
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
                  <Translate contentKey="dhomoniApp.searchDoctor.image">Image</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchDoctor.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchDoctor.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchDoctor.phone">Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchDoctor.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchDoctor.designation">Designation</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchDoctor.institute">Institute</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchDoctor.speciality">Speciality</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchDoctor.medicalDepartment">Medical Department</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchDoctor.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="dhomoniApp.searchDoctor.distance">Distance</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {doctorList.map((doctor, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    {doctor.image ? (
                      <div>
                        <a onClick={openFile(doctor.imageContentType, doctor.image)}>
                          <img src={`data:${doctor.imageContentType};base64,${doctor.image}`} style={{ maxHeight: '30px' }} />
                          &nbsp;
                        </a>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {doctor.firstName} {doctor.lastName}
                  </td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phone}</td>
                  <td>
                    <Translate contentKey={`dhomoniApp.DoctorType.${doctor.type}`} />
                  </td>
                  <td>{doctor.designation}</td>
                  <td>{doctor.institute}</td>
                  <td>{doctor.speciality}</td>
                  <td>{doctor.medicalDepartment ? doctor.medicalDepartment.name : ''}</td>
                  <td>{doctor.chambers ? doctor.chambers[0].address : ''}</td>
                  <td>{doctor.chambers && doctor.chambers[0].distanceInKM ? doctor.chambers[0].distanceInKM.toFixed(2) + ' km' : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/doctors/${doctor.id}`} color="info" size="sm">
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

  renderLoggedInDataHomePageData = ({ account }) => {
    if (account && account.login) {
      return (
        <div>
          <Alert color="success">
            <Translate contentKey="home.logged.message" interpolate={{ name: account.firstName }}>
              Welcome, {account.login}!
            </Translate>
          </Alert>
        </div>
      );
    }
    return null;
  };
}

const mapStateToProps = ({ searchDoctor }: IRootState) => ({
  doctorList: searchDoctor.entities,
  totalItems: searchDoctor.totalItems,
  links: searchDoctor.links
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
)(Doctor);
