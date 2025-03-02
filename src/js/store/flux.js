const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            favorites: []
        },
        actions: {
            toggleFavorite: (item) => {
                const store = getStore();
                const isFavorite = store.favorites.some(fav => fav.id === item.id && fav.type === item.type);
            
                if (isFavorite) {
                    setStore({
                        favorites: store.favorites.filter(fav => !(fav.id === item.id && fav.type === item.type))
                    });
                } else {
                    setStore({
                        favorites: [
                            ...store.favorites,
                            { 
                                id: item.id, 
                                name: item.name || "Sem Nome", 
                                type: item.type 
                            }
                        ]
                    });
                }
            },

            removeFavorite: (id) => {
                const store = getStore();
                setStore({
                    favorites: store.favorites.filter(fav => fav.id !== id)
                });
            }
        }
    };
};

export default getState;
