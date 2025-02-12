import * as ACTION_TYPES from "@/store/actionTypes";

const initialState = {
  gallery: [],
  isLoading: false,
  error: null,
};

const galleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_GALLERY.REQUEST:
    case ACTION_TYPES.CREATE_GALLERY.REQUEST:
    case ACTION_TYPES.UPDATE_GALLERY.REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_TYPES.FETCH_GALLERY.ERROR:
    case ACTION_TYPES.CREATE_GALLERY.ERROR:
    case ACTION_TYPES.UPDATE_GALLERY.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload || 'An error occurred!',
      };
    case ACTION_TYPES.FETCH_GALLERY.SUCCESS:
      return {
        ...state,
        isLoading: false,
        gallery: action.payload,
      };
    case ACTION_TYPES.CREATE_GALLERY.SUCCESS:
      return {
        ...state,
        isLoading: false,
        gallery: [...state.gallery, action.payload]
      };
    case ACTION_TYPES.UPDATE_GALLERY.SUCCESS:
      const updatedFields = action.payload;
      return {
        ...state,
        isLoading: false,
        gallery: state.gallery.map(item =>
          item.id === updatedFields.id ? { ...item, ...updatedFields } : item
        ),
      };
    default:
      return state;
  }
};

export default galleryReducer;
