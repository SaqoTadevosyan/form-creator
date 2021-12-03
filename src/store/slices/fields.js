import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { REACT_APP_API } from '../../constants';

const initialState = {
	fields: [
		{
			type: 'NAME',
			details: {
				label: 'Name',
				required: true,
				visible: true,
			},
		},
	],
	selectedFieldId: '',
};
export const getFieldsAsync = createAsyncThunk(
	'fields/get',
	async (action, thunkApi) => {
		const response = await axios.get(`${REACT_APP_API}/fields`);
		return response.data;
	}
);

export const addFieldsAsync = createAsyncThunk(
	'fields/post',
	async (data, thunkApi) => {
		const response = await axios.post(`${REACT_APP_API}/fields`, {
			...data,
			id: uuidv4(),
		});
		return response.data;
	}
);

export const updateFieldAsync = createAsyncThunk(
	'fields/patch',
	async (data, thunkApi) => {
		const state = thunkApi.getState();
		const response = await axios.patch(
			`${REACT_APP_API}/fields/${state.fields.selectedFieldId}`,
			data
		);
		return response.data;
	}
);

export const deleteFieldAsync = createAsyncThunk(
	'fields/delete',
	async (id, thunkApi) => {
		const response = await axios.delete(`${REACT_APP_API}/fields/${id}`);
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
