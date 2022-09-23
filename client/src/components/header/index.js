import { NavLink } from 'react-router-dom';

export const Header = () => {
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
				<div id="user">
					<NavLink to="/create">Create Game</NavLink>
					<a href="#">Logout</a>
				</div>
				{/* <!-- Guest users --> */}
				<div id="guest">
					<NavLink to="/login">Login</NavLink>
					<NavLink to="/register">Register</NavLink>
				</div>
			</nav>
		</header>
	);
};
