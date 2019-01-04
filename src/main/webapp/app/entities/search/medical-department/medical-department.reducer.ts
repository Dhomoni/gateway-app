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
import { IMedicalDepartment, defaultValue } from 'app/shared/model/search/medical-department.model';

export const ACTION_TYPES = {
  FETCH_MEDICALDEPARTMENT_LIST: 'medicalDepartment/FETCH_MEDICALDEPARTMENT_LIST',
  FETCH_MEDICALDEPARTMENT: 'medicalDepartment/FETCH_MEDICALDEPARTMENT',
  CREATE_MEDICALDEPARTMENT: 'medicalDepartment/CREATE_MEDICALDEPARTMENT',
  UPDATE_MEDICALDEPARTMENT: 'medicalDepartment/UPDATE_MEDICALDEPARTMENT',
  DELETE_MEDICALDEPARTMENT: 'medicalDepartment/DELETE_MEDICALDEPARTMENT',
  RESET: 'medicalDepartment/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMedicalDepartment>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MedicalDepartmentState = Readonly<typeof initialState>;

// Reducer

export default (state: MedicalDepartmentState = initialState, action): MedicalDepartmentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEDICALDEPARTMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEDICALDEPARTMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MEDICALDEPARTMENT):
    case REQUEST(ACTION_TYPES.UPDATE_MEDICALDEPARTMENT):
    case REQUEST(ACTION_TYPES.DELETE_MEDICALDEPARTMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MEDICALDEPARTMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEDICALDEPARTMENT):
    case FAILURE(ACTION_TYPES.CREATE_MEDICALDEPARTMENT):
    case FAILURE(ACTION_TYPES.UPDATE_MEDICALDEPARTMENT):
    case FAILURE(ACTION_TYPES.DELETE_MEDICALDEPARTMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEDICALDEPARTMENT_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEDICALDEPARTMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEDICALDEPARTMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_MEDICALDEPARTMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEDICALDEPARTMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'search/api/medical-departments';

// Actions

export const getEntities: ICrudGetAllAction<IMedicalDepartment> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MEDICALDEPARTMENT_LIST,
    payload: axios.get<IMedicalDepartment>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMedicalDepartment> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEDICALDEPARTMENT,
    payload: axios.get<IMedicalDepartment>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMedicalDepartment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEDICALDEPARTMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IMedicalDepartment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEDICALDEPARTMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMedicalDepartment> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEDICALDEPARTMENT,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
