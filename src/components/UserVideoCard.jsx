import React from 'react';
import { Link } from 'react-router-dom';
import {abbreviateNumber} from "js-abbreviation-number";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {AiFillCloseCircle} from "react-icons/ai";
import VideoLength from '../shared/VideoLength';

const UserVideoCard = ({video, deleteVideo}) => {

  return (
    <div className="flex flex-col mb-8">
      <div className="relative cursor-pointer">
        <AiFillCloseCircle size={30} className="absolute top-2 right-2 z-50" onClick={() => deleteVideo(video?.id)}/>
      </div>
      <Link to={`/video/${video?.id}`}>
      <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
        <img 
          className="h-full w-full object-cover" 
          src={video?.thumbnail} 
          alt="thubnail"  
        />
        {video?.length && (<VideoLength time = {video?.length}/>)}
      </div>
      <div className="flex text-white mt-3">
        <div className="flex items-start">
          <div className="flex h-9 w-9 rounded-full overflow-hidden">
            <img 
              className ="h-full w-full object-cover" 
              src={video?.authorAvatar} 
              alt="thumbail"  
            />
          </div>
        </div>
        <div className="flex flex-col ml-3">
          <span className="text-sm font-bold line-clamp-2 overflow-hidden">
            {video?.title}
          </span>
          <span className="text-[12px] font-semibold mt-2 text-white/[0.71] flex items-center">
            {video?.authorTitle}
            {video?.authorBadges === "VERIFIED_CHANNEL" && (<BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1"/>)}
          </span>
          <div className="flex text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
            <span>{`${abbreviateNumber(video?.views, 2)} views`}</span>
            <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">.</span>
            <span className="truncate">{video?.publishedTime}</span>
          </div>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default UserVideoCard;