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
  Container,
  Collapse,
  CardBody,
  Card
} from 'reactstrap';

import { IRootState } from 'app/shared/reducers';

import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { searchEntities, reset } from './doctor.reducer';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import InfiniteScroll from 'react-infinite-scroller';
import DoctorCard from './doctor-card';

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
      <div>
        {doctorList.map((doctor, i) => (
          <DoctorCard doctor={doctor} />
        ))}
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
