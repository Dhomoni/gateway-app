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
import { IWeeklyVisitingHour, defaultValue } from 'app/shared/model/search/weekly-visiting-hour.model';

export const ACTION_TYPES = {
  FETCH_WEEKLYVISITINGHOUR_LIST: 'weeklyVisitingHour/FETCH_WEEKLYVISITINGHOUR_LIST',
  FETCH_WEEKLYVISITINGHOUR: 'weeklyVisitingHour/FETCH_WEEKLYVISITINGHOUR',
  CREATE_WEEKLYVISITINGHOUR: 'weeklyVisitingHour/CREATE_WEEKLYVISITINGHOUR',
  UPDATE_WEEKLYVISITINGHOUR: 'weeklyVisitingHour/UPDATE_WEEKLYVISITINGHOUR',
  DELETE_WEEKLYVISITINGHOUR: 'weeklyVisitingHour/DELETE_WEEKLYVISITINGHOUR',
  RESET: 'weeklyVisitingHour/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IWeeklyVisitingHour>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type WeeklyVisitingHourState = Readonly<typeof initialState>;

// Reducer

export default (state: WeeklyVisitingHourState = initialState, action): WeeklyVisitingHourState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_WEEKLYVISITINGHOUR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_WEEKLYVISITINGHOUR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_WEEKLYVISITINGHOUR):
    case REQUEST(ACTION_TYPES.UPDATE_WEEKLYVISITINGHOUR):
    case REQUEST(ACTION_TYPES.DELETE_WEEKLYVISITINGHOUR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_WEEKLYVISITINGHOUR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_WEEKLYVISITINGHOUR):
    case FAILURE(ACTION_TYPES.CREATE_WEEKLYVISITINGHOUR):
    case FAILURE(ACTION_TYPES.UPDATE_WEEKLYVISITINGHOUR):
    case FAILURE(ACTION_TYPES.DELETE_WEEKLYVISITINGHOUR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_WEEKLYVISITINGHOUR_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_WEEKLYVISITINGHOUR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_WEEKLYVISITINGHOUR):
    case SUCCESS(ACTION_TYPES.UPDATE_WEEKLYVISITINGHOUR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_WEEKLYVISITINGHOUR):
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

const apiUrl = 'search/api/weekly-visiting-hours';

// Actions

export const getEntities: ICrudGetAllAction<IWeeklyVisitingHour> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_WEEKLYVISITINGHOUR_LIST,
    payload: axios.get<IWeeklyVisitingHour>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IWeeklyVisitingHour> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_WEEKLYVISITINGHOUR,
    payload: axios.get<IWeeklyVisitingHour>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IWeeklyVisitingHour> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_WEEKLYVISITINGHOUR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IWeeklyVisitingHour> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_WEEKLYVISITINGHOUR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IWeeklyVisitingHour> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_WEEKLYVISITINGHOUR,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
