import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LeftNavMenuItem from './LeftNavMenuItem';
import {categoriesArray} from "../utils/constants";
import { VideoContext } from '../context/videoContext';

const LeftNav = () => {

  const [categories, setCategories] = useState(categoriesArray);
  const {selectedCategory, setSelectedCategory, mobileMenu} = useContext(VideoContext);
  const navigate = useNavigate();

  const clickHandler = (id, name, type) => {

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

      /* 
        useNavigate to history and liked videos page */
      
    }

  }

  return (
    <div className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10  md:translate-x-0 transition-all ${
      mobileMenu ? "" : "translate-x-[-240px]"
    }`}>
      <div className="flex px-5 flex-col">
        {categories.map((item) => {
          return <React.Fragment key={item.id}>
              <LeftNavMenuItem 
              id = {item.id}
              name = {item.name}
              type = {item.type}
              icon = {item.icon}
              clickHandler = {clickHandler}
              className={item.isActive === true ? "bg-white/[0.15]" : ""}
            />
            {item.divider && (<hr className="my-5 border-white/[0.2]"></hr>)}
          </React.Fragment>
        })}

      </div>
    </div>
  )
}

export default LeftNav;