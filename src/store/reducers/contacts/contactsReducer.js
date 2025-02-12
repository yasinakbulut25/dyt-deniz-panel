import * as ACTION_TYPES from "@/store/actionTypes";

const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_CONTACTS.REQUEST:
    case ACTION_TYPES.CREATE_CONTACT.REQUEST:
    case ACTION_TYPES.UPDATE_CONTACT.REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_TYPES.FETCH_CONTACTS.ERROR:
    case ACTION_TYPES.CREATE_CONTACT.ERROR:
    case ACTION_TYPES.UPDATE_CONTACT.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload || 'An error occurred!',
      };
    case ACTION_TYPES.FETCH_CONTACTS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        contacts: action.payload,
      };
    case ACTION_TYPES.CREATE_CONTACT.SUCCESS:
      return {
        ...state,
        isLoading: false,
        contacts: [...state.contacts, action.payload]
      };
    case ACTION_TYPES.UPDATE_CONTACT.SUCCESS:
      const updatedFields = action.payload;
      return {
        ...state,
        isLoading: false,
        contacts: state.contacts.map(item =>
          item.id === updatedFields.id ? { ...item, ...updatedFields } : item
        ),
      };
    default:
      return state;
  }
};

export default contactsReducer;
