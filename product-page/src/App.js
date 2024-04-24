import "./App.css";
import "./scss/App.scss";
// import ProductImage from "./image/classic-tee.jpg";
import React, { useState } from "react";

function App() {
  const [productData, setProductData] = useState();
  const [itemNumber, setItemNumber] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [productList, setProductList] = useState([]);

  async function fetchData() {
    const productDataUrl = `https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product`;
    const returnedproductDataResponse = await fetch(productDataUrl);
    const returnedproductData = await returnedproductDataResponse.json();
    console.log(returnedproductData);
    setProductData(returnedproductData);
  }

  function sizeClicked(size) {
    const button = document.getElementById(size);
    if (button.classList.contains("selected")) {
      // If the button is already selected, remove the class
      button.classList.remove("selected");
      setSelectedSize("");
    } else {
      // Otherwise, add the class to the clicked button and remove it from others
      const buttons = document.querySelectorAll(".size-list button");
      buttons.forEach((btn) => {
        if (btn.id === size) {
          btn.classList.add("selected");
        } else {
          btn.classList.remove("selected");
        }
      });
      setSelectedSize(size);
    }
  }

  function addToCartClicked() {}

  function main() {
    if (productData === undefined) {
      fetchData();
    } else {
      return (
        <div className="App">
          <div className="cart-header">
            <div className="container">
              <div className="row">
                <p className="my-cart">
                  <button>My Cart ( {itemNumber} )</button>
                </p>
              </div>
            </div>
          </div>
          <div className="product-body">
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-12">
                  {/* <img src={ProductImage} alt="Product" /> */}
                  <img src={productData.imageURL} alt="Product" />
                </div>
                <div className="col-md-6 col-12">
                  <div className="product-information">
                    <h2 className="product-name">{productData.title}</h2>
                    <hr />
                    <p className="product-price">
                      ${productData.price.toFixed(2)}
                    </p>
                    <hr />
                    <p className="product-description">
                      {productData.description}
                    </p>
                    <div className="size">
                      <p id="size-title">
                        SIZE<span className="required">*</span>{" "}
                        <span className="size-selected">{selectedSize}</span>
                      </p>
                      <div className="row size-list">
                        {productData.sizeOptions.map((size, index) => {
                          return (
                            <button
                              key={index}
                              id={size.label}
                              onClick={() => sizeClicked(size.label)}
                            >
                              <div className="col-1">{size.label}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="add-to-cart">
                      <button onClick={() => addToCartClicked()}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{main()}</>;
}

export default App;
