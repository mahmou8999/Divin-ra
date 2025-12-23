import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useNavigate } from "react-router-dom";

import "./swiper.css";

function Swipers() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://694a818d26e870772065b6e7.mockapi.io/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => setProducts(data));
  }, []);

  const handleViewDetailsClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (products.length === 0) {
    return (
      <div className="swiper-loading">
        <p>Loading Products...</p>
      </div>
    );
  }

  return (
    <div className="products-swiper-section">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="product-card">
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Swipers;
