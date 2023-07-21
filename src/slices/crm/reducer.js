import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  crmcontacts: [],
  companies: [],
  deals: [],
  leads: [],
  error: {}
};

const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {},
});

export default crmSlice.reducer;