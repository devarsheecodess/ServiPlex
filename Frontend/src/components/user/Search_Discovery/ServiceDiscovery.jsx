import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import ServiceFilter from './ServiceFilter';
import axios from 'axios';

const ServiceDiscovery = () => {
    const [services, setServices] = useState([]);
    const [filters, setFilters] = useState({
        id: '',
        name: '',
        price: '',
        offers: ''
    });
    const [error, setError] = useState(null); // State for error handling

    // Debugging: Check if environment variable is correctly loaded
    console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

    // Fetch services based on filters
    const fetchServices = async () => {
        try {
            // Remove empty filters (keep only non-empty values)
            const activeFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, value]) => value.trim() !== '')
            );

            console.log("Sending filters:", activeFilters); // Debugging log

            // Construct query parameters safely
            const queryParams = new URLSearchParams(activeFilters).toString();

            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/services?${queryParams}`);

            console.log('Fetched services:', response.data); // Debugging log
            setServices(response.data);
            setError(null); // Reset error if successful
        } catch (error) {
            console.error('Error fetching services:', error);
            setError("Failed to fetch services. Please try again."); // Show error message
        }
    };

    useEffect(() => {
        fetchServices();
    }, [filters]);

    // Debugging: Log services state
    useEffect(() => {
        console.log('Current services:', services);
    }, [services]);

    return (
        <div className="absolute top-0 left-0 w-full min-h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-extrabold text-[#32cd32] mb-8 text-center">
                Discover Services
            </h1>

            <div className="w-full max-w-6xl bg-neutral-900 text-yellow-600 p-8 rounded-3xl shadow-xl border-2 border-amber-500 hover:border-yellow-300 hover:shadow-2xl hover:shadow-yellow-500/50 transition-transform">
                <div className="mb-8">
                    <ServiceFilter filters={filters} setFilters={setFilters} />
                </div>

                {error && (
                    <div className="text-center text-red-500 mb-4">{error}</div>
                )}

                {services.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <ServiceCard
                                key={service._id}
                                service={service}
                                className="bg-black border-2 border-green-600 text-white rounded-xl p-5 hover:shadow-[0_0_20px_#ff4d4d] hover:-translate-y-1 transition-transform"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-yellow-600">
                        No services found
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceDiscovery;