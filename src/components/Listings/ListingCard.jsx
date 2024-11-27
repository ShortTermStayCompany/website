import { useEffect, useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { get_listings, insert_booking } from "../../Api/apiService.js"; // Import book_listing
import "react-datepicker/dist/react-datepicker.css"; // Import React DatePicker CSS
import "./ListingCard.css"; // Import the CSS file
import {useUser} from "../../context/UserContext.jsx";
import { format } from "date-fns"; // Import date-fns for formatting

// Set the root element for accessibility
Modal.setAppElement("#root"); // Ensure your root element has id="root"

const ListingCard = () => {
    const {user} = useUser();
    const [listings, setListings] = useState(null);
    const [meta, setMeta] = useState(null); // pagination data from listings
    const [loading, setLoading] = useState(false);
    const [loadingFailed, setLoadingFailed] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [userNames, setUserNames] = useState(""); // To store names as a single comma-separated string
    const [numberOfPeople, setNumberOfPeople] = useState(0); // To store the number of people
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);
    const [selectedDates, setSelectedDates] = useState({
        start: null,
        end: null,
    });
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingError, setBookingError] = useState(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const fetchListings = async (page, perPage) => {
        setLoading(true);
        try {
            const response = await get_listings(page, perPage);
            const uniqueListings = response.data.filter((listing, index, self) =>
                index === self.findIndex((l) => l.id === listing.id)
            );
            console.log("Unique Listings:", uniqueListings); // Debugging line
            setListings(uniqueListings); // Set unique listings
            setMeta(response.meta); // Pagination info
        } catch (error) {
            console.error("Loading listings failed:", error);
            setLoadingFailed(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListings(page, perPage);
    }, [page, perPage]);

    useEffect(() => {
        console.log(selectedDates.start);
        console.log(selectedDates.end);
    }, [selectedDates]);
    // Open Modal
    const openModal = (listing) => {
        setSelectedListing(listing);
        setSelectedDates({ start: null, end: null });
        setBookingError(null);
        setBookingSuccess(false);
        setIsModalOpen(true);
    };

    // Close Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedListing(null);
    };

    // Handle Booking
    const handleBooking = async () => {
        const token = user?.accessToken;

        if (!token) {
            setBookingError("User is not authenticated. Please log in first.");
            return;
        }
        if (!selectedDates.start || !selectedDates.end) {
            setBookingError("Please select both start and end dates.");
            return;
        }

        if (!userNames || !numberOfPeople) {
            setBookingError("Please fill out all fields.");
            return;
        }

        const namesArray = userNames.split(",").map((name) => name.trim());
        if (namesArray.length !== numberOfPeople) {
            setBookingError(`Number of names must match the amount of people (${numberOfPeople}).`);
            return;
        }

        if (numberOfPeople > selectedListing.numberOfPeople) {
            setBookingError(`Maximum number of people allowed is ${selectedListing.numberOfPeople}.`);
            return;
        }

        setBookingLoading(true);
        setBookingError(null);

        try {
            const bookingData = {
                listing_id: selectedListing.id,
                dateFrom: format(selectedDates.start, "yyyy-MM-dd"), // Format as YYYY-MM-DD
                dateTo: format(selectedDates.end, "yyyy-MM-dd"), // Format as YYYY-MM-DD
                namesOfPeople: namesArray,
                amountOfPeople: numberOfPeople,
            };

            console.log(bookingData);

            const response = await insert_booking(bookingData, token);

            console.log("Booking successful:", response);
            setBookingSuccess(true);

            // Optionally refresh the listings to reflect updated availability
            fetchListings(page, perPage);
        } catch (error) {
            console.error("Booking failed:", error);
            setBookingError(error.message); // Display the backend error message
        } finally {
            setBookingLoading(false);
        }
    };

    return (
        <div className="listing-wrapper">
            {loading && (
                <div className="error">
                    <span>Loading...</span>
                </div>
            )}
            {loadingFailed && (
                <div className="error">
                    The backend service is currently inactive (likely due to the free-tier limitations on Azure). Please refresh the page to wake it up. If the issue persists, feel free to contact me, as I may have temporarily disabled the service                </div>
            )}
            <div className="listing-container">
                {listings &&
                    listings.map((listing) => (
                        <div key={listing.id} className="listing-card">
                            <h3 className="listing-title">{listing.title}</h3>
                            <div className="listing-details">
                                <p><strong>From:</strong> {new Date(listing.availableFrom).toLocaleDateString()}</p>
                                <p><strong>To:</strong> {new Date(listing.availableTo).toLocaleDateString()}</p>
                                <p><strong>Average Rating:</strong> {listing.averageRating}</p>
                                <p><strong>City:</strong> {listing.city}</p>
                                <p><strong>Country:</strong> {listing.country}</p>
                                <p><strong>Max Number of People:</strong> {listing.numberOfPeople}</p>
                                <p><strong>Host ID:</strong> {listing.user_id}</p>
                                {/*<p><strong>Booked Dates:</strong> {listing.unavailableDates.join(", ")}</p>*/}
                            </div>
                            <button onClick={() => openModal(listing)}>Book Listing</button>
                        </div>
                    ))}
            </div>

            {/* Modal for Booking */}
            {selectedListing && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Book Listing"
                    className="booking-modal"
                    overlayClassName="booking-modal-overlay"
                >
                    <h2>{selectedListing.title}</h2>
                    <div className="modal-content">
                        {/* Display Error or Success Messages */}
                        {bookingError && <div className="booking-error">{bookingError}</div>}
                        {bookingSuccess && <div className="booking-success">Booking successful!</div>}

                        {/* Modal Body: Calendar and Inputs */}
                        <div className="modal-body">
                            {/* Calendar Section */}
                            <div className="calendar-section">
                                <DatePicker
                                    selected={selectedDates.start}
                                    onChange={(dates) => {
                                        const [start, end] = dates;
                                        setSelectedDates({ start, end });
                                    }}
                                    startDate={selectedDates.start}
                                    endDate={selectedDates.end}
                                    selectsRange
                                    inline
                                    minDate={new Date(selectedListing.availableFrom)}
                                    maxDate={new Date(selectedListing.availableTo)}
                                    excludeDates={selectedListing.unavailableDates.map(date => new Date(date))}
                                    showMonthYearDropdown
                                />
                            </div>

                            {/* Input Section */}
                            <div className="input-section">
                                <div className="user-inputs">
                                    <label>
                                        Names of People (comma-separated):
                                        <input
                                            type="text"
                                            placeholder="Enter names separated by ','"
                                            onChange={(e) => setUserNames(e.target.value)}
                                        />
                                    </label>
                                    <label>
                                        Amount of People:
                                        <input
                                            type="number"
                                            min="1"
                                            max={selectedListing.numberOfPeople}
                                            placeholder={`Max: ${selectedListing.numberOfPeople}`}
                                            onChange={(e) => setNumberOfPeople(Number(e.target.value))}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Modal Actions */}
                        <div className="modal-actions">
                            <button onClick={handleBooking} disabled={bookingLoading}>
                                {bookingLoading ? "Booking..." : "Confirm Booking"}
                            </button>
                            <button onClick={closeModal} className="modal-close-button">
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>



            )}
        </div>
    );

};

export default ListingCard;