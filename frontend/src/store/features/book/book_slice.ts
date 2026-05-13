import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/axios";

// 🔹 TYPE
export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  status: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// 🔹 STATE
interface BookState {
  books: Book[];
  selectedBook: Book | null; // 🔥 EKLEDİK
  isLoading: boolean;
  error: string | null;
}

const initialState: BookState = {
  books: [],
  selectedBook: null,
  isLoading: false,
  error: null,
};

// 🔥 GET ALL
export const getBooks = createAsyncThunk<
  Book[],
  void,
  { rejectValue: string }
>("book/getBooks", async (_, thunkAPI) => {
  try {
    const res = await api.get("/book");
    return res.data;
  } catch {
    return thunkAPI.rejectWithValue("Kitaplar alınamadı");
  }
});

// 🔥 GET ONE
export const getOneBook = createAsyncThunk<
  Book,
  string,
  { rejectValue: string }
>("book/getOneBook", async (id, thunkAPI) => {
  try {
    const res = await api.get(`/book/${id}`);
    return res.data;
  } catch {
    return thunkAPI.rejectWithValue("Kitap alınamadı");
  }
});

// 🔥 CREATE
export const createBook = createAsyncThunk<
  Book,
  FormData,
  { rejectValue: string }
>("book/createBook", async (data, thunkAPI) => {
  try {
    const res = await api.post("/book", data);
    return res.data;
  } catch {
    return thunkAPI.rejectWithValue("Kitap eklenemedi");
  }
});

// 🔥 DELETE
export const deleteBook = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("book/deleteBook", async (id, thunkAPI) => {
  try {
    await api.delete(`/book/${id}`);
    return id;
  } catch {
    return thunkAPI.rejectWithValue("Silme başarısız");
  }
});

// 🔥 UPDATE
export const updateBook = createAsyncThunk<
  Book,
  { id: string; data: FormData },
  { rejectValue: string }
>("book/updateBook", async ({ id, data }, thunkAPI) => {
  try {
    const res = await api.put(`/book/${id}`, data);
    return res.data;
  } catch {
    return thunkAPI.rejectWithValue("Güncelleme başarısız");
  }
});

// 🔹 SLICE
const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // GET ALL
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Hata";
      })

      // 🔥 GET ONE (DOĞRU)
      .addCase(getOneBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.isLoading = false;
        state.selectedBook = action.payload; // ✅ burası kritik
      })
      .addCase(getOneBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Hata";
      })

      // CREATE
      .addCase(createBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.books.unshift(action.payload);
      })

      // DELETE
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<string>) => {
        state.books = state.books.filter(
          (b) => b._id !== action.payload
        );
      })

      // UPDATE
      .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
        const index = state.books.findIndex(
          (b) => b._id === action.payload._id
        );

        if (index !== -1) {
          state.books[index] = action.payload;
        }

        // 🔥 detay sayfası da güncellensin
        if (state.selectedBook?._id === action.payload._id) {
          state.selectedBook = action.payload;
        }
      });
  },
});

export const { clearSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;