import { useEffect, useState } from "react";
import ProductCard from './ProductCard';
import { PulseLoader } from "react-spinners";

const Filter = () => {
    const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]);
    const [selectedAuthorFilters, setSelectedAuthorFilters] = useState([]);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [author, setAuthor] = useState([]);
    const [load, setLoad] = useState(true);
    const [filterLoad, setFilterLoad] = useState(false)
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);

    // useEffect(() => {
    //     const apiUrl = "http://127.0.0.1:80/phpreactcrud/api/action.php";
    //     fetch(apiUrl, { method: "GET", mode: "cors" })
    //         .then((response) => response.json())
    //         .then((data) => setProducts(data))
    //         .catch((error) => console.error("Error fetching products:", error));
    //     setLoad(false)
    // }, []);

    useEffect(() => {
        const apiUrl = `https://moga-library.000webhostapp.com/api/action.php?page=${currentPage}&perPage=${perPage}`;
        fetch(apiUrl, { method: "GET", mode: "cors" })
            .then((response) => response.json())
            .then((data) => {
                // Customize the books data here
                const customizedProducts = data.books.map((book) => ({
                    id: book.id,
                    name: book.book_name,
                    image: book.book_image,
                    price: book.price,
                    description: book.dscp,
                    author: book.author_name,
                    category: book.categ_name,
                }));
                setPageNumber(data.totalPages);
                console.log(pageNumber)
                setProducts(customizedProducts);
                setLoad(false);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, [perPage, currentPage]);
    useEffect(() => {
        const categoryUrl = "https://moga-library.000webhostapp.com/api/category.php";
        fetch(categoryUrl, { method: "GET", mode: "cors" })
            .then((response) => response.json())
            .then((data) => { setCategory(data); setFilterLoad(true) })
            .catch((error) => console.error("Error fetching categories:", error));
        const authorUrl = "https://moga-library.000webhostapp.com/api/author.php";
        fetch(authorUrl, { method: "GET", mode: "cors" })
            .then((response) => response.json())
            .then((data) => { setAuthor(data); setFilterLoad(true) })
            .catch((error) => console.error("Error fetching authors:", error));

    }, []);



    const handleCategoryFilter = (category) => {
        setSelectedCategoryFilters(prevFilters => {
            if (prevFilters.includes(category)) {
                return prevFilters.filter((f) => f !== category);
            } else {
                return [...prevFilters, category];
            }
        });
    };

    const handleAuthorFilter = (author) => {
        setSelectedAuthorFilters(prevFilters => {
            if (prevFilters.includes(author)) {
                return prevFilters.filter((f) => f !== author);
            } else {
                return [...prevFilters, author];
            }
        });
    };

    const filteredProducts = () => {
        let filtered = [...products];

        if (selectedCategoryFilters.length > 0) {
            filtered = filtered.filter((product) => selectedCategoryFilters.includes(product.category));
        }

        if (selectedAuthorFilters.length > 0) {
            filtered = filtered.filter((product) => selectedAuthorFilters.includes(product.author));
        }

        return filtered;
    };

    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= pageNumber; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center py-14 w-screen min-h-screen" id="menu">
            <div className="flex flex-col items-center space-y-4 max-w-[1000px]">
                <div className="main-header text-center">
                    <h1 className=" mx-auto mb-20 p-[15px] border-b-[3px] border-solid border-blue-500 p-30 max-w-max md:text-4xl text-2xl relative">
                        FEATURED BOOKS
                        <span className="absolute w-5 h-5 left-1/2 transform -translate-x-1/2 top-[88%] bg-blue-500 rounded-full"></span>
                    </h1>
                </div>
                {
                    !filterLoad ?
                        <PulseLoader color="#06abc9" />
                        :
                        <>
                            <div className="flex w-[90vw] max-w-[1000px] space-x-4 justify-evenly overflow-x-auto rounded-md border-solid p-[10px] bg-slate-200">
                                {category.map((category, idx) => (
                                    <button
                                        key={`category-${idx}`}
                                        className={`text-[15px] px-4 py-2 bg-blue-600 text-white rounded-md w-[120px] white-nowrap text-nowrap 
                                ${selectedCategoryFilters.includes(category.categ_name) ? "bg-blue-900" : ""}
                            `}
                                        onClick={() => handleCategoryFilter(category.categ_name)}
                                    >
                                        {category.categ_name}
                                    </button>
                                ))}
                            </div>

                            <div className="flex w-[90vw] max-w-[1000px] space-x-4 justify-evenly overflow-x-auto rounded-md border-solid p-[10px] bg-gray-200">
                                {author.map((author, idx) => (
                                    <button
                                        key={`author-${idx}`}
                                        className={`text-[15px] px-4 py-2 bg-blue-600 text-white rounded-md min-w-[200px] w-fit white-nowrap text-nowrap 
                                ${selectedAuthorFilters.includes(author.author_name) ? "bg-blue-900" : ""}
                            `}
                                        onClick={() => handleAuthorFilter(author.author_name)}
                                    >
                                        {author.author_name}
                                    </button>
                                ))}
                            </div>
                        </>
                }

                {
                    load ?
                        <PulseLoader color="#06abc9" />
                        :
                        <div className="flex flex-wrap justify-center items-center flex-col gap-5 w-screen max-w-[960px] mx-auto">
                            <div className="flex flex-wrap justify-center items-center gap-5 w-screen max-w-[960px] mx-auto">
                                {filteredProducts().map((product) => (
                                    <ProductCard key={product.id} book={product} />
                                ))}
                            </div>

                            <div className='mt-5'>
                                <div className='flex justify-center items-center gap-10'>
                                    <ul className='flex border-solid bg-white justify-center w-fit p-[10px] rounded-lg gap-[15px] shadow-lg'>
                                        {pageNumbers.map(number => (
                                            <li key={number} className='page-item'>
                                                <button
                                                    onClick={() => setCurrentPage(number)}
                                                    className='relative inline-block p-[12px] text-xs text-white bg-blue-600 border-2 border-white rounded-[5px] transform rotate-45 shadow-lg hover:text-blue-600 hover:bg-white transition duration-300'
                                                >
                                                    <span className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45'>
                                                        {number}
                                                    </span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <span>Books per page: </span>
                                    <select value={perPage} onInput={(e) => { setPerPage(e.target.value); setCurrentPage(1) }}>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                    </select>

                                </div>
                            </div>
                        </div>
                }

            </div>
        </div>
    );
}

export default Filter;
