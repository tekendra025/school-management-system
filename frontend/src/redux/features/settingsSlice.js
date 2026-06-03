import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../services/api";

// ======================================
// GET SETTINGS
// ======================================

export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",

  async (_, thunkAPI) => {
    try {
      const { data } = await API.get("/settings");

      return data.settings;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

// ======================================
// SLICE
// ======================================

const settingsSlice = createSlice({
  name: "settings",

  initialState: {
    settings: null,

    loading: false,

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH SETTINGS

      .addCase(
        fetchSettings.pending,

        (state) => {
          state.loading = true;
        },
      )

      .addCase(
        fetchSettings.fulfilled,

        (state, action) => {
          state.loading = false;

          state.settings = action.payload;
        },
      )

      .addCase(
        fetchSettings.rejected,

        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        },
      );
  },
});

export default settingsSlice.reducer;
