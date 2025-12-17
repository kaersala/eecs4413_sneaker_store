import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = (props) => {
	return (

		<div className="item">
			<Link to={`/sneakers/${props.id}`}>
				<img src={props.image} className="item_image" />
			</Link>
			<p>{props.name}</p>

			<div className="item_price">{props.price}</div>
		</div>
	);
};

export default Item;
