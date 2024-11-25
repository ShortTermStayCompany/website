import axios from "axios";

const API_BASE_URL = 'https://stsc-a3hefkewerhsfads.uaenorth-01.azurewebsites.net';

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/users`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error during registration:', error.response?.data || error.message);
        throw error; // Throw the error to handle it in the calling function
    }
};

// Login User
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error during login:', error.response?.data || error.message);
        throw error; // Throw the error to handle it in the calling function
    }
};

// export const logoutUser = async (userData) => {
//     return await axios.post(`${API_BASE_URL}/auth/logout`, userData, {
//         headers: {
//             'Content-Type': 'application/json',
//
//         }
//     })
// }

export const get_listings = async (page, perPage) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/listing/listings`, {
            params: { page, perPage },
            headers: { 'Content-Type': 'application/json' },
        }); // generated URL /listing/listings?page=1&per_page=10
        console.log('LOG API 1, RETURNING LISTINGS DATA', response.data );
        return response.data;
    } catch (error) {
        console.error('Error during get_listings:', error.response?.data || error.message);
        throw error; // Throw the error to handle it in the calling function

    }
}

export const book_listing = async (listingId, dates) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/listings/${listingId}/book`, {
            startDate: dates.start.toISOString(),
            endDate: dates.end.toISOString(),
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};