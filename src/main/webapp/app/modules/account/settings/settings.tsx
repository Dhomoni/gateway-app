import React from 'react';
import { Button, Col, Alert, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { locales, languages } from 'app/config/translation';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';
import { AUTHORITIES } from 'app/config/constants';
import ImageUpload from 'app/shared/util/image-upload';

export interface IUserSettingsProps extends StateProps, DispatchProps {}

export interface IUserSettingsState {
  account: any;
  image: string;
  imageContentType: string;
}

export class SettingsPage extends React.Component<IUserSettingsProps, IUserSettingsState> {
  state: IUserSettingsState = {
    ...this.state,
    image: this.props.account.image,
    imageContentType: this.props.account.imageContentType
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
      imageContentType: this.state.imageContentType
    };

    this.props.saveAccountSettings(account);
    event.persist();
  };

  imageUploadCallback = (data, contentType) => {
    this.setState({ image: data, imageContentType: contentType });
  };

  render() {
    const { account } = this.props;
    const fileURL = 'data:' + this.state.imageContentType + ';base64,' + this.state.image;

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
              <this.renderDoctorRegData account={account} />
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

  renderDoctorRegData = ({ account }) => {
    if (account.authorities.includes(AUTHORITIES.DOCTOR)) {
      return (
        <div>
          <AvField
            name="licenceNumber"
            label={translate('global.form.licencenumber')}
            placeholder={translate('global.form.licencenumber.placeholder')}
            value={account.licenceNumber}
          />
          <AvField
            name="nationalId"
            label={translate('global.form.nationalid')}
            placeholder={translate('global.form.nationalid.placeholder')}
            value={account.nationalId}
          />
          <AvField
            name="passportNo"
            label={translate('global.form.passportno')}
            placeholder={translate('global.form.passportno.placeholder')}
            value={account.passportNo}
          />
          <AvField
            name="designation"
            label={translate('global.form.designation')}
            placeholder={translate('global.form.designation.placeholder')}
            value={account.designation}
          />
          <AvField
            name="description"
            label={translate('global.form.description')}
            placeholder={translate('global.form.description.placeholder')}
            value={account.description}
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