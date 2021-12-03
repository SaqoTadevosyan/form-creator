import { TextField } from '@mui/material';
import React from 'react';
import './styles.scss';
export default function NameBlock({ title, register, required, errors }) {
	return (
		<div className='name-block'>
			<div className='name-block-title'>{title}</div>
			<div className='name-block-content'>
				<TextField
					{...register(`${title}.firstName`, {
						required,
					})}
					error={errors?.firstName}
					label='First Name'
					fullWidth
				/>
				<TextField
					{...register(`${title}.middleName`, {
						required,
					})}
					label='Middle Name'
					error={errors?.middleName}
					fullWidth
				/>
				<TextField
					{...register(`${title}.lastName`, {
						required,
					})}
					label='Last Name'
					error={errors?.lastName}
					fullWidth
				/>
			</div>
		</div>
	);
}
