const ServiceCard = ({ service }) => {
    return (
        <div className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg">{service.name}</h3>
            <p>{service.description}</p>
            <p>Price: ${service.price}</p>
            <p>Offers: {service.offers || 'No offers'}</p>
        </div>
    );
};

export default ServiceCard;
