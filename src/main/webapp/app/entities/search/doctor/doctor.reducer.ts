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
import { IDoctor, defaultValue } from 'app/shared/model/search/doctor.model';

export const ACTION_TYPES = {
  FETCH_DOCTOR_LIST: 'doctor/FETCH_DOCTOR_LIST',
  FETCH_DOCTOR: 'doctor/FETCH_DOCTOR',
  CREATE_DOCTOR: 'doctor/CREATE_DOCTOR',
  UPDATE_DOCTOR: 'doctor/UPDATE_DOCTOR',
  DELETE_DOCTOR: 'doctor/DELETE_DOCTOR',
  SET_BLOB: 'doctor/SET_BLOB',
  RESET: 'doctor/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDoctor>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DoctorState = Readonly<typeof initialState>;

// Reducer

export default (state: DoctorState = initialState, action): DoctorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DOCTOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DOCTOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DOCTOR):
    case REQUEST(ACTION_TYPES.UPDATE_DOCTOR):
    case REQUEST(ACTION_TYPES.DELETE_DOCTOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DOCTOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DOCTOR):
    case FAILURE(ACTION_TYPES.CREATE_DOCTOR):
    case FAILURE(ACTION_TYPES.UPDATE_DOCTOR):
    case FAILURE(ACTION_TYPES.DELETE_DOCTOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOCTOR_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOCTOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DOCTOR):
    case SUCCESS(ACTION_TYPES.UPDATE_DOCTOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DOCTOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const searchApiUrl = 'search/api/doctors';

const apiUrl = 'search/api/doctors';

// Actions

export const getEntities: ICrudGetAllAction<IDoctor> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DOCTOR_LIST,
    payload: axios.get<IDoctor>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDoctor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DOCTOR,
    payload: axios.get<IDoctor>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDoctor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DOCTOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IDoctor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DOCTOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDoctor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DOCTOR,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
