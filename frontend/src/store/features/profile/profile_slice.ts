import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import api from "../../../services/axios";

//
// 🔹 TYPES
//

export interface ProfileUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  score: number;

  createdAt: string;
  updatedAt: string;
}

export interface BorrowBook {
  _id: string;
  title: string;
  author: string;
  image: string;
  status: string;
}

export interface ProfileBorrow {
  _id: string;

  bookId: BorrowBook;

  borrowDate: string;
  dueDate: string;
  returnDate: string | null;

  isLate?: boolean;
}

interface ProfileResponse {
  user: ProfileUser;

  activeBorrows: ProfileBorrow[];

  history: ProfileBorrow[];
}

interface ProfileState {
  profile: ProfileUser | null;

  activeBorrows: ProfileBorrow[];

  history: ProfileBorrow[];

  isLoading: boolean;

  error: string | null;
}

//
// 🔹 INITIAL STATE
//

const initialState: ProfileState = {
  profile: null,

  activeBorrows: [],

  history: [],

  isLoading: false,

  error: null,
};

//
// 🔥 GET PROFILE
//

export const getProfile = createAsyncThunk<
  ProfileResponse,
  void,
  { rejectValue: string }
>(
  "profile/getProfile",

  async (_, thunkAPI) => {
    try {
      const res = await api.get("/auth/profile");

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Profil alınamadı"
      );
    }
  }
);

//
// 🔹 SLICE
//

const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {
    clearProfile: (state) => {
      state.profile = null;

      state.activeBorrows = [];

      state.history = [];

      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      //
      // 🔄 GET PROFILE
      //
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;

        state.error = null;
      })

      .addCase(
        getProfile.fulfilled,
        (
          state,
          action: PayloadAction<ProfileResponse>
        ) => {
          state.isLoading = false;

          state.profile = action.payload.user;

          state.activeBorrows =
            action.payload.activeBorrows;

          state.history =
            action.payload.history;
        }
      )

      .addCase(
        getProfile.rejected,
        (state, action) => {
          state.isLoading = false;

          state.error =
            action.payload ||
            "Bir hata oluştu";
        }
      );
  },
});

export const { clearProfile } =
  profileSlice.actions;

export default profileSlice.reducer;