import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.scss';
export default function NavBar() {
	const { pathname } = useLocation();
	return (
		<div className='nav-bar'>
			<Link
				to='/profile'
				className={pathname === '/profile' && 'nav-bar-active-link'}
			>
				Profile
			</Link>
			<Link
				to='/configure'
				className={pathname === '/configure' && 'nav-bar-active-link'}
			>
				Create form
			</Link>
		</div>
	);
}
