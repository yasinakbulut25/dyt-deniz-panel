import * as ACTION_TYPES from "@/store/actionTypes";

const initialState = {
  blogs: [],
  isLoading: false,
  error: null,
};

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_BLOGS.REQUEST:
    case ACTION_TYPES.CREATE_BLOG.REQUEST:
    case ACTION_TYPES.UPDATE_BLOG.REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_TYPES.FETCH_BLOGS.ERROR:
    case ACTION_TYPES.CREATE_BLOG.ERROR:
    case ACTION_TYPES.UPDATE_BLOG.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload || 'An error occurred!',
      };
    case ACTION_TYPES.FETCH_BLOGS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        blogs: action.payload,
      };
    case ACTION_TYPES.CREATE_BLOG.SUCCESS:
      return {
        ...state,
        isLoading: false,
        blogs: [...state.blogs, action.payload]
      };
    case ACTION_TYPES.UPDATE_BLOG.SUCCESS:
      const updatedFields = action.payload;
      return {
        ...state,
        isLoading: false,
        blogs: state.blogs.map(item =>
          item.id === updatedFields.id ? { ...item, ...updatedFields } : item
        ),
      };
    default:
      return state;
  }
};

export default blogsReducer;
