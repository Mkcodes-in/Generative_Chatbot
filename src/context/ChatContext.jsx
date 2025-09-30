import React, { createContext, useReducer } from 'react'

const initialise = {
    user: null, 
    messages: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_MSG":
            return {
                ...state, messages: [...state.messages, action.payload]
            };
    
        case "SHOW_MSG":
            return {
                ...state, 
                messages: action.payload
            };

        default:
            return state;
    }
}

export const ChatContext = createContext();

export default function ChatProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialise);
    return (
        <ChatContext.Provider value={{state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}
