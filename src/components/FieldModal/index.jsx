import { Button, FormControlLabel, Switch } from '@mui/material';
import React from 'react';
import CustomInput from '../CustomInput';
import './styles.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addFieldsAsync,
	getSelectedField,
	updateFieldAsync,
} from '../../store/slices/fields';
import { FIELD_TYPES } from '../../constants';
import { validateDatePattern } from '../../utils/validateDatePattern';
export default function FieldModal({ close }) {
	const selectedField = useSelector(getSelectedField);
	const dispatch = useDispatch();
	const [type, setType] = useState(selectedField?.type || FIELD_TYPES.TEXT);
	const [showRowInput, setShowRowInput] = useState(false);
	const [showDateInput, setShowDateInput] = useState(false);
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm();

	const checkOptions = () => {
		if (type === FIELD_TYPES.TEXT) {
			setShowRowInput(true);
			setShowDateInput(false);
		} else if (type === FIELD_TYPES.DATE) {
			setShowDateInput(true);
			setShowRowInput(false);
		} else {
			setShowDateInput(false);
			setShowRowInput(false);
		}
	};

	useEffect(() => {
		if (selectedField) {
			reset(selectedField);
		}
	}, [selectedField]);

	useEffect(() => {
		checkOptions();
	}, [type]);

	const onSubmit = (data) => {
		if (selectedField) {
			dispatch(updateFieldAsync(data));
		} else {
			dispatch(addFieldsAsync(data));
		}
		close();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='create-modal'>
			<CustomInput
				label='Label'
				required
				error={errors?.details?.label}
				inputProps={{
					...register('details.label', {
						required: true,
					}),
				}}
			/>
			<CustomInput
				label='Type'
				required
				error={errors?.details?.type}
				inputProps={{ ...register('type') }}
				select
				type={selectedField?.type}
				setType={setType}
			/>
			<div className='create-modal-options'>
				<FormControlLabel
					control={
						<Switch
							defaultChecked={
								selectedField ? selectedField.details.required : true
							}
							{...register('details.required')}
						/>
					}
					label='Required Field'
				/>
				<FormControlLabel
					control={
						<Switch
							{...register('details.visible')}
							defaultChecked={
								selectedField ? selectedField.details.visible : true
							}
						/>
					}
					label='Visible'
				/>
			</div>
			{showRowInput && (
				<CustomInput
					label='Rows'
					numeric
					required
					error={errors?.details?.rows}
					inputProps={{
						...register('details.rows', {
							required: true,
						}),
					}}
				/>
			)}
			{showDateInput && (
				<>
					<CustomInput
						label='Date format'
						required
						error={errors?.details?.date}
						inputProps={{
							...register('details.date', {
								required: true,
								validate: (pattern) => validateDatePattern(pattern.trim()),
							}),
						}}
					/>
				</>
			)}
			<div className='create-modal-footer'>
				<Button type='submit'>{selectedField ? 'Update' : 'Save'}</Button>
			</div>
		</form>
	);
}
