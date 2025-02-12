import { createSelector } from '@reduxjs/toolkit';

export const selectServicesSelector = (state) => state.services;

export const getServices = createSelector([selectServicesSelector], (servicesState) => servicesState.services.filter(service => !service.deleted_at || service.deleted_at.trim() === ''));
export const getServicesLoading = createSelector([selectServicesSelector], (servicesState) => servicesState.isLoading);
export const getServicesError = createSelector([selectServicesSelector], (servicesState) => servicesState.error);
