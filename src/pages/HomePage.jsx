import './HomePage.css'
import Navbar from "../components/feature/Navbar/Navbar.jsx";
import {useState} from "react";
import ListingCard from "../components/Listings/ListingCard.jsx";
const HomePage = () => {
    const [userLogged, setUserLogged] = useState(false);

    return (
        <div>
            <Navbar></Navbar>
            <ListingCard></ListingCard>
            {!userLogged && (
                <></>
            )

            }
        </div>

)
}

export default HomePage;