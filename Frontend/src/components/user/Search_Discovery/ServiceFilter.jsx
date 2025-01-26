const ServiceFilter = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex gap-4 mb-4">
            <input
                type="text"
                name="name"
                placeholder="Search by Name"
                onChange={handleChange}
                className="border p-2"
            />
            <input
                type="number"
                name="price"
                placeholder="Max Price"
                onChange={handleChange}
                className="border p-2"
            />
            <input
                type="text"
                name="offers"
                placeholder="Search by Offers"
                onChange={handleChange}
                className="border p-2"
            />
        </div>
    );
};

export default ServiceFilter;
