import { TextField } from '@mui/material';
import React from 'react';
import './styles.scss';
export default function TextBlock({
	title,
	rowsCount,
	register,
	required,
	errors,
}) {
	return (
		<div className='text-block'>
			<div className='text-block-title'>{title}</div>
			<TextField
				multiline={rowsCount > 1}
				{...register(title, {
					required,
				})}
				error={errors}
				maxRows={rowsCount}
				fullWidth
			/>
		</div>
	);
}
