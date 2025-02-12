import { createSelector } from '@reduxjs/toolkit';

export const selectCommentsSelector = (state) => state.comments;

export const getComments = createSelector(
  [selectCommentsSelector],
  (commentsState) => commentsState.comments.filter(comment => !comment.deleted_at || comment.deleted_at.trim() === '')
);
export const getCommentsLoading = createSelector(
  [selectCommentsSelector],
  (commentsState) => commentsState.isLoading
);
export const getCommentsError = createSelector(
  [selectCommentsSelector],
  (commentsState) => commentsState.error
);
