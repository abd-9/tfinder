import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import {RootState} from '.';
import {IAuth, IStudent, ITutor, IUser} from '../interfaces/users.interface';

// export const usersAdapter = createEntityAdapter<IUser & IAuth>();

const tutorsSlice = createSlice({
  name: 'tutor',
  initialState: {
    list: [] as ITutor[],
    selectedTutor: {} as ITutor,
  },
  reducers: {
    setTutorList: (state, action) => {
      state.list = action.payload;
    },
    setSelectedTutor: (state, action) => {
      state.selectedTutor = action.payload;
    },
  },
  extraReducers: builder => {},
});

export default tutorsSlice.reducer;
export const reduxTutorActions = tutorsSlice.actions;
const selectTutorsListData = (state: RootState) => state.tutor;

export {selectTutorsListData};
