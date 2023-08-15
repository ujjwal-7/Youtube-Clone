import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { VideoContextProvider } from './context/videoContext';
import Header from './components/Header';
import Feed from './components/Feed';
import SearchResult from './components/SearchResult';
import VideoDetails from './components/VideoDetails';

const App = () => {
  return (
    <VideoContextProvider>
      <BrowserRouter>
        <div className="flex flex-col h-full">
          <Header/>
          <Routes>
            <Route path='/' element = {<Feed />}/>
            <Route path='/searchResult/:searchQuery' element = {<SearchResult />}/>
            <Route path='/video/:id' element = {<VideoDetails />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </VideoContextProvider>
   
  )
}

export default App
