import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import './styles.scss';
import { useDispatch } from 'react-redux';
import {
	deleteFieldAsync,
	setSelectedFieldId,
} from '../../store/slices/fields';
export default function ConfigurableField({ title, id, openModal }) {
	const [deleteModal, setDeleteModal] = useState(false);
	const dispatch = useDispatch();
	const openEditModal = () => {
		dispatch(setSelectedFieldId(id));
		openModal();
	};
	const openDeleteModal = () => {
		setDeleteModal(true);
	};
	const closeDeleteModal = () => {
		setDeleteModal(false);
	};
	const deleteField = () => {
		dispatch(deleteFieldAsync(id));
		closeDeleteModal();
	};
	return (
		<>
			<div className='configurable-field'>
				<div className='configurable-field-title'>{title}</div>
				<div className='configurable-field-actions'>
					<Button onClick={openEditModal}>Edit</Button>
					<Button onClick={openDeleteModal}>delete</Button>
				</div>
			</div>
			<Dialog
				open={deleteModal}
				onClose={closeDeleteModal}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>Delete field</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Are you sure want delete this field
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeDeleteModal}>Close</Button>
					<Button onClick={deleteField} autoFocus>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
