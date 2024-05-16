import { Route, Routes } from 'react-router-dom';
import Cart from "./cart";
import LandingPage from "./LandingPage";
import Product from '../components/ProductPage';
import NotFound from './NotFound';

function Home() {



    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} ></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/product/:id" element={<Product />} />
                <Route path="*" element={<NotFound />}></Route>
            </Routes>


        </>
    )
}

export default Home;