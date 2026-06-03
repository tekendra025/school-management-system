import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/authSlice";
import settingsReducer from "./features/settingsSlice";
import aboutReducer from "./features/aboutSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    about: aboutReducer,
  },
});
