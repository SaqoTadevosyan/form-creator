import { configureStore } from '@reduxjs/toolkit';
import fieldsReducer from './slices/fields';
import profilesReducer from './slices/profiles';

export const store = configureStore({
	reducer: {
		fields: fieldsReducer,
		profiles: profilesReducer,
	},
	devTools: true,
});
