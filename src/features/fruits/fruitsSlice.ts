import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialState, Fruit } from "./fruits.Interface";
import axios from "axios";

export const fetchFruits = createAsyncThunk("fruits/fetchFruits", async () => {
  const response = await axios.get<Fruit[]>("/api/fruit/all");
  return response.data;
});

const fruitsSlice = createSlice({
  name: "fruits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFruits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFruits.fulfilled, (state, action) => {
        state.loading = false;
        state.fruits = action.payload;
      })
      .addCase(fetchFruits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch fruits";
      });
  },
});

export default fruitsSlice.reducer;
