import React, { useState } from 'react';
import AuthService from '../Service/AuthService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		addressLine1: '',
		addressLine2: '',
		password: '',
		city: '',
		province: '',
		postalCode: '',
		country: '',
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await AuthService.registerUser(formData);
			if (response.success) {
				alert('Registration successful!');
				navigate('/login'); // redirect to login
			} else {
				alert(response.message || 'Registration failed');
			}
		} catch (err) {
			alert('Registration failed. Please try again.');
			console.error(err);
		}
	};

	return (
		<div className="loginSignup">
			<div className="loginSignup_container">
				<h1>Register</h1>
				<form className="loginSignup_fields" onSubmit={handleSubmit}>
					<input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
					<input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
					<input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email address" required />
					<input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
					<input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address Line 1" />
					<input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Address Line 2" />
					<input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
					<input type="text" name="province" value={formData.province} onChange={handleChange} placeholder="Province / State" />
					<input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal / ZIP Code" />
					<input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
					<input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
					<button type="submit" className="submit">
						Register
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
