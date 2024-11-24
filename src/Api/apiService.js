// //
//
// const API_BASE_URL = 'https://stsc-a3hefkewerhsfads.uaenorth-01.azurewebsites.net';
//
// export const registerUser = async (userData) => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/auth/users`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userData),
//         });
//
//         if (!response.ok) {
//             throw new Error('Failed to register user');
//         }
//
//         return await response;
//     } catch (error) {
//         console.error('Error during registration:', error);
//         throw error;
//     }
// };
//
// export const loginUser = async (userData) => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/auth/login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userData),
//         });
//         if (!response.ok) {
//             throw new Error('Failed to login');
//         }
//         return await response;
//     } catch (error) {
//         console.error('Error during login:', error);
//     }
// }
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

