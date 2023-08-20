import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../utils/api';
import getUniqueData from '../utils/getUniqueData';
import { VideoContext } from '../context/videoContext';
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = () => {

  const [result, setResult] = useState();
  const {searchQuery} = useParams();
  const {setLoading} = useContext(VideoContext);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchReults();
  }, [searchQuery]);

  const fetchSearchReults = () => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      setLoading(false);
      const uniqueData = getUniqueData(res?.contents);
      setResult(uniqueData);
    })
  }

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav/>
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-2 p-5">
          {result?.map((item) => {
            if(item.type !== "video") return false;
            return (
              <SearchResultVideoCard key={item?.video?.videoId} video={item?.video}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchResult;