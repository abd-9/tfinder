import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import {RootState} from '.';
import {IAuth, IStudent, ITutor, IUser} from '../interfaces/users.interface';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://reqres.in/api/users?delay=1');
  return (await response.json()).data as IUser[];
});

export const usersAdapter = createEntityAdapter<IUser & IAuth>();

const usersSlice = createSlice({
  name: 'user',
  initialState: {
    ...usersAdapter.getInitialState({
      loading: false,
    }),
    userData: {} as IUser & IAuth,
    profile: {} as ITutor & IStudent,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setProfileData: (state, action) => {
      state.profile = {...state.profile, ...action.payload};
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      usersAdapter.setAll(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchUsers.rejected, state => {
      state.loading = false;
    });
  },
});

export const {
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors((state: RootState) => state.user);

export default usersSlice.reducer;
export const reduxUserActions = usersSlice.actions;
const selectUserData = (state: RootState) => state.user.userData;
const selectUserProfile = (state: RootState) => state.user.profile;
export {selectUserData, selectUserProfile};
