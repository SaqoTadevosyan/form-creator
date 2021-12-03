import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { getFieldsAsync } from '../store/slices/fields';
import {
	deleteMessages,
	getProfileErrorMessage,
	getProfileSuccessMessage,
} from '../store/slices/profiles';
import { PROFILE_ERROR_MESSAGE, PROFILE_SUCCESS_MESSAGE } from '../constants';
import { Alert } from '@mui/material';
export default function MainWrapper() {
	const dispatch = useDispatch();
	const errorMessage = useSelector(getProfileErrorMessage);
	const successMessage = useSelector(getProfileSuccessMessage);
	useEffect(() => {
		dispatch(getFieldsAsync());
	}, []);

	useEffect(() => {
		if (successMessage || errorMessage) {
			setTimeout(() => {
				dispatch(deleteMessages());
			}, 3000);
		}
	}, [successMessage, errorMessage]);

	return (
		<>
			<div className='wrapper'>
				<NavBar />
				<div className='content-wrapper'>
					<Outlet />
				</div>
				{successMessage && (
					<Alert severity='success'>{PROFILE_SUCCESS_MESSAGE}</Alert>
				)}
				{errorMessage && (
					<Alert severity='success'>{PROFILE_ERROR_MESSAGE}</Alert>
				)}
			</div>
		</>
	);
}
