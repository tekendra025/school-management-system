import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../services/api";

// ======================================
// FETCH ABOUT
// ======================================

export const fetchAbout = createAsyncThunk(
  "about/fetchAbout",

  async (_, thunkAPI) => {
    try {
      const { data } = await API.get("/about");

      return data.about;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

// ======================================
// SLICE
// ======================================

const aboutSlice = createSlice({
  name: "about",

  initialState: {
    about: null,

    loading: false,

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // PENDING

      .addCase(
        fetchAbout.pending,

        (state) => {
          state.loading = true;
        },
      )

      // SUCCESS

      .addCase(
        fetchAbout.fulfilled,

        (state, action) => {
          state.loading = false;

          state.about = action.payload;
        },
      )

      // FAILED

      .addCase(
        fetchAbout.rejected,

        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        },
      );
  },
});

export default aboutSlice.reducer;
