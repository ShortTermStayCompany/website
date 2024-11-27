import axios from "axios";
import {useUser} from "../context/UserContext.jsx";

const API_BASE_URL = 'https://stsc-a3hefkewerhsfads.uaenorth-01.azurewebsites.net';
// const API_BASE_URL = 'http://127.0.0.1:5000';

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


export const insert_booking = async (bookingData, token) => {
    if (!token) {
        throw new Error("Authorization token is missing.");
    }

    try {
        const response = await axios.post(
            `${API_BASE_URL}/booking/insert_booking`,
            bookingData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status !== 201) {
            throw new Error(response.data.message || "Failed to insert booking");
        }

        return response.data;
    } catch (error) {
        console.log(error)
        if (error.response) {
            console.error('Error during insert booking:', error.response?.data || error.message);
            const backendMessage = error.response.data.message;
            console.log(backendMessage);
            throw new Error(backendMessage || "An unexpected error occurred.");
        } else {
            throw new Error("Network error or server is unreachable.");
        }
    }
};
