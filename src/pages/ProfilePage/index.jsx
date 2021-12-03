import React from 'react';
import { FIELD_TYPES } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import NameBlock from '../../components/FormBlocks/NameBlock';
import TextBlock from '../../components/FormBlocks/TextBlock';
import LinkBlock from '../../components/FormBlocks/LinkBlock';
import DateBlock from '../../components/FormBlocks/DateBlock';
import { getVisibleFields } from '../../store/slices/fields';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { addProfileAsync } from '../../store/slices/profiles';
import './styles.scss';
export default function ProfilePage() {
	const fields = useSelector(getVisibleFields);
	const dispatch = useDispatch();
	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		dispatch(addProfileAsync(data));
		reset();
	};
	const renderBlock = (field, index) => {
		switch (field.type) {
			case FIELD_TYPES.NAME:
				return (
					<NameBlock
						title={field.details.label}
						required={field.details.required}
						register={register}
						errors={errors[field.details.label]}
						key={index}
					/>
				);
			case FIELD_TYPES.TEXT:
				return (
					<TextBlock
						title={field.details.label}
						required={field.details.required}
						rowsCount={field.details.rows}
						register={register}
						errors={errors[field.details.label]}
						key={index}
					/>
				);
			case FIELD_TYPES.LINK:
				return (
					<LinkBlock
						title={field.details.label}
						required={field.details.required}
						register={register}
						errors={errors[field.details.label]}
						key={index}
					/>
				);
			case FIELD_TYPES.DATE:
				return (
					<DateBlock
						title={field.details.label}
						required={field.details.required}
						format={field.details.date}
						register={register}
						errors={errors[field.details.label]}
						key={index}
						setValue={setValue}
					/>
				);
			default:
				return (
					<TextBlock
						title={field.details.label}
						required={field.details.required}
					/>
				);
		}
	};

	return (
		<div className='profile-page'>
			<form onSubmit={handleSubmit(onSubmit)}>
				{fields.map((field, index) => {
					return renderBlock(field, index);
				})}
				{fields.length > 0 && (
					<div className='profile-page-footer'>
						<Button type='submit'>Save Profile</Button>
					</div>
				)}
			</form>
		</div>
	);
}
