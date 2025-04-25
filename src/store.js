import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // We've removed all reducers as they're not needed for a static site
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store; 