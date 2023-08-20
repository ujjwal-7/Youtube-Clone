import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineLike, AiFillLike, AiOutlineClose } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import { fetchDataFromApi } from "../utils/api";
import { VideoContext } from "../context/videoContext";
import { AuthContext } from "../context/authContext";
import SuggestionVideoCard from "./SuggestionVideoCard";
import { db } from '../firebase/config';
import { arrayUnion, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { Link } from "react-router-dom";

const VideoDetails = () => {

  const [video, setVideo] = useState([]);
  const [like, setLike] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const {id} = useParams();
  const {setLoading} = useContext(VideoContext);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const videoRef = doc(db, 'users', `${user?.email}`);

  let likedVideos = [];

  if(user) {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
        likedVideos = [...doc.data()?.likedVideos];
        const temp = likedVideos?.filter((item) => item.id === id);
        if(temp?.length === 1) {
            setLike(true);
        } else {
            setLike(false);
        }
    });

  }

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRelatedVideos(); 
  }, [id]);

  const fetchVideoDetails = () => {
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
      setVideo(res);
      setLoading(false);
    })
  }
  
  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
      setRelatedVideos(res);
      setLoading(false);
    })
  }

  const handleClick = async () => {

    if(!user) {
        setShowModal(true);
        return;
    }

    if(like) {
        try {
            const result = likedVideos?.filter((item) => item.id !== id)
            await updateDoc(videoRef, {
                likedVideos: result
            })
          } catch (error) {
              console.log(error)
          }     
    } else {

        await updateDoc(videoRef, {
            likedVideos: arrayUnion({
                id: typeof(video?.videoId) === "undefined" ? "" : video?.videoId,
                title: typeof(video?.title) === "undefined" ? "" : video?.title,
                thumbnail: typeof(video?.thumbnails?.[0]?.url) === "undefined" ? "" : video?.thumbnails?.[0]?.url,
                length: typeof(video?.lengthSeconds) === "undefined" ? "" : video?.lengthSeconds,
                authorAvatar: typeof(video?.author?.avatar?.[0]?.url) === "undefined" ? "" : video?.author?.avatar?.[0]?.url,
                authorTitle: typeof(video?.author?.title) === "undefined" ? "" : video?.author?.title,
                authorBadge: typeof(video?.author?.badges?.[0]?.type) === "undefined" ? "" : video?.author?.badges?.[0]?.type,
                views: typeof(video?.stats?.views) === "undefined" ? "" : video?.stats?.views,
                publishedTime: typeof(video?.publishedTimeText) === "undefined" ? "" : video?.publishedTimeText
            }),
        });
    }

    setLike(!like);
  }

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black relative">
        <div className="flex items-center gap-3 absolute z-10 left-10 top-1 cursor-pointer" onClick={() => {navigate(-1)}}>
            <BiArrowBack color="white" size={30}/>
            <span className="text-white">Back</span>
        </div>
            <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
                <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
                    <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${id}`}
                            controls
                            width="100%"
                            height="100%"
                            style={{ backgroundColor: "#000000" }}
                            playing={true}
                        />
                    </div>
                    <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
                        {video?.title}
                    </div>
                    <div className="flex justify-between flex-col md:flex-row mt-4">
                        <div className="flex">
                            <div className="flex items-start">
                                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={video?.author?.avatar[0]?.url}
                                        alt="author avatar"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col ml-3">
                                <div className="text-white text-md font-semibold flex items-center">
                                    {video?.author?.title}
                                    {video?.author?.badges[0]?.type ===
                                        "VERIFIED_CHANNEL" && (
                                        <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                                    )}
                                </div>
                                <div className="text-white/[0.7] text-sm">
                                    {video?.author?.stats?.subscribersText}
                                </div>
                            </div>
                        </div>
                        <div className="flex text-white mt-4 md:mt-0 relative">
                            <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                                <div className = "cursor-pointer" onClick={handleClick}>
                                    {!like ? ( <AiOutlineLike className="text-xl text-white mr-2" />) : (<AiFillLike className="text-xl text-white mr-2" />)}
                                </div>
                                {`${abbreviateNumber(
                                    video?.stats?.views,
                                    2
                                )} Likes`}
                            </div>
                            <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                                {`${abbreviateNumber(
                                    video?.stats?.views,
                                    2
                                )} Views`}
                            </div>
                            {
                                showModal && 
                                <div className="flex flex-col gap-3 items-center absolute z-10 md:-top-16 md:-left-4 px-10 py-4 rounded shadow-md w-50  border-2 border-white bg-black cursor-pointer">
                                    <div className="relative w-full">
                                        <div  className="absolute z-10 -top-3 -right-9 cursor-pointer" onClick={() => setShowModal(false)}>
                                            <AiOutlineClose size = {25}/>
                                        </div>
                                        <p className="text-white text-sm">Like this video?</p>
                                    </div>   
                                    <Link to = '/login'>
                                        <div className="w-20 text-sm text-white border p-2 rounded-md cursor-pointer hover:bg-red-600 hover:border-none text-center">
                                            <button>Log in</button>
                                        </div>
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
                    {relatedVideos?.contents?.map((item, index) => {
                        if (item?.type !== "video") return false;
                        return (
                            <SuggestionVideoCard
                                key={index}
                                video={item?.video}
                            />
                        );
                    })}
                </div>
        </div>
    </div>
  )
}

export default VideoDetails;