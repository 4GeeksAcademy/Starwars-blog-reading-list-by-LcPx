import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-light bg-light mb-3 px-3 d-flex justify-content-between">
            <Link to="/" className="d-flex align-items-center">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" 
                    alt="Star Wars" 
                    style={{ width: "120px", filter: "drop-shadow(2px 2px 0 yellow) drop-shadow(-2px -2px 0 yellow)" }}
                />
            </Link>

            <div className="ml-auto">
                <div className="dropdown">
                    <button 
                        className="btn btn-primary dropdown-toggle" 
                        type="button" 
                        id="favoritesDropdown" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        Favoritos {store.favorites.length}
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">
                        {store.favorites.length === 0 ? (
                            <li className="dropdown-item text-center">Nenhum favorito</li>
                        ) : (
                            store.favorites.map((fav) => (
                                <li key={`${fav.type}-${fav.id}`} className="dropdown-item d-flex justify-content-between align-items-center">
                                    <Link to={`/${fav.type}/${fav.id}`} className="text-decoration-none text-dark">
                                        {fav.name}
                                    </Link>
                                    <button 
                                        className="btn btn-sm" 
                                        onClick={() => actions.removeFavorite(fav.id)}
                                        style={{ background: "transparent", border: "none", color: "black" }}
                                    >
                                        🗑️
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
