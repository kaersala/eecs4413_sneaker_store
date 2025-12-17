import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
	const navigate = useNavigate();
	return (
		<div>
			<h2>Admin Page</h2>
			<button onClick={() => navigate('/AdminCustomers')}>List of Customers</button>
			<br />
			<button onClick={() => navigate('/AdminOrders')}>List of Orders</button>
			<br />
			<button onClick={() => navigate('/AdminProducts')}>List of Products</button>
			<br />
			<button onClick={() => navigate('/SalesHistory')}>Sale History</button>
			<br />
		</div>
	);
};

export default AdminPage;
