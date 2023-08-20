import React, { createContext, useState, useEffect } from "react";
import { auth } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { db } from '../firebase/config';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = () => {
    return signOut(auth);
  }

  const addToHistory = async (video) => {

    const videoRef = doc(db, 'users', `${user?.email}`);

    if(user?.email) {

        await updateDoc(videoRef, {
            history: arrayUnion({
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
}

  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user, addToHistory }}>
      {children}
    </AuthContext.Provider>
  );
}
