import React, { useState, useEffect } from 'react';
import AdminProductService from '../Service/AdminProductService';
import { useNavigate } from 'react-router-dom';

const AdminProduct = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [formVisible, setFormVisible] = useState(false);
	const [formData, setFormData] = useState({
		id: null,
		sku: '',
		name: '',
		brand: '',
		description: '',
		price: '',
		stockQuantity: '',
		imageUrl: '',
	});

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const data = await AdminProductService.listProducts();
			setProducts(data);
		} catch (err) {
			console.error('Failed to fetch products', err);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleEdit = (product) => {
		setFormData(product);
		setIsEditing(true);
		setFormVisible(true);
	};

	const handleAddNew = () => {
		setFormData({
			id: null,
			sku: '',
			name: '',
			brand: '',
			description: '',
			price: '',
			stockQuantity: '',
			imageUrl: '',
		});
		setIsEditing(false);
		setFormVisible(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (isEditing) {
				await AdminProductService.updateProduct(formData.id, formData);
			} else {
				await AdminProductService.addProduct(formData);
			}
			setFormVisible(false);
			setIsEditing(false);
			fetchProducts();
		} catch (err) {
			console.error('Failed to save product', err);
		}
	};

	const handleDelete = async (id) => {
		try {
			await AdminProductService.deleteProduct(id);
			fetchProducts();
		} catch (err) {
			console.error('Failed to delete product', err);
		}
	};

	return (
		<div>
			<h2>Product List</h2>
			<button onClick={() => navigate('/Admin')}>Back to Admin Page</button>
			<button onClick={handleAddNew}>Add Product</button>

			{/* Add / Update Form */}
			{formVisible && (
				<form onSubmit={handleSubmit} style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc' }}>
					SKU: <input type="text" name="sku" placeholder="SKU" value={formData.sku} onChange={handleChange} required />
					<br />
					Name: <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
					<br />
					Brand: <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} />
					<br />
					Description: <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
					<br />
					Price: <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required step="0.01" />
					<br />
					Stock Quantity: <input type="number" name="stockQuantity" placeholder="Stock Quantity" value={formData.stockQuantity} onChange={handleChange} required />
					<br />
					Image URL: <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
					<br />
					<button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
					<button type="button" onClick={() => setFormVisible(false)} style={{ marginLeft: '10px' }}>
						Cancel
					</button>
				</form>
			)}

			{/* Products Table */}
			<table border="1" cellPadding="10">
				<thead>
					<tr>
						<th>ID</th>
						<th>SKU</th>
						<th>Name</th>
						<th>Brand</th>
						<th>Description</th>
						<th>Price ($)</th>
						<th>Stock Quantity</th>
						<th>Image</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.length > 0 ? (
						products.map((product) => (
							<tr key={product.id}>
								<td>{product.id}</td>
								<td>{product.sku}</td>
								<td>{product.name}</td>
								<td>{product.brand}</td>
								<td>{product.description}</td>
								<td>{product.price.toFixed(2)}</td>
								<td>{product.stockQuantity}</td> {/* Stock displayed only */}
								<td>{product.imageUrl ? <img src={product.imageUrl} alt={product.name} width="80" /> : 'No Image'}</td>
								<td>
									<button onClick={() => handleEdit(product)}>Edit</button>
									<button onClick={() => handleDelete(product.id)}>Delete</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="9">No products found</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default AdminProduct;
