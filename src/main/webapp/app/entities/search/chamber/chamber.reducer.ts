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
import { IChamber, defaultValue } from 'app/shared/model/search/chamber.model';

export const ACTION_TYPES = {
  FETCH_CHAMBER_LIST: 'chamber/FETCH_CHAMBER_LIST',
  FETCH_CHAMBER: 'chamber/FETCH_CHAMBER',
  CREATE_CHAMBER: 'chamber/CREATE_CHAMBER',
  UPDATE_CHAMBER: 'chamber/UPDATE_CHAMBER',
  DELETE_CHAMBER: 'chamber/DELETE_CHAMBER',
  RESET: 'chamber/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChamber>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ChamberState = Readonly<typeof initialState>;

// Reducer

export default (state: ChamberState = initialState, action): ChamberState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHAMBER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHAMBER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHAMBER):
    case REQUEST(ACTION_TYPES.UPDATE_CHAMBER):
    case REQUEST(ACTION_TYPES.DELETE_CHAMBER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CHAMBER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHAMBER):
    case FAILURE(ACTION_TYPES.CREATE_CHAMBER):
    case FAILURE(ACTION_TYPES.UPDATE_CHAMBER):
    case FAILURE(ACTION_TYPES.DELETE_CHAMBER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHAMBER_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHAMBER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHAMBER):
    case SUCCESS(ACTION_TYPES.UPDATE_CHAMBER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHAMBER):
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

const apiUrl = 'search/api/chambers';

// Actions

export const getEntities: ICrudGetAllAction<IChamber> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CHAMBER_LIST,
    payload: axios.get<IChamber>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IChamber> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHAMBER,
    payload: axios.get<IChamber>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IChamber> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHAMBER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IChamber> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHAMBER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChamber> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHAMBER,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
