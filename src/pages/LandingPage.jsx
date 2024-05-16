import Filter from "../components/Filter";
import Landing from "../components/Landing";
import ProductMenu from "../components/ProductsMenu";
import Reviews from "../components/Reviews";

function LandingPage() {

    return (
        <>
            <Landing />
          <Filter/>
            {/* <ContactUs /> */}
            <Reviews />
        </>
    )
}

export default LandingPage;