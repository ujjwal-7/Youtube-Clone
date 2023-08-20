import React, {useContext} from 'react';
import {abbreviateNumber} from "js-abbreviation-number";
import { useNavigate } from 'react-router-dom';
import {BsFillCheckCircleFill} from "react-icons/bs";
import VideoLength from '../shared/VideoLength';
import { AuthContext } from "../context/authContext";

const VideoCard = ({video}) => {

  const {addToHistory} = useContext(AuthContext);
  
  const navigate = useNavigate();
  
  const handleClick = () => {

    addToHistory(video);
    navigate(`/video/${video?.videoId}`);

  }

  return (
    <div className="flex flex-col mb-8 cursor-pointer" onClick={handleClick}>
      <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
        <img 
          className="h-full w-full object-cover" 
          src={video?.thumbnails?.[0]?.url} 
          alt="thumbnail" 
        />
        {video.lengthSeconds && (<VideoLength time = {video?.lengthSeconds}/>)}
      </div>
      <div className="flex text-white mt-3">
        <div className="flex items-start">
          <div className="flex h-9 w-9 rounded-full overflow-hidden">
            <img 
              className ="h-full w-full object-cover" 
              src={video?.author.avatar[0]?.url} 
              alt="author avatar" 
            />
          </div>
        </div>
        <div className="flex flex-col ml-3">
          <span className="text-sm font-bold line-clamp-2 overflow-hidden">
            {video?.title}
          </span>
          <span className="text-[12px] font-semibold mt-2 text-white/[0.71] flex items-center">
            {video?.author?.title}
            {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (<BsFillCheckCircleFill className="text-white/[0.5] text-[12px[ ml-1"/>)}
          </span>
          <div className="flex text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
            <span>{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span>
            <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">.</span>
            <span className="truncate">{video?.publishedTimeText}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard;