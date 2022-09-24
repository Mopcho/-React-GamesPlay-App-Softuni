import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUser } from 'services/api/users';
import { clearAccessToken, getAccessToken } from 'utils/userToken';

export const Header = ({ user, setUser }) => {
	const navigate = useNavigate();

	async function onLogout(ev) {
		ev.preventDefault();

		await clearAccessToken();

		setUser({});

		navigate('/');
	}

	return (
		<header>
			{/* <!-- Navigation --> */}
			<h1>
				<NavLink to="/" className="home">
					GamesPlay
				</NavLink>
			</h1>
			<nav>
				<NavLink to="/catalogue">All games</NavLink>
				{/* <!-- Logged-in users --> */}
				{Object.keys(user).length !== 0 ? (
					<div id="user">
						<NavLink to="/create">Create Game</NavLink>
						<a href="" onClick={onLogout}>
							Logout
						</a>
					</div>
				) : (
					<div id="guest">
						<NavLink to="/login">Login</NavLink>
						<NavLink to="/register">Register</NavLink>
					</div>
				)}

				{/* <!-- Guest users --> */}
			</nav>
		</header>
	);
};
