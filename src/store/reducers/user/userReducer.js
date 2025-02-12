import * as ACTION_TYPES from "@/store/actionTypes";

const initialState = {
  user: {},
  infos: {},
  isLoading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_USER_INFOS.REQUEST:
    case ACTION_TYPES.SIGN_IN.REQUEST:
    case ACTION_TYPES.FETCH_USER_INFOS.REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_TYPES.UPDATE_USER_INFOS.ERROR:
    case ACTION_TYPES.SIGN_IN.ERROR:
    case ACTION_TYPES.FETCH_USER_INFOS.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload || 'An error occurred!',
      };
    case ACTION_TYPES.UPDATE_USER_INFOS.SUCCESS:
      const editedData = action.payload.response;
      const editedTable = action.payload.table;
      return {
        ...state,
        isLoading: false,
        infos: {
          ...state.infos,
          [editedTable]: {
            ...state.infos[editedTable],
            ...editedData,
          },
        }, 
      };
    case ACTION_TYPES.FETCH_USER_INFOS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        infos: action.payload,
      };
    case ACTION_TYPES.SIGN_IN.SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
      };
    case ACTION_TYPES.SIGN_OUT:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default userReducer;
