import { createSelector } from '@reduxjs/toolkit';

export const selectSectionsSelector = (state) => state.sections;

export const getAllSections = createSelector([selectSectionsSelector], (sectionState) => sectionState.sections);;
export const getSections = createSelector([selectSectionsSelector], (sectionState) => sectionState.sections.filter(section => !section.deleted_at || section.deleted_at.trim() === ''));
export const getSectionsLoading = createSelector([selectSectionsSelector], (sectionState) => sectionState.isLoading);
export const getSectionsError = createSelector([selectSectionsSelector], (sectionState) => sectionState.error);
