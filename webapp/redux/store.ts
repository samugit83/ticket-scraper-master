import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './reduxfeat/globalslice'



const store = configureStore({
  reducer: {
    global: globalReducer
  }
});

export const makeStore = () => {
  return store
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export const dispatch = store.dispatch;

