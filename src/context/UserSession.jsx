import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

export const userSessionContext = createContext();

export const UserSessionProvider = ({ children }) => {
    const [userSession, setUserSession] = useState(null);

    useEffect(() => {
        (async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUserSession(user);
        })()
    }, []);

    return (
        <userSessionContext.Provider value={{
            userSession
        }}>
            {children}
        </userSessionContext.Provider>
    )
}
