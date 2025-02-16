import React, { useState, useEffect } from 'react';

const ServiceFilter = ({ filters, setFilters }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    // Debounced filter update (prevents frequent API calls)
    useEffect(() => {
        const timeout = setTimeout(() => setFilters(localFilters), 500);
        return () => clearTimeout(timeout);
    }, [localFilters, setFilters]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({
            ...prev,
            [name]: name === 'price' && value < 0 ? '' : value // Ensure price is non-negative
        }));
    };

    // Handle form submission (enter key support)
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setFilters(localFilters);
        }
    };

    return (
        <div className="flex flex-wrap gap-4 mb-4">
            <input
                type="text"
                name="id"
                value={localFilters.id}
                placeholder="Provider ID"
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
                type="text"
                name="name"
                value={localFilters.name}
                placeholder="Search by Name"
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
                type="number"
                name="price"
                value={localFilters.price}
                placeholder="Max Price"
                min="0"
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
                type="text"
                name="offers"
                value={localFilters.offers}
                placeholder="Search by Offers"
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
                onClick={() => setLocalFilters({ id: '', name: '', price: '', offers: '' })}
                disabled={!Object.values(localFilters).some((val) => val !== '')} // Disable if no filters applied
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition"
            >
                Reset
            </button>
        </div>
    );
};

export default ServiceFilter;