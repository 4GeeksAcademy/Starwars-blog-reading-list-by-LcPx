import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import noImage from "../../img/no-image.jpg";

const Home = () => {
    const { store, actions } = useContext(Context);

    const [data, setData] = useState({
        people: [],
        planets: [],
        species: [],
        starships: [],
        vehicles: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoints = [
                    { key: "people", url: "https://www.swapi.tech/api/people" },
                    { key: "planets", url: "https://www.swapi.tech/api/planets" },
                    { key: "species", url: "https://www.swapi.tech/api/species" },
                    { key: "starships", url: "https://www.swapi.tech/api/starships" },
                    { key: "vehicles", url: "https://www.swapi.tech/api/vehicles" }
                ];

                let newData = {};
                for (let endpoint of endpoints) {
                    const res = await fetch(endpoint.url);
                    const result = await res.json();
                    newData[endpoint.key] = result.results.map(item => ({
                        id: item.uid, 
                        name: item.name || item.properties?.name || item.properties?.title || "No name"
                    }));
                }
                setData(newData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mt-4">
            {Object.entries(data).map(([category, items]) => (
                <div key={category} className="mb-4">
                    <h2 className="text-warning text-uppercase">{category}</h2>
                    <div className="overflow-auto" style={{ whiteSpace: "nowrap" }}>
                        <div className="d-flex flex-row">
                            {items.map((item) => {
                                const id = item.uid || item.id;
                                const itemName = item.name || item.properties?.name || item.properties?.title || "Unknown";
                                const isFavorite = store.favorites.some(fav => fav.id === id && fav.type === category);

                                return (
                                    <div key={`${category}-${id}`} className="card m-2" style={{ width: "18rem", flex: "0 0 auto" }}>
                                        <img
                                            src={`https://starwars-visualguide.com/assets/img/${category}/${id}.jpg`}
                                            onError={(e) => e.target.src = noImage}
                                            className="card-img-top"
                                            alt={itemName}
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                        <div className="card-body text-center">
                                            <h5 className="card-title">{itemName}</h5>
                                            <div className="d-flex justify-content-between">
                                                <Link to={`/${category}/${id}`} className="btn btn-primary w-100">
                                                    See details
                                                </Link>
                                                <button 
                                                    className="btn"
                                                    onClick={() => actions.toggleFavorite({ id, type: category, name: itemName })}
                                                    style={{ border: "none", background: "transparent" }}
                                                >
                                                    {isFavorite ? "❤️" : "🤍"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
