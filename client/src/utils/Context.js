import {createContext, useContext} from "react";
import decode from "jwt-decode";

const SiteContext = createContext();
export const useSiteContext = () => useContext(SiteContext)
export const LoggedStatusProvider = ({children}) => {
    const userToken = () => {
        if (!localStorage.getItem("tokenId")) 
        {
            return window.location.assign('/')
        } else {
            return decode(localStorage.getItem("tokenId"))
        }
    }
    return (
        <SiteContext.Provider value={{userToken}}>{children}</SiteContext.Provider>
    )
} 