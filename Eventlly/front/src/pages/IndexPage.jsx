import { Link } from "react-router-dom";
import wedding from "../assets/indian_wed.jpg";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch places on initial render
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    }, []);

    // Event handler for search query change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filtered places based on search query
    const filteredPlaces = places.filter(place => {
        // Convert the title, address, and location to lowercase for case-insensitive search
        const search = searchQuery.toLowerCase();
        const title = place.title.toLowerCase();
        const address = place.address.toLowerCase();
        // Return true if any of the fields match the search query
        return title.includes(search) || address.includes(search);
    });

    return (
        <div>
            {/* Picture covering less than half of the page */}
            <div
                className="relative overflow-hidden h-screen z-100"
                style={{
                    backgroundImage: `url(${wedding})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Overlay for text */}
                <div className="absolute inset-0 bg-black opacity-60 justify-center px-16">
                    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8 mt-40">
                        Where Every Celebration Finds Its Perfect Venue!
                    </h1>
                </div>
                {/* Search filter component */}
                <div></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="p-3 rounded-xl outline-none bg-gray-100 text-black"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <input
                            type="number"
                            placeholder="Capacity"
                            className="p-3 rounded-xl outline-none bg-gray-100 text-black"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            className="p-3 rounded-xl outline-none bg-gray-100 text-black"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="bg-blue-500 text-white px-8 py-2 rounded-xl">
                            Search
                        </button>
                    </div>
                </div>
            </div>
            {/* Render filtered places */}
            <div className="py-4 px-8 mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredPlaces.length > 0 &&
                    filteredPlaces.map(place => (
                        <Link to={`/place/${place._id}`} key={place._id}>
                            <div className="bg-gray-500 mb-2 rounded-2xl flex">
                                {place.photos?.[0] && (
                                    <img
                                        className="rounded-2xl object-cover aspect-square"
                                        src={`http://localhost:4000/uploads/${place.photos?.[0]}`}
                                        alt={place.title}
                                    />
                                )}
                            </div>
                            <h2 className="text-sm truncate leading-4">{place.title}</h2>
                            <h3 className="font-bold">{place.address}</h3>
                            <div className="mt-1">
                                <span className="font-bold">₹{place.price}</span> per booking
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
