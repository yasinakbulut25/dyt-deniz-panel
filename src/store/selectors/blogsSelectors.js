import { createSelector } from '@reduxjs/toolkit';

export const selectBlogsSelector = (state) => state.blogs;

export const getBlogs = createSelector([selectBlogsSelector], (blogsState) => blogsState.blogs.filter(blog => !blog.deleted_at || blog.deleted_at.trim() === ''));
export const getBlogsLoading = createSelector([selectBlogsSelector], (blogsState) => blogsState.isLoading);
export const getBlogsError = createSelector([selectBlogsSelector], (blogsState) => blogsState.error);
