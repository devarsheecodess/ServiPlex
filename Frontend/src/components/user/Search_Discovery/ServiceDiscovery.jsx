import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import ServiceFilter from './ServiceFilter';
import axios from 'axios';

const ServiceDiscovery = () => {
    const [services, setServices] = useState([]); // Store fetched services
    const [filters, setFilters] = useState({}); // Store filter inputs

    // Fetch services based on filters
    const fetchServices = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/services`, { params: filters });
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    // Use effect to fetch services when filters change
    useEffect(() => {
        fetchServices();
    }, [filters]);

    return (
        <div className="absolute top-0 left-0 w-full min-h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-extrabold text-[#32cd32] mb-8 text-center">
                Discover Services
            </h1>

            <div className="w-full max-w-6xl bg-neutral-900 text-yellow-600 p-8 rounded-3xl shadow-xl border-2 border-amber-500 hover:border-yellow-300 hover:shadow-2xl hover:shadow-yellow-500/50 transition-transform">
                {/* Filter Section */}
                <div className="mb-8 text-yellow-600 ">
                    <ServiceFilter filters={filters} setFilters={setFilters} />
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <ServiceCard
                            key={service._id}
                            service={service}
                            className="bg-black border-2 border-green-600 text-white rounded-xl p-5 hover:shadow-[0_0_20px_#ff4d4d] hover:-translate-y-1 transition-transform"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceDiscovery;
