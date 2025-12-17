import { useLocation } from 'react-router-dom';

const OrderSummary = () => {
	const { state } = useLocation();
	const { order } = state || {};

	if (!order) return <p>No order found.</p>;

	return (
		<div style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
			<h2>Order Summary</h2>
			<p>
				<strong>Order #:</strong> {order.orderNumber}
			</p>
			<p>
				<strong>Status:</strong> {order.status}
			</p>

			<table width="100%" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
				<thead>
					<tr>
						<th>Product</th>
						<th>Size</th>
						<th>Qty</th>
						<th>Unit Price</th>
						<th>Subtotal</th>
					</tr>
				</thead>
				<tbody>
					{order.items.map((item, index) => (
						<tr key={item.product?.id || item.productId || index}>
							<td>{item.product?.name || `Product ID: ${item.productId}`}</td>
							<td align="center">{item.size || '-'}</td>
							<td align="center">{item.quantity}</td>
							<td align="right">${item.unitPrice?.toFixed(2) || '0.00'}</td>
							<td align="right">${((item.unitPrice || 0) * item.quantity).toFixed(2)}</td>
						</tr>
					))}
					<p>
						<strong>Total:</strong> ${order.totalAmount.toFixed(2)}
					</p>
				</tbody>
			</table>
		</div>
	);
};

export default OrderSummary;
