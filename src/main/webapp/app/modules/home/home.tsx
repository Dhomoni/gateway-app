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
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import classnames from 'classnames';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Doctor from './doctor';
import Patient from './patient';
import Medicine from './medicine';
import Disease from './disease';

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IHomeState {
  query: string;
  currentLocation: any;
  searchRadius: number;
  locationError: string;
  dropdownOpen: boolean;
  dropDownSelectedText: string;
  doctor: any;
  patient: any;
  activeTab: string;
  medicine: any;
  disease: any;
}

export class Home extends React.Component<IHomeProp, IHomeState> {
  state: IHomeState = {
    query: '*',
    currentLocation: null,
    searchRadius: null,
    locationError: null,
    dropdownOpen: false,
    dropDownSelectedText: 'All',
    doctor: null,
    patient: null,
    medicine: null,
    disease: null,
    activeTab: 'doctor'
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
    if (this.state.doctor && this.state.activeTab === 'doctor') {
      this.state.doctor.reset();
    } else if (this.state.patient && this.state.activeTab === 'patient') {
      this.state.patient.reset();
    } else if (this.state.patient && this.state.activeTab === 'medicine') {
      this.state.medicine.reset();
    } else if (this.state.patient && this.state.activeTab === 'disease') {
      this.state.disease.reset();
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

  handleDoctorTabClick = () => {
    if (this.state.activeTab !== 'doctor') {
      this.setState({ activeTab: 'doctor' }, () => this.reset());
    }
  };

  handlePatientTabClick = () => {
    if (this.state.activeTab !== 'patient') {
      this.setState({ activeTab: 'patient' }, () => this.reset());
    }
  };

  handleMedicineTabClick = () => {
    if (this.state.activeTab !== 'medicine') {
      this.setState({ activeTab: 'medicine' }, () => this.reset());
    }
  };

  handleDiseaseTabClick = () => {
    if (this.state.activeTab !== 'disease') {
      this.setState({ activeTab: 'disease' }, () => this.reset());
    }
  };

  setDoctorRef = ref => this.setState({ doctor: ref });

  setPatientRef = ref => this.setState({ patient: ref });

  setMedicineRef = ref => this.setState({ medicine: ref });

  setDiseaseRef = ref => this.setState({ disease: ref });

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
        <this.renderTabContents />
      </div>
    );
  }

  renderTabContents = () => (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink className={classnames({ active: this.state.activeTab === 'doctor' })} onClick={this.handleDoctorTabClick}>
            Doctors
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={classnames({ active: this.state.activeTab === 'patient' })} onClick={this.handlePatientTabClick}>
            Patients
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={classnames({ active: this.state.activeTab === 'medicine' })} onClick={this.handleMedicineTabClick}>
            Medicines
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={classnames({ active: this.state.activeTab === 'disease' })} onClick={this.handleDiseaseTabClick}>
            Diseases
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="doctor">
          <Doctor
            onRef={this.setDoctorRef}
            query={this.state.query}
            currentLocation={this.state.currentLocation}
            searchRadius={this.state.searchRadius}
            {...this.props}
          />
        </TabPane>
        <TabPane tabId="patient">
          <Patient
            onRef={this.setPatientRef}
            query={this.state.query}
            currentLocation={this.state.currentLocation}
            searchRadius={this.state.searchRadius}
            {...this.props}
          />
        </TabPane>
        <TabPane tabId="medicine">
          <Medicine
            onRef={this.setMedicineRef}
            query={this.state.query}
            currentLocation={this.state.currentLocation}
            searchRadius={this.state.searchRadius}
            {...this.props}
          />
        </TabPane>
        <TabPane tabId="disease">
          <Disease
            onRef={this.setDiseaseRef}
            query={this.state.query}
            currentLocation={this.state.currentLocation}
            searchRadius={this.state.searchRadius}
            {...this.props}
          />
        </TabPane>
      </TabContent>
    </div>
  );

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
