import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faBox, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProductCard({ book }) {
    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useDispatch();
    const [clicked, setClicked] = useState(false);

    const { name, price, image, id } = book;

    const handleClick = () => {
        const quantity = 1;
        dispatch(addToCart({ id, title: name, price, image: image, quantity }));
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 3000);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // Adjust the timeout value as needed
    };

    return (
        <div className="w-[85%] max-w-70 md:w-60 flex justify-center items-center h-[430px] px-5 py-4 bg-white rounded-lg shadow-md" id="menu">
            <div className="flex flex-col px-4">
                <Link to={`/product/${id}`}>
                    <div className="h-[255px] flex justify-center items-center">
                        <img src={image} alt="" className="w-fit max-h-50 h-[240px] rounded" />
                    </div>
                </Link>
                <Link to={`/product/${id}`}>
                    <div className="pl-2">
                        <h1 className="text-md font-bold mb-whitespace-nowrap overflow-hidden overflow-ellipsis h-[50px]">{name}</h1>
                        <h2 className="text-sm font-medium text-gray-600">by James clear</h2>
                        <h2 className="font-bold text-blue-900 text-[20px]">{price} &#163;</h2>
                    </div>
                </Link>
                <button className={`cart-button ${clicked ? 'clicked' : ''}`} onClick={handleClick}>
                    <span className="add-to-cart">ADD TO CART</span>
                    <span className="added">ADDED</span>
                    <span className="shopping-cart">
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </span>
                    <span className="shopping-box">
                        <FontAwesomeIcon icon={faBox} />
                    </span>
                </button>
            </div>
            <div className={`fixed top-20 right-0 left-0 w-[100vw] flex justify-center duration-500 z-[51] ${showPopup === true ? "top-20" : "top-[-100%]"}`}>
                <p className='bg-blue-900 text-white w-fit px-4 py-1 rounded-lg'>Product added to cart!</p>
            </div>
        </div>
    );
}

export default ProductCard;
