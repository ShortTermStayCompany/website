import { useEffect, useState } from "react";
import { get_listings } from "../../Api/apiService.js";
import "./ListingCard.css"; // Import the CSS file

const ListingCard = () => {
    const [listings, setListings] = useState(null);
    const [meta, setMeta] = useState(null); // pagination data from listings
    const [loading, setLoading] = useState(false);
    const [loadingFailed, setLoadingFailed] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const fetchListings = async (page, perPage) => {
        setLoading(true);
        let current_page = page
        let hasMorePages = true;
        while (hasMorePages) {
            try {
                console.error('Log LC-1: ')
                const response = await get_listings(page, perPage);
                console.log(response);
                console.log("Full response:", response);
                setListings(response.data); // listings
                setMeta(response.meta); // pagination info


                console.log('Response data',response.data);
                console.log('next page exist?',response.meta.has_next);
                console.log(response.meta)
                console.log(meta)
                console.log(meta)
                console.log(meta)
                console.log(meta)
                console.log(meta)


            } catch (error) {
                console.error('Log LC-2: ')
                console.error(error);
                console.log("Loading listings failed");
                setLoadingFailed(true);
                return
            } finally {
                console.error('Log LC-3: ')
                console.log("Set Loading false");
                setLoading(false);
                setLoadingFailed(false);
                hasMorePages = meta.has_next


            }

        }
        // hasMorePages = 0;

        setLoading(false);

    };

    useEffect(() => {
        fetchListings(page, perPage);
    }, []);

    return (
        <div className="listing-wrapper">
            {loading && (
                <div className="loading">
                    <span>Loading...</span>
                </div>
            )}
            {loadingFailed && (
                <div className="error">Backend is sleeping atm(due to free tier web app on azure i guess),  keep refreshing the page to activate the backend, or contact me since i may have turned it off </div>
            )}
            <div className="listing-container">
                {listings &&
                    listings.map((listing) => (
                        <div key={listing.id} className="listing-card">
                            <h3 className="listing-title">{listing.title}</h3>
                            <div className="listing-details">
                                <p><strong>Available From:</strong> {listing.availableFrom}</p>
                                <p><strong>Available To:</strong> {listing.availableTo}</p>
                                <p><strong>Average Rating:</strong> {listing.averageRating}</p>
                                <p><strong>City:</strong> {listing.city}</p>
                                <p><strong>Country:</strong> {listing.country}</p>
                                <p><strong>Number of People:</strong> {listing.numberOfPeople}</p>
                                <p><strong>User ID:</strong> {listing.user_id}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ListingCard;
