import React, { useState, useEffect } from 'react';
import OrderService from '../Service/OrderService';
import { useNavigate } from 'react-router-dom';

const AdminOrder = () => {
	const navigate = useNavigate();

	const [orders, setOrders] = useState([]);
	const [customerFilter, setCustomerFilter] = useState('');
	const [productFilter, setProductFilter] = useState('');
	const [dateFilter, setDateFilter] = useState('');

	const fetchOrders = async () => {
		try {
			const data = await OrderService.listOrders();
			console.log('Fetched orders:', data);
			setOrders(data);
		} catch (err) {
			console.error('Failed to fetch orders', err);
		}
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	const filteredOrders = orders.filter((order) => {
		// Customer filter
		const customerText = `${order.customer?.firstName} ${order.customer?.lastName} ${order.customer?.email}`.toLowerCase();
		const customerMatch = customerText.includes(customerFilter.toLowerCase());

		// Date filter
		const orderDate = new Date(order.orderDate).toISOString().split('T')[0];
		const dateMatch = dateFilter ? orderDate === dateFilter : true;

		// Product filter
		const productMatch = order.items.some((item) => {
			const productText = `${item.product?.name} ${item.product?.brand}`.toLowerCase();
			return productText.includes(productFilter.toLowerCase());
		});

		return customerMatch && productMatch && dateMatch;
	});

	return (
		<div style={{ padding: '20px' }}>
			<h2>Order List</h2>

			<button onClick={() => navigate('/Admin')} style={{ marginBottom: '10px' }}>
				Back to Admin Page
			</button>

			{/* Filters */}
			<div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
				<h3>Filter</h3>
				<br />
				<div>
					Customer Name: <input type="text" placeholder="Filter by customer name or email" value={customerFilter} onChange={(e) => setCustomerFilter(e.target.value)} />
				</div>

				<div>
					Product Name/Brand: <input type="text" placeholder="Filter by product name or brand" value={productFilter} onChange={(e) => setProductFilter(e.target.value)} />
				</div>

				<div>
					Date: <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
				</div>
			</div>

			<table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
				<thead>
					<tr>
						<th>Order ID</th>
						<th>Order Number</th>
						<th>Customer ID</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Product ID</th>
						<th>Product Name</th>
						<th>Brand</th>
						<th>Size</th>
						<th>Unit Price</th>
						<th>Status</th>
						<th>Total Amount</th>
						<th>Order Date</th>
					</tr>
				</thead>

				<tbody>
					{filteredOrders.length === 0 && (
						<tr>
							<td colSpan={15} style={{ textAlign: 'center' }}>
								No orders found
							</td>
						</tr>
					)}

					{filteredOrders.map((order) =>
						order.items.map((item) => (
							<tr key={`${order.id}-${item.id}`}>
								<td>{order.id}</td>
								<td>{order.orderNumber}</td>
								<td>{order.customer?.id}</td>
								<td>{order.customer?.firstName}</td>
								<td>{order.customer?.lastName}</td>
								<td>{order.customer?.email}</td>
								<td>{order.customer?.phoneNumber}</td>
								<td>{item.product?.id}</td>
								<td>{item.product?.name}</td>
								<td>{item.product?.brand}</td>
								<td>{item.size}</td>
								<td>${item.unitPrice.toFixed(2)}</td>
								<td>{order.status}</td>
								<td>${order.totalAmount.toFixed(2)}</td>
								<td>{new Date(order.orderDate).toLocaleString()}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default AdminOrder;
