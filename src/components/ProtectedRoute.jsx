import React, {useContext} from 'react';
import { AuthContext } from '../context/authContext';
import { useLocation } from 'react-router-dom';
import NotSignedIn from './NotSignedIn';

const ProtectedRoute = ({children}) => {

    const {user} = useContext(AuthContext);
    const {pathname} = useLocation();
    const pageName = pathname?.split("/")?.filter(Boolean)?.[1];

    if(!user) {
        return <NotSignedIn pageName = {pageName}/>
    }
    return children;
}

export default ProtectedRoute