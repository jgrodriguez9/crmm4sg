import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  balanceOverviewData: [],
  dialTypeData: [],
  salesForecastData: [],
  error: {}
};


const DashboardCRMSlice = createSlice({
  name: 'DashboardCRM',
  initialState,
  reducers: {},
});

export default DashboardCRMSlice.reducer;