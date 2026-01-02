import { useState } from "react";
import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import products from "./db/data";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]); // { product, qty }
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleInputChange = (event) => setQuery(event.target.value);
  const handleChange = (event) => setSelectedCategory(event.target.value);
  const handleClick = (event) => setSelectedCategory(event.target.value);

  // Add product to cart (increment qty if exists)
  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((p) => p.product.title === product.title);
      if (found) {
        return prev.map((item) =>
          item.product.title === product.title ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const increment = (title) =>
    setCart((prev) => prev.map((it) => (it.product.title === title ? { ...it, qty: it.qty + 1 } : it)));

  const decrement = (title) =>
    setCart((prev) =>
      prev
        .map((it) => (it.product.title === title ? { ...it, qty: it.qty - 1 } : it))
        .filter((it) => it.qty > 0)
    );

  const removeItem = (title) => setCart((prev) => prev.filter((it) => it.product.title !== title));

  const toggleCart = () => setIsCartOpen((s) => !s);

  const filteredItems = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  function filteredData(productsList, selected, q) {
    let filteredProducts = productsList;
    if (q) filteredProducts = filteredItems;
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

    return filteredProducts.map((product, idx) => (
      <Card
        key={`${product.title}-${idx}`}
        img={product.img}
        title={product.title}
        star={product.star}
        reviews={product.reviews}
        prevPrice={product.prevPrice}
        newPrice={product.newPrice}
        onAddToCart={() => addToCart(product)}
      />
    ));
  }

  const result = filteredData(products, selectedCategory, query);
  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

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
          increment={increment}
          decrement={decrement}
          removeItem={removeItem}
        />
      )}
    </>
  );
}

export default App;