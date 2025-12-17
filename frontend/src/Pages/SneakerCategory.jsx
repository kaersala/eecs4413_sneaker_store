import React, { useContext, useState } from "react";
import { SneakerContext } from "../Context/SneakerContext";
import Item from "../Components/Item/Item";


const SneakerCategory = () => {
  const { all_product } = useContext(SneakerContext);
  const [sortOrder, setSortOrder] = useState("");

  // Sorting
  const sortedProducts = [...all_product].sort((a, b) => {
    if (sortOrder === "priceAsc") {
      // low to high
      return a.price - b.price;
    } else if (sortOrder === "priceDesc") {
      //high to low
      return b.price - a.price;
    } else if (sortOrder === "nameAsc") {
      //A ot Z
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "nameDesc") {
      //Z to A
      return b.name.localeCompare(a.name);
    } else {
      return 0;
    }
  });

  return (
    <div className="sneaker_category">
      <div className="sneaker_category_indexSort">
        <p>
          <span>Showing 1 - {all_product.length}</span> out of{" "}
          {all_product.length} products
        </p>
        <div className="sneaker_category_sort">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            {/* Sort drop down  */}
            <option value="">Sort by</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="nameAsc">Name: A to Z</option>
            <option value="nameDesc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* display all items  */}
      <div className="sneaker_category_products">
        {sortedProducts.map((item, index) => (
          <Item
            key={index}
            id={item.id}
            name={item.name}
            image={item.image}
            price={`$${item.price}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SneakerCategory;
