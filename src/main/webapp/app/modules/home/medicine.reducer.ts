import axios from 'axios';
import { parseHeaderForLinks, loadMoreDataWhenScrolled } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IMedicine, defaultValue } from 'app/shared/model/search/medicine.model';

export const ACTION_TYPES = {
  SEARCH_MEDICINES: 'home/SEARCH_MEDICINES',
  SEARCH_MEDICINE: 'home/SEARCH_MEDICINE',
  RESET: 'home/RESET'
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

export type SearchMedicineState = Readonly<typeof initialState>;

// Reducer

export default (state: SearchMedicineState = initialState, action): SearchMedicineState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_MEDICINES):
    case REQUEST(ACTION_TYPES.SEARCH_MEDICINE):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_MEDICINES):
    case FAILURE(ACTION_TYPES.SEARCH_MEDICINE):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_MEDICINES):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.SEARCH_MEDICINE):
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

const searchApiUrl = 'search/api/_search/medicines';

// Actions

export const searchEntities = (searchDTO, page, size) => {
  const requestUrl = `${searchApiUrl}?page=${page}&size=${size}`;
  return {
    type: ACTION_TYPES.SEARCH_MEDICINES,
    payload: axios.post<IMedicine>(`${requestUrl}&cacheBuster=${new Date().getTime()}`, searchDTO)
  };
};

export const searchEntity = doctorId => {
  const requestUrl = `${searchApiUrl}/${doctorId}`;
  return {
    type: ACTION_TYPES.SEARCH_MEDICINE,
    payload: axios.get<IMedicine>(`${requestUrl}?cacheBuster=${new Date().getTime()}`)
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
