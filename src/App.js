import React from 'react';
import {Routes, Route} from "react-router-dom";
import { VideoContextProvider } from './context/videoContext';
import { AuthContextProvider } from './context/authContext';
import Header from './components/Header';
import Feed from './components/Feed';
import SearchResult from './components/SearchResult';
import VideoDetails from './components/VideoDetails';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import UserHistory from './components/UserHistory';
import LikedVideos from './components/LikedVideos';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthContextProvider>
      <VideoContextProvider>
          <div className="flex flex-col h-full">
            <Header/>
            <Routes>
              <Route path='/' element = {<Feed />}/>
              <Route path='/searchResult/:searchQuery' element = {<SearchResult />}/>
              <Route path='/video/:id' element = {<VideoDetails />}/>
              <Route path='/login' element = {<LogIn />} />
              <Route path='/signup' element = {<SignUp />} />
              <Route path='user/history' element = {<ProtectedRoute><UserHistory/></ProtectedRoute>} />
              <Route path='user/likedVideos' element = {<ProtectedRoute><LikedVideos/></ProtectedRoute>} />
            </Routes>
          </div>
      </VideoContextProvider>
    </AuthContextProvider>
    
   
  )
}

export default App
