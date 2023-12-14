import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: false,
  error: null,
  currentUser: null
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
    signInFailure: (state,action) => {
      state.currentUser = null
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { signInFailure, signInStart, signInSuccess } = userSlice.actions
export default userSlice.reducer