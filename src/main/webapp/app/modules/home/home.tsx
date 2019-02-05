import './home.scss';

import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
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
import { getSession } from 'app/shared/reducers/authentication';

import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Doctor from './doctor';

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IHomeState {
  query: string;
  currentLocation: any;
  searchRadius: number;
  locationError: string;
  dropdownOpen: boolean;
  dropDownSelectedText: string;
  doctor: any;
}

export class Home extends React.Component<IHomeProp, IHomeState> {
  state: IHomeState = {
    query: '*',
    currentLocation: null,
    searchRadius: null,
    locationError: null,
    dropdownOpen: false,
    dropDownSelectedText: 'All',
    doctor: null
  };

  componentDidMount() {
    this.requestLocation();
    this.reset();
    this.props.getSession();
  }

  // https://micropyramid.com/blog/tracking-location-using-react-native-in-android/
  requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => this.handleLocationSuccess(position),
        error => this.setState({ locationError: error.message })
      );
    }
  };

  handleLocationSuccess = position => {
    this.setState(
      {
        currentLocation: {
          type: 'Point',
          coordinates: [position.coords.longitude, position.coords.latitude]
        },
        searchRadius: 20.0,
        dropDownSelectedText: 'Nearby'
      },
      () => this.reset()
    );
  };

  reset = () => {
    if (this.state.doctor) {
      this.state.doctor.reset();
    }
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleButtonClick(event);
    }
  };

  handleButtonClick = event => {
    this.reset();
    event.preventDefault();
  };

  setQuery = event => {
    this.setState({
      query: (event.target.value = '' ? '*' : event.target.value)
    });
  };

  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  handleDropdownItemClick = event => {
    if (this.state.dropDownSelectedText === 'All' && event.target.innerText === 'Nearby' && !this.state.currentLocation) {
      this.requestLocation();
    } else {
      this.setState({
        dropDownSelectedText: event.target.innerText,
        searchRadius: event.currentTarget.getAttribute('dropDownValue')
      });
    }
  };

  setDoctorRef = ref => this.setState({ doctor: ref });

  render() {
    const { account } = this.props;
    return (
      <div>
        <this.renderLoggedInDataHomePageData account={account} />
        <Container fluid>
          <Row>
            <Col md="6" className="col-no-padding">
              <Input
                name="query"
                onChange={this.setQuery}
                onKeyPress={this.handleKeyPress}
                placeholder={translate('home.query.placeholder')}
              />
            </Col>
            <Col md="auto" className="col-no-padding">
              <Button color="primary" onClick={this.handleButtonClick}>
                <FontAwesomeIcon icon="search" />
              </Button>
            </Col>
            <Col md="auto" className="col-no-padding">
              <InputGroupButtonDropdown color="primary" addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                <DropdownToggle className="text-muted" color="grey" split>
                  {this.state.dropDownSelectedText}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.handleDropdownItemClick} dropDownValue="20">
                    Nearby
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.handleDropdownItemClick}>All</DropdownItem>
                </DropdownMenu>
              </InputGroupButtonDropdown>
            </Col>
          </Row>
        </Container>
        <Doctor
          onRef={this.setDoctorRef}
          query={this.state.query}
          currentLocation={this.state.currentLocation}
          searchRadius={this.state.searchRadius}
          {...this.props}
        />
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

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = {
  getSession
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
