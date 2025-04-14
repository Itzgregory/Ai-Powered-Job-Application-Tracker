import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserDetails } from '@/app/api/user/auth';
import { getUserDetails } from '@/utils/auth/authutils';
import { ProfileState } from '@/types/user/authType';

interface ProfileError {
    error: string;
    fallbackData?: ProfileState['data'];
  }
  
  const initialState: ProfileState = {
    data: null,
    loading: false,
    error: null,
    lastUpdated: null,
  };
  
  export const loadProfile = createAsyncThunk<
    ProfileState['data'],
    void,
    { rejectValue: ProfileError }
  >(
    'profile/loadProfile',
    async (_, { rejectWithValue }) => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error('No user ID found');
        const profileData = await fetchUserDetails(userId);
        const authData = getUserDetails();
        const { email, ...restProfileData } = profileData;
        const completeProfile = {
            email: authData?.email || profileData.email || '',
            ...restProfileData,
            firstName: authData?.firstName || profileData.firstName || '',
            lastName: authData?.lastName || profileData.lastName || '',
            id: userId, 
          };
        localStorage.setItem('userProfile', JSON.stringify({
          data: completeProfile,
          lastUpdated: Date.now(),
        }));
        return completeProfile;
      } catch (error: any) {
        const cached = localStorage.getItem('userProfile');
        if (cached) {
          const { data } = JSON.parse(cached);
          return rejectWithValue({ 
            error: error.message || 'Unknown error', 
            fallbackData: data,
          });
        }
        return rejectWithValue({ error: error.message || 'Unknown error' });
      }
    }
  );
  
  const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
      updateProfile(state, action: PayloadAction<Partial<ProfileState['data']>>) {
        if (state.data && action.payload) {
          state.data = { 
            ...state.data, 
            ...action.payload,
            firstName: action.payload.firstName ?? state.data.firstName,
            lastName: action.payload.lastName ?? state.data.lastName,
            email: action.payload.email ?? state.data.email,
            id: state.data.id,
          };
          state.lastUpdated = Date.now();
          localStorage.setItem('userProfile', JSON.stringify({
            data: state.data,
            lastUpdated: state.lastUpdated,
          }));
        }
      },
      clearProfile(state) {
        state.data = null;
        state.loading = false;
        state.error = null;
        state.lastUpdated = null;
        localStorage.removeItem('userProfile');
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loadProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loadProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.lastUpdated = Date.now();
          state.error = null;
        })
        .addCase(loadProfile.rejected, (state, action) => {
          state.loading = false;
          if (action.payload) {
            if (action.payload.fallbackData) {
              state.data = action.payload.fallbackData;
              state.error = `Using cached data: ${action.payload.error}`;
            } else {
              state.error = action.payload.error;
            }
          } else {
            state.error = 'Unknown error occurred';
          }
        });
    },
  });
  
  export const { updateProfile, clearProfile } = profileSlice.actions;
  export default profileSlice.reducer;
    