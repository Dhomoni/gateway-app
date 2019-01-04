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
import { IMedicine, defaultValue } from 'app/shared/model/search/medicine.model';

export const ACTION_TYPES = {
  FETCH_MEDICINE_LIST: 'medicine/FETCH_MEDICINE_LIST',
  FETCH_MEDICINE: 'medicine/FETCH_MEDICINE',
  CREATE_MEDICINE: 'medicine/CREATE_MEDICINE',
  UPDATE_MEDICINE: 'medicine/UPDATE_MEDICINE',
  DELETE_MEDICINE: 'medicine/DELETE_MEDICINE',
  RESET: 'medicine/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMedicine>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MedicineState = Readonly<typeof initialState>;

// Reducer

export default (state: MedicineState = initialState, action): MedicineState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEDICINE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEDICINE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MEDICINE):
    case REQUEST(ACTION_TYPES.UPDATE_MEDICINE):
    case REQUEST(ACTION_TYPES.DELETE_MEDICINE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MEDICINE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEDICINE):
    case FAILURE(ACTION_TYPES.CREATE_MEDICINE):
    case FAILURE(ACTION_TYPES.UPDATE_MEDICINE):
    case FAILURE(ACTION_TYPES.DELETE_MEDICINE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEDICINE_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEDICINE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEDICINE):
    case SUCCESS(ACTION_TYPES.UPDATE_MEDICINE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEDICINE):
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

const apiUrl = 'search/api/medicines';

// Actions

export const getEntities: ICrudGetAllAction<IMedicine> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MEDICINE_LIST,
    payload: axios.get<IMedicine>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMedicine> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEDICINE,
    payload: axios.get<IMedicine>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMedicine> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEDICINE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IMedicine> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEDICINE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMedicine> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEDICINE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
