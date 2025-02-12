import * as ACTION_TYPES from "@/store/actionTypes";

const initialState = {
  questions: [],
  isLoading: false,
  error: null,
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_QUESTIONS.REQUEST:
    case ACTION_TYPES.CREATE_QUESTION.REQUEST:
    case ACTION_TYPES.UPDATE_QUESTION.REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_TYPES.FETCH_QUESTIONS.ERROR:
    case ACTION_TYPES.CREATE_QUESTION.ERROR:
    case ACTION_TYPES.UPDATE_QUESTION.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload || 'An error occurred!',
      };
    case ACTION_TYPES.FETCH_QUESTIONS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        questions: action.payload,
      };
    case ACTION_TYPES.CREATE_QUESTION.SUCCESS:
      return {
        ...state,
        isLoading: false,
        questions: [...state.questions, action.payload]
      };
    case ACTION_TYPES.UPDATE_QUESTION.SUCCESS:
      const updatedFields = action.payload;
      return {
        ...state,
        isLoading: false,
        questions: state.questions.map(item =>
          item.id === updatedFields.id ? { ...item, ...updatedFields } : item
        ),
      };
    default:
      return state;
  }
};

export default questionsReducer;
