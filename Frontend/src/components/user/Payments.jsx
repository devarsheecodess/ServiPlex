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
                    status: 'completed',
                },
            });
            console.log('Payments:', response.data);
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    const calculateTotal = (payments) => {
        return payments.reduce((total, payment) => total + payment.price, 0);
    };

    useEffect(() => {
        fetchPayments();
    }, [id]);

    useEffect(() => {
        setTotalVal(calculateTotal(payments));
    }, [payments]);

    return (
        <div className="absolute top-0 left-0 w-full min-h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex flex-col items-center justify-center p-4">
            {/* Header Section */}
            <h1 className="text-4xl font-extrabold text-[#32cd32] mb-8">
                Payments Overview
            </h1>
            <h4 className="text-xl font-bold text-yellow-500 mb-6">
                Total Expense: ₹{totalVal}
            </h4>

            {/* Payment Cards */}
            {payments.length > 0 ? (
                <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {payments.map((payment) => (
                        <div
                            key={payment.id}
                            className="bg-neutral-900 p-6 text-green-600 border-yellow-600 border-2 rounded-xl shadow-lg hover:shadow-yellow-600 transition-shadow  hover:scale-105 "
                        >
                            <p className="text-lg font-semibold mb-2">
                                <span className="text-yellow-400">Shop:</span> {payment.shop}
                            </p>
                            <p className="text-lg font-semibold">
                                <span className="text-yellow-400">Amount:</span> ₹{payment.price}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400 text-lg mt-10">No payments found.</p>
            )}
        </div>
    );
};

export default Payments;
