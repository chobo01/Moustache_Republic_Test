import "./App.css";
import "./scss/App.scss";
import ProductImage from "./image/classic-tee.jpg";
import React, { useState } from "react";

function App() {
  const [itemNumber, setItemNumber] = useState(0);
  return (
    <div className="App">
      <div className="cart-header">
        <div className="container">
          <div className="row">
            <p className="my-cart">
              <a href="#">My Cart ( {itemNumber} )</a>
            </p>
          </div>
        </div>
      </div>
      <div className="product-body">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12">
              <img src={ProductImage} alt="Product" />
            </div>
            <div className="col-md-6 col-12">
              <div className="product-information">
                <h2 className="product-name">Classic Tee</h2>
                <p className="product-price">$75.00</p>
                <p className="product-description">
                  Dolor sit amet, consectetur adipiscing elit. Haec et tu ita
                  posuisti, et verba vestra sunt. Quod autem ratione actum est,
                  id officium appellamus dolor sit amet, consectetur adipiscing
                  elit. Haec et tu ita posuisti, et verba vestra sunt. Quod
                  autem ratione actum est, id officium appellamus
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
