import { createContext, useState } from "react";

export const userSessionContext = createContext();

export const UserSessionProvider = ({ children }) => {
    const [userSession, setUserSession] = useState(null);

    return (
        <userSessionContext.Provider value={{
            userSession,
            setUserSession
        }}>
            {children}
        </userSessionContext.Provider>
    )
}
