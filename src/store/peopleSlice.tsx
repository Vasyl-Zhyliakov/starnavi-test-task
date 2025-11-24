import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Person } from '../types/Person';
import { getPeople } from '../utils/fetchClient';

interface PeopleState {
  people: Person[];
  loading: boolean;
  error: string | null;
}

const initialState: PeopleState = {
  people: [],
  loading: false,
  error: null,
};

export const init = createAsyncThunk('people/fetch', async () => {
  return await getPeople();
});

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        return {
          ...state,
          error: null,
          loading: true,
        };
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.people = action.payload;
      })
      .addCase(init.rejected, (state, action) => {
        state.error = action.error.message || 'Something went wrong';
        state.loading = false;
      });
  },
});

export default peopleSlice.reducer;
