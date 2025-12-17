import React, { useState, useEffect } from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import AuthService from '../Service/AuthService';
import CheckoutService from '../Service/CheckoutService';

const Checkout = () => {
	const { cartProductList, getTotalItems, clearCart } = useCart();
	const navigate = useNavigate();

	const [user, setUser] = useState(null);
	const [billing, setBilling] = useState({ firstName: '', lastName: '', address: '', city: '', zip: '' });
	const [shipping, setShipping] = useState({ firstName: '', lastName: '', address: '', city: '', zip: '' });
	const [payment, setPayment] = useState({ cardNumber: '', expiry: '', cvc: '' });
	const [checkoutCompleted, setCheckoutCompleted] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	// Redirect if cart is empty or user not logged in
	useEffect(() => {
		console.log('[Debug] Checkout mounted, cartProductList:', cartProductList);

		if (!cartProductList.length && !checkoutCompleted) {
			console.log('[Debug] Cart is empty, redirecting to sneakers');
			navigate('/sneakers');
			return;
		}

		const currentUser = AuthService.getCurrentUser();
		console.log('[Debug] Current user:', currentUser);

		if (!currentUser?.id) {
			console.log('[Debug] No user logged in, redirecting to login');
			alert('You must be logged in to checkout.');
			navigate('/login');
			return;
		}

		setUser(currentUser);
		setBilling(currentUser.billing || { firstName: '', lastName: '', address: '', city: '', zip: '' });
		setShipping(currentUser.shipping || { firstName: '', lastName: '', address: '', city: '', zip: '' });
	}, [navigate, cartProductList, checkoutCompleted]);

	const totalPrice = cartProductList.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

	const handleConfirmOrder = async () => {
		console.log('[Debug] handleConfirmOrder called');
		console.log('[Debug] user:', user);
		console.log('[Debug] payment:', payment);

		if (!user?.id) {
			console.log('[Debug] No user logged in');
			alert('You must be logged in to checkout.');
			return;
		}

		if (!payment.cardNumber || !payment.expiry || !payment.cvc) {
			console.log('[Debug] Payment info missing');
			alert('Please enter all payment information.');
			return;
		}

		const token = localStorage.getItem('token');
		console.log('[Debug] token from localStorage:', token);

		if (!token) {
			console.log('[Debug] No token found in localStorage');
			alert('You must be logged in to place an order.');
			return;
		}

		const checkoutData = {
			customerId: user.id,
			items: cartProductList.map((item) => ({
				productId: item.id,
				quantity: item.quantity,
				size: item.size || null,
			})),
			shippingAddress: `${shipping.address}, ${shipping.city}, ${shipping.zip}`,
			billingAddress: `${billing.address}, ${billing.city}, ${billing.zip}`,
		};

		console.log('[Debug] checkoutData prepared:', checkoutData);

		try {
			const response = await CheckoutService.createOrder(checkoutData, token);
			console.log('[Debug] Checkout response:', response);

			if (response.status === 'ERROR' || response.message?.toLowerCase().includes('failed')) {
				console.log('[Debug] Payment failed');
				alert(response.message || 'Credit Card Authorization Failed.');
				return; // allow user to retry
			}

			// Payment successful
			setCheckoutCompleted(true);
			alert(`Order ${response.orderNumber} successfully added!`);

			// Navigate to order summary
			console.log('[Debug] Navigating to order-summary page');
			navigate(`/order-summary/${response.orderId}`, { state: { order: response } });

			// Clear cart asynchronously
			setTimeout(() => {
				clearCart();
				console.log('[Debug] Cleared cart');
			}, 0);
		} catch (err) {
			console.error('[Debug] Order submission failed:', err);
			alert('Failed to place order. Please try again.');
			setErrorMessage('Failed to place order.');
		}
	};

	return (
		<div>
			<h2>Checkout</h2>

			{errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
			{successMessage && <div style={{ padding: '10px', margin: '10px 0', backgroundColor: '#d4edda', color: '#155724', borderRadius: '5px' }}>{successMessage}</div>}

			{cartProductList.length === 0 && !checkoutCompleted && <p>Your cart is empty</p>}

			<section>
				<h3>Billing Information</h3>
				<div>
					<label>First Name: </label>
					<input value={billing.firstName} onChange={(e) => setBilling({ ...billing, firstName: e.target.value })} />
				</div>
				<div>
					<label>Last Name: </label>
					<input value={billing.lastName} onChange={(e) => setBilling({ ...billing, lastName: e.target.value })} />
				</div>
				<div>
					<label>Address: </label>
					<input value={billing.address} onChange={(e) => setBilling({ ...billing, address: e.target.value })} />
				</div>
				<div>
					<label>City: </label>
					<input value={billing.city} onChange={(e) => setBilling({ ...billing, city: e.target.value })} />
				</div>
				<div>
					<label>Postal Code: </label>
					<input value={billing.zip} onChange={(e) => setBilling({ ...billing, zip: e.target.value })} />
				</div>
			</section>

			<section>
				<h3>Shipping Information</h3>
				<div>
					<label>First Name: </label>
					<input value={shipping.firstName} onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })} />
				</div>
				<div>
					<label>Last Name: </label>
					<input value={shipping.lastName} onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })} />
				</div>
				<div>
					<label>Address: </label>
					<input value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
				</div>
				<div>
					<label>City: </label>
					<input value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
				</div>
				<div>
					<label>Postal Code: </label>
					<input value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} />
				</div>
			</section>

			<section>
				<h3>Payment Information</h3>
				<div>
					<label>Card Number: </label>
					<input value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} />
				</div>
				<div>
					<label>Expiry: </label>
					<input value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} />
				</div>
				<div>
					<label>CVC: </label>
					<input value={payment.cvc} onChange={(e) => setPayment({ ...payment, cvc: e.target.value })} />
				</div>
			</section>

			<section>
				<h3>Order Summary</h3>
				<table>
					<thead>
						<tr>
							<th>Product</th>
							<th>Size</th>
							<th>Qty</th>
							<th>Price</th>
							<th>Subtotal</th>
						</tr>
					</thead>
					<tbody>
						{cartProductList.map((item) => {
							const subtotal = item.price * item.quantity;
							return (
								<tr key={`${item.id}-${item.size}`}>
									<td>{item.name}</td>
									<td>{item.size || '-'}</td>
									<td>{item.quantity}</td>
									<td>${item.price.toFixed(2)}</td>
									<td>${subtotal.toFixed(2)}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div>
					<p>Total Items: {getTotalItems()}</p>
					<p>Total Price: ${totalPrice.toFixed(2)}</p>
				</div>
			</section>

			<div>
				<button onClick={handleConfirmOrder}>Confirm Order</button>
				<button onClick={() => navigate('/cart')}>Back to Cart</button>
			</div>
		</div>
	);
};

export default Checkout;
