import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
	FIELD_ERROR_MESSAGE,
	PROFILE_ERROR_MESSAGE,
	PROFILE_SUCCESS_MESSAGE,
	API_HOST,
} from '../../constants';
import {
	addFieldsAsync,
	deleteFieldAsync,
	getFieldsAsync,
	updateFieldAsync,
} from './fields';

const initialState = {
	profiles: [],
	successMessage: '',
	errorMessage: '',
};

export const addProfileAsync = createAsyncThunk(
	'profiles/post',
	async (data) => {
		const response = await axios.post(`${API_HOST}/profiles`, {
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
		builder.addCase(addProfileAsync.fulfilled, (state) => {
			state.successMessage = PROFILE_SUCCESS_MESSAGE;
		});
		builder.addCase(addProfileAsync.rejected, (state) => {
			state.errorMessage = PROFILE_ERROR_MESSAGE;
		});
		builder.addCase(getFieldsAsync.rejected, (state) => {
			state.errorMessage = FIELD_ERROR_MESSAGE;
		});
		builder.addCase(addFieldsAsync.rejected, (state) => {
			state.errorMessage = FIELD_ERROR_MESSAGE;
		});
		builder.addCase(updateFieldAsync.rejected, (state) => {
			state.errorMessage = FIELD_ERROR_MESSAGE;
		});
		builder.addCase(deleteFieldAsync.rejected, (state) => {
			state.errorMessage = FIELD_ERROR_MESSAGE;
		});
	},
});
export const { deleteMessages } = profilesSlice.actions;

//Selectors
export const getProfileSuccessMessage = (state) =>
	state.profiles.successMessage;
export const getProfileErrorMessage = (state) => state.profiles.errorMessage;

export default profilesSlice.reducer;
