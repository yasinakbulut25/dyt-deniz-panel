import * as ACTION_TYPES from "@/store/actionTypes";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_COMMENTS.REQUEST:
    case ACTION_TYPES.CREATE_COMMENT.REQUEST:
    case ACTION_TYPES.UPDATE_COMMENT.REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_TYPES.FETCH_COMMENTS.ERROR:
    case ACTION_TYPES.CREATE_COMMENT.ERROR:
    case ACTION_TYPES.UPDATE_COMMENT.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload || 'An error occurred!',
      };
    case ACTION_TYPES.FETCH_COMMENTS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: action.payload,
      };
    case ACTION_TYPES.CREATE_COMMENT.SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: [...state.comments, action.payload],
      };
    case ACTION_TYPES.UPDATE_COMMENT.SUCCESS:
      const updatedFields = action.payload;
      return {
        ...state,
        isLoading: false,
        comments: state.comments.map(item =>
          item.id === updatedFields.id ? { ...item, ...updatedFields } : item
        ),
      };
    default:
      return state;
  }
};

export default commentsReducer;
