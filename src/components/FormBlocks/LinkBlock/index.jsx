import { TextField } from '@mui/material';
import React from 'react';
import './styles.scss';
export default function LinkBlock({ title, register, required, errors }) {
	return (
		<div className='link-block'>
			<div className='link-block-title'>{title}</div>
			<div className='link-block-content'>
				<TextField
					label={'Title'}
					{...register(`${title}.title`, {
						required,
					})}
					error={errors?.title}
					fullWidth
				/>
				<TextField
					label={'URL'}
					{...register(`${title}.url`, {
						required,
					})}
					error={errors?.url}
					fullWidth
				/>
			</div>
		</div>
	);
}
