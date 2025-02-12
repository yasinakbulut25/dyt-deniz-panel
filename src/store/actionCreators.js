import * as ACTION_TYPES from './actionTypes';
import { removeAuthToken } from '@/utils/cookies';

export const signInRequest = (payload) => ({ type: ACTION_TYPES.SIGN_IN.REQUEST, payload });

export const signOutRequest = () => {
  removeAuthToken();
  return {
    type: ACTION_TYPES.SIGN_OUT,
  };
};

export const updateUserInfosAction = (payload) => ({ type: ACTION_TYPES.UPDATE_USER_INFOS.REQUEST, payload });

export const updateSectionAction = (payload) => ({ type: ACTION_TYPES.UPDATE_SECTIONS.REQUEST, payload });

export const createQuestionAction = (payload) => ({ type: ACTION_TYPES.CREATE_QUESTION.REQUEST, payload });
export const updateQuestionAction = (payload) => ({ type: ACTION_TYPES.UPDATE_QUESTION.REQUEST, payload });

export const createBlogAction = (payload) => ({ type: ACTION_TYPES.CREATE_BLOG.REQUEST, payload });
export const updateBlogAction = (payload) => ({ type: ACTION_TYPES.UPDATE_BLOG.REQUEST, payload });

export const createCommentAction = (payload) => ({ type: ACTION_TYPES.CREATE_COMMENT.REQUEST, payload });
export const updateCommentAction = (payload) => ({ type: ACTION_TYPES.UPDATE_COMMENT.REQUEST, payload });

export const createServiceAction = (payload) => ({ type: ACTION_TYPES.CREATE_SERVICE.REQUEST, payload });
export const updateServiceAction = (payload) => ({ type: ACTION_TYPES.UPDATE_SERVICE.REQUEST, payload });

export const createContactAction = (payload) => ({ type: ACTION_TYPES.CREATE_CONTACT.REQUEST, payload });
export const updateContactAction = (payload) => ({ type: ACTION_TYPES.UPDATE_CONTACT.REQUEST, payload });

export const createGalleryAction = (payload) => ({ type: ACTION_TYPES.CREATE_GALLERY.REQUEST, payload });
export const updateGalleryAction = (payload) => ({ type: ACTION_TYPES.UPDATE_GALLERY.REQUEST, payload });
