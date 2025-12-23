import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swipers from "../swper/Swipers";
import "./Product.css";
import Swal from "sweetalert2";

function ProductPage() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://694a818d26e870772065b6e7.mockapi.io/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const product = data?.find((p) => String(p.id) === String(id));

  if (!product) return <h2>Product not found</h2>;

  const handleAddToCart = () => {
    const selectedProduct = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, selectedProduct];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${selectedProduct.name} has been added successfully.`,
      timer: 2000,
      showConfirmButton: false,
      background: "black",
      color: "white",
    });
  };

  return (
    <>
      <h1 className="text-center m-3">
        details <span className="silver">Product</span>
      </h1>
      <div className="container my-5">
        <div className="row">
          <div className="col-12 col-md-7 mb-4">
            <div className="product-gallery">
              <div className="product-image mb-3 text-center">
                <img
                  id="mainImage"
                  className="img-fluid rounded"
                  src={product.image}
                  alt={product.name}
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
              </div>
              <div className="d-flex justify-content-center gap-3">
                <img
                  src={product.image}
                  alt="Product 1"
                  className="img-thumbnail thumb-img"
                  style={{ width: "100px", height: "100px", cursor: "pointer" }}
                />
                <img
                  src={product.image}
                  alt="Product 2"
                  className="img-thumbnail thumb-img"
                  style={{ width: "100px", height: "100px", cursor: "pointer" }}
                />
                <img
                  src={product.image}
                  alt="Product 3"
                  className="img-thumbnail thumb-img"
                  style={{ width: "100px", height: "100px", cursor: "pointer" }}
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5">
            <h1 className="mb-3 silver">{product.name}</h1>
            <h3 className="text-success mb-4">${product.price}</h3>
            <div className="description mb-4 opacity-75">
              <p>
                The purposes of bonsai are primarily contemplation for the
                viewer, and the pleasant exercise of effort and ingenuity for
                the grower.
              </p>
              <p>
                By contrast with other plant cultivation practices, bonsai is
                not intended for production of food or for medicine. Instead,
                bonsai practice focuses on long-term cultivation and shaping of
                one or more small trees growing in a container.
              </p>
            </div>
            <button className="btn btn-dark w-100" onClick={handleAddToCart}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <Swipers />
    </>
  );
}

export default ProductPage;
