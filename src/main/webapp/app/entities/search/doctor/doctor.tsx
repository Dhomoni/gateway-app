import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './doctor.reducer';
import { IDoctor } from 'app/shared/model/search/doctor.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IDoctorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IDoctorState = IPaginationBaseState;

export class Doctor extends React.Component<IDoctorProps, IDoctorState> {
  state: IDoctorState = {
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
    const { doctorList, match } = this.props;
    return (
      <div>
        <h2 id="doctor-heading">
          <Translate contentKey="dhomoniApp.searchDoctor.home.title">Doctors</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="dhomoniApp.searchDoctor.home.createLabel">Create new Doctor</Translate>
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
                  <th className="hand" onClick={this.sort('registrationId')}>
                    <Translate contentKey="dhomoniApp.searchDoctor.registrationId">Registration Id</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('firstName')}>
                    <Translate contentKey="dhomoniApp.searchDoctor.firstName">First Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('lastName')}>
                    <Translate contentKey="dhomoniApp.searchDoctor.lastName">Last Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('email')}>
                    <Translate contentKey="dhomoniApp.searchDoctor.email">Email</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('phone')}>
                    <Translate contentKey="dhomoniApp.searchDoctor.phone">Phone</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('licenceNumber')}>
                    <Translate contentKey="dhomoniApp.searchDoctor.licenceNumber">Licence Number</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('nationalId')}>
                    <Translate contentKey="dhomoniApp.searchDoctor.nationalId">National Id</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('passportNo')}>
                    <Translate contentKey="dhomoniApp.searchDoctor.passportNo">Passport No</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('type')}>
                    <Translate contentKey="dhomoniApp.searchDoctor.type">Type</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('designation')}>
                    <Translate contentKey="dhomoniApp.searchDoctor.designation">Designation</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('institute')}>
                    <Translate contentKey="dhomoniApp.searchDoctor.institute">Institute</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('speciality')}>
                    <Translate contentKey="dhomoniApp.searchDoctor.speciality">Speciality</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('description')}>
                    <Translate contentKey="dhomoniApp.searchDoctor.description">Description</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('address')}>
                    <Translate contentKey="dhomoniApp.searchDoctor.address">Address</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('image')}>
                    <Translate contentKey="dhomoniApp.searchDoctor.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('activated')}>
                    <Translate contentKey="dhomoniApp.searchDoctor.activated">Activated</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="dhomoniApp.searchDoctor.medicalDepartment">Medical Department</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {doctorList.map((doctor, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${doctor.id}`} color="link" size="sm">
                        {doctor.id}
                      </Button>
                    </td>
                    <td>{doctor.registrationId}</td>
                    <td>{doctor.firstName}</td>
                    <td>{doctor.lastName}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.licenceNumber}</td>
                    <td>{doctor.nationalId}</td>
                    <td>{doctor.passportNo}</td>
                    <td>
                      <Translate contentKey={`dhomoniApp.DoctorType.${doctor.type}`} />
                    </td>
                    <td>{doctor.designation}</td>
                    <td>{doctor.institute}</td>
                    <td>{doctor.speciality}</td>
                    <td>{doctor.description}</td>
                    <td>{doctor.address}</td>
                    <td>
                      {doctor.image ? (
                        <div>
                          <a onClick={openFile(doctor.imageContentType, doctor.image)}>
                            <img src={`data:${doctor.imageContentType};base64,${doctor.image}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                          <span>
                            {doctor.imageContentType}, {byteSize(doctor.image)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{doctor.activated ? 'true' : 'false'}</td>
                    <td>
                      {doctor.medicalDepartment ? (
                        <Link to={`medical-department/${doctor.medicalDepartment.id}`}>{doctor.medicalDepartment.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${doctor.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${doctor.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${doctor.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ doctor }: IRootState) => ({
  doctorList: doctor.entities,
  totalItems: doctor.totalItems,
  links: doctor.links,
  entity: doctor.entity,
  updateSuccess: doctor.updateSuccess
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
)(Doctor);
