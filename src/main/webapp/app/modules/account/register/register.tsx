import './register.scss';
import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button, Label } from 'reactstrap';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';
import { AUTHORITIES, SEX, BLOODGROUP } from 'app/config/constants';
import ImageUpload from 'app/shared/component/image-upload';
import PointMap from 'app/shared/component/location-map';
import DatePicker from 'react-datepicker';

export interface IRegisterProps extends StateProps, DispatchProps {}

export interface IRegisterState {
  password: string;
  selectedUserType: string[];
  image: string;
  imageContentType: string;
  lat: number;
  lng: number;
  address: string;
  birthTimestamp: number;
}

export class RegisterPage extends React.Component<IRegisterProps, IRegisterState> {
  state: IRegisterState = {
    password: '',
    selectedUserType: [AUTHORITIES.PATIENT, AUTHORITIES.USER],
    image: '',
    imageContentType: '',
    lat: null,
    lng: null,
    address: '',
    birthTimestamp: null
  };

  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    const account = {
      ...values,
      password: this.state.password,
      authorities: this.state.selectedUserType,
      langKey: this.props.currentLocale,
      image: this.state.image,
      imageContentType: this.state.imageContentType,
      address: this.state.address,
      location: {
        type: 'Point',
        'coordinates': [this.state.lat, this.state.lng]
      },
      patientDTO: {
        ...values,
        birthTimestamp: this.state.birthTimestamp / 1000.0
      },
      doctorDTO: {
        ...values,
        professionalDegrees: [{
          name: values.degreeName,
          institute: values.degreeInstitute,
          country: values.degreeCountry,
          enrollmentYear: values.degreeEnrollmentYear,
          passingYear: values.degreePassingYear
        }]
      }
    };
    this.props.handleRegister(account);
    event.preventDefault();
  };

  updatePassword = event =>
    this.setState({ password: event.target.value });

  onDropdownSelected = event =>
    this.setState({ selectedUserType: [AUTHORITIES.USER, event.target.value] });

  imageUploadCallback = (data, contentType) =>
    this.setState({ image: data, imageContentType: contentType });

  onLocationPickEnd = (latlng, addr) =>
    this.setState({ lat: latlng.lat, lng: latlng.lng, address: addr });

  handleDateChange = date =>
    this.setState({ birthTimestamp: date.getTime() });

  render() {
    const userTypeOptions = [{ value: AUTHORITIES.PATIENT, label: 'User' }, { value: AUTHORITIES.DOCTOR, label: 'Doctor' }];
    const userTypes = userTypeOptions.map(userType => (
      <option key={userType.value} value={userType.value}>
        {userType.label}
      </option>
    ));

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h1 id="register-title">
              <Translate contentKey="register.title">Registration</Translate>
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            <AvForm id="register-form" onValidSubmit={this.handleValidSubmit}>
              <AvField
                name="usertype"
                type="select"
                onChange={this.onDropdownSelected}
                label={translate('global.form.accounttype')}
              >
                {userTypes}
              </AvField>
              <AvField
                name="login"
                label={translate('global.form.username')}
                placeholder={translate('global.form.username.placeholder')}
                validate={{
                  required: { value: true, errorMessage: translate('register.messages.validate.login.required') },
                  pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: translate('register.messages.validate.login.pattern') },
                  minLength: { value: 1, errorMessage: translate('register.messages.validate.login.minlength') },
                  maxLength: { value: 50, errorMessage: translate('register.messages.validate.login.maxlength') }
                }}
              />
              <AvField
                name="firstPassword"
                label={translate('global.form.newpassword')}
                placeholder={translate('global.form.newpassword.placeholder')}
                type="password"
                onChange={this.updatePassword}
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                  minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                  maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') }
                }}
              />
              <PasswordStrengthBar password={this.state.password} />
              <AvField
                name="secondPassword"
                label={translate('global.form.confirmpassword')}
                placeholder={translate('global.form.confirmpassword.placeholder')}
                type="password"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.confirmpassword.required') },
                  minLength: { value: 4, errorMessage: translate('global.messages.validate.confirmpassword.minlength') },
                  maxLength: { value: 50, errorMessage: translate('global.messages.validate.confirmpassword.maxlength') },
                  match: { value: 'firstPassword', errorMessage: translate('global.messages.error.dontmatch') }
                }}
              />
              <AvField
                name="firstName"
                label={translate('global.form.firstname')}
                placeholder={translate('global.form.firstname.placeholder')}
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.firstname.required') }
                }}
              />
              <AvField
                name="lastName"
                label={translate('global.form.lastname')}
                placeholder={translate('global.form.lastname.placeholder')}
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.lastname.required') }
                }}
              />
              <AvField
                name="email"
                label={translate('global.form.email')}
                placeholder={translate('global.form.email.placeholder')}
                type="email"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                  minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                  maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') }
                }}
              />
              <AvField
                name="phone"
                label={translate('global.form.phone')}
                placeholder={translate('global.form.phone.placeholder')}
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.phone.required') },
                  pattern: { value: '^(?:[0-9] ?){6,14}[0-9]$', errorMessage: translate('global.messages.validate.phone.pattern') }
                }}
              />
              <this.renderExtraRegData selectedUserType={this.state.selectedUserType} />
              <PointMap onLocationPickEnd={this.onLocationPickEnd}/>
              <AvField
                name="address"
                label={translate('global.form.address')}
                placeholder={translate('global.form.address.placeholder')}
                value={this.state.address}
              />
              <ImageUpload onPreviewLoadEnd={this.imageUploadCallback} />
              <Button id="register-submit" color="primary" type="submit">
                <Translate contentKey="register.form.button">Register</Translate>
              </Button>
            </AvForm>
            <p>&nbsp;</p>
          </Col>
        </Row>
      </div>
    );
  }

  renderExtraRegData = props => {
    const selectedUserType = props.selectedUserType;
    if (selectedUserType.includes(AUTHORITIES.DOCTOR)) {
      return <this.renderDoctorRegData />;
    } else if (selectedUserType.includes(AUTHORITIES.PATIENT)) {
      return <this.renderPatientRegData />;
    }
    return null;
  };

  renderPatientRegData = props => {
    const sexTypeOptions = [{ value: SEX.MALE, label: 'Male' }, { value: SEX.FEMALE, label: 'Female' }];
    const sexTypes = sexTypeOptions.map(sexType => (
      <option key={sexType.value} value={sexType.value}>
        {sexType.label}
      </option>
    ));

    const bloodGroupOptions = [{ value: BLOODGROUP.A_POSITIVE, label: 'A+' },
                               { value: BLOODGROUP.A_NEGATIVE, label: 'A-' },
                               { value: BLOODGROUP.B_POSITIVE, label: 'B+' },
                               { value: BLOODGROUP.B_NEGATIVE, label: 'B-' },
                               { value: BLOODGROUP.AB_POSITIVE, label: 'AB+' },
                               { value: BLOODGROUP.AB_NEGATIVE, label: 'AB-' },
                               { value: BLOODGROUP.O_NEGATIVE, label: 'O+' },
                               { value: BLOODGROUP.O_POSITIVE, label: 'O-' }];
    const bloodGroups = bloodGroupOptions.map(bloodGroup => (
      <option key={bloodGroup.value} value={bloodGroup.value}>
        {bloodGroup.label}
      </option>
    ));

    return (
      <div>
        <Label>{translate('global.form.birthdate')}</Label>
        <div>
          <DatePicker selected={this.state.birthTimestamp} onChange={this.handleDateChange} />
        </div>
        <AvField
          name="bloodGroup"
          type="select"
          label={translate('global.form.bloodgroup')}
          value={BLOODGROUP.A_NEGATIVE}
        >
          {bloodGroups}
        </AvField>
        <AvField
          name="sex"
          type="select"
          label={translate('global.form.sex')}
          value={SEX.MALE}
        >
          {sexTypes}
        </AvField>
        <AvField
          name="weightInKG"
          label={translate('global.form.weight')}
          placeholder={translate('global.form.weight.placeholder')}
          validate={{
            min: { value: 0, errorMessage: translate('global.messages.validate.weight.min') },
            max: { value: 300, errorMessage: translate('global.messages.validate.weight.max') }
          }}
        />
        <AvField
          name="heightInInch"
          label={translate('global.form.height')}
          placeholder={translate('global.form.height.placeholder')}
          validate={{
            min: { value: 0, errorMessage: translate('global.messages.validate.height.min') },
            max: { value: 120, errorMessage: translate('global.messages.validate.height.max') }
          }}
        />
      </div>
    );
  }

  renderDoctorRegData = props => (
    <div>
      <AvField
        name="licenceNumber"
        label={translate('global.form.licencenumber')}
        placeholder={translate('global.form.licencenumber.placeholder')}
      />
      <AvField
        name="nationalId"
        label={translate('global.form.nationalid')}
        placeholder={translate('global.form.nationalid.placeholder')}
      />
      <AvField
        name="passportNo"
        label={translate('global.form.passportno')}
        placeholder={translate('global.form.passportno.placeholder')}
      />
      <AvField
        name="designation"
        label={translate('global.form.designation')}
        placeholder={translate('global.form.designation.placeholder')}
      />
      <AvField
        name="description"
        label={translate('global.form.description')}
        placeholder={translate('global.form.description.placeholder')}
      />
      <AvField
        name="degreeName"
        label={translate('global.form.degreename')}
        placeholder={translate('global.form.degreename.placeholder')}
        value={'MBBS'}
        readOnly
      />
      <AvField
        name="degreeInstitute"
        label={translate('global.form.degreeinstitute')}
        placeholder={translate('global.form.degreeinstitute.placeholder')}
        validate={{
          required: { value: true, errorMessage: translate('global.messages.validate.degreeinstitute.required') }
        }}
      />
      <AvField
        name="degreeCountry"
        label={translate('global.form.degreecountry')}
        placeholder={translate('global.form.degreecountry.placeholder')}
        validate={{
          required: { value: true, errorMessage: translate('global.messages.validate.degreecountry.required') }
        }}
      />
      <AvField
        name="degreeEnrollmentYear"
        label={translate('global.form.degreeenrollmentyear')}
        placeholder={translate('global.form.degreeenrollmentyear.placeholder')}
        validate={{
          required: { value: true, errorMessage: translate('global.messages.validate.degreeenrollmentyear.required') },
          min: { value: 1900, errorMessage: translate('global.messages.validate.degreeenrollmentyear.min') },
          max: { value: 3000, errorMessage: translate('global.messages.validate.degreeenrollmentyear.max') }
        }}
      />
      <AvField
        name="degreePassingYear"
        label={translate('global.form.degreepassingyear')}
        placeholder={translate('global.form.degreepassingyear.placeholder')}
        validate={{
          required: { value: true, errorMessage: translate('global.messages.validate.degreepassingyear.required') },
          min: { value: 1900, errorMessage: translate('global.messages.validate.degreepassingyear.min') },
          max: { value: 3000, errorMessage: translate('global.messages.validate.degreepassingyear.max') }
        }}
      />
    </div>
  );
}

const mapStateToProps = ({ locale }: IRootState) => ({
  currentLocale: locale.currentLocale
});
const mapDispatchToProps = { handleRegister, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
