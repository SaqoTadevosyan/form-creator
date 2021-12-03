import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import './styles.scss';
export default function DateBlock({
	register,
	title,
	required,
	setValue,
	format,
	errors,
}) {
	const [selectedDate, setSelectedDate] = useState(new Date());

	useEffect(() => {
		register(title, {
			required,
		});
		setValue(title, selectedDate);
	}, []);

	const handleDateChange = (e) => {
		setValue(title, e);
		setSelectedDate(e);
	};

	return (
		<div className='date-block'>
			<div className='date-block-title'>{title}</div>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DesktopDatePicker
					inputFormat={format}
					value={selectedDate}
					onChange={handleDateChange}
					renderInput={(params) => <TextField {...params} fullWidth />}
				/>
			</LocalizationProvider>
		</div>
	);
}
