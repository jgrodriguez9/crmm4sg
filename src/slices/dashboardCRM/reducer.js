import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  balanceOverviewData: [{
    name: 'Revenue',
    data: [
      10,
      45,
      30,
      35,
      50,
      55,
      70,
      120,
      150,
      160,
      210,
      240
    ]
  },
  {
    name: 'Expenses',
    data: [
      12,
      17,
      75,
      82,
      44,
      35,
      52,
      75,
      112,
      108,
      56,
      289
    ]
  }],
  dialTypeData: [{
    name: 'Pending',
    data: [
      80,
      50,
      30,
      40,
      100,
      20
    ]
  },
  {
    name: 'Loss',
    data: [
      20,
      30,
      40,
      80,
      20,
      80
    ]
  },
  {
    name: 'Won',
    data: [
      44,
      76,
      78,
      13,
      43,
      10
    ]
  }],
  salesForecastData: [{
    name: 'Goal',
    data: [
      17
    ]
  },
  {
    name: 'Pending Forcast',
    data: [
      6
    ]
  },
  {
    name: 'Revenue',
    data: [
      37
    ]
  }],
  error: {}
};


const DashboardCRMSlice = createSlice({
  name: 'DashboardCRM',
  initialState,
  reducers: {},
});

export default DashboardCRMSlice.reducer;