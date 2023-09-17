import React, { useContext, useEffect } from 'react'
import { DataContext } from '../contextApi/DataProvider'
import { useNavigate } from 'react-router-dom';

export default function AuthGuard({ children }) {
    const navigate = useNavigate();
    const { token } = useContext(DataContext);
    useEffect(() => {
        if (!token) {
            navigate('/sign-in');
            return;
        }
    }, [])
    return (
        <>{ children }</>
    )
}
