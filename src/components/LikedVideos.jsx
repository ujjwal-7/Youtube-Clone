import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { VideoContext } from '../context/videoContext';
import { db } from '../firebase/config';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import LeftNav from './LeftNav';
import UserVideoCard from './UserVideoCard';

const LikedVideos = () => {

  const [videos, setVideos] = useState([]);
  const {loading} = useContext(VideoContext);
  const {user} = useContext(AuthContext);

  const videoRef = doc(db, 'users', `${user?.email}`)
  
  const deleteVideo = async (id) => {
      try {
        const result = videos.filter((item) => item.id !== id)
        await updateDoc(videoRef, {
            likedVideos: result
        })
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setVideos(doc.data()?.likedVideos);
    });
  }, [user?.email]);

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
            {
              videos?.length === 0 ? 
                (<div className="md:w-96 w-50 md:mb-60 lg:mb-0 p-3">
                  <p className="text-white text-2xl">No Videos Found!</p>
                </div>)
                 : 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                    {!loading &&
                      videos?.map((item) => {
                          return (
                              <UserVideoCard
                                  key={item?.id}
                                  video={item}
                                  deleteVideo = {deleteVideo}
                              />
                          );
                      })
                    }
                </div>
            }  
        </div>
    </div>
  )
}

export default LikedVideos;