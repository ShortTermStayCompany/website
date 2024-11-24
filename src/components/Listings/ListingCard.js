import {useEffect, useState} from "react";


const ListingCard = () => {
    const [listing, setListing ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch("/api/users");
        }
    })
}

export default ListingCard;