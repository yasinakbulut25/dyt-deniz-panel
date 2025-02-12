import { createSelector } from '@reduxjs/toolkit';

export const selectContactsSelector = (state) => state.contacts;

export const getContacts = createSelector([selectContactsSelector], (contactsState) => contactsState.contacts.filter(contact => !contact.deleted_at || contact.deleted_at.trim() === ''));
export const getContactsLoading = createSelector([selectContactsSelector], (contactsState) => contactsState.isLoading);
export const getContactsError = createSelector([selectContactsSelector], (contactsState) => contactsState.error);
