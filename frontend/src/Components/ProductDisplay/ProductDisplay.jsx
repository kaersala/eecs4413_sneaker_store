import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import SneakerService from '../../Service/SneakerService';
import { CartContext } from '../../Context/CartContext';


const ProductDisplayPage = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState(null);
	const { addToCart } = useContext(CartContext);
	const [selectedSize, setSelectedSize] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const data = await SneakerService.getSneakerById(productId);
				setProduct({ ...data, id: String(data.id) });
			} catch (err) {
				console.error('Failed to fetch product', err);
			}
		};
		fetchProduct();
	}, [productId]);

	const handleAddToCart = () => {
		if (!product) return;
		if (!selectedSize) {
			alert('Please select a size');
			return;
		}

		const cartKey = `${product.id}-${selectedSize}`;
		console.log('[ProductDisplay] Adding to cart:', cartKey);
		addToCart(cartKey);
		alert('Added to cart!');
	};

	if (!product) return <div>Loading product...</div>;

	return (
		<div className="product_display">
			<div className="product_display_left">
				<img className="product_display_img" src={product.imageUrl}  />
			</div>

			<div className="product_display_right">
				<h1>{product.name}</h1>
				<p><span className="label">SKU:</span> {product.sku}</p>
				<p><span className="label">Brand:</span> {product.brand}</p>
				<p><span className="label">Description:</span> {product.description}</p>


				<h2>${product.price}</h2>
				<p><span class="label">In Stock: {product.stock}</span></p>

				<div className="product_display_size">
					<h3>Select size</h3>
					<div className="product_display_size_button">
					{product.availableSizes.map((size) => (
					<div
						key={size}
						className={`size_box ${selectedSize === size ? 'selected' : ''}`}
						onClick={() => setSelectedSize(size)}
					>
	{size}
  </div>
))}
</div>

				</div>

				<button className="add_cart" onClick={handleAddToCart}>
					ADD TO CART
				</button>
			</div>
		</div>
	);
};

export default ProductDisplayPage;
