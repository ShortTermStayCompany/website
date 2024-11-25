// import { useEffect, useState } from "react";
// import { get_listings } from "../../Api/apiService.js";
// import "./ListingCard.css"; // Import the CSS file
//
// const ListingCard = () => {
//     const [listings, setListings] = useState(null);
//     const [meta, setMeta] = useState(null); // pagination data from listings
//     const [loading, setLoading] = useState(false);
//     const [loadingFailed, setLoadingFailed] = useState(false);
//     const [page, setPage] = useState(1);
//     const [perPage, setPerPage] = useState(10);
//
//     const fetchListings = async (page, perPage) => {
//         setLoading(true);
//         let current_page = page
//         let hasMorePages = true;
//         while (hasMorePages) {
//             try {
//                 console.error('Log LC-1: ')
//                 const response = await get_listings(page, perPage);
//                 console.log(response);
//                 console.log("Full response:", response);
//                 setListings(response.data); // listings
//                 setMeta(response.meta); // pagination info
//
//
//                 console.log('Response data',response.data);
//                 console.log('next page exist?',response.meta.has_next);
//                 console.log(response.meta)
//                 console.log(meta)
//                 console.log(meta)
//                 console.log(meta)
//                 console.log(meta)
//                 console.log(meta)
//
//
//             } catch (error) {
//                 console.error('Log LC-2: ')
//                 console.error(error);
//                 console.log("Loading listings failed");
//                 setLoadingFailed(true);
//                 return
//             } finally {
//                 console.error('Log LC-3: ')
//                 console.log("Set Loading false");
//                 setLoading(false);
//                 setLoadingFailed(false);
//                 hasMorePages = meta.has_next
//
//
//             }
//
//         }
//         // hasMorePages = 0;
//
//         setLoading(false);
//
//     };
//
//     useEffect(() => {
//         fetchListings(page, perPage);
//     }, []);
//
//     return (
//         <div className="listing-wrapper">
//             {loading && (
//                 <div className="loading">
//                     <span>Loading...</span>
//                 </div>
//             )}
//             {loadingFailed && (
//                 <div className="error">Backend is sleeping atm(due to free tier web app on azure i guess),  keep refreshing the page to activate the backend, or contact me since i may have turned it off </div>
//             )}
//             <div className="listing-container">
//                 {listings &&
//                     listings.map((listing) => (
//                         <div key={listing.id} className="listing-card">
//                             <h3 className="listing-title">{listing.title}</h3>
//                             <div className="listing-details">
//                                 <p><strong>From:</strong> {listing.availableFrom}</p>
//                                 <p><strong>To:</strong> {listing.availableTo}</p>
//                                 <p><strong>Average Rating:</strong> {listing.averageRating}</p>
//                                 <p><strong>City:</strong> {listing.city}</p>
//                                 <p><strong>Country:</strong> {listing.country}</p>
//                                 <p><strong>Max Number of People:</strong> {listing.numberOfPeople}</p>
//                                 <p><strong>Host ID:</strong> {listing.user_id}</p>
//                                 <p><strong>Booked Dates</strong> {listing.unavailableDates}</p>
//                             </div>
//                             <button>book listing</button>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };
//
// export default ListingCard;
// ListingCard.js
import { useEffect, useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { get_listings, book_listing } from "../../Api/apiService.js"; // Import book_listing
import "react-datepicker/dist/react-datepicker.css"; // Import React DatePicker CSS
import "./ListingCard.css"; // Import the CSS file

// Set the root element for accessibility
Modal.setAppElement("#root"); // Ensure your root element has id="root"

const ListingCard = () => {
    const [listings, setListings] = useState(null);
    const [meta, setMeta] = useState(null); // pagination data from listings
    const [loading, setLoading] = useState(false);
    const [loadingFailed, setLoadingFailed] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

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
        if (!selectedDates.start || !selectedDates.end) {
            setBookingError("Please select both start and end dates.");
            return;
        }

        setBookingLoading(true);
        setBookingError(null);

        try {
            // Assuming you have a booking API that takes listing ID and dates
            const response = await book_listing(selectedListing.id, selectedDates);
            console.log("Booking successful:", response);
            setBookingSuccess(true);
            // Optionally, refresh the listings to update booked dates
            fetchListings(page, perPage);
        } catch (error) {
            console.error("Booking failed:", error);
            setBookingError("Failed to book listing. Please try again.");
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
                                <p><strong>Booked Dates:</strong> {listing.unavailableDates.join(", ")}</p>
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
                         showMonthYearDropdown/>
                        {bookingError && <div className="booking-error">{bookingError}</div>}
                        {bookingSuccess && <div className="booking-success">Booking successful!</div>}
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