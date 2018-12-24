import React from 'react';
import { Button, Col, Alert, Row, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { locales, languages } from 'app/config/translation';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';
import { AUTHORITIES, SEX, BLOODGROUP } from 'app/config/constants';
import ImageUpload from 'app/shared/component/image-upload';
import PointMap from 'app/shared/component/location-map';
import DatePicker from 'react-datepicker';

export interface IUserSettingsProps extends StateProps, DispatchProps {}

export interface IUserSettingsState {
  image: string;
  imageContentType: string;
  lat: number;
  lng: number;
  address: string;
  birthTimestamp: number;
}

export class SettingsPage extends React.Component<IUserSettingsProps, IUserSettingsState> {
  state: IUserSettingsState = {
    ...this.props.account,
    lat: this.props.account.location === null ? PointMap.defaultProps.latlng.lat : this.props.account.location.coordinates[0],
    lng: this.props.account.location === null ? PointMap.defaultProps.latlng.lng : this.props.account.location.coordinates[1]
  };

  componentDidMount() {
    this.props.getSession();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    const account = {
      ...this.props.account,
      ...values,
      image: this.state.image,
      imageContentType: this.state.imageContentType,
      location: { type: 'Point', 'coordinates': [this.state.lat, this.state.lng] },
      birthTimestamp: this.state.birthTimestamp / 1000.0
    };
    this.props.saveAccountSettings(account);
    event.persist();
  };

  imageUploadCallback = (data, contentType) =>
    this.setState({ image: data, imageContentType: contentType });

  onLocationPickEnd = (latlng, addr) =>
    this.setState({ lat: latlng.lat, lng: latlng.lng, address: addr });

  handleDateChange = date =>
    this.setState({ birthTimestamp: date.getTime() });

  render() {
    const { account } = this.props;
    const fileURL = (this.state.imageContentType && this.state.image)
                      ? 'data:' + this.state.imageContentType + ';base64,' + this.state.image
                      : null;
    const sexTypeOptions = [{ value: SEX.MALE, label: 'Male' }, { value: SEX.FEMALE, label: 'Female' }];
    const sexTypes = sexTypeOptions.map(sexType => (
      <option key={sexType.value} value={sexType.value}>
        {sexType.label}
      </option>
    ));

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="settings-title">
              <Translate contentKey="settings.title" interpolate={{ username: account.login }}>
                User settings for {account.login}
              </Translate>
            </h2>
            <AvForm id="settings-form" onValidSubmit={this.handleValidSubmit}>
              {/* First name */}
              <AvField
                className="form-control"
                name="firstName"
                label={translate('settings.form.firstname')}
                id="firstName"
                placeholder={translate('settings.form.firstname.placeholder')}
                validate={{
                  required: { value: true, errorMessage: translate('settings.messages.validate.firstname.required') },
                  minLength: { value: 1, errorMessage: translate('settings.messages.validate.firstname.minlength') },
                  maxLength: { value: 50, errorMessage: translate('settings.messages.validate.firstname.maxlength') }
                }}
                value={account.firstName}
              />
              {/* Last name */}
              <AvField
                className="form-control"
                name="lastName"
                label={translate('settings.form.lastname')}
                id="lastName"
                placeholder={translate('settings.form.lastname.placeholder')}
                validate={{
                  required: { value: true, errorMessage: translate('settings.messages.validate.lastname.required') },
                  minLength: { value: 1, errorMessage: translate('settings.messages.validate.lastname.minlength') },
                  maxLength: { value: 50, errorMessage: translate('settings.messages.validate.lastname.maxlength') }
                }}
                value={account.lastName}
              />
              {/* Email */}
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
                value={account.email}
              />
              {/* Phone */}
              <AvField
                name="phone"
                label={translate('global.form.phone')}
                placeholder={translate('global.form.phone.placeholder')}
                id="phone"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.phone.required') },
                  pattern: { value: '^(?:[0-9] ?){6,14}[0-9]$', errorMessage: translate('global.messages.validate.phone.pattern') }
                }}
                value={account.phone}
              />
              {/* Language key */}
              <AvField
                type="select"
                id="langKey"
                name="langKey"
                className="form-control"
                label={translate('settings.form.language')}
                value={account.langKey}
              >
                {locales.map(locale => (
                  <option value={locale} key={locale}>
                    {languages[locale].name}
                  </option>
                ))}
              </AvField>
              <this.renderExtraRegData account={account} />
              <PointMap
                latlng={{ lat: this.state.lat, lng: this.state.lng }}
                onLocationPickEnd={this.onLocationPickEnd}/>
              <AvField
                name="address"
                label={translate('global.form.address')}
                placeholder={translate('global.form.address.placeholder')}
                value={this.state.address}
              />
              <ImageUpload onPreviewLoadEnd={this.imageUploadCallback} initFileURL={fileURL} />
              <Button color="primary" type="submit">
                <Translate contentKey="settings.form.button">Save</Translate>
              </Button>
            </AvForm>
          </Col>
        </Row>
      </div>
    );
  }

  renderExtraRegData = ({ account }) => {
    if (account.authorities.includes(AUTHORITIES.DOCTOR)) {
      return <this.renderDoctorRegData account={account}/>;
    } else if (account.authorities.includes(AUTHORITIES.PATIENT)) {
      return <this.renderPatientRegData account={account}/>;
    }
    return null;
  };

  renderPatientRegData = ({ account }) => {
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
          <DatePicker selected={account.patientDTO.birthTimestamp} onChange={this.handleDateChange} />
        </div>
        <AvField
          name="bloodGroup"
          type="select"
          label={translate('global.form.bloodgroup')}
          value={account.patientDTO.bloodGroup}
        >
          {bloodGroups}
        </AvField>
        <AvField
          name="sex"
          type="select"
          label={translate('global.form.sex')}
          value={account.patientDTO.sex}
        >
          {sexTypes}
        </AvField>
        <AvField
          name="weightInKG"
          label={translate('global.form.weight')}
          placeholder={translate('global.form.weight.placeholder')}
          validate={{
            min: { value: 0, errorMessage: translate('register.messages.validate.weight.minlength') },
            max: { value: 300, errorMessage: translate('register.messages.validate.weight.maxlength') }
          }}
          value={account.patientDTO.weightInKG}
        />
        <AvField
          name="heightInInch"
          label={translate('global.form.height')}
          placeholder={translate('global.form.height.placeholder')}
          validate={{
            min: { value: 0, errorMessage: translate('register.messages.validate.height.minlength') },
            max: { value: 120, errorMessage: translate('register.messages.validate.height.maxlength') }
          }}
          value={account.patientDTO.heightInInch}
        />
      </div>
    );
  }

  renderDoctorRegData = ({ account }) => {
    if (account.authorities.includes(AUTHORITIES.DOCTOR)) {
      return (
        <div>
          <AvField
            name="licenceNumber"
            label={translate('global.form.licencenumber')}
            placeholder={translate('global.form.licencenumber.placeholder')}
            value={account.doctorDTO.licenceNumber}
          />
          <AvField
            name="nationalId"
            label={translate('global.form.nationalid')}
            placeholder={translate('global.form.nationalid.placeholder')}
            value={account.doctorDTO.nationalId}
          />
          <AvField
            name="passportNo"
            label={translate('global.form.passportno')}
            placeholder={translate('global.form.passportno.placeholder')}
            value={account.doctorDTO.passportNo}
          />
          <AvField
            name="designation"
            label={translate('global.form.designation')}
            placeholder={translate('global.form.designation.placeholder')}
            value={account.doctorDTO.designation}
          />
          <AvField
            name="description"
            label={translate('global.form.description')}
            placeholder={translate('global.form.description.placeholder')}
            value={account.doctorDTO.description}
          />
          <AvField
            name="degreeName"
            label={translate('global.form.degreename')}
            placeholder={translate('global.form.degreename.placeholder')}
            value={account.doctorDTO.degrees[0].name}
            readOnly
          />
          <AvField
            name="degreeInstitute"
            label={translate('global.form.degreeinstitute')}
            placeholder={translate('global.form.degreeinstitute.placeholder')}
            validate={{
              required: { value: true, errorMessage: translate('global.messages.validate.degreeinstitute.required') }
            }}
            value={account.doctorDTO.degrees[0].institute}
          />
          <AvField
            name="degreeCountry"
            label={translate('global.form.degreecountry')}
            placeholder={translate('global.form.degreecountry.placeholder')}
            validate={{
              required: { value: true, errorMessage: translate('global.messages.validate.degreecountry.required') }
            }}
            value={account.doctorDTO.degrees[0].country}
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
            value={account.doctorDTO.degrees[0].enrollmentYear}
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
            value={account.doctorDTO.degrees[0].passingYear}
          />
        </div>
      );
    } else {
      return null;
    }
  };
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { getSession, saveAccountSettings, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
