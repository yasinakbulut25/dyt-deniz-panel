const generatePromiseActionType = (actionType) => ({
  REQUEST: `${actionType}/REQUEST`,
  SUCCESS: `${actionType}/SUCCESS`,
  ERROR: `${actionType}/ERROR`,
});

export const INITIALIZE_APP = 'INITIALIZE_APP';
export const FETCH_USER_INFOS = generatePromiseActionType('FETCH_USER_INFOS');
export const UPDATE_USER_INFOS = generatePromiseActionType('UPDATE_USER_INFOS');

export const SIGN_IN = generatePromiseActionType('SIGN_IN');
export const SIGN_OUT = 'SIGN_OUT';

export const FETCH_SECTIONS = generatePromiseActionType('FETCH_SECTIONS');
export const UPDATE_SECTIONS = generatePromiseActionType('UPDATE_SECTIONS');

export const FETCH_QUESTIONS = generatePromiseActionType('FETCH_QUESTIONS');
export const CREATE_QUESTION = generatePromiseActionType('CREATE_QUESTION');
export const UPDATE_QUESTION = generatePromiseActionType('UPDATE_QUESTION');

export const FETCH_BLOGS = generatePromiseActionType('FETCH_BLOGS');
export const CREATE_BLOG = generatePromiseActionType('CREATE_BLOG');
export const UPDATE_BLOG = generatePromiseActionType('UPDATE_BLOG');

export const FETCH_COMMENTS = generatePromiseActionType('FETCH_COMMENTS');
export const CREATE_COMMENT = generatePromiseActionType('CREATE_COMMENT');
export const UPDATE_COMMENT = generatePromiseActionType('UPDATE_COMMENT');

export const FETCH_SERVICES = generatePromiseActionType('FETCH_SERVICES');
export const CREATE_SERVICE = generatePromiseActionType('CREATE_SERVICE');
export const UPDATE_SERVICE = generatePromiseActionType('UPDATE_SERVICE');

export const FETCH_CONTACTS = generatePromiseActionType('FETCH_CONTACTS');
export const CREATE_CONTACT = generatePromiseActionType('CREATE_CONTACT');
export const UPDATE_CONTACT = generatePromiseActionType('UPDATE_CONTACT');

export const FETCH_GALLERY = generatePromiseActionType('FETCH_GALLERY');
export const CREATE_GALLERY = generatePromiseActionType('CREATE_GALLERY');
export const UPDATE_GALLERY = generatePromiseActionType('UPDATE_GALLERY');
