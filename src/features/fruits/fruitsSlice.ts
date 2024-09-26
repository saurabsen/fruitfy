import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialState, Fruit } from "./fruits.Interface";
const APIURL = "https://cors-anywhere.herokuapp.com/https://www.fruityvice.com";

export const fetchFruits = createAsyncThunk("fruits/fetchFruits", async () => {
  const response = await fetch(`${APIURL}/api/fruit/all`);

  if (!response.ok) {
    throw new Error("Failed to fetch fruits");
  }
  const data: Fruit[] = await response.json();
  return data;
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
