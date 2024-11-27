import React, {useEffect} from 'react';
import './Navbar.css';
import SubmitButton from "../loginRegister/SubmitButton/SubmitButton.jsx";
import AccountMenu from "./AccountMenu/AccountMenu.jsx";
import ListingCard from "../../Listings/ListingCard.jsx";
import {useUser} from "../../../context/UserContext.jsx";
const Navbar = () => {
    const {role} = useUser();
    const [listingsOpen, setListingsOpen] = React.useState(true);
    const [bookingsOpen, setBookingsOpen] = React.useState(false);
    const [staysOpen, setStaysOpen] = React.useState(false);
    const [hosterBookings, setHosterBookings] = React.useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <span className="navbar-brand">bnb</span>
            </div>

            {/* Navigation Links */}

            <div className="navbar-links">

                <span className="navbar-link" onClick={() => setListingsOpen(!listingsOpen)}>Listings</span>
                <span className="navbar-link" >Stays</span>
                {role === 'host' && (
                    <span className="navbar-link"> Hosted Listings</span>
                )}
            </div>
            {/* Right Side */}
            <div className="navbar-right">
                <AccountMenu />
            </div>
        </nav>
    );
};

export default Navbar;
