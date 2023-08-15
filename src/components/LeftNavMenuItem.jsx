import React from 'react'

const LeftNavMenuItem = ({id, name, type, icon, className, clickHandler}) => {
  return (
    <div className={"text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15] " + className}
    onClick={() => {clickHandler(id, name, type)}}>
        <span className="text-xl mr-5">{icon}</span>
        {type === "home" ? "Home" : name}
    </div>
  )
}

export default LeftNavMenuItem;