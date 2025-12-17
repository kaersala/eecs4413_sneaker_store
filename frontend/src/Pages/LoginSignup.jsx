import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../Service/AuthService';

const LoginSignup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await AuthService.loginUser({ email, password });
			const { token, customerId } = response;

			if (!token || !customerId) {
				alert('Login failed');
				return;
			}

			alert('Successful login');
			console.log('[Debug] Logged in user ID:', customerId);

			// Assign role
			if (email === 'demo@sneakerstore.test') {
				localStorage.setItem('role', 'ADMIN');
				navigate('/admin');
			} else {
				localStorage.setItem('role', 'USER');
				navigate('/sneakers');
			}
		} catch (err) {
			console.error(err);
			alert('Login failed. Please check email and password.');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="loginSignup">
				<div className="loginSignup_container">
					<h1>Login</h1>

					<div className="loginSignup_fields">
						<input type="text" placeholder="Email address" value={email} onChange={handleEmail} />
						<input type="password" placeholder="Password" value={password} onChange={handlePassword} />
					</div>

					<button className="login_button">Login</button>

					<p>
						Not a member?{' '}
						<span className="signup_link" onClick={() => navigate('/register')}>
							Sign Up
						</span>
					</p>
				</div>
			</div>
		</form>
	);
};

export default LoginSignup;
