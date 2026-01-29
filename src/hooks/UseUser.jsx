import { useContext } from "react"
import { userSessionContext } from "../context/UserSession"

export const useUser = () => {
    const  userSession  = useContext(userSessionContext);
    return userSession;
}