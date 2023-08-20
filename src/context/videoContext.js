import React, { createContext, useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";
import getUniqueData from "../utils/getUniqueData";
import {categoriesArray} from "../utils/constants";
import { useNavigate } from "react-router-dom";

export const VideoContext = createContext();

export const VideoContextProvider = ({children}) => {
    
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [categories, setCategories] = useState(categoriesArray);
    const [mobileMenu, setMobileMenu] = useState(false);
    const navigate = useNavigate();

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

  const changeCategory = (id, name, type) => {

    if(type === "menu") {
      return;
    }

    const updatedCategories = [...categories];

    for(let i = 0; i < updatedCategories.length; i++) {
      if(updatedCategories[i].id === id) {
        updatedCategories[i].isActive = true;
      } else {
        updatedCategories[i].isActive = false;
      }
    }
   
    setCategories(updatedCategories);

    if(type === "category" || type === "home") {

      setSelectedCategory(name);
      navigate("/");
    
    } else if(type === "user-specific") {

       if(name === "History") {
          navigate("/user/history");
       } else if(name === "Liked Videos") {
          navigate("/user/likedVideos")
       }
      
    }

  }

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
                categories,
                changeCategory
            }}
        >
            {children}
        </VideoContext.Provider>
    );
};