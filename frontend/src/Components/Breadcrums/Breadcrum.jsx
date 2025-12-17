import "./Breadcrums.css";
import React from "react";

const Breadcrums = (props) => {
  const { product } = props;
  return (
    <div className="breadcrum">
      HOME &gt; {product.category} &gt; {product.name}
    </div>
  );
};

export default Breadcrums;
