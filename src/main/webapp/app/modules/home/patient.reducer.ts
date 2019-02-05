import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPatient, defaultValue } from 'app/shared/model/search/patient.model';

export const ACTION_TYPES = {
  SEARCH_PATIENTS: 'home/SEARCH_PATIENTS',
  SEARCH_PATIENT: 'home/SEARCH_PATIENT',
  RESET: 'home/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPatient>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SearchPatientState = Readonly<typeof initialState>;

// Reducer

export default (state: SearchPatientState = initialState, action): SearchPatientState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_PATIENTS):
    case REQUEST(ACTION_TYPES.SEARCH_PATIENT):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_PATIENTS):
    case FAILURE(ACTION_TYPES.SEARCH_PATIENT):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PATIENTS):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PATIENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const searchApiUrl = 'search/api/_search/patients';

// Actions

export const searchEntities = (searchDTO, page, size) => {
  const requestUrl = `${searchApiUrl}?page=${page}&size=${size}`;
  return {
    type: ACTION_TYPES.SEARCH_PATIENTS,
    payload: axios.post<IPatient>(`${requestUrl}&cacheBuster=${new Date().getTime()}`, searchDTO)
  };
};

export const searchEntity = doctorId => {
  const requestUrl = `${searchApiUrl}/${doctorId}`;
  return {
    type: ACTION_TYPES.SEARCH_PATIENT,
    payload: axios.get<IPatient>(`${requestUrl}?cacheBuster=${new Date().getTime()}`)
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
