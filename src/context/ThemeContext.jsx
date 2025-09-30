import React, { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(false);
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme === "true");
        }
    }, []);
    function handleTheme() {
        const myTheme = !theme;
        setTheme(myTheme);
        localStorage.setItem("theme", myTheme);
    }
    return (
        <ThemeContext.Provider value={{ theme, handleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
