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
import { ISymptom, defaultValue } from 'app/shared/model/search/symptom.model';

export const ACTION_TYPES = {
  FETCH_SYMPTOM_LIST: 'symptom/FETCH_SYMPTOM_LIST',
  FETCH_SYMPTOM: 'symptom/FETCH_SYMPTOM',
  CREATE_SYMPTOM: 'symptom/CREATE_SYMPTOM',
  UPDATE_SYMPTOM: 'symptom/UPDATE_SYMPTOM',
  DELETE_SYMPTOM: 'symptom/DELETE_SYMPTOM',
  RESET: 'symptom/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISymptom>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SymptomState = Readonly<typeof initialState>;

// Reducer

export default (state: SymptomState = initialState, action): SymptomState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SYMPTOM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SYMPTOM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SYMPTOM):
    case REQUEST(ACTION_TYPES.UPDATE_SYMPTOM):
    case REQUEST(ACTION_TYPES.DELETE_SYMPTOM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SYMPTOM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SYMPTOM):
    case FAILURE(ACTION_TYPES.CREATE_SYMPTOM):
    case FAILURE(ACTION_TYPES.UPDATE_SYMPTOM):
    case FAILURE(ACTION_TYPES.DELETE_SYMPTOM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SYMPTOM_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_SYMPTOM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SYMPTOM):
    case SUCCESS(ACTION_TYPES.UPDATE_SYMPTOM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SYMPTOM):
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

const apiUrl = 'search/api/symptoms';

// Actions

export const getEntities: ICrudGetAllAction<ISymptom> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SYMPTOM_LIST,
    payload: axios.get<ISymptom>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISymptom> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SYMPTOM,
    payload: axios.get<ISymptom>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISymptom> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SYMPTOM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<ISymptom> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SYMPTOM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISymptom> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SYMPTOM,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
