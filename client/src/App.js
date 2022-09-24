import { Catalogue } from 'components/catalogue';
import { Create } from 'components/create';
import { Details } from 'components/details';
import { Edit } from 'components/edit';
import { Header } from 'components/header';
import { Home } from 'components/home';
import { Login } from 'components/login';
import { Register } from 'components/register';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { getUser } from 'services/api/users';
import { getAccessToken } from 'utils/userToken';

function App() {
	let [user, setUser] = useState({});

	useEffect(() => {
		async function func() {
			const token = await getAccessToken();
			if (token) {
				const user = await getUser(token);
				setUser(user);
			}
		}

		func();
	}, []);

	return (
		<BrowserRouter>
			<div id="box">
				<main id="main-content">
					{/* Components */}
					<Header user={user} setUser={setUser}></Header>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							path="/login"
							element={<Login user={user} setUser={setUser} />}
						/>
						<Route
							path="/register"
							element={<Register user={user} setUser={setUser} />}
						/>
						<Route path="/create" element={<Create />} />
						<Route path="/edit/:id" element={<Edit />} />
						<Route path="/catalogue" element={<Catalogue />} />
						<Route
							path="/games/:id"
							element={<Details user={user} setUser={setUser} />}
						/>
						<Route
							path="*"
							element={
								<div>
									<h1>404 Not Found</h1>
								</div>
							}
						/>
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
