import React from 'react';
import LeftNav from './LeftNav';
import { Link } from 'react-router-dom';

const NotSignedIn = ({pageName}) => {

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
        <LeftNav/>
        <div className="flex flex-row justify-center items-center grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black ">
            <div className="flex flex-col gap-3 items-center px-2 py-4 sm:p-4 rounded shadow-md md:w-96 w-50 md:mb-60 lg:mb-0 border-2 border-white ">
                {pageName === "history" ? (<p className="text-white sm:text-xl">Log in to keep track of what you watch</p>) : (<p className="text-white sm:text-xl">Log in to enjoy your liked videos</p>)}
                <Link to = '/login'>
                    <div className="w-20 text-white border p-2 rounded-md cursor-pointer hover:bg-red-600 hover:border-none text-center">
                        <button>Log in</button>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default NotSignedIn;
