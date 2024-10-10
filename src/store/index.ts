import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import adminReducer from '../reducers/adminReducer';

const persistedUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')!)
  : null;

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
  preloadedState: {
    user: {
      user: persistedUser,
      loading: false,
      error: null,
    },
    admin: {
      allUsers: [],
      loading: false,
      error: null,
    },
  },
});

store.subscribe(() => {
  localStorage.setItem('user', JSON.stringify(store.getState().user.user));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
