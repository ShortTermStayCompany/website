import React, {useEffect} from 'react';
import './Navbar.css';
import SubmitButton from "../loginRegister/SubmitButton/SubmitButton.jsx";
import AccountMenu from "./AccountMenu/AccountMenu.jsx";
import ListingCard from "../../Listings/ListingCard.jsx";
import {useUser} from "../../../context/UserContext.jsx";
const Navbar = () => {
    const {user} = useUser();
    const [userLoggedIn, setUserLoggedIn] = React.useState(false);
    const [userRole, setUserRole] = React.useState('guest');
    const [listingsOpen, setListingsOpen] = React.useState(true);
    const [bookingsOpen, setBookingsOpen] = React.useState(false);
    const [staysOpen, setStaysOpen] = React.useState(false);
    const [hosterBookings, setHosterBookings] = React.useState(false);

    useEffect(() => {
        if (user) {
            setUserLoggedIn(true);
            setUserRole(user.role || 'guest'); // Default to 'guest' if role is undefined
            console.log('user:',user.name,'logged in as',userRole)
        } else {
            // Default state if no user is logged in
            setUserLoggedIn(false);
            setUserRole('guest');
        }
    }, [user]); // Re-run the effect whenever `user` changes
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <span className="navbar-brand">bnb</span>
            </div>

            {/* Navigation Links */}
            <div className="navbar-links">
                <span className="navbar-link" onClick={() => setListingsOpen(!listingsOpen)}>Listings</span>
                <span className="navbar-link" >Stays</span>
                {userRole === 'host' && (
                    <span className="navbar-link"> Hosted Listings </span>
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
