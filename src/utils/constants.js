import React from "react";

import { AiFillHome, AiOutlineFlag } from "react-icons/ai";
import { MdLocalFireDepartment, MdLiveTv } from "react-icons/md";
import { CgMusicNote } from "react-icons/cg";
import { FiFilm } from "react-icons/fi";
import { IoGameControllerSharp } from "react-icons/io5";
import { ImNewspaper } from "react-icons/im";
import { GiDiamondTrophy, GiEclipse } from "react-icons/gi";
import { RiLightbulbLine, RiFeedbackLine } from "react-icons/ri";
import { FiSettings, FiHelpCircle } from "react-icons/fi";

export const categoriesArray = [
    { id: 1, name: "New", icon: <AiFillHome />, type: "home", isActive: true },
    { id: 2, name: "Trending", icon: <MdLocalFireDepartment />, type: "category", isActive: false },
    { id: 3, name: "Music", icon: <CgMusicNote />, type: "category", isActive: false },
    { id: 4, name: "Films", icon: <FiFilm />, type: "category", isActive: false },
    { id: 5, name: "Live", icon: <MdLiveTv />, type: "category", isActive: false },
    { id: 6, name: "Gaming", icon: <IoGameControllerSharp />, type: "category", isActive: false },
    { id: 7, name: "News", icon: <ImNewspaper />, type: "category", isActive: false },
    { id: 8, name: "Sports", icon: <GiDiamondTrophy />, type: "category", isActive: false },
    { id: 9, name: "Learning", icon: <RiLightbulbLine />, type: "category", isActive: false },
    {
        id: 10, 
        name: "Fashion & beauty",
        icon: <GiEclipse />,
        type: "category",
        divider: true,
        isActive: false
    },
    { id: 11, name: "Liked Videos", icon: <FiSettings />, type: "user-specific", isActive: false },
    { id: 12, name: "History", icon: <FiSettings />, type: "user-specific",divider: true, isActive: false},
    
    { id: 13, name: "Settings", icon: <FiSettings />, type: "menu", isActive: false },
    { id: 14, name: "Report History", icon: <AiOutlineFlag />, type: "menu", isActive: false },
    { id: 15, name: "Help", icon: <FiHelpCircle />, type: "menu", isActive: false },
    { id: 16, name: "Send feedback", icon: <RiFeedbackLine />, type: "menu", isActive: false },
];