import React, { createContext, useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";
import getUniqueData from "../utils/getUniqueData";
export const VideoContext = createContext();

export const VideoContextProvider = ({children}) => {
    
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        fetchSelectedCategoryData(selectedCategory);
    }, [selectedCategory]);

    const fetchSelectedCategoryData = (query) => {
        setLoading(true);
        fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
            
            const uniqueData = getUniqueData(contents);
            setSearchResults(uniqueData);
            setLoading(false);
        });
    };

    return (
        <VideoContext.Provider
            value={{
                loading,
                setLoading,
                searchResults,
                selectedCategory,
                setSelectedCategory,
                mobileMenu,
                setMobileMenu,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
};