import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light', // Default to light mode
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
