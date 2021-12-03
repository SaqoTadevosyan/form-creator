import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { API_HOST } from '../../constants';

const initialState = {
	fields: [],
	selectedFieldId: '',
};
export const getFieldsAsync = createAsyncThunk('fields/get', async () => {
	const response = await axios.get(`${API_HOST}/fields`);
	return response.data;
});

export const addFieldsAsync = createAsyncThunk('fields/post', async (data) => {
	const response = await axios.post(`${API_HOST}/fields`, {
		...data,
		id: uuidv4(),
	});
	return response.data;
});

export const updateFieldAsync = createAsyncThunk(
	'fields/patch',
	async (data, thunkApi) => {
		const state = thunkApi.getState();
		const response = await axios.patch(
			`${API_HOST}/fields/${state.fields.selectedFieldId}`,
			data
		);
		return response.data;
	}
);

export const deleteFieldAsync = createAsyncThunk(
	'fields/delete',
	async (id) => {
		const response = await axios.delete(`${API_HOST}/fields/${id}`);
		return { id, response };
	}
);

export const fieldsSlice = createSlice({
	name: 'fields',
	initialState,
	reducers: {
		setSelectedFieldId: (state, action) => {
			state.selectedFieldId = action.payload;
		},
		deleteSelectedFieldId: (state) => {
			state.selectedFieldId = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getFieldsAsync.fulfilled, (state, action) => {
			state.fields = action.payload;
		});
		builder.addCase(addFieldsAsync.fulfilled, (state, action) => {
			state.fields = [...state.fields, action.payload];
		});
		builder.addCase(updateFieldAsync.fulfilled, (state, action) => {
			const index = state.fields.findIndex(
				(field) => field.id === action.payload.id
			);
			state.fields[index] = action.payload;
		});
		builder.addCase(deleteFieldAsync.fulfilled, (state, action) => {
			state.fields = state.fields.filter(
				(field) => field.id !== action.payload.id
			);
		});
	},
});
export const { setSelectedFieldId, deleteSelectedFieldId } =
	fieldsSlice.actions;

//Selectors
export const getFields = (state) => state.fields.fields;
export const getVisibleFields = (state) =>
	state.fields.fields.filter((field) => field.details.visible);
export const getSelectedField = (state) =>
	state.fields.fields.find(
		(field) => field.id === state.fields.selectedFieldId
	);

export default fieldsSlice.reducer;
