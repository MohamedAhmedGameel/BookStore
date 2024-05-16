import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductMenu() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const apiUrl = "http://127.0.0.1:80/phpreactcrud/api/action.php";
    let x = fetch(apiUrl, {
      method: "GET",
      mode: "cors", // Ensure CORS mode is set
    });

    x.then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="bg-gray-100 py-20" id="menu">
      <div className=" ">
        <div className="main-header text-center">
          <h1 className=" mx-auto mb-20 p-[15px] border-b-[3px] border-solid border-blue-500 p-30 max-w-max md:text-4xl text-2xl relative">
            FEATURED BOOKS
            <span className="absolute w-5 h-5 left-1/2 transform -translate-x-1/2 top-[88%] bg-blue-500 rounded-full"></span>
          </h1>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-5 max-w-[960px] mx-auto">
          {users.map((book) => (
            <>

              <ProductCard key={book.id} book={book} />

            </>

          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductMenu;
