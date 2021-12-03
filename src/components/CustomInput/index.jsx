import { MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { FIELD_TYPES } from '../../constants';
import './styles.scss';
export default function CustomInput({
	label,
	inputProps,
	select,
	setType,
	type,
	numeric,
	error,
}) {
	return (
		<div className='custom-input'>
			{label && <div className='custom-input-label'>{label}</div>}
			{error?.message && (
				<div className='custom-input-error'>{error?.message}</div>
			)}
			{!select ? (
				<TextField
					error={error}
					variant='filled'
					fullWidth
					{...inputProps}
					type={numeric ? 'number' : 'text'}
				/>
			) : (
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					label='Age'
					fullWidth
					defaultValue={type || FIELD_TYPES.TEXT}
					{...inputProps}
				>
					<MenuItem
						value={FIELD_TYPES.TEXT}
						onClick={() => setType(FIELD_TYPES.TEXT)}
					>
						Text
					</MenuItem>
					<MenuItem
						value={FIELD_TYPES.NAME}
						onClick={() => setType(FIELD_TYPES.NAME)}
					>
						Name
					</MenuItem>
					<MenuItem
						value={FIELD_TYPES.LINK}
						onClick={() => setType(FIELD_TYPES.LINK)}
					>
						Link
					</MenuItem>
					<MenuItem
						value={FIELD_TYPES.DATE}
						onClick={() => setType(FIELD_TYPES.DATE)}
					>
						Date
					</MenuItem>
				</Select>
			)}
		</div>
	);
}
