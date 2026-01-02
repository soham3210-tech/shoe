import "./Cart.css";

const parsePrice = (v) => {
    if (v == null) return 0;
    const num = Number(String(v).replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
};

const Cart = ({ cart = [], onClose, increment, decrement, removeItem }) => {
    const total = cart.reduce((sum, it) => sum + parsePrice(it.product.newPrice) * it.qty, 0);

    return (
        <aside className="cart-drawer" role="dialog" aria-label="Shopping cart">
            <div className="cart-header">
                <h3>Your Cart</h3>
                <button className="close-btn" onClick={onClose} aria-label="Close cart">
                    X
                </button>
            </div>

            <div className="cart-items">
                {cart.length === 0 && <div className="empty">Your cart is empty.</div>}

                {cart.map((item) => {
                    const { product, qty } = item;
                    const price = parsePrice(product.newPrice);
                    return (
                        <div className="cart-item" key={product.title}>
                            <img src={product.img} alt={product.title} className="cart-item-img" />
                            <div className="cart-item-details">
                                <div className="cart-item-title">{product.title}</div>
                                <div className="cart-item-controls">
                                    <button onClick={() => decrement(product.title)}>-</button>
                                    <span className="qty">{qty}</span>
                                    <button onClick={() => increment(product.title)}>+</button>
                                    <button className="remove" onClick={() => removeItem(product.title)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <div className="cart-item-price">${(price * qty).toFixed(2)}</div>
                        </div>
                    );
                })}
            </div>

            <div className="cart-footer">
                <div className="total">Total: ${total.toFixed(2)}</div>
            </div>
        </aside>
    );
};

export default Cart;