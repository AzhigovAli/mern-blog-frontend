import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';
import { RootState } from '../store';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  const { data } = await axios.post('/login', params);

  return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const { data } = await axios.post('/register', params);
  return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/me');
  return data;
});
interface initialStateType {
  data: null;
  status: string;
}
const initialState: initialStateType = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      });
  },
});

export const selectIsAuth = (state: RootState) => state.auth.data;
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
