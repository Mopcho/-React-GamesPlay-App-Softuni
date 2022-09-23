import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from 'services/api/users';

export const Register = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		'confirm-password': '',
	});

	function onChange(ev) {
		const value = ev.target.value;
		const name = ev.target.name;

		const newData = {
			...formData,
			[name]: value,
		};

		setFormData(newData);
	}

	async function submitForm(ev) {
		ev.preventDefault();

		let error;
		if (formData.email.length < 6) {
			error = 'Email must be at least 6 characters long';
		}

		if (formData.password.length < 6) {
			error = 'Password must be at least 6 characters long';
		}

		if (formData.password !== formData['confirm-password']) {
			error = 'Password must match repeat password';
		}

		if (error) {
			return window.alert(error);
		}

		const response = await registerUser({
			email: formData.email,
			password: formData.password,
		});

		navigate('/');
	}

	return (
		// <!-- Register Page ( Only for Guest users ) -->
		<section id="register-page" className="content auth">
			<form id="register" onSubmit={submitForm}>
				<div className="container">
					<div className="brand-logo"></div>
					<h1>Register</h1>

					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="maria@email.com"
						onChange={onChange}
					/>

					<label htmlFor="pass">Password:</label>
					<input
						type="password"
						name="password"
						id="register-password"
						onChange={onChange}
					/>

					<label htmlFor="con-pass">Confirm Password:</label>
					<input
						type="password"
						name="confirm-password"
						id="confirm-password"
						onChange={onChange}
					/>

					<input
						className="btn submit"
						type="submit"
						value="Register"
					/>

					<p className="field">
						<span>
							If you already have profile click{' '}
							<a href="#">here</a>
						</span>
					</p>
				</div>
			</form>
		</section>
	);
};
