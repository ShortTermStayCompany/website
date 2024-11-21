const API_BASE_URL = 'https://stsc-a3hefkewerhsfads.uaenorth-01.azurewebsites.net';

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};
