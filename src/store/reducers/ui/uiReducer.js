import { isMobileOrTablet, isWindowAvailable } from '@/utils/helpers';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkTheme: true,
  sidebarOpen: !isMobileOrTablet(),
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkTheme = !state.darkTheme;
      if (isWindowAvailable()) {
        localStorage.setItem('muhtarDarkTheme', state.darkTheme);
        document.body.classList.toggle('dark', state.darkTheme);
      }
    },
    setDarkTheme(state, action) {
      state.darkTheme = action.payload;
      if (isWindowAvailable()) {
        localStorage.setItem('muhtarDarkTheme', state.darkTheme);
        document.body.classList.toggle('dark', state.darkTheme);
      }
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkTheme,
  toggleSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;
