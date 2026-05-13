import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/axios";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";

  // stats
  score:number;

  createdAt?: string;
}

// 🔹 BACKEND RESPONSE
interface UsersResponse {
  totalUsers: number;
  users: User[];
}

// 🔹 STATE
interface UserState {
  users: User[];
  totalUsers: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  totalUsers: 0,
  isLoading: false,
  error: null,
};

// 🔥 GET USERS (FLATTEN)
export const getUsers = createAsyncThunk<
  { users: User[]; totalUsers: number },
  void,
  { rejectValue: string }
>("users/getUser", async (_, thunkAPI) => {
  try {
    const res = await api.get<UsersResponse>("/user");
    return {
      users: res.data.users,
      totalUsers: res.data.totalUsers,
    };
  } catch {
    return thunkAPI.rejectWithValue("Kullanıcılar alınamadı");
  }
});

// 🔥 DELETE
export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("user/deleteUser", async (id, thunkAPI) => {
  try {
    await api.delete(`/user/${id}`);
    return id;
  } catch {
    return thunkAPI.rejectWithValue("Kullanıcı silinemedi");
  }
});

// 🔥 UPDATE ROLE
export const updateUserRole = createAsyncThunk<
  User,
  { id: string; role: string },
  { rejectValue: string }
>("user/updateUserRole", async ({ id, role }, thunkAPI) => {
  try {
    const res = await api.patch(`/user/${id}`, { role });

    // backend sadece user dönüyorsa stats korunmalı
    return res.data;
  } catch {
    return thunkAPI.rejectWithValue("Rol güncellenemedi");
  }
});
export const resetUserScore = createAsyncThunk(
  "user/resetUserScore",
  async (id: string, thunkAPI) => {
    try {
      const res = await api.patch(`/user/reset/${id}`);
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue(
        "Puan sıfırlanamadı"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUsers.fulfilled,
        (
          state,
          action: PayloadAction<{ users: User[]; totalUsers: number }>
        ) => {
          state.isLoading = false;
          state.users = action.payload.users;
          state.totalUsers = action.payload.totalUsers;
        }
      )
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Hata";
      })

      // DELETE
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (u) => u._id !== action.payload
        );
        state.totalUsers -= 1;
      })
      .addCase(resetUserScore.fulfilled, (state, action) => {
  const index = state.users.findIndex(
    (u) => u._id === action.payload._id
  );

  if (index !== -1) {
    state.users[index] = action.payload;
  }
})

      // UPDATE ROLE
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );

        if (index !== -1) {
          state.users[index] = {
            ...state.users[index],
            ...action.payload, // role update
          };
        }
      });
  },
});

export default userSlice.reducer;