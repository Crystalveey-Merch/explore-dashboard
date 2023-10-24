import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import usersReducer from './usersSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
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