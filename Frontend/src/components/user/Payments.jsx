import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [totalVal, setTotalVal] = useState(0);
    const [id, setId] = useState(localStorage.getItem('userID'));

    const fetchPayments = async () => {
        try {
            console.log('Fetching payments for customer:', id);
            const response = await axios.get('http://localhost:3000/userAppointments', {
                params: {
                    customerId: id,
                    status: 'completed'
                }
            });
            console.log('Payments:', response.data);
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
            // Optionally set an error state here
        }
    };    

    const calculateTotal = (payments) => {
        return payments.reduce((total, payment) => total + payment.price, 0);
    };

    useEffect(() => {
        fetchPayments();
    }, [id]); // Fetch payments when user ID changes

    useEffect(() => {
        setTotalVal(calculateTotal(payments));
    }, [payments]); // Recalculate total when payments change

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Payments</h1>
            <h4>Total Expense: ₹{totalVal}</h4>
            {payments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {payments.map((payment) => (
                        <div
                            key={payment.id}
                            className="bg-gray-800 text-white p-4 rounded-lg shadow-md"
                        >
                            <p className="text-lg font-medium">
                                <span className="font-bold">Shop:</span> {payment.shop}
                            </p>
                            <p className="text-lg font-medium">
                                <span className="font-bold">Amount:</span> ₹{payment.price}
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
