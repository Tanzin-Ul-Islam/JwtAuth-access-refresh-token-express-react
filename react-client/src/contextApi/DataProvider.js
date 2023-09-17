import React, { createContext, useState } from 'react'
export const DataContext = createContext(null);
export default function DataProvider({ children }) {
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    return (
        <DataContext.Provider value={{
            token, setToken,
            userInfo, setUserInfo,
        }}>
            {children}
        </DataContext.Provider>
    )
}
