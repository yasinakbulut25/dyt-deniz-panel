import { createSelector } from '@reduxjs/toolkit';

export const selectQuestionsSelector = (state) => state.questions;

export const getQuestions = createSelector([selectQuestionsSelector], (questionsState) => questionsState.questions.filter(question => !question.deleted_at || question.deleted_at.trim() === ''));
export const getQuestionsLoading = createSelector([selectQuestionsSelector], (questionsState) => questionsState.isLoading);
export const getQuestionsError = createSelector([selectQuestionsSelector], (questionsState) => questionsState.error);
