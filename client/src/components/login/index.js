import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from 'services/api/users';

export const Login = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	function onChange(ev) {
		const value = ev.target.value;
		const name = ev.target.name;

		const newForm = {
			...formData,
			[name]: value,
		};

		setFormData((formData) => newForm);
	}

	async function onSubmit(ev) {
		ev.preventDefault();
		if (formData.email.length === 0 || formData.email.length === 0) {
			return window.alert('You need to fill all fields');
		}

		const response = await loginUser(formData);

		if (response.code === 403) {
			return window.alert(response.message);
		}

		navigate('/');
	}

	return (
		// <!-- Login Page ( Only for Guest users ) -->
		<section id="login-page" className="auth">
			<form id="login" onSubmit={onSubmit}>
				<div className="container">
					<div className="brand-logo"></div>
					<h1>Login</h1>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Sokka@gmail.com"
						value={formData.email}
						onChange={onChange}
					/>

					<label htmlFor="login-pass">Password:</label>
					<input
						type="password"
						id="login-password"
						name="password"
						value={formData.password}
						onChange={onChange}
					/>
					<input type="submit" className="btn submit" value="Login" />
					<p className="field">
						<span>
							If you don't have profile click <a href="#">here</a>
						</span>
					</p>
				</div>
			</form>
		</section>
	);
};
