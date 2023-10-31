import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import usersReducer from './usersSlice'
import toggleSlice from './rightBarToggleSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    toggle: toggleSlice,
  },
  
  // devTools: {
  //   serialize : true,
  // }, 

  devTools: false,

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch