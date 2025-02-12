import { fetchRequest as api } from './fetchRequest';

export const updateUserInfos = (table, data) => api(`${table}/1`, 'PUT', data);
export const getUser = () => api(`user`, 'GET');
export const login = (data) => api('login', 'POST', data);

export const getSections = () => api(`sections`, 'GET');
export const updateSection = (id, data) => api(`sections/${id}`, 'PUT', data);

export const getQuestions = () => api(`faqs`, 'GET');
export const createQuestion = (data) => api(`faqs`, 'POST', data);
export const updateQuestion = (id, data) => api(`faqs/${id}`, 'PUT', data);

export const getBlogs = () => api(`blogs`, 'GET');
export const createBlog = (data) => api(`blogs`, 'POST', data);
export const updateBlog = (id, data) => api(`blogs/${id}`, 'PUT', data);

export const getComments = () => api(`comments`, 'GET');
export const createComment = (data) => api(`comments`, 'POST', data);
export const updateComment = (id, data) => api(`comments/${id}`, 'PUT', data);

export const getServices = () => api(`hizmetler`, 'GET');
export const createService = (data) => api(`hizmetler`, 'POST', data);
export const updateService = (id, data) => api(`hizmetler/${id}`, 'PUT', data);

export const getContacts = () => api(`contact`, 'GET');
export const createContact = (data) => api(`contact`, 'POST', data);
export const updateContact = (id, data) => api(`contact/${id}`, 'PUT', data);

export const getGallery = () => api(`gallery`, 'GET');
export const createGallery = (data) => api(`gallery`, 'POST', data);
export const updateGallery = (id, data) => api(`gallery/${id}`, 'PUT', data);
