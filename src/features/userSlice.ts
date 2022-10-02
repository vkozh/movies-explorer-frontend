import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../components/types/types";
import mainApi from "../utils/MainApi";

type InitialState = {
  loading: boolean;
  user: IUser | undefined;
  error: string | undefined;
};

const initialState: InitialState = {
  loading: false,
  user: undefined,
  error: "",
};

export const fetchUser = createAsyncThunk("user/fetchUser", () => {
  return mainApi.getUser();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.user = undefined;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
