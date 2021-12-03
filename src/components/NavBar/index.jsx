import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
export default function index() {
	return (
		<div className='nav-bar'>
			<Link to='/profile'>Profile</Link>
			<Link to='/configure'>Create form</Link>
		</div>
	);
}
