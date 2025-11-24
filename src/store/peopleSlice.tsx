import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Person } from '../types/Person';
import { getPeople, getUnit } from '../utils/fetchClient';

interface PeopleState {
  people: Person[];
  currentPerson: null | Person;
  loading: boolean;
  error: string | null;
}

const initialState: PeopleState = {
  people: [],
  currentPerson: null,
  loading: false,
  error: null,
};

export const init = createAsyncThunk('people/fetch', async () => {
  return await getPeople();
});

export const fetchCurrent = createAsyncThunk('people/fetchCurrent', async (id: number) => {
  return await getUnit('people', id);
});

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setCurrentPerson: (state, action) => {
      state.currentPerson = action.payload;
    },
    clearCurrentPerson: (state) => {
      state.currentPerson = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.people = action.payload;
      })
      .addCase(init.rejected, (state) => {
        state.error = 'Something went wrong';
        state.loading = false;
      })

      .addCase(fetchCurrent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrent.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPerson = action.payload;
      })
      .addCase(fetchCurrent.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load character';
      });
  },
});

export const { setCurrentPerson, clearCurrentPerson } = peopleSlice.actions;

export default peopleSlice.reducer;
