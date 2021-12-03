import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
	PROFILE_ERROR_MESSAGE,
	PROFILE_SUCCESS_MESSAGE,
} from '../../constants';

const initialState = {
	profiles: [],
	successMessage: '',
	errorMessage: '',
};

export const addProfileAsync = createAsyncThunk(
	'profiles/post',
	async (data, thunkApi) => {
		const response = await axios.post(`http://localhost:3000/profiles`, {
			...data,
			id: uuidv4(),
		});
		return response.data;
	}
);

export const profilesSlice = createSlice({
	name: 'profiles',
	initialState,
	reducers: {
		setSuccessMessage: (state, action) => {
			state.successMessage = action.payload;
		},
		setErrorMessage: (state, action) => {
			state.errorMessage = action.payload;
		},
		deleteMessages: (state) => {
			state.successMessage = '';
			state.errorMessage = '';
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addProfileAsync.fulfilled, (state, action) => {
			state.successMessage = PROFILE_SUCCESS_MESSAGE;
		});
		builder.addCase(addProfileAsync.rejected, (state, action) => {
			state.errorMessage = PROFILE_ERROR_MESSAGE;
		});
	},
});
export const { deleteMessages } = profilesSlice.actions;

//Selectors
export const getProfileSuccessMessage = (state) =>
	state.profiles.successMessage;
export const getProfileErrorMessage = (state) => state.profiles.errorMessage;

export default profilesSlice.reducer;
