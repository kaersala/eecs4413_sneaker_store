import React from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import AuthService from '../Service/AuthService';

const Cart = () => {
	const { cartProductList, addToCart, decreaseItem, deleteItem, getTotalItems } = useCart();
	const navigate = useNavigate();
	const userLoggedIn = AuthService.isAuthenticated(); // returns true/false

	const totalPrice = cartProductList.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

	const handleCheckout = () => {
		if (!userLoggedIn) {
			// redirect to login first, then back to checkout
			navigate('/login', { state: { from: '/checkout' } });
		} else {
			navigate('/checkout');
		}
	};

	// Early return if cart is empty
	if (cartProductList.length === 0) {
		return <p>Your cart is empty</p>;
	}

	return (
		<div style={{ padding: '20px' }}>
			<h2>Your Cart ({getTotalItems()} items)</h2>
			<table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Size</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{cartProductList.map((item) => {
						const cartKey = `${item.id}-${item.size}`;
						return (
							<tr key={cartKey}>
								<td>{item.name}</td>
								<td>{item.size}</td>
								<td>${parseFloat(item.price).toFixed(2)}</td>
								<td>{item.quantity}</td>
								<td>${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
								<td>
									<button onClick={() => addToCart(cartKey)}>+</button>
									<button onClick={() => decreaseItem(cartKey)}>-</button>
									<button onClick={() => deleteItem(cartKey)}>Remove</button>
								</td>
							</tr>
						);
					})}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan="4" style={{ textAlign: 'right', fontWeight: 'bold' }}>
							Total Price:
						</td>
						<td colSpan="2" style={{ fontWeight: 'bold' }}>
							${totalPrice.toFixed(2)}
						</td>
					</tr>
				</tfoot>
			</table>
			<div>
				<button onClick={handleCheckout}>Checkout</button>
			</div>
		</div>
	);
};

export default Cart;
