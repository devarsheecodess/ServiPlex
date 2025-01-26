import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [id, setId] = useState(localStorage.getItem('userID'));

    const fetchPayments = async () => {
        try {
            console.log('Fetching payments for customer:', id);
            const response = await axios.get('http://localhost:3000/payments', {
                params: {
                    customerId: id,
                    status: 'completed'
                }
            });
            console.log('Payments:', response.data);
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };    

    useEffect(() => {
        fetchPayments();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Payments</h1>
            {payments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {payments.map((payment) => (
                        <div
                            key={payment.id}
                            className="bg-gray-800 text-white p-4 rounded-lg shadow-md"
                        >
                            <p className="text-lg font-medium">
                                <span className="font-bold">Shop:</span> {payment.shopName}
                            </p>
                            <p className="text-lg font-medium">
                                <span className="font-bold">Amount:</span> ₹{payment.amount}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">No payments found.</p>
            )}
        </div>
    );
};

export default Payments;
