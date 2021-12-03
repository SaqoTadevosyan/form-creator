import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../NavBar';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import {
	getFieldsAsync,
	getFieldsSuccessMessage,
} from '../../../store/slices/fields';
import {
	deleteMessages,
	getProfileErrorMessage,
	getProfileSuccessMessage,
} from '../../../store/slices/profiles';
import {
	FIELD_ERROR_MESSAGE,
	PROFILE_ERROR_MESSAGE,
	PROFILE_SUCCESS_MESSAGE,
} from '../../../constants';
import { Alert } from '@mui/material';
export default function MainWrapper() {
	const dispatch = useDispatch();
	const profileErrorMessage = useSelector(getProfileErrorMessage);
	const profileSuccessMessage = useSelector(getProfileSuccessMessage);
	const fieldsErrorMessage = useSelector(getFieldsSuccessMessage);
	useEffect(() => {
		dispatch(getFieldsAsync());
	}, []);

	useEffect(() => {
		if (profileSuccessMessage || profileErrorMessage || fieldsErrorMessage) {
			setTimeout(() => {
				dispatch(deleteMessages());
			}, 3000);
		}
	}, [profileErrorMessage, profileSuccessMessage, fieldsErrorMessage]);

	return (
		<>
			<div className='wrapper'>
				<NavBar />
				<div className='content-wrapper'>
					<Outlet />
				</div>
				{profileSuccessMessage && (
					<Alert severity='success'>{PROFILE_SUCCESS_MESSAGE}</Alert>
				)}
				{profileErrorMessage && (
					<Alert severity='error'>{PROFILE_ERROR_MESSAGE}</Alert>
				)}
				{fieldsErrorMessage && (
					<Alert severity='error'>{FIELD_ERROR_MESSAGE}</Alert>
				)}
			</div>
		</>
	);
}
