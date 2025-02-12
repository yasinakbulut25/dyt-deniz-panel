import { createSelector } from '@reduxjs/toolkit';

export const selectGallerySelector = (state) => state.gallery;

export const getGalleryImages = createSelector(
  [selectGallerySelector],
  (galleryState) =>
    galleryState.gallery.filter((item) => !item.deleted_at || item.deleted_at.trim() === '')
);

export const getGalleryLoading = createSelector(
  [selectGallerySelector],
  (galleryState) => galleryState.isLoading
);

export const getGalleryError = createSelector(
  [selectGallerySelector],
  (galleryState) => galleryState.error
);
