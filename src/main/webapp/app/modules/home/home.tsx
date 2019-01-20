 import './home.scss';

import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate, translate, openFile, byteSize, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert, Button, Table, InputGroup, FormGroup, InputGroupAddon, Input, Form } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { searchEntities, reset } from 'app/entities/search/doctor/doctor.reducer';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import InfiniteScroll from 'react-infinite-scroller';

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IHomeState extends IPaginationBaseState {
    query: string;
}

export class Home extends React.Component<IHomeProp, IHomeState> {
  state: IHomeState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    query: '*'
  };

  componentDidMount() {
    this.reset();
    this.props.getSession();
  }

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => this.searchEntities(this.state.query));
  };

  handleValidSubmit = event => {
    this.reset();
    event.preventDefault();
  }

  setQuery = event => {
    this.setState({ query: event.target.value });
  }

  handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      this.setState({ activePage: this.state.activePage + 1 }, () => this.searchEntities(this.state.query));
    }
  };

  searchEntities = query => {
    const { activePage, itemsPerPage } = this.state;
    this.props.searchEntities(query, activePage - 1, itemsPerPage);
  };

  render() {
    const { doctorList, account, match } = this.props;
    console.log(JSON.stringify(doctorList));
    return (
      <div>
        <h2 id="doctor-heading">
          <Translate contentKey="dhomoniApp.searchDoctor.home.title">Doctors</Translate>
        </h2>
        <Form id="register-form" onSubmit={this.handleValidSubmit}>
          <FormGroup row>
            <Col sm="5">
              <Input name="query" onChange={this.setQuery} placeholder={translate('home.query.placeholder')}/>
            </Col>
            <Button color="primary" type="submit">
              <FontAwesomeIcon icon="search" />
            </Button>
          </FormGroup>
        </Form>
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
                  <th className="hand">
                    <Translate contentKey="dhomoniApp.searchDoctor.firstName">First Name</Translate>
                  </th>
                  <th className="hand">
                    <Translate contentKey="dhomoniApp.searchDoctor.lastName">Last Name</Translate>
                  </th>
                  <th className="hand">
                    <Translate contentKey="dhomoniApp.searchDoctor.email">Email</Translate>
                  </th>
                  <th className="hand">
                    <Translate contentKey="dhomoniApp.searchDoctor.phone">Phone</Translate>
                  </th>
                  <th className="hand">
                    <Translate contentKey="dhomoniApp.searchDoctor.type">Type</Translate>
                  </th>
                  <th className="hand">
                    <Translate contentKey="dhomoniApp.searchDoctor.designation">Designation</Translate>
                  </th>
                  <th className="hand">
                    <Translate contentKey="dhomoniApp.searchDoctor.image">Image</Translate>
                  </th>
                  <th>
                    <Translate contentKey="dhomoniApp.searchDoctor.medicalDepartment">Medical Department</Translate>{' '}
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {doctorList.map((doctor, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{doctor.firstName}</td>
                    <td>{doctor.lastName}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.phone}</td>
                    <td>
                      <Translate contentKey={`dhomoniApp.DoctorType.${doctor.type}`} />
                    </td>
                    <td>{doctor.designation}</td>
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
                    <td>
                      {doctor.medicalDepartment ? doctor.medicalDepartment.name : ''}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${doctor.id}`} color="info" size="sm">
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
      </div>
    );

{/*    return (
      <Row>
        <Col md="9">

          <h2>
            <Translate contentKey="home.title">Welcome, Java Hipster!</Translate>
          </h2>
          <p className="lead">
            <Translate contentKey="home.subtitle">This is your homepage</Translate>
          </p>

          { account && account.login ? this.renderLoggedInDataHomePageData(account) : this.renderLoggedOutHomePageData(account) }

          <p>
            <Translate contentKey="home.question">If you have any question on JHipster:</Translate>
          </p>

          <ul>
            <li>
              <a href="https://www.jhipster.tech/" target="_blank" rel="noopener noreferrer">
                <Translate contentKey="home.link.homepage">JHipster homepage</Translate>
              </a>
            </li>
            <li>
              <a href="http://stackoverflow.com/tags/jhipster/info" target="_blank" rel="noopener noreferrer">
                <Translate contentKey="home.link.stackoverflow">JHipster on Stack Overflow</Translate>
              </a>
            </li>
            <li>
              <a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" rel="noopener noreferrer">
                <Translate contentKey="home.link.bugtracker">JHipster bug tracker</Translate>
              </a>
            </li>
            <li>
              <a href="https://gitter.im/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
                <Translate contentKey="home.link.chat">JHipster public chat room</Translate>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/java_hipster" target="_blank" rel="noopener noreferrer">
                <Translate contentKey="home.link.follow">follow @java_hipster on Twitter</Translate>
              </a>
            </li>
          </ul>

          <p>
            <Translate contentKey="home.like">If you like JHipster, do not forget to give us a star on</Translate>{' '}
            <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
              Github
            </a>
            !
          </p>

        </Col>
        <Col md="3" className="pad">
          <span className="hipster rounded" />
        </Col>
      </Row>
    );
*/}
  }

  renderLoggedOutHomePageData = ({ account }) =>
    (
      <div>
        <Alert color="warning">
          <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
          <Link to="/login" className="alert-link">
            <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
          </Link>
          <Translate contentKey="global.messages.info.authenticated.suffix">
            , you can try the default accounts:
            <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
            <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
          </Translate>
        </Alert>

        <Alert color="warning">
          <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>
          &nbsp;
          <Link to="/register" className="alert-link">
            <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
          </Link>
        </Alert>
      </div>
    );

  renderLoggedInDataHomePageData = ({ account }) =>
    (
      <div>
        <Alert color="success">
          <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
            Welcome, {account.login}!
          </Translate>
        </Alert>
      </div>
    );
}

// const mapStateToProps = storeState => ({
//   account: storeState.authentication.account,
//   isAuthenticated: storeState.authentication.isAuthenticated
// });

const mapStateToProps = ({ authentication, doctor }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  doctorList: doctor.entities,
  totalItems: doctor.totalItems,
  links: doctor.links
});

const mapDispatchToProps = {
  getSession,
  searchEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
