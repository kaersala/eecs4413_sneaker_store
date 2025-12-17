import React, { useState, useEffect } from 'react';
import CustomerService from '../Service/AdminCustomerService';
import { useNavigate } from 'react-router-dom';

const emptyVar = {
	id: null,
	firstName: '',
	lastName: '',
	email: '',
	passwordHash: '',
	phoneNumber: '',
	addressLine1: '',
	addressLine2: '',
	city: '',
	province: '',
	postalCode: '',
	country: '',
};

const AdminCustomer = () => {
	const navigate = useNavigate();
	const [customers, setCustomers] = useState([]);
	const [formVisible, setFormVisible] = useState(false);
	const [formData, setFormData] = useState(emptyVar);

	// Fetch all customers
	const fetchCustomers = async () => {
		try {
			const data = await CustomerService.listCustomers();
			setCustomers(data);
			console.log('[Debug] Fetched customers:', data);
		} catch (err) {
			console.error('Failed to fetch customers list', err);
		}
	};

	useEffect(() => {
		fetchCustomers();
	}, []);

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Handle edit customer
	const handleEdit = async (customerId) => {
		try {
			const customer = await CustomerService.getCustomerbyId(customerId);
			setFormData(customer);
			setFormVisible(true);
		} catch (err) {
			console.error('Failed to fetch customer', err);
		}
	};

	// Handle delete customer
	const handleDelete = async (customerId) => {
		if (window.confirm('Are you sure you want to delete this customer?')) {
			try {
				await CustomerService.deleteCustomer(customerId);
				fetchCustomers();
				alert('Customer successfully deleted');
			} catch (err) {
				console.error('Failed to delete customer', err);
			}
		}
	};

	// Handle form submit (update only)
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await CustomerService.updateCustomer(formData.id, formData);
			setFormVisible(false);
			fetchCustomers();
			alert('Customer updated successfully');
		} catch (err) {
			console.error('Failed to update customer', err);
		}
	};

	return (
		<div>
			<h2>Customer List</h2>
			<button onClick={() => navigate('/admin')}>Back to Admin Page</button>

			<table border="1" cellPadding="10">
				<thead>
					<tr>
						<th>ID</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>City</th>
						<th>Province</th>
						<th>Country</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{customers.length > 0 ? (
						customers.map((c) => (
							<tr key={c.id}>
								<td>{c.id}</td>
								<td>{c.firstName}</td>
								<td>{c.lastName}</td>
								<td>{c.email}</td>
								<td>{c.phoneNumber}</td>
								<td>{c.city}</td>
								<td>{c.province}</td>
								<td>{c.country}</td>
								<td>
									<button onClick={() => navigate(`/admin/orders?customerId=${c.id}`)}>View Orders</button>
									<button onClick={() => handleEdit(c.id)}>Edit</button> <button onClick={() => handleDelete(c.id)}>Delete</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="9" style={{ textAlign: 'center' }}>
								No customers found
							</td>
						</tr>
					)}
				</tbody>
			</table>

			{/* Edit Customer Form */}
			{formVisible && (
				<form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
					<h3>Edit Customer</h3>

					<div>
						First Name: <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
						<br />
						Last Name: <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
						<br />
						Email: <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled />
						<br />
						Phone Number: <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
						<br />
						Address Line 1: <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
						<br />
						Address Line 2: <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
						<br />
						City: <input type="text" name="city" value={formData.city} onChange={handleChange} />
						<br />
						Province: <input type="text" name="province" value={formData.province} onChange={handleChange} />
						<br />
						Postal Code: <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
						<br />
						Country: <input type="text" name="country" value={formData.country} onChange={handleChange} />
					</div>

					<div style={{ marginTop: '10px' }}>
						<button type="submit">Update</button>{' '}
						<button type="button" onClick={() => setFormVisible(false)}>
							Cancel
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default AdminCustomer;
