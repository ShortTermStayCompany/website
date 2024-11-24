import './HomePage.css'
import Navbar from "../components/feature/Navbar/Navbar.jsx";
import {useState} from "react";

const HomePage = () => {
    const [userLogged, setUserLogged] = useState(false);

    return (
        <div>
            <Navbar></Navbar>

            {!userLogged && (
                <></>
            )

            }
        </div>

)
}

export default HomePage;