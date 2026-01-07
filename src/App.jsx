import { useState } from "react";

import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import products from "./db/data";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import Cart from "./components/Cart";
import "./index.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering ---------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Cart Functions ---------
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.product.title === product.title);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.title === product.title
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, qty: 1 }]);
    }
  };

  const incrementCartItem = (title) => {
    setCart(
      cart.map((item) =>
        item.product.title === title ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrementCartItem = (title) => {
    setCart(
      cart.map((item) =>
        item.product.title === title && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeCartItem = (title) => {
    setCart(cart.filter((item) => item.product.title !== title));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      (product) => (
        <Card
          key={product.title}
          img={product.img}
          title={product.title}
          star={product.star}
          reviews={product.reviews}
          prevPrice={product.prevPrice}
          newPrice={product.newPrice}
          onAddToCart={() => addToCart(product)}
        />
      )
    );
  }

  const result = filteredData(products, selectedCategory, query);

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation
        query={query}
        handleInputChange={handleInputChange}
        cartCount={cartCount}
        toggleCart={toggleCart}
      />
      <Recommended handleClick={handleClick} />
      <Products result={result} />
      {isCartOpen && (
        <Cart
          cart={cart}
          onClose={toggleCart}
          increment={incrementCartItem}
          decrement={decrementCartItem}
          removeItem={removeCartItem}
        />
      )}
    </>
  );
}

export default App;