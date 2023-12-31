import React, {useContext} from 'react';
import LeftNavMenuItem from './LeftNavMenuItem';
import { VideoContext } from '../context/videoContext';

const LeftNav = () => {

  const {categories, mobileMenu, changeCategory} = useContext(VideoContext);

  return (
    <div className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10  md:translate-x-0 transition-all ${mobileMenu ? "" : "translate-x-[-240px]"}`}>

      <div className="flex px-5 flex-col">
        
        {categories.map((item) => {
          return <React.Fragment key={item.id}>
              <LeftNavMenuItem 
              id = {item.id}
              name = {item.name}
              type = {item.type}
              icon = {item.icon}
              clickHandler = {changeCategory}
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