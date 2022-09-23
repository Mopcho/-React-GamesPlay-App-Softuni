import { Catalogue } from 'components/catalogue';
import { Create } from 'components/create';
import { Details } from 'components/details';
import { Edit } from 'components/edit';
import { Header } from 'components/header';
import { Home } from 'components/home';
import { Login } from 'components/login';
import { Register } from 'components/register';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<div id="box">
				<main id="main-content">
					{/* Components */}
					<Header></Header>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/create" element={<Create />} />
						<Route path="/edit/:id" element={<Edit />} />
						<Route path="/catalogue" element={<Catalogue />} />
						<Route path="/games/:id" element={<Details />} />
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
