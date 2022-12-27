import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOoompaLoompaDetail = createAsyncThunk(
  "users/fetchOoompaLoompaDetail",
  async (id) => {
    const response = await axios.get(
      `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${id}`
    );
    const data = response.data;
    return {
      id,
      expirationDate: new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toISOString(),
      ...data,
    };
  }
);

const initialState = {
  oompaLoompasDetailedList: [],
  loading: false,
};

const oompaLoompaDetailsSlice = createSlice({
  name: "oompaLoompasDetails",
  initialState,
  reducers: {
    reset: (state) => {
      state.oompaLoompasDetailedList = [];
      state.loading = false;
      localStorage.removeItem("persist:root2");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOoompaLoompaDetail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchOoompaLoompaDetail.fulfilled, (state, action) => {
      const data = action.payload;
      state.oompaLoompasDetailedList[data.id] = data;
      state.loading = false;
    });
  },
});

export const { reset } = oompaLoompaDetailsSlice.actions;

export default oompaLoompaDetailsSlice.reducer;
