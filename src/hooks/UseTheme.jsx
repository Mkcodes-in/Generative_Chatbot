import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export const UseTheme = () => {
    const {theme, handleTheme} = useContext(ThemeContext);
    return {theme, handleTheme};
}