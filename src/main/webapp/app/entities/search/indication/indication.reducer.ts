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
import { IIndication, defaultValue } from 'app/shared/model/search/indication.model';

export const ACTION_TYPES = {
  FETCH_INDICATION_LIST: 'indication/FETCH_INDICATION_LIST',
  FETCH_INDICATION: 'indication/FETCH_INDICATION',
  CREATE_INDICATION: 'indication/CREATE_INDICATION',
  UPDATE_INDICATION: 'indication/UPDATE_INDICATION',
  DELETE_INDICATION: 'indication/DELETE_INDICATION',
  RESET: 'indication/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IIndication>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type IndicationState = Readonly<typeof initialState>;

// Reducer

export default (state: IndicationState = initialState, action): IndicationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INDICATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INDICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_INDICATION):
    case REQUEST(ACTION_TYPES.UPDATE_INDICATION):
    case REQUEST(ACTION_TYPES.DELETE_INDICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_INDICATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INDICATION):
    case FAILURE(ACTION_TYPES.CREATE_INDICATION):
    case FAILURE(ACTION_TYPES.UPDATE_INDICATION):
    case FAILURE(ACTION_TYPES.DELETE_INDICATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_INDICATION_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_INDICATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_INDICATION):
    case SUCCESS(ACTION_TYPES.UPDATE_INDICATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_INDICATION):
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

const apiUrl = 'search/api/indications';

// Actions

export const getEntities: ICrudGetAllAction<IIndication> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_INDICATION_LIST,
    payload: axios.get<IIndication>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IIndication> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INDICATION,
    payload: axios.get<IIndication>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IIndication> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INDICATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IIndication> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INDICATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IIndication> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INDICATION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
