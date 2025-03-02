import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/InfoItems.css";
import noImage from "../../img/no-image.jpg";

const InfoItems = ({ type }) => {
    const { id } = useParams(); 
    const [details, setDetails] = useState(null);
    const [imageError, setImageError] = useState(false);

    
    const typeMap = {
        people: "people",
        planets: "planets",
        species: "species",
        starships: "starships",
        vehicles: "vehicles",
    };
    const apiType = typeMap[type] ?? "people";

    useEffect(() => {
        console.log("ID recebido:", id);  // ✅ Verifica se o ID está correto
        console.log("Tipo recebido:", apiType);  // ✅ Verifica se o tipo está correto
    
        const fetchDetails = async () => {
            try {
                const res = await fetch(`https://www.swapi.tech/api/${apiType}/${id}`);
                const data = await res.json();
                if (data.result) {
                    setDetails(data.result.properties);
                } else {
                    console.error("Erro: API não retornou resultado esperado", data);
                }
            } catch (error) {
                console.error("Erro ao buscar detalhes:", error);
            }
        };
        fetchDetails();
    }, [id, apiType]);

    if (!details) {
        return <p className="text-center">Loading details...</p>;
    }

    const imageBaseMap = {
        people: "people",
        planets: "planets",
        species: "species",
        starships: "starships",
        vehicles: "vehicles",
    };

    const imagePath = imageBaseMap[apiType] || apiType;
    const imageUrl = imageError
        ? noImage
        : `https://starwars-visualguide.com/assets/img/${imagePath}/${id}.jpg`;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <img 
                        src={imageUrl} 
                        onError={() => setImageError(true)}
                        className="img-fluid"
                        alt={details.name}
                    />
                </div>
                <div className="col-md-6">
                <h1>{details.name || details.title}</h1>
                    <p>
                        {details.description
                            ? details.description
                            : `Description of ${apiType} (Add later)`}
                    </p>
                </div>
            </div>
            <hr />
            <div className="row text-center">
                {Object.entries(details).map(([key, value]) => (
                    <div key={key} className="col-md-2">
                        <h5>{key.replace(/_/g, " ")}</h5>
                        <p>{value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoItems;
