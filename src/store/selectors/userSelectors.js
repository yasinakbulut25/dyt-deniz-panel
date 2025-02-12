import { createSelector } from '@reduxjs/toolkit';

export const selectUserState = (state) => state.user;

export const getUser = createSelector([selectUserState], (userState) => userState.user);
export const getUserID = createSelector([selectUserState], (userState) => userState.user.id);
export const getUserLoading = createSelector([selectUserState], (userState) => userState.isLoading);
export const getUserError = createSelector([selectUserState], (userState) => userState.error);

export const getAboutInfo = createSelector([selectUserState], (userState) => userState.infos.about);
export const getHeroInfo = createSelector([selectUserState], (userState) => userState.infos.hero);
export const getAdminInfo = createSelector([selectUserState], (userState) => userState.infos.admin);
