import "./App.css";
import "./scss/App.scss";
// import ProductImage from "./image/classic-tee.jpg";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const [productData, setProductData] = useState();
  const [selectedSize, setSelectedSize] = useState("");
  const [productList, setProductList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const myCartRef = useRef(null);
  const [myCartRightPos, setMyCartRightPos] = useState();

  useEffect(() => {
    let node = myCartRef.current;
    if (node) {
      let rect = node.getBoundingClientRect();
      console.log("Element position:", rect.right);
      setMyCartRightPos(rect.right);
    }
  });

  async function fetchData() {
    const productDataUrl = `https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product`;
    const returnedproductDataResponse = await fetch(productDataUrl);
    const returnedproductData = await returnedproductDataResponse.json();
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

  function addToCartClicked() {
    if (selectedSize !== "") {
      let newProductList = productList;
      let selectedSizeProduct = newProductList.find(
        (product) => product.size === selectedSize
      );
      if (selectedSizeProduct !== undefined) {
        setProductList((prevProductList) => {
          return prevProductList.map((item) => {
            if (item.size === selectedSize) {
              return { ...item, number: item.number + 1 };
            }
            return item;
          });
        });
      } else {
        newProductList = newProductList.concat({
          size: selectedSize,
          number: 1,
        });
        setProductList(newProductList);
      }
    } else {
      setIsOpen(true);
    }
  }

  function myCartButtonClicked() {
    console.log("clicked");
    const button = document.getElementById("my-cart-button");
    console.log(button);
    if (button.classList.contains("my-cart-active")) {
      button.classList.remove("my-cart-active");
    } else {
      button.classList.add("my-cart-active");
    }
  }

  function closePopup() {
    setIsOpen(false);
  }

  function main() {
    console.log(myCartRightPos);
    if (productData === undefined) {
      fetchData();
    } else {
      return (
        <div className="App">
          {isOpen && (
            <div className="popup">
              <div className="popup-content">
                <button className="close-btn" onClick={closePopup}>
                  X
                </button>
                <h2>Please choose a size.</h2>
              </div>
            </div>
          )}
          <div className="cart-wrapper">
            <div className="cart-container">
              <div className="cart-header">
                <div className="container">
                  <div className="row">
                    <p className="my-cart">
                      <button
                        id="my-cart-button"
                        ref={myCartRef}
                        onClick={() => {
                          myCartButtonClicked();
                          setIsCartOpen(!isCartOpen);
                        }}
                      >
                        My Cart ( {productList.length} )
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="cart-list-container"
                style={{
                  left: `${
                    window.screen.width < 400 ? 0 : myCartRightPos - 400
                  }px`,
                  width: `${
                    window.screen.width < 400 ? window.screen.width - 2 : 400
                  }px`,
                }}
              >
                {isCartOpen && productList.length > 0 && (
                  <div
                    className="cart-list"
                    style={{
                      width: `${
                        window.screen.width < 400
                          ? window.screen.width - 2
                          : 400
                      }px`,
                    }}
                  >
                    {productList.map((product, index) => (
                      <div key={index} className="product-in-cart">
                        <div className="container">
                          <div className="row">
                            <div className="col-4 column">
                              <img
                                src={productData.imageURL}
                                width={"100%"}
                                alt="Product"
                              />
                            </div>
                            <div className="col-8 column">
                              <p className="product-name">
                                {productData.title}
                              </p>
                              <p className="product-price">
                                {product.number} x{" "}
                                <span style={{ fontWeight: "700" }}>
                                  ${productData.price.toFixed(2)}
                                </span>
                              </p>
                              <p className="product-name">
                                Size: {product.size}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="product-body">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-12 column">
                  {/* <img src={ProductImage} alt="Product" /> */}
                  <img
                    src={productData.imageURL}
                    width={"100%"}
                    alt="Product"
                  />
                </div>
                <div className="col-lg-6 col-md-12 column">
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
