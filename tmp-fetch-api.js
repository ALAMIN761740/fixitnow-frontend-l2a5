const axios = require('axios');

(async () => {
    try {
        const loginRes = await axios.post('https://fixitnow-backend-l2a4-1.onrender.com/api/auth/login', {
            email: 'admin@fixitnow.com',
            password: 'admin123',
        }, {
            headers: { 'Content-Type': 'application/json' },
        });

        console.log('LOGIN', JSON.stringify(loginRes.data, null, 2));
        const token = loginRes.data.token || loginRes.data.accessToken;
        if (!token) throw new Error('No token in login response');

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const bookingsRes = await axios.get('https://fixitnow-backend-l2a4-1.onrender.com/api/bookings', { headers });
        console.log('BOOKINGS', JSON.stringify(bookingsRes.data, null, 2));

        const paymentsRes = await axios.get('https://fixitnow-backend-l2a4-1.onrender.com/api/payments', { headers });
        console.log('PAYMENTS', JSON.stringify(paymentsRes.data, null, 2));
    } catch (error) {
        console.error('ERROR', error.toString());
        if (error.response) {
            console.error('STATUS', error.response.status);
            console.error('DATA', JSON.stringify(error.response.data, null, 2));
        }
        process.exit(1);
    }
})();
