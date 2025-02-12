import * as ACTION_TYPES from "@/store/actionTypes";

const initialState = {
  services: [],
  isLoading: false,
  error: null,
};

const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_SERVICES.REQUEST:
    case ACTION_TYPES.CREATE_SERVICE.REQUEST:
    case ACTION_TYPES.UPDATE_SERVICE.REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_TYPES.FETCH_SERVICES.ERROR:
    case ACTION_TYPES.CREATE_SERVICE.ERROR:
    case ACTION_TYPES.UPDATE_SERVICE.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload || 'An error occurred!',
      };
    case ACTION_TYPES.FETCH_SERVICES.SUCCESS:
      return {
        ...state,
        isLoading: false,
        services: action.payload,
      };
    case ACTION_TYPES.CREATE_SERVICE.SUCCESS:
      return {
        ...state,
        isLoading: false,
        services: [...state.services, action.payload],
      };
    case ACTION_TYPES.UPDATE_SERVICE.SUCCESS:
      const updatedFields = action.payload;
      return {
        ...state,
        isLoading: false,
        services: state.services.map((item) =>
          item.id === updatedFields.id ? { ...item, ...updatedFields } : item
        ),
      };
    default:
      return state;
  }
};

export default servicesReducer;
