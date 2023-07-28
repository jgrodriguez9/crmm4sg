import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    message: '',
    type: ''
  },
  reducers: {
    addMessage: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearMessage: (state, action) => {
      state.message = null;
      state.type = null;
    },
  },
});


export const {
  addMessage,
  clearMessage,
} = messageSlice.actions;

export default  messageSlice.reducer;