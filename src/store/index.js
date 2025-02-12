import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import uiReducer from '@/store/reducers/ui/uiReducer';
import userReducer from '@/store/reducers/user/userReducer';
import sectionsReducer from '@/store/reducers/sections/sectionsReducer';
import questionsReducer from './reducers/questions/questionsReducer';
import blogsReducer from './reducers/blogs/blogsReducer';
import commentsReducer from './reducers/comments/commentsReducer';
import servicesReducer from './reducers/services/servicesReducer';
import contactsReducer from './reducers/contacts/contactsReducer';
import galleryReducer from './reducers/gallery/galleryReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    sections: sectionsReducer,
    questions: questionsReducer,
    blogs: blogsReducer,
    comments: commentsReducer,
    services: servicesReducer,
    contacts: contactsReducer,
    gallery: galleryReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
