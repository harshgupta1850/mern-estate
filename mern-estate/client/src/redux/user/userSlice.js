import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: false,
  error: null,
  currentUser: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.error = null
      state.loading = true
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    signInFailure: (state, action) => {
      state.currentUser = null
      state.loading = false
      state.error = action.payload
    },
    updateUserStart: (state) => {
      state.loading = true
      state.error = null
    },
    updateUserSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.currentUser = action.payload
    },
    updateUserFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    deleteUserStart: (state) => {
      state.loading = true
      state.error = null
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false
      state.currentUser = null
      state.error = null
    },
    deleteUserFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { signInFailure, signInStart, signInSuccess, updateUserFailure, updateUserStart, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess } = userSlice.actions
export default userSlice.reducer