import { createSlice } from '@reduxjs/toolkit'

const initalValue={
    login: false,
    isTeacher:false,
    isStudent: false
}
export const counterSlice = createSlice({
  name: 'auth',
  initialState: initalValue,
  reducers: {
    setLoginWithTeacher: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.login = true;
      state.isTeacher= true;
      state.isStudent=false;
    },
    setLoginWithStudent: (state) => {
        state.login = true;
        state.isTeacher= false;
        state.isStudent= true;
    },
    setLogout: (state) => {
        state.login = false;
        state.isTeacher= false;
        state.isStudent=false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoginWithTeacher, setLoginWithStudent, setLogout } = counterSlice.actions

export default counterSlice.reducer