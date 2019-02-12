import axios from 'axios';
import { parseHeaderForLinks, loadMoreDataWhenScrolled } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IDisease, defaultValue } from 'app/shared/model/search/disease.model';

export const ACTION_TYPES = {
  SEARCH_DISEASES: 'home/SEARCH_DISEASES',
  SEARCH_DISEASE: 'home/SEARCH_DISEASE',
  RESET: 'home/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDisease>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SearchDiseaseState = Readonly<typeof initialState>;

// Reducer

export default (state: SearchDiseaseState = initialState, action): SearchDiseaseState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_DISEASES):
    case REQUEST(ACTION_TYPES.SEARCH_DISEASE):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_DISEASES):
    case FAILURE(ACTION_TYPES.SEARCH_DISEASE):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_DISEASES):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.SEARCH_DISEASE):
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

const searchApiUrl = 'search/api/_search/diseases';

// Actions

export const searchEntities = (searchDTO, page, size) => {
  const requestUrl = `${searchApiUrl}?page=${page}&size=${size}`;
  return {
    type: ACTION_TYPES.SEARCH_DISEASES,
    payload: axios.post<IDisease>(`${requestUrl}&cacheBuster=${new Date().getTime()}`, searchDTO)
  };
};

export const searchEntity = doctorId => {
  const requestUrl = `${searchApiUrl}/${doctorId}`;
  return {
    type: ACTION_TYPES.SEARCH_DISEASE,
    payload: axios.get<IDisease>(`${requestUrl}?cacheBuster=${new Date().getTime()}`)
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
