import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../../../services/axios";

// 🔹 TYPES
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  score?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface RegisterResponse {
  message: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// 🔹 INITIAL STATE
const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

//
// 🔥 LOGIN
//
export const login = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await api.post(
        "/auth/login",
        data
      );

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Giriş başarısız"
      );
    }
  }
);

//
// 🔥 REGISTER
//
export const register_thunk = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await api.post(
        "/auth/register",
        data
      );

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Kayıt başarısız"
      );
    }
  }
);

//
// 🔥 GET ME
//
export const getMe = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  "auth/getMe",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/auth/me");

      return res.data.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Yetkisiz işlem"
      );
    }
  }
);

//
// 🔹 SLICE
//
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;

      localStorage.removeItem("token");
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      //
      // 🔄 LOGIN
      //
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;

        localStorage.setItem(
          "token",
          action.payload.token
        );
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;

        state.error =
          action.payload || "Login error";
      })

      //
      // 🔄 REGISTER
      //
      .addCase(register_thunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(register_thunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(
        register_thunk.rejected,
        (state, action) => {
          state.isLoading = false;

          state.error =
            action.payload || "Register error";
        }
      )

      //
      // 🔄 GET ME
      //
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })

      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;

        state.error =
          action.payload || "Unauthorized";

        localStorage.removeItem("token");
      });
  },
});

export const {
  logout,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;