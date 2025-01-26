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
            const response = await axios.get('http://localhost:3000/services', { params: filters });
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
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Discover Services</h1>
            <ServiceFilter filters={filters} setFilters={setFilters} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                    <ServiceCard key={service._id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default ServiceDiscovery;
