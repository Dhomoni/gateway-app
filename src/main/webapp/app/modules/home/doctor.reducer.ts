import axios from 'axios';
import { parseHeaderForLinks, loadMoreDataWhenScrolled, ICrudSearchAction } from 'react-jhipster';
import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IDoctor, defaultValue } from 'app/shared/model/search/doctor.model';

export const ACTION_TYPES = {
  SEARCH_DOCTORS: 'home/SEARCH_DOCTORS',
  SEARCH_DOCTOR: 'home/SEARCH_DOCTOR',
  RESET: 'home/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDoctor>,
  entity: defaultValue,
  links: { next: 0 },
  totalItems: 0
};

export type SearchDoctorState = Readonly<typeof initialState>;

// Reducer

export default (state: SearchDoctorState = initialState, action): SearchDoctorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_DOCTORS):
    case REQUEST(ACTION_TYPES.SEARCH_DOCTOR):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_DOCTORS):
    case FAILURE(ACTION_TYPES.SEARCH_DOCTOR):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_DOCTORS):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.SEARCH_DOCTOR):
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

const searchApiUrl = 'search/api/_search/doctors';

// Actions

export const searchEntities = (searchDTO, page, size) => {
  const requestUrl = `${searchApiUrl}?page=${page}&size=${size}`;
  return {
    type: ACTION_TYPES.SEARCH_DOCTORS,
    payload: axios.post<IDoctor>(`${requestUrl}&cacheBuster=${new Date().getTime()}`, searchDTO)
  };
};

export const searchEntity = doctorId => {
  const requestUrl = `${searchApiUrl}/${doctorId}`;
  return {
    type: ACTION_TYPES.SEARCH_DOCTOR,
    payload: axios.get<IDoctor>(`${requestUrl}?cacheBuster=${new Date().getTime()}`)
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
