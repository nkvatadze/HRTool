import React, { useContext, useEffect, useState } from "react";
import { fetchCollection } from "../api/home";

const CollectionContext = React.createContext();

export function useCollection() {
    return useContext(CollectionContext);
}

export function CollectionProvider({ children }) {
    const [collection, setCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCollection = async () => {
            try {
                const res = await fetchCollection();
                setCollection(res.data);
                setIsLoading(false);
            } catch (e) {}
        };

        getCollection();
    }, []);

    return (
        <CollectionContext.Provider value={{ collection, isLoading }}>
            {children}
        </CollectionContext.Provider>
    );
}
