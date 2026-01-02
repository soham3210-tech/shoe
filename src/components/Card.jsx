import { BsFillBagFill } from "react-icons/bs";

const Card = ({ img, title, star, reviews, prevPrice, newPrice, onAddToCart }) => {
    return (
        <section className="card">
            <img src={img} alt={title} className="card-img" />
            <div className="card-details">
                <h3 className="card-title">{title}</h3>
                <section className="card-reviews">
                    {star} {star} {star} {star}
                    <span className="total-reviews">{reviews}</span>
                </section>
                <section className="card-price">
                    <div className="price">
                        <del>{prevPrice}</del> {newPrice}
                    </div>
                    <div className="bag">
                        <button
                            type="button"
                            className="bag-btn"
                            onClick={onAddToCart}
                            aria-label={`Add ${title} to cart`}
                            title="Add to cart"
                        >
                            <BsFillBagFill className="bag-icon" />
                        </button>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Card;