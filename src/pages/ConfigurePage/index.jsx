import { Button } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ConfigurableField from '../../components/ConfigurableField';
import './styles.scss';
import { deleteSelectedFieldId, getFields } from '../../store/slices/fields';
import { useSelector, useDispatch } from 'react-redux';
import FieldModal from '../../components/FieldModal';

export default function ConfigurePage() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		dispatch(deleteSelectedFieldId());
	};
	const dispatch = useDispatch();
	const fields = useSelector(getFields);

	return (
		<div className='configure-page'>
			{fields?.map((field, index) => {
				return (
					<ConfigurableField
						title={field.details.label}
						key={index}
						id={field.id}
						openModal={handleOpen}
					/>
				);
			})}
			<div className='configure-page-footer'>
				<Button onClick={handleOpen}>Add new field</Button>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box className='configure-page-modal'>
					<FieldModal close={handleClose} />
				</Box>
			</Modal>
		</div>
	);
}
