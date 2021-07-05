import React, { useState } from 'react';

import { Container, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

import './style.scss';

import logo from '../.././assets/images/coding_icon_color.png';
import { Link } from 'react-router-dom';

interface NavbarInterface {
	Home: string;
	About: string;
	Skills: string;
	Portafolio: string;
	Contact: string;
}

const NavbarModern = () => {
	const initialState = {
		Home: 'col-md-1 text-center mx-auto px-0',
		About: 'col-md-2 text-center my-auto px-2 mx-2 NavBo',
		Skills: 'col-md-2 text-center my-auto px-2 mx-2 NavBo',
		Portafolio: 'col-md-2 text-center my-auto px-2 mx-2 NavBo',
		Contact: 'col-md-2 text-center my-auto px-2 mx-2 NavBo',
	};

	const [Active, setActive] = useState<NavbarInterface>({
		Home: 'col-md-1 text-center mx-auto px-0 active',
		About: 'col-md-2 text-center my-auto px-2 mx-2 NavBo',
		Skills: 'col-md-2 text-center my-auto px-2 mx-2 NavBo',
		Portafolio: 'col-md-2 text-center my-auto px-2 mx-2 NavBo',
		Contact: 'col-md-2 text-center my-auto px-2 mx-2 NavBo',
	});

	const handleClick = (id: string) => {
		if (id === 'Home') {
			setActive({
				...initialState,
				[id]: 'col-md-1 text-center mx-auto px-0 activeB',
			});
		} else {
			setActive({
				...initialState,
				[id]: 'col-md-2 text-center my-auto px-2 mx-2 NavBo activeN',
			});
		}
	};

	return (
		<Navbar
			variant='dark'
			collapseOnSelect
			expand='md'
			fixed='top'
			className='py-1 NavbarM'
		>
			<Container className='justify-content-end'>
				<Navbar.Toggle
					aria-controls='responsive-navbar-nav'
					className='justify-content-center'
				/>
				<Navbar.Collapse
					id='responsive-navbar-nav'
					className='justify-content-center'
				>
					<Nav
						id='responsive-navbar-nav'
						className='col-md-10 justify-content-center'
					>
						<Nav.Link
							className={Active.About}
							onClick={() => {
								handleClick('About');
							}}
							as={Link}
							to='/scanurl'
						>
							Scan Url
						</Nav.Link>
						<Nav.Link
							className={Active.Skills}
							href='#skills'
							onClick={() => {
								handleClick('Skills');
							}}
						>
							Skills
						</Nav.Link>

						<Navbar.Brand as={Link} to='/' className={Active.Home}>
							<img
								src={logo}
								width='60'
								height='auto'
								className='d-inline-block align-top NavBrand'
								alt='React Bootstrap logo'
								onClick={() => {
									handleClick('Home');
								}}
							/>
						</Navbar.Brand>

						<Nav.Link
							className={Active.Portafolio}
							href='#projects'
							onClick={() => {
								handleClick('Projects');
							}}
						>
							Projects
						</Nav.Link>
						<Nav.Link
							className={Active.Contact}
							href='#contact'
							onClick={() => {
								handleClick('Contact');
							}}
						>
							Contact
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarModern;
