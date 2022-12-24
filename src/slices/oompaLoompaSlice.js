import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOoompaLoompas = createAsyncThunk(
  "users/fetchOompaLoompa",
  async (page) => {
    const response = await axios.get(
      `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${page}`
    );
    return response.data.results;
  }
);

const initialState = {
  oompaLoompas: [],
  expiryDate: new Date(
    new Date().setDate(new Date().getDate() + 1)
  ).toISOString(),
  page: 1,
  loading: false,
};

const oompaLoompaSlice = createSlice({
  name: "oompaLoompa",
  initialState,
  reducers: {
    reset: (state) => {
      state.oompaLoompas = [];
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
      state.oompaLoompas =
        state.oompaLoompas.length === 0
          ? data
          : [...state.oompaLoompas, ...data];
      state.expiryDate = new Date(
        new Date().setDate(new Date().getDate() + 7)
      ).toISOString();
      state.page += 1;
      state.loading = false;
    });
  },
});

export const { reset } = oompaLoompaSlice.actions;
export const selectAllOompaLoompas = (state) => state.persistedReducer;

export default oompaLoompaSlice.reducer;