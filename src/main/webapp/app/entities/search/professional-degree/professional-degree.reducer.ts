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
import { IProfessionalDegree, defaultValue } from 'app/shared/model/search/professional-degree.model';

export const ACTION_TYPES = {
  FETCH_PROFESSIONALDEGREE_LIST: 'professionalDegree/FETCH_PROFESSIONALDEGREE_LIST',
  FETCH_PROFESSIONALDEGREE: 'professionalDegree/FETCH_PROFESSIONALDEGREE',
  CREATE_PROFESSIONALDEGREE: 'professionalDegree/CREATE_PROFESSIONALDEGREE',
  UPDATE_PROFESSIONALDEGREE: 'professionalDegree/UPDATE_PROFESSIONALDEGREE',
  DELETE_PROFESSIONALDEGREE: 'professionalDegree/DELETE_PROFESSIONALDEGREE',
  RESET: 'professionalDegree/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfessionalDegree>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfessionalDegreeState = Readonly<typeof initialState>;

// Reducer

export default (state: ProfessionalDegreeState = initialState, action): ProfessionalDegreeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFESSIONALDEGREE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFESSIONALDEGREE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFESSIONALDEGREE):
    case REQUEST(ACTION_TYPES.UPDATE_PROFESSIONALDEGREE):
    case REQUEST(ACTION_TYPES.DELETE_PROFESSIONALDEGREE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFESSIONALDEGREE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFESSIONALDEGREE):
    case FAILURE(ACTION_TYPES.CREATE_PROFESSIONALDEGREE):
    case FAILURE(ACTION_TYPES.UPDATE_PROFESSIONALDEGREE):
    case FAILURE(ACTION_TYPES.DELETE_PROFESSIONALDEGREE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFESSIONALDEGREE_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFESSIONALDEGREE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFESSIONALDEGREE):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFESSIONALDEGREE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFESSIONALDEGREE):
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

const apiUrl = 'search/api/professional-degrees';

// Actions

export const getEntities: ICrudGetAllAction<IProfessionalDegree> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PROFESSIONALDEGREE_LIST,
    payload: axios.get<IProfessionalDegree>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IProfessionalDegree> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFESSIONALDEGREE,
    payload: axios.get<IProfessionalDegree>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProfessionalDegree> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFESSIONALDEGREE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IProfessionalDegree> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFESSIONALDEGREE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfessionalDegree> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFESSIONALDEGREE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
