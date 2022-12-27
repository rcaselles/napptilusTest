import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOoompaLoompas = createAsyncThunk(
  "users/fetchOompaLoompas",
  async (page) => {
    const response = await axios.get(
      `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${page}`
    );
    return response.data.results;
  }
);

const initialState = {
  oompaLoompasList: [],
  expiryDate: new Date(
    new Date().setDate(new Date().getDate() + 1)
  ).toISOString(),
  page: 1,
  loading: false,
};

const oompaLoompaSlice = createSlice({
  name: "oompaLoompas",
  initialState,
  reducers: {
    reset: (state) => {
      state.oompaLoompasList = [];
      state.page = 1;
      state.expiryDate = new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toISOString();
      localStorage.removeItem("persist:root");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOoompaLoompas.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchOoompaLoompas.fulfilled, (state, action) => {
      const data = action.payload;
      state.oompaLoompasList =
        state.oompaLoompasList.length === 0
          ? data
          : [...state.oompaLoompasList, ...data];
      state.expiryDate = new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toISOString();
      state.page += 1;
      state.loading = false;
    });
  },
});

export const { reset } = oompaLoompaSlice.actions;

export default oompaLoompaSlice.reducer;
