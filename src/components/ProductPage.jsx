import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Product = () => {
    const [book, setBook] = useState({})
    const [quantity, setQuantity] = useState(1);
    const [clicked, setClicked] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();
    const bookId = params.id;

    useEffect(() => {
        const apiUrl = `http://127.0.0.1:80/phpreactcrud/api/action.php?id=${bookId}`;

        fetch(apiUrl, {
            method: "GET",
            mode: "cors",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setBook(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [bookId]);

    const handleClick = () => {
        const title = book.book_name;
        const price = book.price;
        const image = book.book_image;
        const id = book.id;
        dispatch(addToCart({ id, title, price, image, quantity }))
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 3000);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // Adjust the timeout value as needed

    };

    return (
        <div className="product mt-32 mb-16 mx-10 min-h-[100vh]">
            <div className="container flex-col items-center text-blue-900 flex gap-10 lg:flex-row md:flex-col lg:items-start md:items-center sm:flex-col sm:items-center xsm:flex-col xsm:items-center">
                <div>
                    <img src={book.book_image} alt="Product" className="w-[250px] sm:w-[333px] md:w-[500px] lg:w-[20vw] lg:max-w-[700px]" />
                </div>
                <div className="details flex flex-col">
                    <div className="book-name">
                        <h1 className="text-4xl font-bold my-4">{book.book_name}</h1>
                    </div>
                    <div className="book-author mb-4">
                        <h1 className="text-xl my-4">{book.author}</h1>
                        <h2>{book.categ}</h2>
                    </div>
                    <div className="book-description mb-6">
                        <p className="text-base text-gray-500">
                            {book.dscp}
                        </p>
                    </div>
                    <div className="book-price mb-6">
                        <span className="text-2xl font-semibold">Price:</span>
                        <span className="text-2xl ml-2">{book.price}</span>
                    </div>
                    <div className="book-price mb-6">
                        <span className="text-2xl font-semibold">Quantity:</span>
                        <input
                            onChange={(e) => setQuantity(e.target.value)}
                            type="number"
                            defaultValue={1}
                            className="border-2 text-2xl border-blue-900 w-[50px] max-w-fit rounded-lg px-2 "
                        />
                    </div>
                    <div className="max-w-52 flex flex-col gap-3">
                        <button className={`cart-button w-[100%] ${clicked ? 'clicked' : ''}`} onClick={() => handleClick()}>
                            <span className="add-to-cart">
                                ADD TO CART
                            </span>
                            <span className="added">
                                ADDED
                            </span>
                            <span className="shopping-cart">
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </span>
                            <span className="shopping-box">
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                        </button>

                        <a href="#" className="inline-block mb-[20px] px-5 py-2 bg-blue-600 text-white text-center text-base  w-[100%] rounded-lg border-3 border-solid border-blue-600 transition duration-300 hover:bg-white hover:text-black  hover:border-black">
                            Menu
                        </a>
                    </div>

                </div>
            </div>
            <div className={`fixed top-20 right-0 left-0 w-[100vw] flex justify-center duration-500 z-[51] ${showPopup === true ? "top-20" : "top-[-100%]"}`}>
                <p className=' bg-blue-900 text-white w-fit px-4 py-1 rounded-lg'>Product added to cart!</p>
            </div>
        </div>
    );
};

export default Product;
