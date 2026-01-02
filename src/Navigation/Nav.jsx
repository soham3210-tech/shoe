import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import "./Nav.css";

const Nav = ({ handleInputChange, query, cartCount = 0, toggleCart }) => {
    return (
        <nav>
            <div className="nav-container">
                <input
                    className="search-input"
                    type="text"
                    onChange={handleInputChange}
                    value={query}
                    placeholder="Enter your search shoes."
                />
            </div>
            <div className="profile-container">
                <button className="icon-btn" aria-label="Favorites">
                    <FiHeart className="nav-icons" />
                </button>

                <button
                    className="icon-btn cart-link"
                    onClick={(e) => {
                        e.preventDefault();
                        toggleCart && toggleCart();
                    }}
                    aria-label="Open cart"
                >
                    <AiOutlineShoppingCart className="nav-icons" />
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </button>

                <button className="icon-btn" aria-label="Account">
                    <AiOutlineUserAdd className="nav-icons" />
                </button>
            </div>
        </nav>
    );
};

export default Nav;