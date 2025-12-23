import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Gold from "../golds/Gold";

function Products() {
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://694a818d26e870772065b6e7.mockapi.io/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleViewDetailsClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <>
      <Gold showSwiper={false} />

      <h1 className="text-center m-5">
        Special <span className="product-name fs-1">products</span>
      </h1>
      <div className="container">
        <div className="row">
          {data?.map((product) => (
            <div
              key={product.id}
              className="product-card col-lg-4 col-md-6 mb-3"
            >
              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-karat">Karat: {product.karat}</p>
                <p className="product-price">{product.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleViewDetailsClick(product.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
