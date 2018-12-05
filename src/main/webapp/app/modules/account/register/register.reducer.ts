import axios from 'axios';
import { translate } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  CREATE_ACCOUNT: 'register/CREATE_ACCOUNT',
  RESET: 'register/RESET'
};

const initialState = {
  loading: false,
  registrationSuccess: false,
  registrationFailure: false,
  errorMessage: null
};

export type RegisterState = Readonly<typeof initialState>;

// Reducer
export default (state: RegisterState = initialState, action): RegisterState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.CREATE_ACCOUNT):
      return {
        ...state,
        loading: true
      };
    case FAILURE(ACTION_TYPES.CREATE_ACCOUNT):
      return {
        ...initialState,
        registrationFailure: true,
        errorMessage: action.payload.response.data.errorKey
      };
    case SUCCESS(ACTION_TYPES.CREATE_ACCOUNT):
      return {
        ...initialState,
        registrationSuccess: true
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Actions
export const handleRegister = account => ({
  type: ACTION_TYPES.CREATE_ACCOUNT,
  payload: axios.post('uaa/api/register', account),
  meta: {
    successMessage: translate('register.messages.success')
  }
});

// export const handleRegister = (login, password, langKey = 'en', firstName, lastName,
//        email, phone, image, imageContentType, authorities, licenceNumber, nationalId,
//        passportNo, designation, description) => ({
//  type: ACTION_TYPES.CREATE_ACCOUNT,
//  payload: axios.post('uaa/api/register', { login, password, langKey,
//      firstName, lastName, email, phone, image, imageContentType,
//      authorities, licenceNumber, nationalId, passportNo, designation, description}),
//  meta: {
//    successMessage: translate('register.messages.success')
//  }
// });

export const reset = () => ({
  type: ACTION_TYPES.RESET
});