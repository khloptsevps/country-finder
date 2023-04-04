import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Country, Extra, Status } from 'types';

/*
  createAsyncThunk - принимает дженерик 3 параметра.
  1. Возвращаемое значение.
  2. принимаемое значение.
  3. объект thunkApi
*/

export const loadCountries = createAsyncThunk<
  { data: Country[] },
  undefined,
  {
    state: { countries: CountriySlice };
    extra: Extra;
    rejectValue: string;
  }
>(
  '@@countries/load-countries',
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      return client.get(api.ALL_COUNTRIES);
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error');
    }
  },
  {
    condition: (_, { getState }) => {
      const {
        countries: { status },
      } = getState();

      if (status === 'loading') {
        return false;
      }
    },
  },
);

type CountriySlice = {
  status: Status;
  error: string | null;
  list: Country[];
};

const initialState: CountriySlice = {
  status: 'idle',
  error: null,
  list: [],
};

const countrySlice = createSlice({
  name: '@@countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || 'Cannot load data';
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = action.payload.data;
      });
  },
});

export const countryReducer = countrySlice.reducer;
