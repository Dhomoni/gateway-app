import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button } from 'reactstrap';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';
import { AUTHORITIES } from 'app/config/constants';
import ImageUpload from 'app/shared/util/image-upload';

export interface IRegisterProps extends StateProps, DispatchProps {}

export interface IRegisterState {
  password: string;
  selectedUserType: string;
  image: string;
  imageContentType: string;
}

export class RegisterPage extends React.Component<IRegisterProps, IRegisterState> {
  state: IRegisterState = {
    password: '',
    selectedUserType: AUTHORITIES.USER,
    image: '',
    imageContentType: ''
  };

  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    const account = {
      ...values,
      password: this.state.password,
      authorities: [this.state.selectedUserType],
      langKey: this.props.currentLocale,
      image: this.state.image,
      imageContentType: this.state.imageContentType
    };
    this.props.handleRegister(account);
    event.preventDefault();
  };

  updatePassword = event => {
    this.setState({ password: event.target.value });
  };

  onDropdownSelected = event => {
    this.setState({ selectedUserType: event.target.value });
  };

  imageUploadCallback = (data, contentType) => {
    this.setState({ image: data, imageContentType: contentType });
  };

  render() {
    const userTypeOptions = [{ value: AUTHORITIES.USER, label: 'User' }, { value: AUTHORITIES.DOCTOR, label: 'Doctor' }];
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
              <AvField name="usertype" type="select" onChange={this.onDropdownSelected} label={translate('global.form.accounttype')}>
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
                  required: { value: true, errorMessage: translate('register.messages.validate.firstname.required') }
                }}
              />
              <AvField
                name="lastName"
                label={translate('global.form.lastname')}
                placeholder={translate('global.form.lastname.placeholder')}
                validate={{
                  required: { value: true, errorMessage: translate('register.messages.validate.lastname.required') }
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
    if (selectedUserType === AUTHORITIES.DOCTOR) {
      return <this.renderDoctorRegData />;
    } else {
      return null;
    }
  };

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
